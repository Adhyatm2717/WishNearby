import {
  Home,
  Compass,
  Map,
  PlusCircle,
  Bell,
  User,
  LayoutDashboard,
  TrendingUp,
  Shield,
  MessageSquare,
  Bookmark,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ExperienceMode } from "@/lib/experience";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  shortLabel: string;
  badge?: number;
  featured?: boolean;
}

export function getNavItems(mode: ExperienceMode): NavItem[] {
  if (mode === "entrepreneur") {
    return [
      { href: "/entrepreneur", label: "Dashboard", icon: LayoutDashboard, shortLabel: "Home" },
      { href: "/map", label: "Heatmap", icon: Map, shortLabel: "Map" },
      { href: "/explore", label: "Explore Opportunities", icon: Compass, shortLabel: "Explore" },
      { href: "/notifications", label: "Alerts", icon: Bell, shortLabel: "Alerts", badge: 2 },
      { href: "/messages", label: "Messages", icon: MessageSquare, shortLabel: "Messages" },
      { href: "/profile", label: "Profile", icon: User, shortLabel: "Profile" },
    ];
  }

  return [
    { href: "/home", label: "Home", icon: Home, shortLabel: "Home" },
    { href: "/explore", label: "Explore", icon: Compass, shortLabel: "Explore" },
    { href: "/map", label: "Map", icon: Map, shortLabel: "Map" },
    { href: "/post", label: "Add Need", icon: PlusCircle, shortLabel: "Add", featured: true },
    { href: "/notifications", label: "Alerts", icon: Bell, shortLabel: "Alerts", badge: 2 },
    { href: "/messages", label: "Messages", icon: MessageSquare, shortLabel: "Messages" },
    { href: "/profile", label: "Profile", icon: User, shortLabel: "Profile" },
    { href: "/saved", label: "Saved", icon: Bookmark, shortLabel: "Saved" },
    { href: "/communities", label: "Communities", icon: Users, shortLabel: "Groups" },
  ];
}

export const ADMIN_NAV_ITEM = { href: "/admin", label: "Admin", icon: Shield };
