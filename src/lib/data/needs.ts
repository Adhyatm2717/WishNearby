import type { Need, NeedFilters, Comment, Notification, BusinessClaim, AICheckResult } from "@/types";
import { createClient } from "@/lib/supabase/server";
import {
  MOCK_NEEDS,
  MOCK_COMMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_BUSINESS_CLAIMS,
  enrichNeed,
  enrichComment,
  CURRENT_USER_ID,
} from "./mock-data";

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortNeeds(needs: Need[], sort: NeedFilters["sort"] = "trending"): Need[] {
  const sorted = [...needs];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    case "popular":
      return sorted.sort((a, b) => b.support_count - a.support_count);
    case "nearby":
      return sorted.sort((a, b) => (a.distance_km ?? 999) - (b.distance_km ?? 999));
    case "trending":
    default:
      return sorted.sort((a, b) => b.growth_rate * b.support_count - a.growth_rate * a.support_count);
  }
}

export async function getNeeds(filters: NeedFilters = {}): Promise<Need[]> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    let query = supabase
      .from("needs")
      .select("*, author:profiles!author_id(*)")
      .eq("status", "active");

    if (filters.category) {
      query = query.eq("category", filters.category);
    }

    if (filters.query) {
      query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%,location_name.ilike.%${filters.query}%`);
    }

    // Apply sorting
    if (filters.sort === "newest") {
      query = query.order("created_at", { ascending: false });
    } else if (filters.sort === "popular") {
      query = query.order("support_count", { ascending: false });
    } else {
      query = query.order("support_count", { ascending: false });
    }

    const { data: needs, error } = await query;
    if (error) {
      console.error("Error fetching needs from Supabase:", error);
      return [];
    }

    let result = (needs || []) as Need[];
    if (filters.lat && filters.lng) {
      result = result.map((n) => ({
        ...n,
        distance_km: haversineDistance(filters.lat!, filters.lng!, n.lat, n.lng),
      }));

      if (filters.radiusKm) {
        result = result.filter((n) => (n.distance_km ?? 0) <= filters.radiusKm!);
      }

      if (filters.sort === "nearby") {
        result.sort((a, b) => (a.distance_km ?? 999) - (b.distance_km ?? 999));
      }
    }

    return result;
  }

  let needs = MOCK_NEEDS.filter((n) => n.status === "active" || filters.sort === "popular");

  if (filters.category) {
    needs = needs.filter((n) => n.category === filters.category);
  }

  if (filters.query) {
    const q = filters.query.toLowerCase();
    needs = needs.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.location_name.toLowerCase().includes(q)
    );
  }

  if (filters.lat && filters.lng) {
    needs = needs.map((n) => ({
      ...n,
      distance_km: haversineDistance(filters.lat!, filters.lng!, n.lat, n.lng),
    }));

    if (filters.radiusKm) {
      needs = needs.filter((n) => (n.distance_km ?? 0) <= filters.radiusKm!);
    }
  }

  return sortNeeds(needs, filters.sort).map(enrichNeed);
}

export async function getNeedById(id: string): Promise<Need | null> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    const { data: need, error } = await supabase
      .from("needs")
      .select("*, author:profiles!author_id(*)")
      .eq("id", id)
      .single();

    if (error || !need) return null;
    return need as Need;
  }

  const need = MOCK_NEEDS.find((n) => n.id === id);
  return need ? enrichNeed(need) : null;
}

export async function createNeed(data: Partial<Need>): Promise<Need> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: need, error } = await supabase
      .from("needs")
      .insert({
        title: data.title,
        description: data.description,
        category: data.category,
        location_name: data.location_name,
        lat: data.lat ?? 0,
        lng: data.lng ?? 0,
        price_min: data.price_min,
        price_max: data.price_max,
        author_id: user.id,
        status: "active",
        support_count: 0,
        comment_count: 0,
        growth_rate: 5,
        is_anonymous: data.is_anonymous ?? false,
        anonymous_name: data.anonymous_name,
        anonymous_avatar_svg: data.anonymous_avatar_svg,
      })
      .select("*, author:profiles!author_id(*)")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    // Insert initial vote/support from the author
    await supabase.from("votes").insert({
      user_id: user.id,
      need_id: need.id,
    });

    return { ...need, support_count: 1 } as Need;
  } else {
    const need = {
      id: `need-${Date.now()}`,
      ...data,
      support_count: 1,
      comment_count: 0,
      growth_rate: 5,
      author_id: "user-1",
      status: "active" as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Need;
    MOCK_NEEDS.push(need);
    return need;
  }
}

export async function getSimilarNeeds(need: Need, limit = 4): Promise<Need[]> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    const { data: needs, error } = await supabase
      .from("needs")
      .select("*, author:profiles!author_id(*)")
      .eq("category", need.category)
      .eq("status", "active")
      .neq("id", need.id)
      .limit(limit);

    if (error) return [];
    return needs as Need[];
  }

  return MOCK_NEEDS.filter(
    (n) => n.id !== need.id && n.category === need.category && n.status === "active"
  )
    .slice(0, limit)
    .map(enrichNeed);
}

export async function getComments(needId: string): Promise<Comment[]> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*, author:profiles!user_id(*)")
      .eq("need_id", needId)
      .order("created_at", { ascending: false });

    if (error) return [];
    return comments as Comment[];
  }

  return MOCK_COMMENTS.filter((c) => c.need_id === needId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(enrichComment);
}

export async function getNotifications(userId: string = CURRENT_USER_ID): Promise<Notification[]> {
  return MOCK_NOTIFICATIONS.filter((n) => n.user_id === userId).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getUnreadNotificationCount(userId: string = CURRENT_USER_ID): Promise<number> {
  const notifications = await getNotifications(userId);
  return notifications.filter((n) => !n.read).length;
}

export async function getBusinessClaims(): Promise<BusinessClaim[]> {
  return MOCK_BUSINESS_CLAIMS;
}

export async function getEntrepreneurOpportunities(): Promise<Need[]> {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    const supabase = await createClient();
    const { data: needs, error } = await supabase
      .from("needs")
      .select("*, author:profiles!author_id(*)")
      .eq("status", "active")
      .order("support_count", { ascending: false });

    if (error) return [];
    return (needs || []) as Need[];
  }

  return sortNeeds(
    MOCK_NEEDS.filter((n) => n.status === "active" && !n.entrepreneur_id),
    "trending"
  ).map(enrichNeed);
}

export async function checkNeedWithAI(
  title: string,
  description: string
): Promise<AICheckResult> {
  const allNeeds = await getNeeds();
  const combined = `${title} ${description}`.toLowerCase();

  const spamPatterns = [/buy now/i, /click here/i, /free money/i, /crypto/i, /viagra/i];
  const isSpam = spamPatterns.some((p) => p.test(combined));

  const similarNeeds = allNeeds.filter((need) => {
    const needText = `${need.title} ${need.description}`.toLowerCase();
    const titleWords = title.toLowerCase().split(/\s+/);
    const matchCount = titleWords.filter((w) => w.length > 3 && needText.includes(w)).length;
    return matchCount >= 2;
  });

  const isDuplicate = similarNeeds.some((need) => {
    const titleSimilarity =
      title.toLowerCase().split(/\s+/).filter((w) => need.title.toLowerCase().includes(w)).length /
      title.split(/\s+/).length;
    return titleSimilarity > 0.6;
  });

  const categoryKeywords: Record<string, string[]> = {
    food: ["food", "restaurant", "cafe", "samosa", "cuisine", "eat", "dish", "meal"],
    services: ["service", "repair", "laundry", "cleaning", "maintenance"],
    education: ["school", "course", "learn", "bootcamp", "training", "class"],
    healthcare: ["doctor", "clinic", "dental", "hospital", "health", "medical"],
    transportation: ["bus", "taxi", "scooter", "transport", "commute", "travel"],
    sports: ["gym", "sport", "court", "fitness", "badminton", "cricket"],
    shopping: ["shop", "store", "market", "buy", "mall"],
    entertainment: ["cinema", "movie", "theater", "concert", "event"],
    government: ["government", "municipal", "permit", "license", "public"],
  };

  let suggestedCategory: AICheckResult["suggestedCategory"];
  let maxScore = 0;
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    const score = keywords.filter((k) => combined.includes(k)).length;
    if (score > maxScore) {
      maxScore = score;
      suggestedCategory = cat as AICheckResult["suggestedCategory"];
    }
  }

  return {
    isDuplicate,
    isSpam,
    suggestedCategory,
    similarNeeds: similarNeeds.slice(0, 3),
    confidence: isDuplicate ? 0.85 : isSpam ? 0.9 : 0.7,
    message: isSpam
      ? "This content appears to be spam. Please revise your request."
      : isDuplicate
        ? "Similar needs already exist nearby. Consider supporting them instead."
        : similarNeeds.length > 0
          ? "We found similar needs you might want to support first."
          : undefined,
  };
}

export async function getTrendingPrediction(): Promise<Need[]> {
  return sortNeeds(MOCK_NEEDS.filter((n) => n.status === "active"), "trending")
    .slice(0, 5)
    .map(enrichNeed);
}

export async function getPlatformStats() {
  const activeNeeds = MOCK_NEEDS.filter((n) => n.status === "active").length;
  const fulfilled = MOCK_NEEDS.filter((n) => n.status === "fulfilled").length;
  const totalSupport = MOCK_NEEDS.reduce((sum, n) => sum + n.support_count, 0);
  return {
    needsPosted: 12847 + activeNeeds,
    businessesStarted: 342 + fulfilled,
    communitiesActive: 89,
    totalSupport,
  };
}

export { CURRENT_USER_ID };
