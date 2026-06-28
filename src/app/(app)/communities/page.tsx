"use client";

import { useState } from "react";
import { Users, MapPin, Globe, Sparkle, PlusCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Community {
  id: string;
  name: string;
  desc: string;
  members: number;
  activeNeeds: number;
  coverage: string;
  color: string;
  isJoined?: boolean;
}

const INITIAL_COMMUNITIES: Community[] = [
  {
    id: "com-1",
    name: "Lohegaon Local Hub",
    desc: "Active neighborhood group discussing street lighting, local samosa gaps, and recreational sports courts.",
    members: 1248,
    activeNeeds: 45,
    coverage: "Lohegaon area",
    color: "#1E3A8A",
    isJoined: true,
  },
  {
    id: "com-2",
    name: "Viman Nagar Professionals",
    desc: "Working professionals sharing laundry requests, high-speed coworking requests, and healthy meal options.",
    members: 890,
    activeNeeds: 22,
    coverage: "Viman Nagar area",
    color: "#059669",
  },
  {
    id: "com-3",
    name: "Koregaon Park Foodies",
    desc: "Community demand for niche micro-cuisines, organic farm-to-table products, and cozy reading cafes.",
    members: 1560,
    activeNeeds: 32,
    coverage: "Koregaon Park area",
    color: "#D4AF37",
  },
  {
    id: "com-4",
    name: "Kharadi Tech Zone",
    desc: "Commute improvements, Late-night convenience stores, and tech-meetup space demand in the IT corridor.",
    members: 642,
    activeNeeds: 14,
    coverage: "Kharadi IT park",
    color: "#8B5CF6",
  },
];

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);

  const toggleJoin = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isJoined;
          toast.success(
            nextState ? `Joined ${c.name}!` : `Left ${c.name}`
          );
          return {
            ...c,
            isJoined: nextState,
            members: nextState ? c.members + 1 : c.members - 1,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 pb-nav md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2.5">
          <Users className="h-7 w-7 text-primary" />
          Local Communities
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore and join active community zones around your neighborhood to see relevant demand.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {communities.map((com, i) => (
          <motion.div
            key={com.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
          >
            <Card className="p-5 flex flex-col justify-between h-full border border-border/60 hover:border-primary/20 hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden bg-card">
              {/* Colored side indicator */}
              <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: com.color }} />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-foreground leading-snug tracking-tight">
                      {com.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary" />
                      {com.coverage}
                    </p>
                  </div>
                  {com.isJoined && (
                    <Badge variant="success" className="text-[9px] gap-0.5 font-bold uppercase shrink-0 py-0.5">
                      <Check className="h-2.5 w-2.5" /> Joined
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {com.desc}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs bg-muted/40 p-3 rounded-xl border border-border/40 font-semibold">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Members</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{com.members}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Active Needs</p>
                    <p className="text-sm font-bold text-primary mt-0.5">{com.activeNeeds}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-2 mt-auto">
                <Button
                  variant={com.isJoined ? "outline" : "default"}
                  size="sm"
                  className="flex-1 rounded-xl text-xs font-bold transition-all duration-200"
                  onClick={() => toggleJoin(com.id)}
                >
                  {com.isJoined ? "Leave Zone" : "Join Community"}
                </Button>
                <Button variant="secondary" size="sm" className="px-3 rounded-xl">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Suggest a Community Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="p-6 border-dashed border-primary/20 bg-primary/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkle className="h-4.5 w-4.5 text-primary fill-primary/10" />
              Don&apos;t see your neighborhood?
            </h3>
            <p className="text-xs text-muted-foreground">Suggest a new community zone to start gathering local demand.</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold shrink-0 gap-1" onClick={() => toast.success("Community suggestion received!")}>
            <PlusCircle className="h-4 w-4" />
            Suggest Area
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
