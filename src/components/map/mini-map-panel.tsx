"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";
import { DEFAULT_LOCATION } from "@/lib/constants";
import type { Need } from "@/types";

const MapView = dynamic(() => import("@/components/map/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-full rounded-2xl bg-muted/50 animate-pulse" />,
});

export function MiniMapPanel() {
  const [needs, setNeeds] = useState<Need[]>([]);

  useEffect(() => {
    fetch(`/api/needs?sort=nearby&lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}`)
      .then((r) => r.json())
      .then(setNeeds);
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg tracking-tight">Live Map</h3>
        <Link
          href="/map"
          className="flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Full screen
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
      >
        <MapView
          needs={needs.slice(0, 8)}
          center={[DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng]}
          zoom={12}
          height="100%"
          showHeatmap={true}
        />
      </motion.div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
        <MapPin className="h-4 w-4 text-primary" />
        {DEFAULT_LOCATION.name}
      </div>
    </div>
  );
}
