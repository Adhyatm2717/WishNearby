"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MapLegend } from "@/components/map/map-legend";
import { Slider } from "@/components/ui/slider";
import type { Need } from "@/types";
import { DEFAULT_LOCATION } from "@/lib/constants";

const MapView = dynamic(() => import("@/components/map/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-full bg-muted/50 animate-pulse" />,
});

export default function MapPage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [radiusKm, setRadiusKm] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams({
      lat: String(DEFAULT_LOCATION.lat),
      lng: String(DEFAULT_LOCATION.lng),
      radius: String(radiusKm),
      sort: "nearby",
    });
    fetch(`/api/needs?${params}`)
      .then((r) => r.json())
      .then(setNeeds);
  }, [radiusKm]);

  return (
    <div className="relative h-[calc(100dvh-5rem-env(safe-area-inset-bottom))] md:h-dvh w-full">
      <MapView
        needs={needs}
        center={[DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng]}
        zoom={12}
        height="100%"
        showHeatmap={true}
        radiusKm={radiusKm}
        onMarkerClick={(need) => router.push(`/needs/${need.id}`)}
        className="!rounded-none md:!rounded-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 md:left-6 md:right-auto md:max-w-xs lg:max-w-sm glass-strong rounded-2xl p-4 sm:p-5 shadow-float space-y-3 sm:space-y-4 safe-area-x border border-border/50"
      >
        <div>
          <h2 className="font-bold text-base sm:text-lg tracking-tight">Demand Map</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Tap markers to view needs</p>
        </div>
        <MapLegend />
        <div>
          <label className="text-xs sm:text-sm font-medium mb-2.5 block text-muted-foreground">
            Radius: <span className="text-foreground font-semibold">{radiusKm} km</span>
          </label>
          <Slider
            value={[radiusKm]}
            onValueChange={([v]) => setRadiusKm(v)}
            min={1}
            max={25}
            step={1}
          />
        </div>
      </motion.div>
    </div>
  );
}
