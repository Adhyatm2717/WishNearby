import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

      // 2. Update the need status to fulfilled (launched) and business stage to 4
      const { data: need, error } = await supabase
        .from("needs")
        .update({
          status: "fulfilled",
          business_stage: 4
        })
        .eq("id", need_id)
        .eq("entrepreneur_id", user.id) // Ensure only the claiming entrepreneur can launch it!
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // 3. Insert a milestone notification for supporters
      const { data: votes } = await supabase
        .from("votes")
        .select("user_id")
        .eq("need_id", need_id);

      if (votes && votes.length > 0) {
        const notificationsInsert = votes.map((v) => ({
          user_id: v.user_id,
          type: "milestone",
          title: "Business Launched! 🎉",
          message: `The business "${need.title}" you supported has officially launched! Go check it out.`,
          link: `/needs/${need_id}`,
          read: false
        }));

        await supabase.from("notifications").insert(notificationsInsert);
      }

      return NextResponse.json(need, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Failed to launch business" }, { status: 500 });
    }
  } else {
    // Mock Fallback
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
