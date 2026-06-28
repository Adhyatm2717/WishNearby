"use client";

import { useEffect, useState } from "react";
import { Bookmark, Compass } from "lucide-react";
import { NeedCard, NeedCardSkeleton } from "@/components/needs/need-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Need } from "@/types";
import { motion } from "framer-motion";
import { useExperience } from "@/contexts/experience-context";

export default function SavedPage() {
  const { setIsAddNeedOpen } = useExperience();
  const [savedNeeds, setSavedNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      const bookmarks = localStorage.getItem("wishnearby-bookmarks");
      if (!bookmarks) {
        setSavedNeeds([]);
        setLoading(false);
        return;
      }

      try {
        const ids = JSON.parse(bookmarks) as string[];
        if (ids.length === 0) {
          setSavedNeeds([]);
          setLoading(false);
          return;
        }

        // Fetch all needs and filter
        const res = await fetch("/api/needs");
        const allNeeds: Need[] = await res.json();
        const filtered = allNeeds.filter((n) => ids.includes(n.id));
        setSavedNeeds(filtered);
      } catch {
        // error
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-8 pb-nav md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2.5">
          <Bookmark className="h-7 w-7 text-primary fill-primary/10" />
          Saved Needs
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Keep track of community needs you have bookmarked for updates.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <NeedCardSkeleton key={i} />
          ))}
        </div>
      ) : savedNeeds.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarked needs yet"
          description="Browse the home feed and click the bookmark icon on cards to save them here for quick access."
          actionLabel="Browse Feed"
          actionHref="/home"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {savedNeeds.map((need, i) => (
            <NeedCard key={need.id} need={need} index={i} compact />
          ))}
        </div>
      )}
    </div>
  );
}
