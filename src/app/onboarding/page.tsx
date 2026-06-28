"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Rocket,
  PenLine,
  Heart,
  MessageCircle,
  MapPin,
  Users,
  Flame,
  BarChart3,
  TrendingUp,
  Target,
  Sparkles,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-context";
import { useExperience } from "@/contexts/experience-context";
import { cn } from "@/lib/utils";
import { getHomeRoute, type ExperienceMode } from "@/lib/experience";
import {
  AvatarStyle,
  GenderType,
  UniverseType,
  generateAnonymousIdentity,
  getStandardAvatar,
} from "@/lib/anonymous-identities";

const cards = [
  {
    mode: "explorer",
    title: "Community Explorer",
    description: "Help improve your neighborhood by sharing needs, supporting others, and discovering local demand.",
    icon: Globe,
    gradient: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "gradient-primary text-white",
    features: [
      { icon: PenLine, label: "Add a Need" },
      { icon: Heart, label: "Count Me In" },
      { icon: MessageCircle, label: "Comment & Discuss" },
      { icon: MapPin, label: "Discover Nearby Needs" },
      { icon: Users, label: "Build a Better Community" },
    ],
    cta: "Select Explorer Mode",
  },
  {
    mode: "entrepreneur",
    title: "Entrepreneur",
    description: "Discover real business opportunities backed by community demand.",
    icon: Rocket,
    gradient: "from-gold/15 via-gold/5 to-transparent",
    iconBg: "bg-navy text-gold border border-gold/30",
    features: [
      { icon: Flame, label: "Demand Heatmaps" },
      { icon: Target, label: "Business Opportunities" },
      { icon: TrendingUp, label: "Growth Trends" },
      { icon: BarChart3, label: "Demand Analytics" },
      { icon: Sparkles, label: "Community Insights" },
    ],
    cta: "Select Entrepreneur Mode",
  },
] as const;

const AVATAR_STYLES: { style: AvatarStyle; label: string; desc: string }[] = [
  { style: "male", label: "Classic Male", desc: "Clean and smart" },
  { style: "female", label: "Classic Female", desc: "Sleek and polished" },
  { style: "neutral", label: "Neutral Minimal", desc: "Elegant silhouette" },
  { style: "cute", label: "Cute & Playful", desc: "Friendly animal style" },
  { style: "minimal", label: "Minimalist Logo", desc: "Vector high contrast" },
  { style: "3d", label: "3D Sphere", desc: "Vibrant lighting depth" },
  { style: "illustrated", label: "Illustrated Art", desc: "Creative colors" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading, updateProfile } = useAuth();
  const { setMode } = useExperience();

  // Onboarding steps: avatar -> gender -> experience -> finish
  const [step, setStep] = useState<"avatar" | "gender" | "experience" | "finish">("avatar");

  // Onboarding states
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState<AvatarStyle>("neutral");
  const [selectedGender, setSelectedGender] = useState<GenderType>("neutral");
  const [selectedRole, setSelectedRole] = useState<"explorer" | "entrepreneur">("explorer");
  const [saving, setSaving] = useState(false);

  // Redirect to login if not authenticated, or to dashboard if onboarding is complete
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (user.role) {
        router.replace(getHomeRoute(user.role as ExperienceMode));
      }
    }
  }, [user, authLoading, router]);

  const handleFinishSetup = async () => {
    if (!user) return;
    setSaving(true);

    // 1. Generate permanent anonymous identity based on gender
    const defaultUniverse: UniverseType = "fantasy";
    const anon = generateAnonymousIdentity(defaultUniverse, selectedGender);
    
    // 2. Render standard avatar SVG
    const avatarSvg = getStandardAvatar(selectedAvatarStyle, user.full_name);

    // 3. Write profile to database (or localStorage)
    const success = await updateProfile({
      role: selectedRole,
      gender: selectedGender,
      avatar_style: selectedAvatarStyle,
      avatar_svg: avatarSvg,
      universe: defaultUniverse,
      anonymous_name: anon.name,
      anonymous_username: anon.username,
      anonymous_avatar_svg: anon.avatarSvg,
    });

    if (success) {
      // Sync Experience context mode
      setMode(selectedRole, { redirect: false });
      setStep("finish");
    } else {
      // error toast is handled by updateProfile
    }
    
    setSaving(false);
  };

  const handleGoToDashboard = () => {
    router.push(getHomeRoute(selectedRole));
  };

  if (authLoading || !user || (user && user.role && step !== "finish")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="text-center p-6 space-y-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm font-semibold tracking-tight">Loading setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col pt-8 sm:pt-12">
      <header className="safe-area-top safe-area-x px-4 sm:px-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            {APP_NAME}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Setup · Step {step === "avatar" ? "1" : step === "gender" ? "2" : step === "experience" ? "3" : "4"} of 4
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 pb-12 safe-area-bottom max-w-4xl mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "avatar" && (
            <motion.div
              key="avatar-step"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-black tracking-tight mb-2">
                  Select your profile avatar
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose a style that represents you. You can change this later from your profile settings.
                </p>
              </div>

              {/* Central Large Preview */}
              <div className="flex justify-center my-6">
                <div className="relative">
                  <div className="h-28 w-28 rounded-3xl overflow-hidden shadow-float ring-4 ring-primary/10 bg-card p-1 flex items-center justify-center">
                    <div
                      className="w-full h-full rounded-2xl overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: getStandardAvatar(selectedAvatarStyle, user.full_name),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Grid styles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVATAR_STYLES.map((av) => {
                  const isSelected = selectedAvatarStyle === av.style;
                  return (
                    <Card
                      key={av.style}
                      onClick={() => setSelectedAvatarStyle(av.style)}
                      className={cn(
                        "p-4 cursor-pointer text-center rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-soft"
                          : "border-border/60 bg-card hover:border-primary/25 hover:shadow-soft"
                      )}
                    >
                      <div
                        className="h-12 w-12 rounded-xl overflow-hidden bg-muted"
                        dangerouslySetInnerHTML={{
                          __html: getStandardAvatar(av.style, "sample"),
                        }}
                      />
                      <div>
                        <p className="font-bold text-xs">{av.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{av.desc}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg" className="gap-1.5 rounded-xl shadow-soft" onClick={() => setStep("gender")}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "gender" && (
            <motion.div
              key="gender-step"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-black tracking-tight mb-2">
                  Select your gender
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This details is strictly confidential and will only be used to generate your random anonymous identity usernames.
                </p>
              </div>

              <div className="max-w-sm mx-auto space-y-3 mt-4">
                {[
                  { key: "male", label: "Male" },
                  { key: "female", label: "Female" },
                  { key: "neutral", label: "Prefer not to say" },
                ].map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setSelectedGender(g.key as GenderType)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between text-sm font-semibold",
                      selectedGender === g.key
                        ? "border-primary bg-primary/5 text-primary shadow-soft"
                        : "border-border/60 bg-card hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <span>{g.label}</span>
                    {selectedGender === g.key && <Sparkle className="h-4 w-4 fill-primary text-primary" />}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 max-w-sm mx-auto">
                <Button variant="secondary" size="lg" className="rounded-xl" onClick={() => setStep("avatar")}>
                  Back
                </Button>
                <Button size="lg" className="gap-1.5 rounded-xl shadow-soft" onClick={() => setStep("experience")}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "experience" && (
            <motion.div
              key="experience-step"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-black tracking-tight mb-2">
                  How would you like to use {APP_NAME}?
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose your starting workspace experience. You can switch workspaces anytime from settings.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mt-4">
                {cards.map((card) => {
                  const isSelected = selectedRole === card.mode;
                  const Icon = card.icon;
                  return (
                    <Card
                      key={card.mode}
                      onClick={() => setSelectedRole(card.mode)}
                      className={cn(
                        "relative p-6 sm:p-8 cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-soft-lg"
                          : "border-border/60 bg-card hover:border-primary/20 hover:shadow-soft"
                      )}
                    >
                      {isSelected && (
                        <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                          Active Selection
                        </span>
                      )}
                      <div className="flex-1">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-5 shadow-soft", card.iconBg)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-2 tracking-tight">{card.title}</h2>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{card.description}</p>
                        <ul className="space-y-2 mb-6">
                          {card.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/80">
                              <span className="h-6 w-6 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                <feature.icon className="h-3.5 w-3.5 text-primary" />
                              </span>
                              {feature.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="secondary" size="lg" className="rounded-xl" onClick={() => setStep("gender")}>
                  Back
                </Button>
                <Button size="lg" className="gap-1.5 rounded-xl shadow-soft" onClick={handleFinishSetup} disabled={saving}>
                  {saving ? "Completing setup..." : "Finish Setup"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "finish" && (
            <motion.div
              key="finish-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center space-y-6 py-8"
            >
              <div className="h-16 w-16 rounded-full bg-cta/15 text-cta flex items-center justify-center mx-auto shadow-soft">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground">You&apos;re all set!</h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Welcome to {APP_NAME}. Your profile has been generated. Let&apos;s go build a better community.
                </p>
              </div>

              <Button size="xl" className="w-full rounded-xl shadow-soft" onClick={handleGoToDashboard}>
                Go to Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
