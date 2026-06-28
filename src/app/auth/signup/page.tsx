"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "oauth_failed") {
        toast.error("Google signup failed. Please try again.");
      }
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await signUp(name, email, password);
    if (success) {
      toast.success("Account created! Welcome to WishNearby.");
      window.location.href = "/onboarding";
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const success = await signInWithGoogle();
    if (!success) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-mesh">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8 cursor-pointer group">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-shadow duration-200">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Join the community</h1>
          <p className="text-muted-foreground mt-2 text-sm">Free forever. No commissions. Ever.</p>
        </div>

        <Card className="p-6 sm:p-8 shadow-float border-border/60">
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/80" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border border-border/80 bg-background/50 hover:bg-muted/50 text-foreground transition-all duration-200 shadow-sm rounded-xl cursor-pointer"
            size="lg"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.57h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.43c0,-0.64 -0.06,-1.27 -0.17,-1.87Z" fill="#4285F4" />
              <path d="M12,20.68c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.57c-0.91,0.61 -2.08,0.97 -3.33,0.97c-2.39,0 -4.41,-1.61 -5.13,-3.78H2.76v2.48c1.54,3.06 4.69,5.1 8.24,5.1Z" fill="#34A853" />
              <path d="M6.87,13.1a5.27,5.27 0 0 1 0,-3.4V7.22H2.76a8.96,8.96 0 0 0 0,8.36L6.87,13.1Z" fill="#FBBC05" />
              <path d="M12,6.53c1.32,0 2.51,0.45 3.44,1.35l2.58,-2.58C16.46,3.75 14.42,3.32 12,3.32c-3.55,0 -6.7,2.04 -8.24,5.1l4.11,3.18C8.59,8.14 10.61,6.53 12,6.53Z" fill="#EA4335" />
            </svg>
            Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline cursor-pointer">
              Sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
