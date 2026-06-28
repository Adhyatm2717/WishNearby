"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, MapPin, ArrowRight, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategory } from "@/lib/constants";
import Link from "next/link";
import type { Need } from "@/types";

export function LaunchCelebrationModal() {
  const [recentLaunch, setRecentLaunch] = useState<Need | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function checkRecentLaunches() {
      try {
        const res = await fetch("/api/needs/recent-launches");
        if (!res.ok) return;
        const launches: Need[] = await res.json();
        
        if (launches && launches.length > 0) {
          // Get the most recent launch
          const latest = launches[0];
          
          // Check if the user has already dismissed this specific launch
          const isDismissed = localStorage.getItem(`wishnearby-dismissed-launch-${latest.id}`);
          if (!isDismissed) {
            setRecentLaunch(latest);
            setIsOpen(true);
          }
        }
      } catch (error) {
        console.error("Failed to check recent launches:", error);
      }
    }

    checkRecentLaunches();
  }, []);

  const handleDismiss = () => {
    if (recentLaunch) {
      localStorage.setItem(`wishnearby-dismissed-launch-${recentLaunch.id}`, "true");
    }
    setIsOpen(false);
  };

  if (!recentLaunch || !isOpen) return null;

  const category = getCategory(recentLaunch.category);
  const CategoryIcon = category.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          onClick={handleDismiss}
        />

        {/* Celebration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        >
          {/* Decorative Sparkles & Confetti Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating Sparkles */}
            <div className="absolute top-10 left-10 text-gold/30 animate-pulse duration-1000"><Sparkles className="h-5 w-5 fill-current" /></div>
            <div className="absolute top-20 right-12 text-gold/20 animate-pulse duration-1500"><Sparkles className="h-4 w-4 fill-current" /></div>
            <div className="absolute bottom-16 left-16 text-gold/25 animate-pulse duration-700"><Sparkles className="h-6 w-6 fill-current" /></div>
            <div className="absolute bottom-24 right-16 text-gold/30 animate-pulse duration-2000"><Sparkles className="h-5 w-5 fill-current" /></div>

            {/* Glowing Radial Background */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold/10 rounded-full blur-[80px]" />
          </div>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gold/70 hover:text-gold hover:bg-gold/10 transition-all p-1.5 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header Icon */}
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 shadow-soft relative">
            <PartyPopper className="h-8 w-8 text-gold animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold"></span>
            </span>
          </div>

          {/* Titles */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-[10px] font-bold uppercase tracking-wider mb-3">
            New Business Launched! 🎉
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            {recentLaunch.title}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 px-2">
            The community demand has been met! An entrepreneur has officially launched this business in your neighborhood.
          </p>

          {/* Business Details Card */}
          <Card className="bg-white/5 border border-white/10 p-4 rounded-2xl text-left mb-6 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <CategoryIcon className="h-4.5 w-4.5" style={{ color: category.color }} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Category</p>
                <p className="text-xs font-bold text-white">{category.label}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Location</p>
                <p className="text-xs font-bold text-white">{recentLaunch.location_name}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/needs/${recentLaunch.id}`} className="flex-1 w-full" onClick={handleDismiss}>
              <Button className="w-full rounded-xl bg-gold hover:bg-gold/90 text-slate-950 font-bold py-2.5 shadow-soft gap-1.5">
                Visit Business Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="flex-1 rounded-xl text-xs font-bold py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 hover:border-gold/20 transition-all"
              onClick={handleDismiss}
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
