import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Reassemble contractData from chunked metadata keys (cd_0, cd_1, ...)
function reassembleMetadata(metadata: Record<string, string>): unknown {
  const keys = Object.keys(metadata)
    .filter((k) => k.startsWith("cd_"))
    .sort((a, b) => Number(a.slice(3)) - Number(b.slice(3)));

  if (keys.length === 0) {
    // Fallback: try legacy single-key format
    const legacy = metadata["contractData"];
    if (legacy) return JSON.parse(legacy);
    return {};
  }

  const json = keys.map((k) => metadata[k]).join("");
  return JSON.parse(json);
}

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

    const contractData = reassembleMetadata(
      (session.metadata ?? {}) as Record<string, string>
    );
    return NextResponse.json({ contractData });
  } catch (err) {
    console.error("verify-session error:", err);
    return NextResponse.json({ error: "שגיאה באימות התשלום" }, { status: 500 });
  }
}
