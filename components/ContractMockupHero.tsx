"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PAGES = [
  // Page 1 — Parties
  (
    <div key="p1" style={{ fontSize: 11, color: "#0F172A", lineHeight: 1.7 }}>
      <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 4 }}>הסכם שירותי עיצוב זהות מיתוגית</div>
      <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 14 }}>נערך ביום 1 ביוני 2026, בתל אביב-יפו</div>
      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#533afd", marginBottom: 8 }}>א. הצדדים</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 4 }}>א.1. נותן השירות</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <div style={{ height: 8, background: "rgba(83,58,253,0.15)", borderRadius: 4, width: 90 }} />
          <span style={{ fontSize: 9, color: "#94A3B8" }}>מעצבת גרפית עצמאית</span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 4 }}>א.2. הלקוח</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <div style={{ height: 8, background: "rgba(83,58,253,0.15)", borderRadius: 4, width: 75 }} />
          <span style={{ fontSize: 9, color: "#94A3B8" }}>חברה פרטית, ח.פ.</span>
          <div style={{ height: 8, background: "rgba(83,58,253,0.1)", borderRadius: 4, width: 48 }} />
        </div>
        <div style={{ fontSize: 10, color: "#475569" }}>
          נותן השירות והלקוח יכונו יחדיו להלן <strong>&quot;הצדדים&quot;</strong>.
        </div>
      </div>
    </div>
  ),

  // Page 2 — Scope
  (
    <div key="p2" style={{ fontSize: 11, color: "#0F172A", lineHeight: 1.7 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#533afd", marginBottom: 8 }}>ב.1. תיאור השירות</div>
      <div style={{ fontSize: 10, color: "#475569", marginBottom: 8 }}>
        נותן השירות מתחייב לספק ללקוח שירותי עיצוב זהות מיתוגית מלאה, הכוללים את כל אלה:
      </div>
      {[
        { b: "לוגו חברה:", t: "שלוש הצעות קונספט, פיתוח הכיוון הנבחר, קבצים בפורמטים AI, PDF, PNG ו-SVG." },
        { b: "פלטת צבעים:", t: "שפה ויזואלית הכוללת קודי HEX, CMYK ו-Pantone." },
        { b: "מדריך מיתוג:", t: "מסמך מקצועי בן 20–30 עמודים." },
        { b: "תבנית מצגת:", t: "15 שקפים ב-Google Slides ו-PowerPoint." },
      ].map(({ b, t }) => (
        <div key={b} style={{ display: "flex", gap: 5, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{ color: "#533afd", fontSize: 10, marginTop: 1, flexShrink: 0 }}>—</span>
          <span style={{ fontSize: 10, color: "#475569" }}><strong style={{ color: "#374151" }}>{b}</strong> {t}</span>
        </div>
      ))}
    </div>
  ),

  // Page 3 — Payment
  (
    <div key="p3" style={{ fontSize: 11, color: "#0F172A", lineHeight: 1.7 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#533afd", marginBottom: 8 }}>ג. תמורה ותנאי תשלום</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f7ff", borderRadius: 6, padding: "8px 10px", marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: "#64748B" }}>ג.1. סכום כולל + מע&quot;מ</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#533afd" }}>₪8,500</span>
      </div>
      <div style={{ fontSize: 10, color: "#475569", marginBottom: 6 }}>ג.2. מבנה התשלומים:</div>
      {[
        { b: "מקדמה בחתימה:", t: "₪2,550 (30%) — תנאי מקדים לתחילת הפרויקט." },
        { b: "יתרת התשלום:", t: "₪5,950 (70%) — עם מסירת קבצי הסיום הסופיים." },
      ].map(({ b, t }) => (
        <div key={b} style={{ display: "flex", gap: 5, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{ color: "#533afd", fontSize: 10, marginTop: 1, flexShrink: 0 }}>—</span>
          <span style={{ fontSize: 10, color: "#475569" }}><strong style={{ color: "#374151" }}>{b}</strong> {t}</span>
        </div>
      ))}
      <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 6, padding: "7px 10px", marginTop: 8 }}>
        <span style={{ fontSize: 10, color: "#92400E" }}>ג.4. איחור בתשלום: דמי פיגורים בשיעור 0.05% ליום מיום החריגה.</span>
      </div>
    </div>
  ),

  // Page 4 — IP
  (
    <div key="p4" style={{ fontSize: 11, color: "#0F172A", lineHeight: 1.7 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#533afd", marginBottom: 8 }}>ז. קניין רוחני ובעלות</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 4 }}>ז.1. העברת בעלות עם תשלום מלא</div>
      <div style={{ fontSize: 10, color: "#475569", marginBottom: 12 }}>
        עם קבלת מלוא התמורה החוזית, יועברו ללקוח <strong>כל זכויות הקניין הרוחני</strong> ביצירות הסופיות — לרבות זכויות שימוש בלעדיות, הפצה ושינוי — לכל מטרה עסקית, ללא הגבלת זמן.
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", marginBottom: 4 }}>ז.3. טרם תשלום מלא</div>
      <div style={{ fontSize: 10, color: "#475569" }}>
        כל עוד לא שולמה מלוא התמורה — כל הזכויות בתוצרים נותרות בבעלות נותן השירות בלבד, והלקוח אינו רשאי לעשות בהם שימוש כלשהו.
      </div>
    </div>
  ),
];

export function ContractMockupHero() {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setPage(idx);
      setAnimating(false);
    }, 180);
  };

  const next = () => goTo((page + 1) % PAGES.length);
  const prev = () => goTo((page - 1 + PAGES.length) % PAGES.length);

  useEffect(() => {
    if (hovered) return;
    timerRef.current = setTimeout(next, 3500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [page, hovered]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: "white",
        border: "1px solid #e8e3ff",
        borderRadius: 16,
        boxShadow: "0 24px 60px rgba(83,58,253,0.14), 0 4px 16px rgba(0,0,0,0.06)",
        width: "100%",
        maxWidth: 340,
        transform: "rotate(-0.8deg)",
        direction: "rtl",
        fontFamily: "inherit",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px 12px", borderBottom: "1.5px solid #F1F5F9" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "#533afd", letterSpacing: 1.5 }}>חוזה שירות</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: "#0F172A" }}>Signly<span style={{ color: "#533afd" }}>.</span></span>
        </div>

        {/* Page content */}
        <div style={{
          padding: "16px 20px",
          minHeight: 280,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}>
          {PAGES[page]}
        </div>

        {/* Last-page CTA */}
        {page === PAGES.length - 1 && (
          <div style={{
            margin: "0 20px",
            padding: "10px 14px",
            background: "linear-gradient(135deg, #ede9fe, #faf5ff)",
            border: "1px solid #c4b5fd",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.18s ease",
          }}>
            <span style={{ fontSize: 11, color: "#533afd", fontWeight: 700 }}>רוצה לראות את החוזה המלא?</span>
            <Link href="/sample" style={{ fontSize: 11, fontWeight: 800, color: "#533afd", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
              לחץ כאן ←
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div style={{ borderTop: "1px solid #F1F5F9", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={prev}
            style={{ background: "none", border: "1px solid #E2E8F0", borderRadius: 9999, width: 28, height: 28, cursor: "pointer", fontSize: 12, color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            →
          </button>
          {/* Dots */}
          <div style={{ display: "flex", gap: 5 }}>
            {PAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === page ? 16 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === page ? "#533afd" : "#E2E8F0",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            style={{ background: "none", border: "1px solid #E2E8F0", borderRadius: 9999, width: 28, height: 28, cursor: "pointer", fontSize: 12, color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ←
          </button>
        </div>
      </div>
    </div>
  );
}
