import {
  UtensilsCrossed,
  Wrench,
  GraduationCap,
  HeartPulse,
  Bus,
  Dumbbell,
  ShoppingBag,
  Clapperboard,
  Landmark,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export const APP_NAME = "WishNearby";
export const APP_TAGLINE = "Discover what your community truly needs";

export type CategorySlug =
  | "food"
  | "services"
  | "education"
  | "healthcare"
  | "transportation"
  | "sports"
  | "shopping"
  | "entertainment"
  | "government"
  | "others";

export interface Category {
  slug: CategorySlug;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORIES: Category[] = [
  { slug: "food", label: "Food", icon: UtensilsCrossed, color: "#F97316" },
  { slug: "services", label: "Services", icon: Wrench, color: "#8B5CF6" },
  { slug: "education", label: "Education", icon: GraduationCap, color: "#2563EB" },
  { slug: "healthcare", label: "Healthcare", icon: HeartPulse, color: "#EF4444" },
  { slug: "transportation", label: "Transportation", icon: Bus, color: "#06B6D4" },
  { slug: "sports", label: "Sports", icon: Dumbbell, color: "#10B981" },
  { slug: "shopping", label: "Shopping", icon: ShoppingBag, color: "#EC4899" },
  { slug: "entertainment", label: "Entertainment", icon: Clapperboard, color: "#F59E0B" },
  { slug: "government", label: "Government", icon: Landmark, color: "#64748B" },
  { slug: "others", label: "Others", icon: MoreHorizontal, color: "#94A3B8" },
];

export const BADGES = [
  { slug: "community-hero", label: "Community Hero", description: "Supported 50+ needs", color: "#2563EB" },
  { slug: "problem-solver", label: "Problem Solver", description: "Started a business from demand", color: "#10B981" },
  { slug: "explorer", label: "Explorer", description: "Discovered needs in 5+ areas", color: "#8B5CF6" },
  { slug: "local-champion", label: "Local Champion", description: "Top contributor in your area", color: "#F59E0B" },
  { slug: "top-contributor", label: "Top Contributor", description: "Posted 10+ quality needs", color: "#EC4899" },
] as const;

export const BUSINESS_STAGES = [
  { stage: 1, label: "Planning", description: "Entrepreneur is researching and planning" },
  { stage: 2, label: "Preparing", description: "Setting up location and resources" },
  { stage: 3, label: "Opening Soon", description: "Final touches before launch" },
  { stage: 4, label: "Business Open", description: "The need has been fulfilled!" },
] as const;

export const PLATFORM_STATS = {
  needsPosted: 12847,
  businessesStarted: 342,
  communitiesActive: 89,
};

export const DEFAULT_LOCATION = {
  name: "Lohegaon, Pune",
  lat: 18.5975,
  lng: 73.9089,
};

export function getCategory(slug: CategorySlug): Category {
  return CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[CATEGORIES.length - 1];
}
