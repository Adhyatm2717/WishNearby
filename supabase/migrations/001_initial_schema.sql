-- Demandly Database Schema
-- Run this in your Supabase SQL editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  reputation INTEGER NOT NULL DEFAULT 0,
  is_entrepreneur BOOLEAN NOT NULL DEFAULT FALSE,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  role TEXT,
  gender TEXT,
  avatar_style TEXT,
  avatar_svg TEXT,
  universe TEXT,
  anonymous_identity TEXT,
  anonymous_username TEXT,
  anonymous_avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories reference table
CREATE TABLE categories (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL
);

INSERT INTO categories (slug, label, icon, color) VALUES
  ('food', 'Food', 'utensils', '#F97316'),
  ('services', 'Services', 'wrench', '#8B5CF6'),
  ('education', 'Education', 'graduation-cap', '#2563EB'),
  ('healthcare', 'Healthcare', 'heart-pulse', '#EF4444'),
  ('transportation', 'Transportation', 'bus', '#06B6D4'),
  ('sports', 'Sports', 'dumbbell', '#10B981'),
  ('shopping', 'Shopping', 'shopping-bag', '#EC4899'),
  ('entertainment', 'Entertainment', 'clapperboard', '#F59E0B'),
  ('government', 'Government', 'landmark', '#64748B'),
  ('others', 'Others', 'more-horizontal', '#94A3B8');

-- Needs
CREATE TABLE needs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(slug),
  location_name TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  price_min INTEGER,
  price_max INTEGER,
  support_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  growth_rate REAL NOT NULL DEFAULT 0,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'archived')),
  business_stage INTEGER CHECK (business_stage BETWEEN 1 AND 4),
  entrepreneur_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_needs_category ON needs(category);
CREATE INDEX idx_needs_status ON needs(status);
CREATE INDEX idx_needs_support ON needs(support_count DESC);
CREATE INDEX idx_needs_created ON needs(created_at DESC);
CREATE INDEX idx_needs_location ON needs USING GIST (ST_SetSRID(ST_MakePoint(lng, lat), 4326));

-- Votes (Count Me In)
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(need_id, user_id)
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_need ON comments(need_id);

-- Business Claims
CREATE TABLE business_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  entrepreneur_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL DEFAULT 1 CHECK (stage BETWEEN 1 AND 4),
  estimated_investment INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(need_id)
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('support', 'comment', 'business_claim', 'business_open', 'weekly_update')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  need_id UUID REFERENCES needs(id) ON DELETE SET NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, read);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  need_id UUID NOT NULL REFERENCES needs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_slug TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_slug)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE needs ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Needs are viewable by everyone" ON needs FOR SELECT USING (true);
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Votes are viewable by everyone" ON votes FOR SELECT USING (true);
CREATE POLICY "Business claims are viewable by everyone" ON business_claims FOR SELECT USING (true);
CREATE POLICY "Badges are viewable by everyone" ON user_badges FOR SELECT USING (true);
CREATE POLICY "Needs are viewable by everyone" ON needs FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Authenticated users can create needs" ON needs FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own needs" ON needs FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authenticated users can vote" ON votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own votes" ON votes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can comment" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can report" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION increment_support_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE needs SET support_count = support_count + 1, updated_at = NOW() WHERE id = NEW.need_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_support_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE needs SET support_count = GREATEST(support_count - 1, 0), updated_at = NOW() WHERE id = OLD.need_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_vote_insert AFTER INSERT ON votes FOR EACH ROW EXECUTE FUNCTION increment_support_count();
CREATE TRIGGER on_vote_delete AFTER DELETE ON votes FOR EACH ROW EXECUTE FUNCTION decrement_support_count();

CREATE OR REPLACE FUNCTION increment_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE needs SET comment_count = comment_count + 1, updated_at = NOW() WHERE id = NEW.need_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_insert AFTER INSERT ON comments FOR EACH ROW EXECUTE FUNCTION increment_comment_count();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
