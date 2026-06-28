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

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isSupabase: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  regenerateAnonymousIdentity: () => Promise<boolean>;
}

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
              setUser(profile as User);
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
            setUser(profile as User);
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
        toast.error(error.message);
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

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
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
        toast.error(error.message);
        setLoading(false);
        return false;
      }

      if (data.user) {
        // Note: The trigger on_auth_user_created automatically handles profile row creation in 'profiles'.

        setUser({
          id: data.user.id,
          email,
          full_name: name,
          reputation: 0,
          is_entrepreneur: false,
          is_admin: false,
          created_at: new Date().toISOString(),
        });
      }
      setLoading(false);
      return true;
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
      return true;
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

      const { error } = await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", user.id);

      if (error) {
        toast.error("Failed to update profile in database");
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
