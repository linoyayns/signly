import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Stripe metadata values are limited to 500 chars each.
// We split the contractData JSON across numbered keys.
function chunkMetadata(contractData: unknown): Record<string, string> {
  const json = JSON.stringify(contractData);
  const CHUNK_SIZE = 490;
  const metadata: Record<string, string> = {};
  for (let i = 0; i * CHUNK_SIZE < json.length; i++) {
    metadata[`cd_${i}`] = json.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  }
  return metadata;
}

export async function POST(req: NextRequest) {
  try {
    const { contractData } = await req.json();
    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ils",
            product_data: {
              name: "חוזה פרילנסר — Signly",
              description: "חוזה מקצועי בעברית, מותאם אישית לפרויקט שלך",
            },
            unit_amount: 9700,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/contract?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/create`,
      metadata: chunkMetadata(contractData),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout error:", err);
    return NextResponse.json({ error: "שגיאה ביצירת תשלום" }, { status: 500 });
  }
}
