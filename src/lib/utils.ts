import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m away`;
  return `${km.toFixed(1)}km away`;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function calculateBusinessPotential(
  supportCount: number,
  growthRate: number,
  distanceKm: number
): number {
  const supportScore = Math.min(supportCount / 200, 1) * 40;
  const growthScore = Math.min(growthRate / 50, 1) * 35;
  const proximityScore = Math.max(0, 1 - distanceKm / 10) * 25;
  return Math.round(supportScore + growthScore + proximityScore);
}
