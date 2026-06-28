import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (isSupabase) {
    try {
      const supabase = await createClient();
      
      // Calculate the timestamp for 24 hours ago
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      // Fetch all needs marked as fulfilled in the last 24 hours
      const { data: launches, error } = await supabase
        .from("needs")
        .select("*, author:profiles!author_id(*)")
        .eq("status", "fulfilled")
        .gte("updated_at", twentyFourHoursAgo);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(launches || []);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Mock Fallback: Return empty in mock mode
    return NextResponse.json([]);
  }
}
