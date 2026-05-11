"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function PaymentCompleteContent() {
  const params = useSearchParams();

  useEffect(() => {
    // Try to get clearingId from URL params (if Invoice4U appends it)
    // or fall back to sessionStorage (set before showing iframe)
    const clearingIdFromUrl = params.get("clearing_id") || params.get("ClearingLogId") || params.get("clearingLogId");
    const clearingId = clearingIdFromUrl || sessionStorage.getItem("pending_clearing_id");

    if (!clearingId) {
      window.location.href = "/create";
      return;
    }

    const target = `/contract?clearing_id=${clearingId}`;

    // If we're inside an iframe, redirect the parent window
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = target;
      } else {
        window.location.href = target;
      }
    } catch {
      window.location.href = target;
    }
  }, [params]);

  return (
    <div dir="rtl" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#F8F9FA",
      fontFamily: "'Heebo', sans-serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 40,
          height: 40,
          border: "4px solid #2563EB",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "#64748B", fontWeight: 600 }}>התשלום עבר בהצלחה — מייצר את החוזה...</p>
      </div>
    </div>
  );
}

export default function PaymentCompletePage() {
  return (
    <Suspense>
      <PaymentCompleteContent />
    </Suspense>
  );
}
