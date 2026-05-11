"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentContent() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const contractData = {
    name: params.get("name") ?? "",
    client: params.get("client") ?? "",
    service: params.get("service") ?? "",
    amount: params.get("amount") ?? "",
    paymentTerms: params.get("paymentTerms") ?? "",
    timeline: params.get("timeline") ?? "",
    revisions: params.get("revisions") ?? "",
    cancellation: params.get("cancellation") ?? "",
    ipOwnership: params.get("ipOwnership") ?? "",
    specialClauses: params.get("specialClauses") ?? "",
  };

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractData }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "שגיאה בהתחברות לתשלום");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("שגיאת רשת. נסה שוב.");
    } finally {
      setLoading(false);
    }
  }

  const summaryItems = [
    { label: "שמך", value: contractData.name },
    { label: "לקוח", value: contractData.client },
    { label: "שירות", value: contractData.service },
    { label: "סכום", value: contractData.amount },
    { label: "תנאי תשלום", value: contractData.paymentTerms },
  ].filter((item) => item.value);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold" style={{ color: "#0F1F3D" }}>Signly</span>
        </div>

        <div className="bg-white border border-gray-200 rounded p-6 mb-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#0F1F3D" }}>
            סיכום החוזה שלך
          </h2>

          <div className="space-y-3 mb-6">
            {summaryItems.map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-500">{label}:</span>
                <span className="font-medium text-gray-800 text-right max-w-xs">{value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold" style={{ color: "#0F1F3D" }}>סה״כ לתשלום</span>
              <span className="text-2xl font-bold" style={{ color: "#2563EB" }}>₪97</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">תשלום חד-פעמי. ללא מנוי.</p>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white border border-gray-200 rounded p-5 mb-6 text-sm">
          <p className="font-semibold mb-3" style={{ color: "#0F1F3D" }}>מה אתה מקבל:</p>
          <ul className="space-y-2 text-gray-600">
            {[
              "חוזה מקצועי בעברית",
              "מבוסס על חוק החוזים הישראלי",
              "מותאם אישית לפרויקט שלך",
              "הורדה כ-PDF מוכן לחתימה",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span style={{ color: "#2563EB" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 text-lg font-semibold text-white rounded disabled:opacity-50 transition-opacity"
          style={{ backgroundColor: "#2563EB" }}
        >
          {loading ? "מעביר לתשלום..." : "שלם ₪97 וקבל את החוזה"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          תשלום מאובטח
        </p>

        <div className="text-center mt-4">
          <Link href="/create" className="text-sm text-gray-500 underline">
            חזור לשאלות
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
