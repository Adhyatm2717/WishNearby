"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  MessageCircle,
  Share2,
  Flag,
  Users,
  Calendar,
  TrendingUp,
  Bookmark,
  Eye,
  Sparkle,
  User,
} from "lucide-react";
import { formatDistance, formatNumber, cn } from "@/lib/utils";
import { getCategory } from "@/lib/constants";
import type { Need } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SupportButton } from "@/components/needs/support-button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface NeedCardProps {
  need: Need;
  index?: number;
  compact?: boolean;
}

export function NeedCard({ need, index = 0, compact = false }: NeedCardProps) {
  const category = getCategory(need.category);
  const CategoryIcon = category.icon;

  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Check bookmark status on load
  useEffect(() => {
    const saved = localStorage.getItem("wishnearby-bookmarks");
    if (saved) {
      const list = JSON.parse(saved) as string[];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBookmarked(list.includes(need.id));
    }
  }, [need.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem("wishnearby-bookmarks");
    let list: string[] = [];
    if (saved) {
      list = JSON.parse(saved);
    }
    
    if (list.includes(need.id)) {
      list = list.filter((id) => id !== need.id);
      setIsBookmarked(false);
      toast.success("Removed from bookmarks");
    } else {
      list.push(need.id);
      setIsBookmarked(true);
      toast.success("Added to bookmarks");
    }
    localStorage.setItem("wishnearby-bookmarks", JSON.stringify(list));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/needs/${need.id}`;
    if (navigator.share) {
      await navigator.share({ title: need.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Report submitted. Our team will review it.");
  };

  // Generate dynamic views based on need metrics
  const mockViews = Math.round(need.support_count * 14 + need.comment_count * 6 + 68 + (index * 7));

  // Determine author name & avatar (taking anonymous status into account)
  const isAnon = need.is_anonymous || need.author?.is_anonymous;
  const authorName = isAnon 
    ? `Anonymous · ${need.anonymous_name || need.author?.anonymous_name || "North Wolf"}`
    : (need.author?.full_name || "Community Member");
  const authorAvatarSvg = isAnon
    ? (need.anonymous_avatar_svg || need.author?.anonymous_avatar_svg || "")
    : (need.author?.avatar_svg || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/needs/${need.id}`} className="block cursor-pointer group">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-soft-lg hover:border-primary/25 border border-border/70 rounded-2xl bg-card transition-all duration-300",
            compact ? "p-4" : "p-5 md:p-6"
          )}
        >
          {/* Top Instagram + LinkedIn Header */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Profile Avatar */}
              <div className="h-10 w-10 rounded-xl overflow-hidden border border-border/60 bg-muted shrink-0 flex items-center justify-center p-0.5 shadow-soft">
                {authorAvatarSvg ? (
                  <div className="w-full h-full rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: authorAvatarSvg }} />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              
              {/* Profile Meta info */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isAnon ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/10">
                      <Sparkle className="h-2.5 w-2.5 fill-current animate-pulse" />
                      {authorName}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-foreground truncate">{authorName}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="truncate">{need.location_name}</span>
                  {need.distance_km !== undefined && (
                    <span>· {formatDistance(need.distance_km)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Time Posted badge */}
            <span className="text-[10px] font-medium text-muted-foreground bg-muted/60 px-2 py-1 rounded-lg shrink-0">
              {formatDistanceToNow(new Date(need.created_at), { addSuffix: false }).replace("about", "")} ago
            </span>
          </div>

          {/* Need Optional Image */}
          {need.image_url && !compact && (
            <div className="aspect-[2/1] overflow-hidden rounded-xl mb-4 border border-border/50">
              <img
                src={need.image_url}
                alt={need.title}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500 ease-out"
              />
            </div>
          )}

          {/* Content Area */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 shadow-soft"
                style={{ backgroundColor: `${category.color}12` }}
              >
                <CategoryIcon className="h-3.5 w-3.5" style={{ color: category.color }} />
              </div>
              <Badge variant="outline" className="text-[10px] font-semibold">
                {category.label}
              </Badge>
              {need.growth_rate > 20 && (
                <Badge variant="warning" className="text-[10px] gap-0.5 py-0.5">
                  <TrendingUp className="h-2.5 w-2.5" /> Trending
                </Badge>
              )}
              {need.business_stage && (
                <Badge variant="success" className="text-[10px] py-0.5">
                  Opportunity Stage {need.business_stage}/4
                </Badge>
              )}
            </div>

            <h3 className={cn("font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 leading-snug", compact ? "text-base" : "text-lg md:text-xl")}>
              {need.title}
            </h3>

            <p className={cn("text-muted-foreground leading-relaxed text-sm", compact ? "line-clamp-2" : "line-clamp-3")}>
              {need.description}
            </p>
          </div>

          {/* Footer Card Interactions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 pt-4 border-t border-border/50">
            {/* Stats list */}
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5 text-primary">
                <Users className="h-4 w-4" />
                {formatNumber(need.support_count)} counted in
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
                {need.comment_count}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {formatNumber(mockViews)}
              </span>
            </div>

            {/* Actions list */}
            {!compact && (
              <div
                className="flex items-center gap-2 flex-wrap sm:flex-nowrap"
                onClick={(e) => e.preventDefault()}
              >
                <SupportButton needId={need.id} size="sm" className="flex-1 sm:flex-none font-bold text-xs" />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-xl cursor-pointer shrink-0 transition-colors duration-200",
                    isBookmarked ? "text-gold bg-gold/5" : "text-muted-foreground"
                  )}
                  onClick={toggleBookmark}
                >
                  <Bookmark className="h-4 w-4" style={{ fill: isBookmarked ? "#D4AF37" : "none" }} />
                </Button>
                
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground cursor-pointer shrink-0" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground cursor-pointer shrink-0" onClick={handleReport}>
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export function NeedCardSkeleton() {
  return (
    <Card className="p-5 space-y-4 overflow-hidden rounded-2xl border border-border/60">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
          <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
        </div>
      </div>
      <div className="h-6 w-3/4 rounded-lg bg-muted animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
      </div>
      <div className="flex justify-between pt-4 border-t border-border/40">
        <div className="h-5 w-24 rounded bg-muted animate-pulse" />
        <div className="h-8 w-28 rounded-xl bg-muted animate-pulse" />
      </div>
    </Card>
  );
}
