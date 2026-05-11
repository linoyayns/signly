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

    if (!status.IsSuccess) {
      return NextResponse.json({ error: "התשלום לא הושלם" }, { status: 402 });
    }

    return NextResponse.json({ paid: true });
  } catch (err) {
    console.error("verify-session error:", err);
    return NextResponse.json({ error: "שגיאה באימות התשלום" }, { status: 500 });
  }
}
