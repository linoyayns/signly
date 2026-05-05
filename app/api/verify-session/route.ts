import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "חסר session_id" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "התשלום לא הושלם" }, { status: 402 });
    }

    const contractData = JSON.parse(session.metadata?.contractData ?? "{}");
    return NextResponse.json({ contractData });
  } catch (err) {
    console.error("verify-session error:", err);
    return NextResponse.json({ error: "שגיאה באימות התשלום" }, { status: 500 });
  }
}
