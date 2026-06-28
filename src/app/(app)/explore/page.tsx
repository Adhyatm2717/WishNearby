"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NeedCard, NeedCardSkeleton } from "@/components/needs/need-card";
import { CategoryFilter } from "@/components/needs/category-filter";
import { SearchBar } from "@/components/search/search-bar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, Compass } from "lucide-react";
import type { Need, SortOption } from "@/types";
import type { CategorySlug } from "@/lib/constants";
import { DEFAULT_LOCATION } from "@/lib/constants";

export default function ExplorePage() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [trending, setTrending] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>("trending");
  const [category, setCategory] = useState<CategorySlug | undefined>();
  const [query, setQuery] = useState("");

  const [prevFilters, setPrevFilters] = useState({ sort, category, query });
  if (sort !== prevFilters.sort || category !== prevFilters.category || query !== prevFilters.query) {
    setPrevFilters({ sort, category, query });
    setLoading(true);
  }

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
      .finally(() => setLoading(false));
  }, [sort, category, query]);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl gradient-primary p-5 sm:p-7 md:p-8 text-primary-foreground shadow-soft-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="relative flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Compass className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Explore</h1>
          <Badge variant="warning" className="gap-1 bg-amber-400/20 text-amber-100 border-amber-300/20">
            <Flame className="h-3 w-3" /> Hot
          </Badge>
        </div>
        <p className="text-primary-foreground/75 font-medium text-sm sm:text-base relative sm:ml-14">
          Trending and popular needs across communities
        </p>
      </motion.div>

      <SearchBar value={query} onChange={setQuery} className="max-w-xl" size="floating" />

      {trending.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4 tracking-tight">
            <TrendingUp className="h-5 w-5 text-primary" />
            Predicted to trend
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {trending.slice(0, 3).map((need, i) => (
              <div key={need.id} className="w-[min(100%,18rem)] sm:w-80 shrink-0 snap-start">
                <NeedCard need={need} index={i} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      <Tabs value={sort} onValueChange={(v) => setSort(v as SortOption)}>
        <TabsList>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="nearby">Nearby</TabsTrigger>
        </TabsList>
      </Tabs>

      <CategoryFilter selected={category} onSelect={setCategory} />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <NeedCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {needs.map((need, i) => (
            <NeedCard key={need.id} need={need} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
