"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useExperience } from "@/contexts/experience-context";
import { useAuth } from "@/contexts/auth-context";
import { EXPLORER_ONLY_ROUTES, getHomeRoute, type ExperienceMode } from "@/lib/experience";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { isReady: expReady, mode, setMode } = useExperience();
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isReady = expReady && !authLoading;
  const onboardingComplete = Boolean(user?.role);

  // Sync mode in ExperienceContext with user role from DB if they differ
  useEffect(() => {
    if (user?.role && mode !== user.role) {
      setMode(user.role as ExperienceMode, { redirect: false });
    }
  }, [user, mode, setMode]);

  useEffect(() => {
    if (!isReady) return;

    // 1. If not logged in at all, redirect to auth page
    if (!user) {
      router.replace("/");
      return;
    }

    // 2. If logged in but role is missing, redirect to onboarding
    if (!onboardingComplete) {
      if (pathname !== "/onboarding") {
        router.replace("/onboarding");
      }
      return;
    }

    // 3. Prevent loop if onboarding is complete but they try to visit onboarding
    if (pathname === "/onboarding") {
      router.replace(getHomeRoute(user.role as ExperienceMode));
      return;
    }

    // 4. Protect workspace routes based on current active workspace mode
    if (mode === "entrepreneur") {
      if (EXPLORER_ONLY_ROUTES.includes(pathname) || pathname === "/home") {
        router.replace(getHomeRoute("entrepreneur"));
      }
    } else if (mode === "explorer" && pathname === "/entrepreneur") {
      router.replace(getHomeRoute("explorer"));
    }
  }, [isReady, user, onboardingComplete, mode, pathname, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Hide page until redirect resolves
  if (!user || !onboardingComplete) return null;

  return <>{children}</>;
}
