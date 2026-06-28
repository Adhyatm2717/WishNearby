"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, ArrowLeftRight, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme-toggle";
import { useExperience } from "@/contexts/experience-context";
import { getNavItems, ADMIN_NAV_ITEM, type NavItem } from "@/lib/nav-config";
import { EXPERIENCE_LABELS } from "@/lib/experience";
import { toast } from "sonner";

function NavLink({
  item,
  isActive,
  layout,
}: {
  item: NavItem;
  isActive: boolean;
  layout: "sidebar" | "mobile";
}) {
  const { setIsAddNeedOpen } = useExperience();
  const isFeatured = item.featured;

  const handleClick = (e: React.MouseEvent) => {
    if (item.href === "/post") {
      e.preventDefault();
      setIsAddNeedOpen(true);
    }
  };

  if (layout === "mobile" && isFeatured) {
    return (
      <button
        onClick={handleClick}
        aria-label={item.label}
        className="flex flex-col items-center justify-center -mt-6 mx-auto h-14 w-14 rounded-2xl gradient-cta text-cta-foreground shadow-float cursor-pointer ripple-effect border-0"
      >
        <item.icon className="h-6 w-6" />
      </button>
    );
  }

  if (layout === "mobile") {
    return (
      <Link
        href={item.href}
        onClick={handleClick}
        aria-label={item.label}
        className={cn(
          "flex flex-col items-center justify-center gap-0.5 min-h-[3.25rem] py-1.5 rounded-xl transition-all duration-200 relative cursor-pointer min-w-0",
          isActive ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="mobile-nav-indicator"
            className="absolute inset-x-1 inset-y-0.5 rounded-lg bg-primary/8"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <item.icon className={cn("h-5 w-5 shrink-0 relative z-[1]", isActive && "text-primary")} />
        <span
          className={cn(
            "text-[10px] font-medium truncate max-w-full px-0.5 hidden min-[360px]:block relative z-[1]",
            isActive && "text-primary"
          )}
        >
          {item.shortLabel}
        </span>
        {item.badge && !isActive && (
          <span className="absolute top-0.5 right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-cta text-cta-foreground text-[9px] font-bold flex items-center justify-center z-[2]">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      title={item.label}
      onClick={handleClick}
      className={cn(
        "relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer md:justify-center lg:justify-start px-3 py-2.5",
        isFeatured && !isActive && "text-cta hover:bg-cta/8 bg-cta/5 border border-cta/15",
        isFeatured && isActive && "gradient-cta text-cta-foreground shadow-soft",
        !isFeatured && isActive && "gradient-primary text-primary-foreground shadow-soft",
        !isFeatured && !isActive && "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" />
      <span className="hidden lg:inline">{item.label}</span>
      {item.badge && !isActive && (
        <span className="absolute top-1.5 right-1.5 lg:static lg:ml-auto h-4 min-w-4 lg:h-5 lg:min-w-5 px-0 lg:px-1.5 rounded-full bg-cta text-cta-foreground text-[10px] lg:text-xs font-bold flex items-center justify-center">
          <span className="hidden lg:inline">{item.badge}</span>
        </span>
      )}
    </Link>
  );
}

export function SidebarNav() {
  const pathname = usePathname();
  const { mode, setMode } = useExperience();
  const navItems = getNavItems(mode);
  const modeLabel = EXPERIENCE_LABELS[mode].title;

  const toggleExperienceMode = () => {
    const nextMode = mode === "explorer" ? "entrepreneur" : "explorer";
    setMode(nextMode);
    toast.success(
      nextMode === "explorer"
        ? "Welcome to Community Explorer"
        : "Switched to Entrepreneur Workspace"
    );
  };

  return (
    <aside className="hidden md:flex flex-col shrink-0 h-dvh sticky top-0 border-r border-border bg-card/85 backdrop-blur-md md:w-[4.5rem] lg:w-64 xl:w-72 shadow-soft">
      {/* Top Header Logo */}
      <div className="p-4 lg:p-6 pb-3 lg:pb-4 safe-area-top">
        <Link
          href="/"
          title={APP_NAME}
          className="flex items-center gap-3 cursor-pointer md:justify-center lg:justify-start group"
        >
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-soft group-hover:shadow-soft-lg transition-shadow duration-200">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden lg:block min-w-0">
            <span className="text-lg font-bold tracking-tight block truncate text-foreground">{APP_NAME}</span>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider truncate flex items-center gap-1">
              <Sparkle className="h-2.5 w-2.5 fill-gold stroke-gold" />
              {modeLabel}
            </p>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-2 lg:px-4 space-y-1 overflow-y-auto scrollbar-hide py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/home" && item.href !== "/entrepreneur" && pathname.startsWith(item.href + "/"));
          return <NavLink key={item.href} item={item} isActive={isActive} layout="sidebar" />;
        })}

        {/* Switch Experience Option */}
        <button
          type="button"
          onClick={toggleExperienceMode}
          className="w-full relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer md:justify-center lg:justify-start px-3 py-2.5 mt-2 border border-dashed border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 border-0"
          title="Switch Workspace"
        >
          <ArrowLeftRight className="h-5 w-5 shrink-0" />
          <span className="hidden lg:inline font-bold">Switch Experience</span>
        </button>

        {/* Admin Link */}
        <div className="pt-4 mt-4 border-t border-border/60 hidden lg:block">
          <p className="px-3 pb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Control Panel
          </p>
          <Link
            href={ADMIN_NAV_ITEM.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
              pathname === ADMIN_NAV_ITEM.href
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-muted/85 hover:text-foreground"
            )}
          >
            <ADMIN_NAV_ITEM.icon className="h-5 w-5" />
            {ADMIN_NAV_ITEM.label}
          </Link>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 lg:p-4 border-t border-border/60 flex items-center md:justify-center lg:justify-between safe-area-bottom">
        <ThemeToggle />
        <p className="text-[10px] text-muted-foreground font-semibold hidden lg:block uppercase tracking-wider">Non-profit · Community</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { mode } = useExperience();
  const navItems = getNavItems(mode);

  // For mobile bottom bar, only show a filtered set of 5 key actions to prevent cluttering
  const mobileFilteredItems = mode === "entrepreneur" 
    ? navItems.slice(0, 5) // Dashboard, Heatmap, Explore Opportunities, Alerts, Profile
    : [
        navItems[0], // Home
        navItems[1], // Explore
        navItems[3], // Add Need (Featured center button)
        navItems[4], // Alerts
        navItems[6], // Profile
      ];

  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 safe-area-bottom">
      <div className="glass-strong rounded-2xl border border-border/50 shadow-float safe-area-x">
        <div className="grid grid-cols-5 items-end px-1 pt-1 pb-1">
          {mobileFilteredItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/home" && item.href !== "/entrepreneur" && pathname.startsWith(item.href + "/"));
            return <NavLink key={item.href} item={item} isActive={isActive} layout="mobile" />;
          })}
        </div>
      </div>
    </nav>
  );
}
