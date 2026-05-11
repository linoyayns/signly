"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContractDisplay from "@/components/ContractDisplay";
import { downloadContractAsPdf } from "@/lib/pdf";

function ContractContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [contract, setContract] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "failed" | null>(null);
  const emailSentRef = useRef(false);

  useEffect(() => {
    if (!sessionId) {
      setError("לא נמצא מזהה תשלום תקין");
      setLoading(false);
      return;
    }

    async function fetchContract() {
      try {
        const verifyRes = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const verifyData = await verifyRes.json();

        if (!verifyRes.ok || !verifyData.contractData) {
          setError("לא ניתן לאמת את התשלום");
          return;
        }

        const genRes = await fetch("/api/generate-contract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifyData.contractData),
        });

        const genData = await genRes.json();

        if (!genRes.ok || !genData.contract) {
          setError(genData.error ?? "שגיאה ביצירת החוזה");
          return;
        }

        setContract(genData.contract);

        // Send email automatically — once per page load
        if (!emailSentRef.current && verifyData.contractData?.deliveryEmail) {
          emailSentRef.current = true;
          setEmailStatus("sending");
          fetch("/api/send-contract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contractText: genData.contract,
              email: verifyData.contractData.deliveryEmail,
              freelancerName: verifyData.contractData.freelancerName,
              clientName: verifyData.contractData.clientName,
              sessionId,
            }),
          })
            .then((r) => setEmailStatus(r.ok ? "sent" : "failed"))
            .catch(() => setEmailStatus("failed"));
        }
      } catch {
        setError("שגיאת רשת. נסה לרענן את הדף.");
      } finally {
        setLoading(false);
      }
    }

    fetchContract();
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="text-center">
          <div
            className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">מייצר את החוזה שלך...</p>
          <p className="text-sm text-gray-400 mt-1">זה עשוי לקחת כ-30 שניות</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="text-center max-w-md">
          <p className="text-red-600 font-semibold mb-3">{error}</p>
          <a href="mailto:service@mysignly.com" className="text-sm text-blue-600 underline">
            פנה לתמיכה
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-base font-bold" style={{ color: "#0F1F3D" }}>Signly</span>
          <div className="flex gap-3">
            <button
              onClick={() => downloadContractAsPdf(contract)}
              className="px-5 py-2 text-sm font-semibold text-white rounded"
              style={{ backgroundColor: "#2563EB" }}
            >
              הורד PDF
            </button>
          </div>
        </div>
      </header>

      <section className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#0F1F3D" }}>
              החוזה שלך מוכן
            </h1>
            <p className="text-sm text-gray-500 mb-3">
              קרא את החוזה, הורד כ-PDF, ושלח ללקוח לחתימה.
            </p>
            {emailStatus === "sending" && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#1D4ED8" }}>
                <div style={{ width: 14, height: 14, border: "2px solid #2563EB", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                שולח למייל...
              </div>
            )}
            {emailStatus === "sent" && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#16A34A" }}>
                ✓ החוזה נשלח למייל שלך
              </div>
            )}
            {emailStatus === "failed" && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#92400E" }}>
                ⚠️ שליחת המייל נכשלה — הורד את ה-PDF ידנית
              </div>
            )}
          </div>

          <ContractDisplay content={contract} />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => downloadContractAsPdf(contract)}
              className="px-8 py-3 font-semibold text-white rounded text-center"
              style={{ backgroundColor: "#2563EB" }}
            >
              הורד PDF
            </button>
            <button
              onClick={() => {
                const blob = new Blob([contract], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "signly-contract.txt";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-8 py-3 font-semibold rounded text-center border border-gray-300 text-gray-700"
            >
              הורד טקסט
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContractPage() {
  return (
    <Suspense>
      <ContractContent />
    </Suspense>
  );
}
