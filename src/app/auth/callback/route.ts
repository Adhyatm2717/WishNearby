import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      // Check if user profile is already created and if onboarding is complete
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
        
      const hasCompletedOnboarding = profile && profile.role ? true : false;
      const experienceMode = profile && profile.role === "entrepreneur" ? "entrepreneur" : "explorer";

      const redirectPath = hasCompletedOnboarding
        ? (experienceMode === "entrepreneur" ? "/entrepreneur" : "/home")
        : "/onboarding";

      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }

  // Redirect to login with error state if anything fails
  return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`);
}
