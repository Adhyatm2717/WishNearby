import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getEntrepreneurOpportunities } from "@/lib/data/needs";
import { DEFAULT_LOCATION } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat") ? Number(searchParams.get("lat")) : DEFAULT_LOCATION.lat;
  const lng = searchParams.get("lng") ? Number(searchParams.get("lng")) : DEFAULT_LOCATION.lng;

  const opportunities = await getEntrepreneurOpportunities();
  return NextResponse.json(opportunities);
}

export async function POST(request: NextRequest) {
  const isSupabase = 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && 
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { need_id } = await request.json();

  if (isSupabase) {
    try {
      const supabase = await createClient();
      
      // 1. Get the current logged-in entrepreneur
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // 2. Get the need details (for the notification message)
      const { data: need } = await supabase
        .from("needs")
        .select("title")
        .eq("id", need_id)
        .single();

      if (!need) {
        return NextResponse.json({ error: "Need not found" }, { status: 404 });
      }

      // 3. Register the business claim
      const { data: claim, error: claimError } = await supabase
        .from("business_claims")
        .upsert({
          need_id,
          entrepreneur_id: user.id,
          stage: 1
        }, {
          onConflict: "need_id"
        })
        .select()
        .single();

      if (claimError) {
        return NextResponse.json({ error: claimError.message }, { status: 500 });
      }

      // 4. Update the need's stage and entrepreneur ID
      const { error: needError } = await supabase
        .from("needs")
        .update({
          business_stage: 1,
          entrepreneur_id: user.id
        })
        .eq("id", need_id);

      if (needError) {
        return NextResponse.json({ error: needError.message }, { status: 500 });
      }

      // 5. Find all users who supported ("Counted In") this need
      const { data: votes } = await supabase
        .from("votes")
        .select("user_id")
        .eq("need_id", need_id);

      const supporterIds = new Set<string>();
      if (votes) {
        votes.forEach((v) => supporterIds.add(v.user_id));
      }

      // 6. Insert notifications for all supporters
      if (supporterIds.size > 0) {
        const notificationsInsert = Array.from(supporterIds).map((supporterId) => ({
          user_id: supporterId,
          type: "claim",
          title: "Entrepreneur launching your request! 🚀",
          message: `An entrepreneur is planning to start a business for: "${need.title}" in your area!`,
          link: `/needs/${need_id}`,
          read: false
        }));

        await supabase.from("notifications").insert(notificationsInsert);
      }

      return NextResponse.json(claim, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Failed to register interest" }, { status: 500 });
    }
  } else {
    // Mock Fallback
    return NextResponse.json({
      id: `claim-${Date.now()}`,
      need_id,
      entrepreneur_id: "user-2",
      stage: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { status: 201 });
  }
}
