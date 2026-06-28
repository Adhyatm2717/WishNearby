"use client";

import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSubmit?: () => void;
  size?: "default" | "hero" | "floating";
}

export function SearchBar({
  value = "",
  onChange,
  placeholder = "Search needs, locations, categories...",
  className,
  onSubmit,
  size = "default",
}: SearchBarProps) {
  const isHero = size === "hero";
  const isFloating = size === "floating";

  if (isFloating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative", className)}
      >
        <div className="glass-strong rounded-2xl border border-border/50 shadow-float p-1.5 flex items-center gap-1">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="pl-12 h-12 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-transparent text-base"
              onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
            />
          </div>
          <Button
            type="button"
            onClick={onSubmit}
            variant="primary"
            className="h-11 px-6 rounded-xl shrink-0 hidden sm:inline-flex"
          >
            Search
          </Button>
        </div>
      </motion.div>
    );
  }

  if (isHero) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn("space-y-2", className)}
      >
        <div className="glass-strong rounded-2xl border border-border/50 shadow-float p-1.5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground pointer-events-none" />
            <Input
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="pl-12 sm:pl-14 h-12 sm:h-14 text-base border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-transparent rounded-xl w-full"
              onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
            />
            <Button
              type="button"
              onClick={onSubmit}
              variant="primary"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10 px-5 rounded-xl hidden sm:inline-flex"
            >
              Search
            </Button>
          </div>
        </div>
        <Button
          type="button"
          onClick={onSubmit}
          variant="primary"
          className="w-full sm:hidden h-12 rounded-xl"
        >
          Search
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-12 h-12 rounded-xl shadow-soft bg-card/80 backdrop-blur-sm w-full"
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
      />
    </div>
  );
}

interface LocationSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const LOCATIONS = [
  "Lohegaon, Pune",
  "Viman Nagar, Pune",
  "Koregaon Park, Pune",
  "Kharadi, Pune",
  "Wagholi, Pune",
  "Kalyani Nagar, Pune",
];

export function LocationSelector({ value = "Lohegaon, Pune", onChange, className }: LocationSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      <div className="glass rounded-xl border border-border/50 shadow-soft">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10 pointer-events-none" />
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-transparent text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200 border-0"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}

const POPULAR_SEARCHES = [
  "Late night food",
  "Laundry service",
  "MP-style samosa",
  "Coworking space",
  "Pet grooming",
];

interface PopularSearchesProps {
  onSelect: (query: string) => void;
}

export function PopularSearches({ onSelect }: PopularSearchesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-1"
    >
      <span className="w-full sm:w-auto text-center sm:text-left text-xs font-medium text-muted-foreground mb-0.5 sm:mb-0">
        Popular:
      </span>
      {POPULAR_SEARCHES.map((term, i) => (
        <motion.button
          key={term}
          type="button"
          onClick={() => onSelect(term)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.05 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-card/80 border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
        >
          {term}
        </motion.button>
      ))}
    </motion.div>
  );
}
