"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContractDisplay from "@/components/ContractDisplay";
import { downloadContractAsPdf } from "@/lib/pdf";
import { downloadContractAsDocx } from "@/lib/docx-export";

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
      <main dir="rtl" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", backgroundColor: "#F8FAFC", fontFamily: "'Heebo', sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>⚠️</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#DC2626", marginBottom: 12 }}>{error}</p>
          <p style={{ fontSize: 14, color: "#64748B", marginBottom: 20 }}>אם הבעיה חוזרת, פנה לתמיכה ונטפל בזה מיד.</p>
          <a href="mailto:service@mysignly.com" style={{ display: "inline-block", padding: "10px 24px", background: "#2563EB", color: "white", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            פנה לתמיכה
          </a>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F8FAFC", fontFamily: "'Heebo', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #E2E8F0", padding: "14px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#0F1F3D" }}>Signly<span style={{ color: "#2563EB" }}>.</span></span>
          <button
            onClick={() => downloadContractAsPdf(contract)}
            style={{ padding: "8px 20px", fontSize: 14, fontWeight: 700, background: "#2563EB", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            הורד PDF
          </button>
        </div>
      </header>

      <section style={{ flex: 1, padding: "40px 24px 60px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F1F3D", marginBottom: 6 }}>
              החוזה שלך מוכן
            </h1>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 14 }}>
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
                ✓ החוזה נשלח למייל שלך בהצלחה
              </div>
            )}
            {emailStatus === "failed" && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#92400E" }}>
                ⚠️ שליחת המייל נכשלה — הורד את ה-PDF ידנית למטה
              </div>
            )}
          </div>

          <ContractDisplay content={contract} />

          <div style={{ maxWidth: 420, margin: "40px auto 0" }}>
            {/* Section label */}
            <p style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textAlign: "center", marginBottom: 16, letterSpacing: 0.5, textTransform: "uppercase" }}>
              מה תרצה לעשות עם החוזה?
            </p>

            {/* Primary: Send to client */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent("שלום, הכנתי עבורנו חוזה עבודה. אשלח לך אותו עכשיו לעיון ולחתימה.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "15px 32px", fontSize: 16, fontWeight: 700, background: "#25D366", color: "white", borderRadius: 10, textDecoration: "none", marginBottom: 10 }}
            >
              <span style={{ fontSize: 18 }}>💬</span>
              שלח ללקוח ב-WhatsApp
            </a>

            {/* Secondary: Download buttons side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <button
                onClick={() => downloadContractAsPdf(contract)}
                style={{ padding: "12px", fontSize: 14, fontWeight: 700, background: "#2563EB", color: "white", border: "none", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <span>📄</span> הורד PDF
              </button>
              <button
                onClick={() => downloadContractAsDocx(contract)}
                style={{ padding: "12px", fontSize: 14, fontWeight: 600, background: "white", color: "#1D4ED8", border: "1.5px solid #BFDBFE", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <span>📝</span> הורד Word
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: 12, color: "#94A3B8" }}>
              שאלות? <a href="mailto:service@mysignly.com" style={{ color: "#2563EB", textDecoration: "none" }}>service@mysignly.com</a>
            </p>
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
