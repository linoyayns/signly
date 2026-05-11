import { NextRequest, NextResponse } from "next/server";
import { createClearingRequest } from "@/lib/invoice4u";

export async function POST(req: NextRequest) {
  try {
    const { contractData } = await req.json();
    const origin = req.headers.get("origin") ?? "https://mysignly.com";

    const result = await createClearingRequest({
      sum: 97,
      fullName: contractData.freelancerName || "לקוח",
      email: contractData.deliveryEmail || "noreply@mysignly.com",
      returnUrl: `${origin}/payment-complete`,
    });

    if (result.Errors && result.Errors.length > 0) {
      console.error("Invoice4U error:", result.Errors);
      return NextResponse.json({ error: result.Errors[0] }, { status: 400 });
    }

    if (!result.ClearingRedirectUrl) {
      console.error("Invoice4U no redirect URL:", result);
      return NextResponse.json({ error: "שגיאה ביצירת תשלום" }, { status: 500 });
    }

    return NextResponse.json({
      iframeUrl: result.ClearingRedirectUrl,
      clearingId: result.I4UClearingLogId,
    });
  } catch (err) {
    console.error("create-checkout error:", err);
    return NextResponse.json({ error: "שגיאה ביצירת תשלום" }, { status: 500 });
  }
}
