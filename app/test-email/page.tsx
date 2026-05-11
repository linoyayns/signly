"use client";

import { useState } from "react";

export default function TestEmailPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [message, setMessage] = useState("");

  async function sendTest() {
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/send-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractText: `# חוזה בדיקה — Signly

## זהו מייל בדיקה

**פרילנסר:** לינוי
**לקוח:** לקוח בדיקה

אם קיבלת מייל זה, האוטומציה עובדת כמו שצריך.

## תנאי תשלום

סכום: 5,000 ₪
מועד תשלום: תוך 30 יום מקבלת חשבונית

## סיום

חוזה זה נוצר לצורכי בדיקה בלבד.`,
          email,
          freelancerName: "לינוי",
          clientName: "לקוח בדיקה",
          sessionId: "test-123",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setMessage("המייל נשלח! בדקי את תיבת הדואר.");
      } else {
        setStatus("failed");
        setMessage(data.error ?? "שגיאה לא ידועה");
      }
    } catch {
      setStatus("failed");
      setMessage("שגיאת רשת");
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F8F9FA", direction: "rtl" }}>
      <div style={{ background: "white", borderRadius: 16, padding: 40, maxWidth: 420, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#0F1F3D", marginBottom: 8 }}>
          Signly<span style={{ color: "#2563EB" }}>.</span>
        </div>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>דף בדיקת מייל — זמני</p>

        <input
          type="email"
          placeholder="הכניסי את המייל שלך"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 14, marginBottom: 16, boxSizing: "border-box", textAlign: "right" }}
        />

        <button
          onClick={sendTest}
          disabled={status === "sending" || !email}
          style={{ width: "100%", padding: "13px 0", background: status === "sending" ? "#93C5FD" : "#2563EB", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: status === "sending" ? "not-allowed" : "pointer" }}
        >
          {status === "sending" ? "שולח..." : "שלח מייל בדיקה"}
        </button>

        {status === "sent" && (
          <div style={{ marginTop: 20, padding: "12px 16px", background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 8, color: "#16A34A", fontSize: 14, fontWeight: 600 }}>
            ✓ {message}
          </div>
        )}
        {status === "failed" && (
          <div style={{ marginTop: 20, padding: "12px 16px", background: "#FFF1F2", border: "1px solid #FECDD3", borderRadius: 8, color: "#BE123C", fontSize: 14 }}>
            ✗ {message}
          </div>
        )}
      </div>
    </main>
  );
}
