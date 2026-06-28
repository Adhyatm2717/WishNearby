"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Heart,
  PenLine,
  Store,
  Star,
  Settings,
  RefreshCw,
  LogOut,
  Sparkles,
  Sparkle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { NeedCard } from "@/components/needs/need-card";
import { BADGES, DEFAULT_LOCATION } from "@/lib/constants";
import { MOCK_NEEDS } from "@/lib/data/mock-data";
import { formatNumber, cn } from "@/lib/utils";
import { ExperienceSwitcher } from "@/components/experience/experience-switcher";
import type { Need } from "@/types";
import { useAuth } from "@/contexts/auth-context";
import { AvatarStyle, GenderType, UniverseType, getStandardAvatar } from "@/lib/anonymous-identities";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AVATAR_STYLES: { style: AvatarStyle; label: string }[] = [
  { style: "male", label: "Male" },
  { style: "female", label: "Female" },
  { style: "neutral", label: "Neutral" },
  { style: "cute", label: "Cute" },
  { style: "minimal", label: "Minimal" },
  { style: "3d", label: "3D" },
  { style: "illustrated", label: "Illustrated" },
];

const UNIVERSES: { type: UniverseType; label: string }[] = [
  { type: "fantasy", label: "Fantasy" },
  { type: "magic", label: "Magic" },
  { type: "sci-fi", label: "Sci-Fi" },
  { type: "mythology", label: "Mythology" },
  { type: "adventure", label: "Adventure" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, updateProfile, regenerateAnonymousIdentity } = useAuth();
  
  const [postedNeeds, setPostedNeeds] = useState<Need[]>([]);
  const [supportedCount] = useState(24);
  const [businessesStarted] = useState(1);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/needs?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}`)
      .then((r) => r.json())
      .then((data: Need[]) => {
        // Filter needs created by the current user (mock check)
        const myNeeds = data.filter((n) => n.author_id === user.id || n.author_id === "user-1");
        setPostedNeeds(myNeeds);
      })
      .catch(() => {});
  }, [user]);

  if (!user) {
    return (
      <div className="p-8 text-center text-muted-foreground">Loading profile...</div>
    );
  }

  const handleAvatarChange = async (style: AvatarStyle) => {
    setUpdating(true);
    const svg = getStandardAvatar(style, user.full_name);
    const success = await updateProfile({
      avatar_style: style,
      avatar_svg: svg,
    });
    if (success) {
      toast.success("Avatar style updated!");
    }
    setUpdating(false);
  };

  const handleGenderChange = async (gender: GenderType) => {
    setUpdating(true);
    await updateProfile({ gender });
    await regenerateAnonymousIdentity();
    toast.success("Gender updated & anonymous identity regenerated!");
    setUpdating(false);
  };

  const handleUniverseChange = async (universe: UniverseType) => {
    setUpdating(true);
    await updateProfile({ universe });
    await regenerateAnonymousIdentity();
    toast.success("Universe updated & anonymous identity regenerated!");
    setUpdating(false);
  };

  const handleRegenerateIdentity = async () => {
    setUpdating(true);
    const success = await regenerateAnonymousIdentity();
    if (success) {
      toast.success("New anonymous identity generated!");
    }
    setUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  const earnedBadges = BADGES.slice(0, 3);
  const stats = [
    { label: "Needs Posted", value: postedNeeds.length, icon: PenLine, accent: "#6D28D9" },
    { label: "Supported", value: supportedCount, icon: Heart, accent: "#EF4444" },
    { label: "Businesses Started", value: businessesStarted, icon: Store, accent: "#16A34A" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto space-y-8 pb-nav md:pb-8">
      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4"
      >
        <div className="relative h-24 w-24 mx-auto">
          <div className="h-24 w-24 rounded-3xl overflow-hidden shadow-float ring-4 ring-primary/10 bg-card p-1 flex items-center justify-center">
            {user.avatar_svg ? (
              <div className="w-full h-full rounded-2xl overflow-hidden" dangerouslySetInnerHTML={{ __html: user.avatar_svg }} />
            ) : (
              <div className="text-3xl font-black text-primary">{user.full_name.charAt(0)}</div>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{user.full_name}</h1>
          <p className="text-xs text-muted-foreground mt-1 font-semibold">{user.email}</p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-semibold">{user.location || "Lohegaon, Pune"}</Badge>
          <Badge variant="default" className="gap-1 text-xs py-0.5">
            <Star className="h-3 w-3" /> {formatNumber(user.reputation || 0)} reputation
          </Badge>
        </div>
      </motion.div>

      {/* Workspace Switcher */}
      <ExperienceSwitcher />

      {/* Stats Counter */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Card className="p-4 text-center hover:shadow-soft-lg transition-shadow duration-300 rounded-2xl border border-border/60">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: `${stat.accent}12` }}
              >
                <stat.icon className="h-4.5 w-4.5" style={{ color: stat.accent }} />
              </div>
              <div className="text-xl font-black tracking-tight">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Avatar Changer Settings */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-4.5 w-4.5 text-primary" />
          Customize Profile Avatar
        </h2>
        <Card className="p-5 border border-border/60 rounded-2xl bg-card space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Change your standard profile avatar style. This is your public identity when posting needs publicly.
          </p>
          <div className="flex flex-wrap gap-2">
            {AVATAR_STYLES.map((av) => {
              const isSelected = user.avatar_style === av.style;
              return (
                <Button
                  key={av.style}
                  variant={isSelected ? "primary" : "outline"}
                  onClick={() => handleAvatarChange(av.style)}
                  disabled={updating}
                  className="rounded-xl text-xs px-4 h-9 font-semibold"
                >
                  {av.label}
                </Button>
              );
            })}
          </div>
        </Card>
      </section>

      {/* Anonymous Identity Settings */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
          Anonymous Identity Settings
        </h2>
        <Card className="p-6 border border-border/60 rounded-2xl bg-card space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-border/40 text-center sm:text-left justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Anonymous Avatar */}
              <div className="h-16 w-16 rounded-2xl overflow-hidden border border-border/60 bg-card p-0.5 shadow-soft shrink-0">
                {user.anonymous_avatar_svg ? (
                  <div className="w-full h-full rounded-xl overflow-hidden" dangerouslySetInnerHTML={{ __html: user.anonymous_avatar_svg }} />
                ) : (
                  <div className="h-full w-full bg-primary/10" />
                )}
              </div>
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/15">
                  <Sparkle className="h-2.5 w-2.5 fill-current" />
                  Anonymous · {user.anonymous_name || "North Wolf"}
                </span>
                <p className="text-[10px] text-muted-foreground">@{user.anonymous_username || "north-wolf-101"}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerateIdentity}
              disabled={updating}
              className="rounded-xl text-xs gap-1.5 font-bold hover:bg-muted"
            >
              <RefreshCw className="h-3 w-3" />
              Regenerate Identity
            </Button>
          </div>

          {/* Gender & Fictional Universe Selectors */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Identity Gender Base</Label>
              <select
                value={user.gender || "neutral"}
                onChange={(e) => handleGenderChange(e.target.value as GenderType)}
                disabled={updating}
                className="w-full h-10 px-3 rounded-xl bg-muted/50 border border-border/60 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="neutral">Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fictional Universe Style</Label>
              <select
                value={user.universe || "fantasy"}
                onChange={(e) => handleUniverseChange(e.target.value as UniverseType)}
                disabled={updating}
                className="w-full h-10 px-3 rounded-xl bg-muted/50 border border-border/60 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20"
              >
                {UNIVERSES.map((uni) => (
                  <option key={uni.type} value={uni.type}>
                    {uni.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
          <Award className="h-4.5 w-4.5 text-primary" />
          Earned Badges
        </h2>
        <div className="flex flex-wrap gap-3">
          {earnedBadges.map((badge) => (
            <div
              key={badge.slug}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border/60 bg-card shadow-soft hover:shadow-soft-lg transition-shadow duration-300 cursor-default"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-soft"
                style={{ backgroundColor: badge.color }}
              >
                {badge.label.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Posted Needs Section */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight">My Shared Needs</h2>
        {postedNeeds.length === 0 ? (
          <div className="text-center p-6 text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl bg-muted/15">
            You haven&apos;t shared any needs yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {postedNeeds.map((need, i) => (
              <NeedCard key={need.id} need={need} index={i} compact />
            ))}
          </div>
        )}
      </section>

      {/* Preferences Settings */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight">Preferences</h2>
        <Card className="p-5 space-y-4 border border-border/60 rounded-2xl bg-card">
          {[
            { id: "push", label: "Push Notifications", default: true },
            { id: "email", label: "Email Notifications", default: true },
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between">
              <Label htmlFor={pref.id} className="text-xs font-semibold">{pref.label}</Label>
              <Switch id={pref.id} defaultChecked={pref.default} />
            </div>
          ))}
        </Card>
      </section>

      {/* Account Settings / Sign Out */}
      <div className="pt-4 border-t border-border/50 flex justify-end">
        <Button variant="destructive" size="lg" className="rounded-xl text-xs gap-1.5 font-bold" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
}
