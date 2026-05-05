import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

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
      cancel_url: `${origin}/payment`,
      metadata: {
        contractData: JSON.stringify(contractData),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("create-checkout error:", err);
    return NextResponse.json({ error: "שגיאה ביצירת תשלום" }, { status: 500 });
  }
}
