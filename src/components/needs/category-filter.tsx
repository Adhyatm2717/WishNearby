"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, type CategorySlug } from "@/lib/constants";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  selected?: CategorySlug;
  onSelect: (category: CategorySlug | undefined) => void;
  className?: string;
}

export function CategoryFilter({ selected, onSelect, className }: CategoryFilterProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2 scrollbar-hide", className)}>
      <button
        type="button"
        onClick={() => onSelect(undefined)}
        className={cn(
          "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
          !selected
            ? "gradient-primary text-primary-foreground shadow-soft"
            : "bg-card border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-primary/5"
        )}
      >
        All
      </button>
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selected === cat.slug;
        return (
          <motion.button
            key={cat.slug}
            type="button"
            onClick={() => onSelect(isSelected ? undefined : cat.slug)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
              isSelected
                ? "text-white shadow-soft"
                : "bg-card border border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
            style={isSelected ? { backgroundColor: cat.color } : undefined}
          >
            <Icon className="h-4 w-4" />
            {cat.label}
          </motion.button>
        );
      })}
    </div>
  );
}
