import type { CategorySlug } from "@/lib/constants";

export type BusinessStage = 1 | 2 | 3 | 4;

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_anonymous?: boolean;
  role?: string;
  avatar_style?: string;
  avatar_svg?: string;
  gender?: string;
  universe?: string;
  anonymous_name?: string;
  anonymous_username?: string;
  anonymous_avatar_svg?: string;
  bio?: string;
  location?: string;
  reputation: number;
  is_entrepreneur: boolean;
  is_admin: boolean;
  created_at: string;
}

export interface Need {
  id: string;
  title: string;
  description: string;
  category: CategorySlug;
  location_name: string;
  lat: number;
  lng: number;
  image_url?: string;
  price_min?: number;
  price_max?: number;
  support_count: number;
  comment_count: number;
  growth_rate: number;
  author_id: string;
  author?: User;
  status: "active" | "fulfilled" | "archived";
  created_at: string;
  updated_at: string;
  distance_km?: number;
  business_stage?: BusinessStage;
  entrepreneur_id?: string;
  is_anonymous?: boolean;
  anonymous_name?: string;
  anonymous_universe?: string;
  anonymous_avatar_svg?: string;
}

export interface Vote {
  id: string;
  need_id: string;
  user_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  need_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  type: "support" | "comment" | "business_claim" | "business_open" | "weekly_update";
  title: string;
  message: string;
  need_id?: string;
  read: boolean;
  created_at: string;
}

export interface BusinessClaim {
  id: string;
  need_id: string;
  entrepreneur_id: string;
  stage: BusinessStage;
  estimated_investment?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  entrepreneur?: User;
  need?: Need;
}

export interface Report {
  id: string;
  need_id: string;
  user_id: string;
  reason: string;
  created_at: string;
}

export interface Badge {
  slug: string;
  label: string;
  earned_at: string;
}

export interface AICheckResult {
  isDuplicate: boolean;
  isSpam: boolean;
  suggestedCategory?: CategorySlug;
  similarNeeds: Need[];
  confidence: number;
  message?: string;
}

export type SortOption = "trending" | "newest" | "popular" | "nearby";

export interface NeedFilters {
  category?: CategorySlug;
  sort?: SortOption;
  query?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
}
