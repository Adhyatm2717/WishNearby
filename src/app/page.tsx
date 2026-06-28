"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Lock, User, ArrowRight, Globe, Apple, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-context";
import { getHomeRoute, type ExperienceMode } from "@/lib/experience";
import { toast } from "sonner";

export default function AuthenticationPage() {
  const router = useRouter();
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();

  // Mode: sign-in vs create-account
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "oauth_failed") {
        toast.error("Google authentication failed. Please try again.");
      }
    }
  }, []);

  // If user is already authenticated, redirect them
  useEffect(() => {
    if (!loading && user) {
      if (user.role) {
        router.replace(getHomeRoute(user.role as ExperienceMode));
      } else {
        router.replace("/onboarding");
      }
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setAuthLoading(true);

    if (mode === "signup") {
      if (!name.trim()) {
        toast.error("Please enter your name");
        setAuthLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setAuthLoading(false);
        return;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        setAuthLoading(false);
        return;
      }

      const success = await signUp(name.trim(), email.trim(), password);
      if (success) {
        toast.success("Account created! Let's complete your onboarding.");
        router.push("/onboarding");
      }
    } else {
      const success = await signIn(email.trim(), password);
      if (success) {
        toast.success("Welcome back!");
        // Redirect logic will be handled by the useEffect above
      }
    }
    
    setAuthLoading(false);
  };

  const handleOAuth = async (provider: string) => {
    if (provider === "Google") {
      setAuthLoading(true);
      await signInWithGoogle();
    } else {
      toast.info(`Connecting to ${provider}...`);
      // Simulated Social login
      setTimeout(async () => {
        const success = await signIn("social.neighbor@example.com", "social-pass-123");
        if (success) {
          toast.success("Logged in successfully!");
        }
      }, 1000);
    }
  };

  if (loading || (user && user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="text-center p-6 space-y-4">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm font-semibold tracking-tight">Securing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 overflow-x-hidden">
      {/* Left side: Premium illustration & branding (7 columns) */}
      <div className="hidden md:flex md:col-span-7 bg-gradient-to-br from-primary via-primary/95 to-navy text-primary-foreground p-12 flex-col justify-between relative overflow-hidden select-none">
        {/* Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_50%)] pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gold animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-white">{APP_NAME}</span>
        </div>

        {/* Center Illustration */}
        <div className="flex justify-center items-center my-8">
          <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto select-none opacity-90">
            {/* Background Map Grid */}
            <rect x="10" y="10" width="220" height="140" rx="16" fill="white" fillOpacity="0.03" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M40 10 L40 150 M120 10 L120 150 M200 10 L200 150 M10 40 L230 40 M10 80 L230 80 M10 120 L230 120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            
            {/* Paths / Connections */}
            <path d="M40 80 Q90 50 120 80 T200 80" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="6 6" fill="none" opacity="0.6" />
            <path d="M120 40 Q150 100 200 120" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.25" />

            {/* Glowing Map Hubs */}
            <circle cx="120" cy="80" r="28" fill="#1E3A8A" fillOpacity="0.3" stroke="rgba(255,255,255,0.1)" />
            <circle cx="120" cy="80" r="12" fill="#D4AF37" fillOpacity="0.2" />
            <circle cx="120" cy="80" r="5" fill="#D4AF37" />

            <circle cx="40" cy="80" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="80" r="4" fill="#FFFFFF" />
            <circle cx="120" cy="40" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="120" r="4" fill="#FFFFFF" />

            {/* Float badges */}
            <g transform="translate(25, 25)">
              <rect width="50" height="20" rx="6" fill="#111827" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" />
              <text x="7" y="13" fill="#059669" fontSize="9" fontWeight="bold" fontFamily="sans-serif">💚 Needs</text>
            </g>
            <g transform="translate(160, 20)">
              <rect width="60" height="20" rx="6" fill="#111827" fillOpacity="0.8" stroke="rgba(255,255,255,0.1)" />
              <text x="6" y="13" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">📈 Capital</text>
            </g>
          </svg>
        </div>

        {/* Hero text / tagline */}
        <div className="space-y-3">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Build a Better <br /> Community Together.
          </h2>
          <p className="text-sm text-primary-foreground/80 max-w-md leading-relaxed font-medium">
            Discover what your community needs or find your next business opportunity. Powered by real local demand.
          </p>
        </div>
      </div>

      {/* Right side: Auth forms (5 columns) */}
      <div className="col-span-1 md:col-span-5 bg-background flex flex-col justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-sm mx-auto space-y-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black tracking-tight text-foreground">Welcome to WishNearby</h1>
            <p className="text-xs text-muted-foreground mt-1.5 font-medium">Please sign in or create an account to continue</p>
          </div>

          <Card className="p-6 border border-border/70 shadow-float rounded-2xl bg-card">
            {/* Social Logins */}
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => handleOAuth("Google")}
                className="w-full h-10 text-xs font-semibold rounded-xl gap-2 hover:bg-muted border-border/60"
              >
                <Globe className="h-4 w-4 text-primary" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuth("Apple")}
                className="w-full h-10 text-xs font-semibold rounded-xl gap-2 hover:bg-muted border-border/60"
              >
                <Apple className="h-4 w-4" />
                Continue with Apple
              </Button>
              <Button
                variant="outline"
                onClick={() => handleOAuth("Microsoft")}
                className="w-full h-10 text-xs font-semibold rounded-xl gap-2 hover:bg-muted border-border/60"
              >
                <Square className="h-4 w-4" />
                Continue with Microsoft
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="your name"
                        className="pl-9 h-10 text-xs rounded-xl"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={mode === "signup"}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-9 h-10 text-xs rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9 h-10 text-xs rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="confirm-password-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1.5"
                  >
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-9 h-10 text-xs rounded-xl"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={mode === "signup"}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" className="w-full h-10 text-xs font-bold rounded-xl shadow-soft gap-1 mt-2" disabled={authLoading}>
                {authLoading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Form Switcher Link */}
          <div className="text-center">
            {mode === "signin" ? (
              <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-primary font-bold hover:underline bg-transparent border-0 cursor-pointer p-0"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
