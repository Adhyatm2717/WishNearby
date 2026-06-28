"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Need } from "@/types";
import { getCategory } from "@/lib/constants";

interface MapViewProps {
  needs: Need[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onMarkerClick?: (need: Need) => void;
  showHeatmap?: boolean;
  radiusKm?: number;
  interactive?: boolean;
  className?: string;
}

function getMarkerColor(supportCount: number): string {
  if (supportCount >= 100) return "#16A34A";
  if (supportCount >= 50) return "#F59E0B";
  return "#EF4444";
}

export function MapView({
  needs,
  center = [18.5975, 73.9089],
  zoom = 13,
  height = "100%",
  onMarkerClick,
  showHeatmap = false,
  radiusKm,
  interactive = true,
  className,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center,
        zoom,
        zoomControl: interactive,
        dragging: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        touchZoom: interactive,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      if (radiusKm && center) {
        L.circle(center, {
          radius: radiusKm * 1000,
          color: "#1E3A8A",
          fillColor: "#1E3A8A",
          fillOpacity: 0.06,
          weight: 2,
          dashArray: "6 8",
        }).addTo(map);
      }

      needs.forEach((need) => {
        const color = getMarkerColor(need.support_count);
        const category = getCategory(need.category);

        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: 40px; height: 40px;
            background: linear-gradient(135deg, ${color}, ${color}dd);
            border: 3px solid white;
            border-radius: 50% 50% 50% 8px;
            transform: rotate(-45deg);
            box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05);
            display: flex; align-items: center; justify-content: center;
          "><span style="transform: rotate(45deg); color: white; font-size: 11px; font-weight: 700; font-family: system-ui;">${need.support_count}</span></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

        const marker = L.marker([need.lat, need.lng], { icon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 220px; padding: 6px;">
            <p style="font-size: 10px; color: ${category.color}; font-weight: 600; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.05em;">${category.label}</p>
            <p style="font-weight: 700; font-size: 14px; margin: 0 0 6px; line-height: 1.35; color: #18181B;">${need.title}</p>
            <p style="font-size: 12px; color: #71717A; margin: 0 0 10px;">${need.location_name}</p>
            <p style="font-size: 13px; font-weight: 600; color: #16A34A; margin: 0;">${need.support_count} supporters</p>
          </div>
        `, { className: "demandly-popup" });

        if (onMarkerClick) {
          marker.on("click", () => onMarkerClick(need));
        }
      });

      if (showHeatmap && needs.length > 0) {
        needs.forEach((need) => {
          const intensity = Math.min(need.support_count / 200, 1);
          L.circle([need.lat, need.lng], {
            radius: 500 + need.support_count * 10,
            color: "transparent",
            fillColor: getMarkerColor(need.support_count),
            fillOpacity: 0.12 * intensity,
          }).addTo(map);
        });
      }

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [needs, center, zoom, onMarkerClick, showHeatmap, radiusKm, interactive]);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ height, width: "100%", borderRadius: "1rem" }}
    />
  );
}
