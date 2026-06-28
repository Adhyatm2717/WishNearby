"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  type ExperienceMode,
  getHomeRoute,
  getStoredExperience,
  isOnboardingComplete,
  setOnboardingComplete,
  setStoredExperience,
} from "@/lib/experience";

interface ExperienceContextValue {
  mode: ExperienceMode;
  isReady: boolean;
  onboardingComplete: boolean;
  setMode: (mode: ExperienceMode, options?: { redirect?: boolean }) => void;
  completeOnboarding: (mode: ExperienceMode) => void;
  isAddNeedOpen: boolean;
  setIsAddNeedOpen: (open: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mode, setModeState] = useState<ExperienceMode>("explorer");
  const [isReady, setIsReady] = useState(false);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const [isAddNeedOpen, setIsAddNeedOpen] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setModeState(getStoredExperience() ?? "explorer");
    setOnboardingCompleteState(isOnboardingComplete());
    setIsReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setMode = useCallback(
    (next: ExperienceMode, options?: { redirect?: boolean }) => {
      setStoredExperience(next);
      setModeState(next);
      if (options?.redirect !== false) {
        router.push(getHomeRoute(next));
      }
    },
    [router]
  );

  const completeOnboarding = useCallback(
    (selected: ExperienceMode) => {
      setStoredExperience(selected);
      setOnboardingComplete();
      setModeState(selected);
      setOnboardingCompleteState(true);
      router.push(getHomeRoute(selected));
    },
    [router]
  );

  const value = useMemo(
    () => ({
      mode,
      isReady,
      onboardingComplete,
      setMode,
      completeOnboarding,
      isAddNeedOpen,
      setIsAddNeedOpen,
    }),
    [mode, isReady, onboardingComplete, setMode, completeOnboarding, isAddNeedOpen, setIsAddNeedOpen]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}
