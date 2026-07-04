"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeedCard, NeedCardSkeleton } from "@/components/needs/need-card";
import { CategoryFilter } from "@/components/needs/category-filter";
import { SearchBar, LocationSelector } from "@/components/search/search-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Compass,
  MapPin,
  PlusCircle,
  TrendingUp,
  Activity,
  Sparkles,
  Map,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";
import type { Need, SortOption } from "@/types";
import type { CategorySlug } from "@/lib/constants";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useExperience } from "@/contexts/experience-context";

const MapView = dynamic(() => import("@/components/map/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-48 rounded-2xl bg-muted/50 animate-pulse" />,
});

export default function HomePageContent() {
  const searchParams = useSearchParams();
  const { setIsAddNeedOpen } = useExperience();

  // State management
  const [needs, setNeeds] = useState<Need[]>([]);
  const [trending, setTrending] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>("nearby");
  const [category, setCategory] = useState<CategorySlug | undefined>();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [greeting, setGreeting] = useState("Good Morning");
  const [userName, setUserName] = useState("Neighbor");

  const feedRef = useRef<HTMLDivElement>(null);

  // Dynamic greeting based on time
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const storedName = localStorage.getItem("wishnearby-username");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const [prevFilters, setPrevFilters] = useState({ sort, category, query });
  if (sort !== prevFilters.sort || category !== prevFilters.category || query !== prevFilters.query) {
    setPrevFilters({ sort, category, query });
    setLoading(true);
  }

  // Fetch needs on filters changed
  useEffect(() => {
    const params = new URLSearchParams({
      sort,
      lat: String(DEFAULT_LOCATION.lat),
      lng: String(DEFAULT_LOCATION.lng),
    });
    if (category) params.set("category", category);
    if (query) params.set("q", query);

    Promise.all([
      fetch(`/api/needs?${params}`).then((r) => r.json()),
      fetch("/api/ai/trending").then((r) => r.json()),
    ])
      .then(([needsData, trendingData]) => {
        setNeeds(needsData);
        setTrending(trendingData);
      })
      .catch(() => {
        // Fallback if APIs have issues
      })
      .finally(() => setLoading(false));
  }, [sort, category, query]);

  // Quick Action click handlers
  const handleAddNeedClick = () => {
    setIsAddNeedOpen(true);
  };

  const handleCountMeInClick = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 md:space-y-10 relative">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-navy p-6 sm:p-8 md:p-10 text-primary-foreground shadow-float relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="relative space-y-4 max-w-xl">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-gold border border-white/10">
            <Sparkles className="h-3 w-3 animate-pulse" />
            {greeting}, {userName} 👋
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
            What does your <br className="hidden sm:inline" />
            community need?
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed font-medium">
            Share needs, support others, and improve your neighborhood together.
          </p>

          <div className="pt-2 max-w-lg">
            <SearchBar value={query} onChange={setQuery} className="w-full text-foreground" size="floating" />
          </div>
        </div>

        {/* Beautiful Modern Abstract community grid illustration */}
        <div className="hidden md:flex justify-center items-center shrink-0 w-64 h-48 relative select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-tr from-cta/15 to-primary/30 blur-2xl opacity-60 animate-pulse duration-[8000ms]" />
          <svg viewBox="0 0 160 160" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Connected grid nodes */}
            <circle cx="80" cy="80" r="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="80" cy="80" r="30" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            
            {/* Center glowing orb */}
            <circle cx="80" cy="80" r="16" fill="url(#orbGrad)" />
            <circle cx="80" cy="80" r="28" stroke="url(#glowGrad)" strokeWidth="2" opacity="0.5" />

            {/* Connecting lines */}
            <line x1="80" y1="80" x2="35" y2="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <line x1="80" y1="80" x2="125" y2="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <line x1="80" y1="80" x2="80" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            
            {/* Node markers */}
            <circle cx="35" cy="45" r="7" fill="#F59E0B" />
            <circle cx="35" cy="45" r="4" fill="#FFFFFF" />
            
            <circle cx="125" cy="45" r="7" fill="#10B981" />
            <circle cx="125" cy="45" r="4" fill="#FFFFFF" />
            
            <circle cx="80" cy="130" r="7" fill="#3B82F6" />
            <circle cx="80" cy="130" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      </motion.div>

      {/* Quick Actions Section */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* eslint-disable-next-line react-hooks/refs */}
          {[
            {
              title: "Add Need",
              desc: "Share something your area needs.",
              icon: <PlusCircle className="h-5.5 w-5.5 text-primary group-hover:scale-110 transition-transform duration-300" />,
              action: handleAddNeedClick,
              bg: "bg-primary/5 hover:bg-primary/10 border-primary/15 hover:border-primary/30",
            },
            {
              title: "Count Me In",
              desc: "Support existing needs.",
              icon: <Heart className="h-5.5 w-5.5 text-cta group-hover:scale-110 transition-transform duration-300 fill-cta/10 group-hover:fill-cta/25" />,
              action: handleCountMeInClick,
              bg: "bg-cta/5 hover:bg-cta/10 border-cta/15 hover:border-cta/30",
            },
            {
              title: "Explore Map",
              desc: "See nearby community demand.",
              icon: <Map className="h-5.5 w-5.5 text-gold group-hover:scale-110 transition-transform duration-300" />,
              link: "/map",
              bg: "bg-gold/5 hover:bg-gold/10 border-gold/15 hover:border-gold/30",
            },
          ].map((act, i) => {
            const Content = (
              <div className="h-full flex flex-col justify-between items-start">
                <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center shadow-sm shrink-0">
                  {act.icon}
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {act.title}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            );

            const cardClasses = `group relative p-5 bg-card border rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-left h-36 cursor-pointer flex flex-col justify-between hover-glow ${act.bg}`;

            if (act.link) {
              return (
                <motion.div key={i} whileHover={{ y: -3 }} className="h-full">
                  <Link href={act.link} className={cardClasses + " block h-full"}>
                    {Content}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.button
                key={i}
                onClick={act.action}
                whileHover={{ y: -3 }}
                className={cardClasses}
              >
                {Content}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Below Hero Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="p-6 border-dashed border-primary/25 bg-primary/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-bold text-base tracking-tight">Have a need in your area?</h3>
            <p className="text-xs text-muted-foreground">Help your community discover what is missing.</p>
          </div>
          <Button variant="primary" size="lg" className="rounded-xl shadow-soft gap-1.5 shrink-0" onClick={handleAddNeedClick}>
            <PlusCircle className="h-4.5 w-4.5" />
            Add Need
          </Button>
        </Card>
      </motion.div>

      {/* Trending Carousel */}
      {trending.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending in your community
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {trending.slice(0, 4).map((need, i) => (
              <div key={need.id} className="w-[min(100%,18rem)] sm:w-72 shrink-0 snap-start">
                <NeedCard need={need} index={i} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Map Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="xl:hidden rounded-2xl overflow-hidden border border-border/60 shadow-soft"
      >
        <MapView
          needs={needs}
          center={[DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng]}
          zoom={12}
          height="200px"
        />
      </motion.div>

      {/* Live Stats Header */}
      <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-card border border-border/60 shadow-soft">
        <Activity className="h-5 w-5 text-cta shrink-0 animate-pulse" />
        <p className="text-xs sm:text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{needs.length} active needs</span> nearby — join the conversation and show your support.
        </p>
      </div>

      {/* Feed Filters & Sorting */}
      <div ref={feedRef} className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs value={sort} onValueChange={(v) => setSort(v as SortOption)} className="w-full sm:w-auto">
            <TabsList className="bg-muted/65 p-1 rounded-xl">
              <TabsTrigger value="nearby" className="rounded-lg text-xs font-semibold">Nearby</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-lg text-xs font-semibold">Trending</TabsTrigger>
              <TabsTrigger value="newest" className="rounded-lg text-xs font-semibold">Newest</TabsTrigger>
              <TabsTrigger value="popular" className="rounded-lg text-xs font-semibold">Popular</TabsTrigger>
            </TabsList>
          </Tabs>

          <LocationSelector />
        </div>

        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {/* Community Feed Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <NeedCardSkeleton key={i} />
          ))}
        </div>
      ) : needs.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No needs found"
          description="Try adjusting your filters or be the first to post a need in this area."
          actionLabel="Add Need"
          actionHref="/post"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {needs.map((need, i) => (
            <NeedCard key={need.id} need={need} index={i} />
          ))}
        </div>
      )}

      {/* Mobile Floating Action Button */}
      <button
        onClick={handleAddNeedClick}
        className="md:hidden fixed bottom-24 right-4 z-40 h-14 w-14 rounded-2xl gradient-cta text-cta-foreground shadow-float flex items-center justify-center ripple-effect border-0"
        aria-label="Add Need"
      >
        <PlusCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
