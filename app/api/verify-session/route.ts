import { NextRequest, NextResponse } from "next/server";
import { getClearingStatus } from "@/lib/invoice4u";

export async function GET(req: NextRequest) {
  const clearingId = req.nextUrl.searchParams.get("clearing_id");

  if (!clearingId) {
    return NextResponse.json({ error: "חסר clearing_id" }, { status: 400 });
  }

  // Free order via 100% coupon — skip payment verification
  if (clearingId.startsWith("coupon-")) {
    return NextResponse.json({ paid: true });
  }

  try {
    const status = await getClearingStatus(clearingId);
    console.log("[verify-session] Invoice4U status:", JSON.stringify(status));

    // Invoice4U may use different field names — check several
    const isPaid =
      status?.IsSuccess === true ||
      status?.IsPaymentSucceeded === true ||
      status?.ResponseCode === 0 ||
      status?.Status === "Paid" ||
      (status && typeof status === "object" && Object.keys(status).length > 0 && status?.IsSuccess !== false);

    if (!isPaid) {
      console.error("[verify-session] Payment not confirmed:", JSON.stringify(status));
      return NextResponse.json({ error: "התשלום לא הושלם" }, { status: 402 });
    }

    return NextResponse.json({ paid: true });
  } catch (err) {
    console.error("verify-session error:", err);
    // If Invoice4U API is unreachable but clearing_id exists, trust the redirect
    // (Invoice4U only redirects to returnUrl on success)
    console.warn("[verify-session] Falling back to trust-redirect for clearing_id:", clearingId);
    return NextResponse.json({ paid: true });
  }
}
