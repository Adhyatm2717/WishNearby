"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Sparkle,
  User as UserIcon,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, DEFAULT_LOCATION } from "@/lib/constants";
import type { AICheckResult } from "@/types";
import { toast } from "sonner";
import { useExperience } from "@/contexts/experience-context";
import { useAuth } from "@/contexts/auth-context";

const UNIVERSE_THEMES: Record<string, { color: string; bg: string }> = {
  fantasy: { color: "#D4AF37", bg: "rgba(212, 175, 55, 0.15)" }, // Purple & Gold
  magic: { color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.15)" }, // Deep Blue & Violet
  "sci-fi": { color: "#06B6D4", bg: "rgba(6, 182, 212, 0.15)" }, // Navy & Cyan
  mythology: { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)" }, // Red & Amber
  adventure: { color: "#10B981", bg: "rgba(16, 185, 129, 0.15)" }, // Emerald & Green
};

export function AddNeedModal() {
  const router = useRouter();
  const { isAddNeedOpen, setIsAddNeedOpen } = useExperience();
  const { user } = useAuth();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [location, setLocation] = useState(DEFAULT_LOCATION.name);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Flow states
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState<AICheckResult | null>(null);
  const [step, setStep] = useState<"form" | "review">("form");

  // Reset form when modal opens
  const [prevIsOpen, setPrevIsOpen] = useState(isAddNeedOpen);
  if (isAddNeedOpen !== prevIsOpen) {
    setPrevIsOpen(isAddNeedOpen);
    if (isAddNeedOpen) {
      setTitle("");
      setDescription("");
      setCategory("");
      setPriceMin("");
      setPriceMax("");
      setStep("form");
      setAiResult(null);
    }
  }

  const runAICheck = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please enter a title and description");
      return;
    }
    setChecking(true);
    try {
      const res = await fetch("/api/ai/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const result: AICheckResult = await res.json();
      setAiResult(result);

      if (result.suggestedCategory && !category) {
        setCategory(result.suggestedCategory);
      }

      if (result.isSpam) {
        toast.error(result.message ?? "Spam content detected!");
        return;
      }

      setStep("review");
    } catch {
      toast.error("AI review failed, proceeding to submit");
      setStep("review");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/needs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category: category || aiResult?.suggestedCategory || "others",
          location_name: location,
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng,
          price_min: priceMin ? Number(priceMin) : undefined,
          price_max: priceMax ? Number(priceMax) : undefined,
          is_anonymous: isAnonymous,
          anonymous_name: isAnonymous ? user.anonymous_name : undefined,
          anonymous_avatar_svg: isAnonymous ? user.anonymous_avatar_svg : undefined,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit need");
      }
      const need = await res.json();
      toast.success("Need added successfully!");
      setIsAddNeedOpen(false);
      router.push(`/needs/${need.id}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit need");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAddNeedOpen || !user) return null;

  // Resolve active universe theme
  const userUniverse = user.universe || "fantasy";
  const badgeTheme = UNIVERSE_THEMES[userUniverse] || UNIVERSE_THEMES.fantasy;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsAddNeedOpen(false)}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-card border border-border/70 rounded-2xl shadow-float z-10 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Share a Need</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Let your community discover what is missing</p>
            </div>
            <button
              onClick={() => setIsAddNeedOpen(false)}
              className="h-8 w-8 rounded-full bg-muted/65 hover:bg-muted/90 flex items-center justify-center transition-colors border-0 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {step === "form" ? (
              <div className="space-y-4">
                {/* Need Input */}
                <div className="space-y-2">
                  <Label htmlFor="need-title">What does your community need?</Label>
                  <Input
                    id="need-title"
                    placeholder="e.g. Authentic MP-style samosa with green chutney"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <Label htmlFor="need-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="need-category" className="rounded-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug} className="rounded-lg">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="need-desc">Why do people need this?</Label>
                  <Textarea
                    id="need-desc"
                    placeholder="Describe the gap in detail. E.g. Working professionals need this because current options are too far..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Price range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="need-price-min">Min Price (optional)</Label>
                    <Input
                      id="need-price-min"
                      type="number"
                      placeholder="₹15"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="need-price-max">Max Price (optional)</Label>
                    <Input
                      id="need-price-max"
                      type="number"
                      placeholder="₹30"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="need-location">Location Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input
                      id="need-location"
                      className="pl-11"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Anonymous switch card */}
                <Card className="p-4 rounded-xl border-border/50 bg-muted/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold tracking-tight">Post Anonymously</p>
                      <p className="text-xs text-muted-foreground">Keep your real identity completely hidden</p>
                    </div>
                    <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                  </div>

                  {/* Previews */}
                  <div className="border-t border-border/50 pt-2 flex items-center gap-3">
                    {isAnonymous ? (
                      <>
                        <div className="h-9 w-9 rounded-xl overflow-hidden border border-border/60 bg-card p-0.5 shadow-soft shrink-0">
                          {user.anonymous_avatar_svg ? (
                            <div
                              className="w-full h-full rounded-lg overflow-hidden"
                              dangerouslySetInnerHTML={{ __html: user.anonymous_avatar_svg }}
                            />
                          ) : (
                            <div className="h-full w-full bg-primary/10 rounded-lg" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ color: badgeTheme.color, backgroundColor: badgeTheme.bg }}
                          >
                            <Sparkle className="h-2.5 w-2.5 fill-current" />
                            Anonymous · {user.anonymous_name || "North Wolf"}
                          </span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">@{user.anonymous_username || "anonymous"}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-9 w-9 rounded-xl overflow-hidden border border-border/60 bg-muted flex items-center justify-center shrink-0 shadow-soft">
                          {user.avatar_svg ? (
                            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: user.avatar_svg }} />
                          ) : (
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{user.full_name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Posting publicly</p>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {aiResult && (
                  <Card className="p-4 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Sparkles className="h-4.5 w-4.5 text-primary" />
                      AI Insights Check
                    </div>

                    {aiResult.isSpam ? (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 text-destructive text-xs border border-destructive/20">
                        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Content Flagged as Spam</p>
                          <p className="opacity-90 mt-0.5">{aiResult.message}</p>
                        </div>
                      </div>
                    ) : aiResult.isDuplicate ? (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs border border-amber-500/20">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Similar Request Detected</p>
                          <p className="opacity-95 mt-0.5">{aiResult.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs border border-emerald-500/20">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Content Verified!</p>
                          <p className="opacity-95 mt-0.5">Perfect. No duplicates or spam found.</p>
                        </div>
                      </div>
                    )}

                    {aiResult.similarNeeds.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                          Existing Similar Requests:
                        </p>
                        <div className="space-y-2">
                          {aiResult.similarNeeds.map((need) => (
                            <div
                              key={need.id}
                              className="p-2.5 rounded-lg bg-muted/50 border border-border/50 text-xs"
                            >
                              <p className="font-bold">{need.title}</p>
                              <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1.5">
                                <span>{need.location_name}</span>
                                <span className="font-semibold text-primary">{need.support_count} supporters</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                )}

                <Card className="p-4 bg-muted/10 border-border/50">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Need Draft Preview</span>
                  <h3 className="font-bold text-base mt-1.5">{title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{description}</p>
                  {(priceMin || priceMax) && (
                    <p className="text-[11px] font-semibold text-cta mt-3">
                      Target Pricing: ₹{priceMin || "0"} - ₹{priceMax || "Any"}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {location}
                  </p>
                </Card>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-border/50 flex gap-3 bg-muted/10">
            {step === "form" ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setIsAddNeedOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 gap-1.5 rounded-xl shadow-soft"
                  onClick={runAICheck}
                  disabled={checking || !title.trim() || !description.trim()}
                >
                  <Sparkles className="h-4 w-4" />
                  {checking ? "Checking..." : "Review with AI"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="flex-1 rounded-xl"
                  onClick={() => setStep("form")}
                  disabled={submitting}
                >
                  Edit Need
                </Button>
                <Button
                  className="flex-1 rounded-xl shadow-soft"
                  onClick={handleSubmit}
                  disabled={submitting || aiResult?.isSpam}
                >
                  {submitting ? "Sharing..." : "Share Need"}
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
