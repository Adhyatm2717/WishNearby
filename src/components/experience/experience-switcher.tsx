"use client";

import { motion } from "framer-motion";
import { Globe, Rocket, ArrowLeftRight } from "lucide-react";
import { useExperience } from "@/contexts/experience-context";
import type { ExperienceMode } from "@/lib/experience";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const options: {
  mode: ExperienceMode;
  title: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    mode: "explorer",
    title: "Community Explorer",
    description: "Post needs, support requests, and build community",
    icon: Globe,
  },
  {
    mode: "entrepreneur",
    title: "Entrepreneur",
    description: "Discover opportunities backed by real demand",
    icon: Rocket,
  },
];

import { useAuth } from "@/contexts/auth-context";

export function ExperienceSwitcher() {
  const { mode, setMode } = useExperience();
  const { updateProfile } = useAuth();

  const handleSwitch = async (next: ExperienceMode) => {
    if (next === mode) return;
    const success = await updateProfile({ role: next });
    if (success) {
      setMode(next);
      toast.success(
        next === "explorer"
          ? "Switched to Community Explorer"
          : "Switched to Entrepreneur workspace"
      );
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeftRight className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold tracking-tight">Switch Experience</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        One account, two workspaces. Switch anytime — your profile and data stay the same.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isActive = mode === opt.mode;
          const Icon = opt.icon;
          return (
            <motion.button
              key={opt.mode}
              type="button"
              onClick={() => handleSwitch(opt.mode)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer",
                isActive
                  ? "border-primary bg-primary/5 shadow-soft-lg ring-1 ring-primary/20"
                  : "border-border/60 bg-card hover:border-primary/30 hover:shadow-soft"
              )}
            >
              {isActive && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                  Active
                </span>
              )}
              <div
                className={cn(
                  "h-11 w-11 rounded-xl flex items-center justify-center mb-3",
                  isActive ? "gradient-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-sm mb-1">{opt.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
