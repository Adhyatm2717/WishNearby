"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import type { User } from "@/types";
import {
  generateAnonymousIdentity,
  getStandardAvatar,
  type UniverseType,
  type GenderType,
} from "@/lib/anonymous-identities";
import { toast } from "sonner";

/** signUp resolves to 'confirmed' (session ready), 'pending' (email confirmation needed), or false (error). */
type SignUpResult = "confirmed" | "pending" | false;

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isSupabase: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<SignUpResult>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  regenerateAnonymousIdentity: () => Promise<boolean>;
}

const mapProfileToUser = (profile: any): User => {
  return {
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    reputation: profile.reputation || 0,
    is_entrepreneur: profile.is_entrepreneur || false,
    is_admin: profile.is_admin || false,
    created_at: profile.created_at,
    role: profile.role,
    gender: profile.gender,
    avatar_style: profile.avatar_style,
    avatar_svg: profile.avatar_svg,
    universe: profile.universe,
    anonymous_name: profile.anonymous_identity,
    anonymous_username: profile.anonymous_username,
    anonymous_avatar_svg: profile.anonymous_avatar,
  };
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isSupabase = useMemo(() => isSupabaseConfigured(), []);
  const supabase = useMemo(() => (isSupabase ? createClient() : null), [isSupabase]);

  // Load user session on mount
  useEffect(() => {
    async function loadSession() {
      setLoading(true);
      if (isSupabase && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Load user profile from 'profiles' table
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profile && !error) {
              setUser(mapProfileToUser(profile));
            } else {
              // Fallback if auth exists but profile row doesn't yet
              setUser({
                id: session.user.id,
                email: session.user.email ?? "",
                full_name: session.user.user_metadata?.full_name ?? "Neighbor",
                reputation: 0,
                is_entrepreneur: false,
                is_admin: false,
                created_at: new Date().toISOString(),
              });
            }
          }
        } catch {
          // Supabase failure
        }
      } else {
        // Load mock session
        const storedSession = localStorage.getItem("wishnearby-session-user");
        if (storedSession) {
          setUser(JSON.parse(storedSession) as User);
        }
      }
      setLoading(false);
    }

    loadSession();

    // Setup listener for Supabase
    if (isSupabase && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUser(mapProfileToUser(profile));
            // Write to localStorage for unified checks
            localStorage.setItem("wishnearby-onboarding-complete", profile.role ? "true" : "false");
            localStorage.setItem("wishnearby-experience", profile.role === "entrepreneur" ? "entrepreneur" : "explorer");
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          localStorage.removeItem("wishnearby-onboarding-complete");
          localStorage.removeItem("wishnearby-experience");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isSupabase, supabase]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    if (isSupabase && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[WishNearby] signIn error:", { message: error.message, status: error.status, code: (error as any).code });
        }
        // Supabase returns "Email not confirmed" or "Invalid login credentials" for unconfirmed emails
        const msg = error.message.toLowerCase();
        if (msg.includes("email not confirmed") || (msg.includes("invalid") && error.status === 400)) {
          toast.error("Please confirm your email before signing in. Check your inbox for a verification link.");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return false;
      }
      setLoading(false);
      return true;
    } else {
      // Mock Sign In logic
      await new Promise((r) => setTimeout(r, 600));
      const usersStr = localStorage.getItem("wishnearby-mock-users") || "[]";
      const usersList: User[] = JSON.parse(usersStr);
      
      const foundUser = usersList.find((u) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("wishnearby-session-user", JSON.stringify(foundUser));
        localStorage.setItem("wishnearby-onboarding-complete", foundUser.role ? "true" : "false");
        localStorage.setItem("wishnearby-experience", foundUser.role === "entrepreneur" ? "entrepreneur" : "explorer");
        
        // Also sync old legacy localstorage keys to avoid breaking anything
        if (foundUser.role) {
          localStorage.setItem("wishnearby-username", foundUser.full_name);
          localStorage.setItem("wishnearby-avatar-svg", foundUser.avatar_svg || "");
          localStorage.setItem("wishnearby-anon-name", foundUser.anonymous_name || "");
          localStorage.setItem("wishnearby-anon-avatar", foundUser.anonymous_avatar_svg || "");
        }
        
        setLoading(false);
        return true;
      } else {
        // Create a default mock user for testing if none found
        const newMockUser: User = {
          id: `mock-usr-${Date.now()}`,
          email,
          full_name: email.split("@")[0],
          reputation: 100,
          is_entrepreneur: false,
          is_admin: false,
          created_at: new Date().toISOString(),
        };
        usersList.push(newMockUser);
        localStorage.setItem("wishnearby-mock-users", JSON.stringify(usersList));
        setUser(newMockUser);
        localStorage.setItem("wishnearby-session-user", JSON.stringify(newMockUser));
        localStorage.setItem("wishnearby-onboarding-complete", "false");
        
        setLoading(false);
        return true;
      }
    }
  };

  const signUp = async (name: string, email: string, password: string): Promise<SignUpResult> => {
    setLoading(true);
    if (isSupabase && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[WishNearby] signUp error:", { message: error.message, status: error.status, code: (error as any).code });
        }
        toast.error(error.message);
        setLoading(false);
        return false;
      }

      // Determine if email confirmation is required.
      // When confirmation is enabled: data.user exists but data.session is null.
      // When confirmation is disabled: both data.user and data.session exist.
      const emailConfirmationPending = data.user && !data.session;

      if (emailConfirmationPending) {
        // Do NOT set user state or redirect to onboarding — the user has no session yet.
        setLoading(false);
        return "pending";
      }

      if (data.user && data.session) {
        // Session is immediately available (email confirmation disabled).
        // The trigger on_auth_user_created automatically creates the profile row.
        setUser({
          id: data.user.id,
          email,
          full_name: name,
          reputation: 0,
          is_entrepreneur: false,
          is_admin: false,
          created_at: new Date().toISOString(),
        });
        setLoading(false);
        return "confirmed";
      }

      setLoading(false);
      return false;
    } else {
      // Mock Sign Up logic
      await new Promise((r) => setTimeout(r, 600));
      const usersStr = localStorage.getItem("wishnearby-mock-users") || "[]";
      const usersList: User[] = JSON.parse(usersStr);

      const exists = usersList.some((u) => u.email === email);
      if (exists) {
        toast.error("Email already exists");
        setLoading(false);
        return false;
      }

      const newMockUser: User = {
        id: `mock-usr-${Date.now()}`,
        email,
        full_name: name,
        reputation: 0,
        is_entrepreneur: false,
        is_admin: false,
        created_at: new Date().toISOString(),
      };

      usersList.push(newMockUser);
      localStorage.setItem("wishnearby-mock-users", JSON.stringify(usersList));
      setUser(newMockUser);
      localStorage.setItem("wishnearby-session-user", JSON.stringify(newMockUser));
      localStorage.setItem("wishnearby-onboarding-complete", "false");
      
      setLoading(false);
      return "confirmed";
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    setLoading(true);
    if (isSupabase && supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return false;
      }
      return true;
    } else {
      // Mock Sign In with Google
      await new Promise((r) => setTimeout(r, 600));
      const mockGoogleUser: User = {
        id: `mock-google-usr-${Date.now()}`,
        email: "google.user@example.com",
        full_name: "Google User",
        reputation: 100,
        is_entrepreneur: false,
        is_admin: false,
        created_at: new Date().toISOString(),
      };
      
      const usersStr = localStorage.getItem("wishnearby-mock-users") || "[]";
      const usersList: User[] = JSON.parse(usersStr);
      if (!usersList.some((u) => u.email === mockGoogleUser.email)) {
        usersList.push(mockGoogleUser);
        localStorage.setItem("wishnearby-mock-users", JSON.stringify(usersList));
      }
      
      setUser(mockGoogleUser);
      localStorage.setItem("wishnearby-session-user", JSON.stringify(mockGoogleUser));
      localStorage.setItem("wishnearby-onboarding-complete", "false");
      
      setLoading(false);
      toast.success("Signed in with Google (Mock)!");
      window.location.href = "/onboarding";
      return true;
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    if (isSupabase && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("wishnearby-session-user");
      localStorage.removeItem("wishnearby-onboarding-complete");
      localStorage.removeItem("wishnearby-experience");
      setUser(null);
    }
    setLoading(false);
    toast.success("Signed out successfully");
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    const nextUser = { ...user, ...updates };

    if (isSupabase && supabase) {
      // Verify we have an active session before attempting DB writes.
      // Without a session, auth.uid() is null and RLS will block the operation.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (process.env.NODE_ENV === "development") {
          console.error("[WishNearby] updateProfile: no active session — RLS will block this write.");
        }
        toast.error("Please sign in again before updating your profile.");
        return false;
      }

      const dbUpdates: Record<string, unknown> = {};
      if (updates.full_name !== undefined) dbUpdates.full_name = updates.full_name;
      if (updates.avatar_style !== undefined) dbUpdates.avatar_style = updates.avatar_style;
      if (updates.avatar_svg !== undefined) dbUpdates.avatar_svg = updates.avatar_svg;
      if (updates.gender !== undefined) dbUpdates.gender = updates.gender;
      if (updates.role !== undefined) dbUpdates.role = updates.role;
      if (updates.universe !== undefined) dbUpdates.universe = updates.universe;
      if (updates.anonymous_name !== undefined) dbUpdates.anonymous_identity = updates.anonymous_name;
      if (updates.anonymous_username !== undefined) dbUpdates.anonymous_username = updates.anonymous_username;
      if (updates.anonymous_avatar_svg !== undefined) dbUpdates.anonymous_avatar = updates.anonymous_avatar_svg;

      // Use update (not upsert) since the profile row is created by the on_auth_user_created trigger.
      // This avoids a race condition where upsert could try to INSERT before the trigger finishes.
      const { error } = await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", user.id);

      if (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[WishNearby] updateProfile error:", { message: error.message, code: error.code, details: error.details, hint: error.hint });
        }
        toast.error(`Failed to update profile: ${error.message}`);
        return false;
      }
    } else {
      // Mock db updates
      const usersStr = localStorage.getItem("wishnearby-mock-users") || "[]";
      const usersList: User[] = JSON.parse(usersStr);
      const updatedList = usersList.map((u) => (u.id === user.id ? nextUser : u));
      localStorage.setItem("wishnearby-mock-users", JSON.stringify(updatedList));
      localStorage.setItem("wishnearby-session-user", JSON.stringify(nextUser));
    }

    setUser(nextUser);
    return true;
  };

  const regenerateAnonymousIdentity = async (): Promise<boolean> => {
    if (!user) return false;
    const selectedUniverse = user.universe as UniverseType || "fantasy";
    const selectedGender = user.gender as GenderType || "neutral";
    
    const anon = generateAnonymousIdentity(selectedUniverse, selectedGender);
    
    return updateProfile({
      anonymous_name: anon.name,
      anonymous_username: anon.username,
      anonymous_avatar_svg: anon.avatarSvg,
    });
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isSupabase,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      regenerateAnonymousIdentity,
    }),
    [user, loading, isSupabase, signIn, signUp, signInWithGoogle, signOut, updateProfile, regenerateAnonymousIdentity]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
