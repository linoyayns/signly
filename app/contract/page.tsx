"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContractDisplay from "@/components/ContractDisplay";
import { downloadContractAsPdf } from "@/lib/pdf";

const LOADING_MESSAGES = [
  { delay: 0,    text: "מייצר את החוזה שלך...",             sub: "חוזה טוב לוקח רגע לכתוב. אנחנו על זה 😊" },
  { delay: 8000, text: "עובדים על זה...",                   sub: "כל סעיף נבנה בשבילך בנפרד — זה לוקח עד דקה וחצי" },
  { delay: 25000, text: "כמעט שם...",                       sub: "ממש עוד רגע החוזה מוכן ואנחנו שולחים אותו למייל שלך" },
  { delay: 55000, text: "עוד שנייה אחת...",                 sub: "אנחנו עדיין כאן — זה עובד, הכל בסדר 🙏" },
];

function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timers = LOADING_MESSAGES.slice(1).map(({ delay }, i) =>
      setTimeout(() => setMsgIndex(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const { text, sub } = LOADING_MESSAGES[msgIndex];

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F8FAFC", padding: "0 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        {/* Spinner */}
        <div style={{ width: 48, height: 48, border: "4px solid #EFF6FF", borderTop: "4px solid #2563EB", borderRadius: "50%", margin: "0 auto 24px", animation: "spin 0.9s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        {/* Main message */}
        <p style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10, transition: "opacity 0.4s" }}>
          {text}
        </p>

        {/* Sub message */}
        <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 28 }}>
          {sub}
        </p>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {LOADING_MESSAGES.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= msgIndex ? "#2563EB" : "#E2E8F0", transition: "background 0.4s" }} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ContractContent() {
  const params = useSearchParams();
  const clearingId = params.get("clearing_id");

  const [contract, setContract] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState<"sending" | "sent" | "failed" | null>(null);
  const emailSentRef = useRef(false);

  useEffect(() => {
    if (!clearingId) {
      setError("לא נמצא מזהה תשלום תקין");
      setLoading(false);
      return;
    }

    async function fetchContract() {
      try {
        // 1. Get contractData from sessionStorage
        const stored = sessionStorage.getItem(`cd_${clearingId}`);
        if (!stored) {
          setError("לא ניתן לאחזר את פרטי החוזה. אנא פנה לתמיכה.");
          return;
        }
        const contractData = JSON.parse(stored);

        // 2. Verify payment with Invoice4U
        const verifyRes = await fetch(`/api/verify-session?clearing_id=${clearingId}`);
        if (!verifyRes.ok) {
          setError("לא ניתן לאמת את התשלום");
          return;
        }

        // 3. Generate contract
        const genRes = await fetch("/api/generate-contract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contractData),
        });

        const genData = await genRes.json();

        if (!genRes.ok || !genData.contract) {
          setError(genData.error ?? "שגיאה ביצירת החוזה");
          return;
        }

        setContract(genData.contract);

        // 4. Send email automatically — once per page load
        if (!emailSentRef.current && contractData?.deliveryEmail) {
          emailSentRef.current = true;
          setEmailStatus("sending");
          fetch("/api/send-contract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contractText: genData.contract,
              email: contractData.deliveryEmail,
              freelancerName: contractData.freelancerName,
              clientName: contractData.clientName,
              sessionId: clearingId,
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
  }, [clearingId]);

  if (loading) {
    return <LoadingScreen />;
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
