export type ExperienceMode = "explorer" | "entrepreneur";

export const EXPERIENCE_STORAGE_KEY = "wishnearby-experience";
export const ONBOARDING_STORAGE_KEY = "wishnearby-onboarding-complete";

export const EXPERIENCE_LABELS: Record<ExperienceMode, { title: string; subtitle: string }> = {
  explorer: {
    title: "Community Explorer",
    subtitle: "Post needs, support requests, and discover local demand",
  },
  entrepreneur: {
    title: "Entrepreneur",
    subtitle: "Discover business opportunities backed by community demand",
  },
};

export function getStoredExperience(): ExperienceMode | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
  if (value === "explorer" || value === "entrepreneur") return value;
  return null;
}

export function setStoredExperience(mode: ExperienceMode) {
  localStorage.setItem(EXPERIENCE_STORAGE_KEY, mode);
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true";
}

export function setOnboardingComplete() {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
}

export function getHomeRoute(mode: ExperienceMode): string {
  return mode === "entrepreneur" ? "/entrepreneur" : "/home";
}

export const EXPLORER_ONLY_ROUTES = ["/post", "/explore"];
export const ENTREPRENEUR_HOME = "/entrepreneur";
export const EXPLORER_HOME = "/home";
