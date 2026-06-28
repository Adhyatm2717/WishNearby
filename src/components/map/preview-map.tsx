"use client";

import { useEffect, useState } from "react";
import { MapView } from "@/components/map/map-view";
import type { Need } from "@/types";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { motion } from "framer-motion";

export function PreviewMap() {
  const [needs, setNeeds] = useState<Need[]>([]);

  useEffect(() => {
    fetch("/api/needs?sort=trending")
      .then((r) => r.json())
      .then(setNeeds)
      .catch(() => {});
  }, []);

  return (
    <div className="relative h-[280px] sm:h-[350px] md:h-[400px]">
      <MapView
        needs={needs}
        center={[DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng]}
        zoom={12}
        height="100%"
        interactive={true}
        showHeatmap={true}
        className="!rounded-none"
      />
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 glass-strong rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium shadow-soft max-w-[calc(100%-1.5rem)] border border-border/50"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-cta animate-pulse" />
          Live demand map · Pune
        </span>
      </motion.div>
    </div>
  );
}
