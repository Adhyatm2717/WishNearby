"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Share2,
  Flag,
  Users,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SupportButton } from "@/components/needs/support-button";
import { CommentSection } from "@/components/needs/comment-section";
import { BusinessProgress } from "@/components/needs/business-progress";
import { NeedCard } from "@/components/needs/need-card";
import { NeedCardSkeleton } from "@/components/needs/need-card";
import { getCategory } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import type { Need, Comment } from "@/types";
import { toast } from "sonner";

const MapView = dynamic(() => import("@/components/map/map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-64 rounded-2xl bg-muted animate-pulse" />,
});

export default function NeedDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [need, setNeed] = useState<Need | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [similar, setSimilar] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/needs/${id}`).then((r) => r.ok ? r.json() : null),
      fetch(`/api/needs/${id}/comments`).then((r) => r.ok ? r.json() : []),
    ])
      .then(([needData, commentsData]) => {
        if (needData && !needData.error) {
          setNeed(needData);
          setComments(commentsData || []);
          if (needData.id) {
            fetch(`/api/needs/${id}/similar`)
              .then((r) => r.ok ? r.json() : [])
              .then(setSimilar)
              .catch(() => setSimilar([]));
          }
        } else {
          setNeed(null);
        }
      })
      .catch(() => {
        setNeed(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: need?.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <NeedCardSkeleton />
      </div>
    );
  }

  if (!need) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Need not found</h2>
        <Button asChild className="mt-4">
          <Link href="/home">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const category = getCategory(need.category);
  const CategoryIcon = category.icon;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto pb-nav md:pb-8">
      <Link
        href="/home"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-4">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <CategoryIcon className="h-5 w-5" style={{ color: category.color }} />
          </div>
          <Badge variant="outline">{category.label}</Badge>
          {need.status === "fulfilled" && <Badge variant="success">Fulfilled</Badge>}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{need.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {need.location_name}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDistanceToNow(new Date(need.created_at), { addSuffix: true })}
          </span>
          {need.author && (
            <Link href={`/profile/${need.author.id}`} className="hover:text-primary transition-colors">
              by {need.author.full_name}
            </Link>
          )}
        </div>

        <p className="text-lg leading-relaxed text-foreground/90 mb-8">{need.description}</p>

        {(need.price_min || need.price_max) && (
          <p className="text-sm text-muted-foreground mb-6">
            Expected price: ₹{need.price_min ?? "?"} – ₹{need.price_max ?? "?"}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 p-5 sm:p-6 rounded-2xl bg-muted/40 border border-border/60 shadow-soft">
          <div className="text-center flex-1">
            <div className="text-2xl sm:text-3xl font-bold text-cta flex items-center justify-center gap-2">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              {formatNumber(need.support_count)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Supporters</p>
          </div>
          <Separator orientation="horizontal" className="sm:hidden" />
          <Separator orientation="vertical" className="hidden sm:block h-12" />
          <div className="text-center flex-1">
            <div className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              {need.comment_count}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Comments</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
          <SupportButton
            needId={need.id}
            initialCount={need.support_count}
            size="lg"
            className="w-full sm:w-auto"
          />
          <Button variant="secondary" size="lg" onClick={handleShare} className="w-full sm:w-auto">
            <Share2 className="h-5 w-5" /> Share
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => toast.success("Report submitted")}
            className="w-full sm:w-auto"
          >
            <Flag className="h-5 w-5" /> Report
          </Button>
        </div>

        {need.business_stage && (
          <div className="mb-8">
            <BusinessProgress stage={need.business_stage} />
          </div>
        )}

        <div className="mb-8 rounded-2xl overflow-hidden border border-border/60 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
          <MapView
            needs={[need]}
            center={[need.lat, need.lng]}
            zoom={14}
            height="250px"
          />
        </div>

        <CommentSection needId={need.id} comments={comments} />

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Similar nearby requests</h2>
            <div className="grid gap-4">
              {similar.map((n, i) => (
                <NeedCard key={n.id} need={n} index={i} compact />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}
