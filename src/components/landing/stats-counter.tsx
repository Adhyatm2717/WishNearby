"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";
import { FileText, Store, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  icon: LucideIcon;
  accent: string;
  gradient: string;
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function StatsCounter({ value, label, suffix, icon: Icon, accent, gradient }: StatsCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden text-center p-7 sm:p-9 rounded-2xl border border-border/60 bg-gradient-to-br ${gradient} bg-card shadow-soft hover:shadow-soft-lg transition-shadow duration-300`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: accent }} />
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-soft relative"
        style={{ backgroundColor: `${accent}15` }}
      >
        <Icon className="h-6 w-6" style={{ color: accent }} />
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight relative">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm md:text-base text-muted-foreground font-medium relative">{label}</p>
    </motion.div>
  );
}

export function LiveStats({
  needsPosted,
  businessesStarted,
  communitiesActive,
}: {
  needsPosted: number;
  businessesStarted: number;
  communitiesActive: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      <StatsCounter value={needsPosted} label="Needs Posted" suffix="+" icon={FileText} accent="#6D28D9" gradient="from-violet-500/8 to-transparent" />
      <StatsCounter value={businessesStarted} label="Businesses Started" suffix="+" icon={Store} accent="#16A34A" gradient="from-emerald-500/8 to-transparent" />
      <StatsCounter value={communitiesActive} label="Communities Active" icon={MapPin} accent="#9333EA" gradient="from-purple-500/8 to-transparent" />
    </div>
  );
}
