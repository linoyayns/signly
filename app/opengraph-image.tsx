import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Signly — חוזים מקצועיים לפרילנסרים";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div
            style={{
              width: 76,
              height: 76,
              background: "#533afd",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 900,
              color: "white",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 58, fontWeight: 900, color: "white" }}>
            Signly
            <span style={{ color: "#533afd" }}>.</span>
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            margin: "0 0 48px",
            lineHeight: 1.4,
          }}
        >
          חוזים מקצועיים לפרילנסרים ישראלים
        </p>

        {/* Pills */}
        <div style={{ display: "flex", gap: 20 }}>
          {["ללא הרשמה", "מוכן תוך דקות", "₪97 בלבד"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(83,58,253,0.25)",
                border: "1.5px solid rgba(83,58,253,0.5)",
                borderRadius: 99,
                padding: "10px 26px",
                fontSize: 20,
                color: "#a5b4fc",
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
