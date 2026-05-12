import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "Signly — חוזים מקצועיים לפרילנסרים",
  description: "חוזים מקצועיים לפרילנסרים — נבדקו על ידי עורך דין, נכתבו על ידי AI. בחמש דקות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-heebo), sans-serif" }}>
        <Script src="https://cdn.enable.co.il/licenses/enable-L55124s8cp12k3gg-0526-81985/init.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
