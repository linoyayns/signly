"use client";

import { useState } from "react";

interface ContractResult {
  clearingId: string;
  data: {
    freelancerName: string;
    clientName: string;
    deliveryEmail: string;
    totalPrice: string;
    profession: string;
  };
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(false);

  async function login() {
    setAuthError("");
    setCheckingAuth(true);
    const res = await fetch("/api/admin/recent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    setCheckingAuth(false);
    if (res.ok) {
      setAuthed(true);
    } else {
      setAuthError("סיסמה שגויה");
    }
  }
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ContractResult[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState<Record<string, string>>({});
  const [resendStatus, setResendStatus] = useState<Record<string, string>>({});

  async function loadRecent() {
    setLoading(true);
    setStatus("");
    setResults([]);
    const res = await fetch("/api/admin/recent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) { setStatus(json.error); return; }
    setResults(json.results || []);
  }

  async function lookup() {
    setLoading(true);
    setStatus("");
    setResults([]);
    const isEmail = query.includes("@");
    const res = await fetch("/api/admin/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, [isEmail ? "email" : "clearingId"]: query }),
    });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) { setStatus(json.error); return; }
    if (json.results) setResults(json.results);
    else setResults([{ clearingId: json.clearingId, data: json.data }]);
  }

  async function resend(clearingId: string) {
    const override = resendEmail[clearingId] || undefined;
    setResendStatus(s => ({ ...s, [clearingId]: "שולח..." }));
    const res = await fetch("/api/admin/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, clearingId, overrideEmail: override }),
    });
    const json = await res.json();
    setResendStatus(s => ({ ...s, [clearingId]: res.ok ? `✓ נשלח ל-${json.sentTo}` : json.error }));
  }

  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", fontFamily: "Arial" }}>
        <div style={{ width: 360, background: "white", borderRadius: 12, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: "center" }}>Signly Admin</h1>
          <input
            type="password"
            placeholder="סיסמת ניהול"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14, boxSizing: "border-box", direction: "rtl" }}
          />
          {authError && <p style={{ color: "#DC2626", fontSize: 13, marginTop: 8, textAlign: "center" }}>{authError}</p>}
          <button
            onClick={login}
            disabled={checkingAuth}
            style={{ width: "100%", marginTop: 12, padding: "10px", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            {checkingAuth ? "בודק..." : "כניסה"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "Arial, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24, color: "#0F172A" }}>Signly Admin — שחזור חוזים</h1>

        <div style={{ marginBottom: 16 }}>
          <button
            onClick={loadRecent}
            disabled={loading}
            style={{ padding: "10px 24px", background: "#0F172A", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            {loading ? "טוען..." : "הצג הזמנות אחרונות"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="מייל לקוח או clearing_id"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookup()}
            style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 14 }}
          />
          <button
            onClick={lookup}
            disabled={loading}
            style={{ padding: "10px 24px", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            {loading ? "מחפש..." : "חיפוש"}
          </button>
        </div>

        {status && <p style={{ color: "#DC2626", marginBottom: 16 }}>{status}</p>}

        {results.map(({ clearingId, data }) => (
          <div key={clearingId} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{data.freelancerName} / {data.clientName}</p>
                <p style={{ fontSize: 13, color: "#64748B" }}>מייל: {data.deliveryEmail} · מחיר: ₪{data.totalPrice} · {data.profession}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>ID: {clearingId}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => resend(clearingId)}
                style={{ padding: "8px 18px", background: "#16A34A", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                שלח מחדש למייל המקורי
              </button>
              <input
                type="email"
                placeholder="או מייל חלופי"
                value={resendEmail[clearingId] || ""}
                onChange={e => setResendEmail(r => ({ ...r, [clearingId]: e.target.value }))}
                style={{ padding: "8px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: 13, width: 200 }}
              />
              {resendEmail[clearingId] && (
                <button
                  onClick={() => resend(clearingId)}
                  style={{ padding: "8px 18px", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                >
                  שלח למייל החלופי
                </button>
              )}
              {resendStatus[clearingId] && (
                <span style={{ fontSize: 13, color: resendStatus[clearingId].startsWith("✓") ? "#16A34A" : "#DC2626" }}>
                  {resendStatus[clearingId]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
