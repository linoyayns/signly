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
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: "#533afd",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
              color: "white",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 64, fontWeight: 900, color: "white", letterSpacing: -2 }}>
            Signly<span style={{ color: "#533afd" }}>.</span>
          </span>
        </div>

        {/* Tagline in English */}
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            margin: "0 0 48px",
            lineHeight: 1.4,
          }}
        >
          Professional freelance contracts in Hebrew
        </p>

        {/* Pills in English */}
        <div style={{ display: "flex", gap: 20 }}>
          {["No sign-up", "Ready in minutes", "Only ₪97"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(83,58,253,0.25)",
                border: "1.5px solid rgba(83,58,253,0.5)",
                borderRadius: 99,
                padding: "12px 28px",
                fontSize: 22,
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
