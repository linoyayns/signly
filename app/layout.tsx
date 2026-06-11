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
  metadataBase: new URL("https://www.mysignly.com"),
  verification: {
    google: "IZ-EATuDefqACYZSmJIV6hMzqQZQ_8ivlibkU3rPwdY",
  },
  title: "Signly — חוזים מקצועיים לפרילנסרים",
  description: "ענה על שאלות קצרות על הפרויקט שלך ותוך דקות תקבל חוזה מקצועי בעברית. ₪97 בלבד, ללא הרשמה.",
  openGraph: {
    title: "Signly — חוזים מקצועיים לפרילנסרים",
    description: "ענה על שאלות קצרות על הפרויקט שלך ותוך דקות תקבל חוזה מקצועי בעברית. ₪97 בלבד, ללא הרשמה.",
    url: "https://www.mysignly.com",
    siteName: "Signly",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signly — חוזים מקצועיים לפרילנסרים",
    description: "ענה על שאלות קצרות ותוך דקות תקבל חוזה מקצועי בעברית. ₪97 בלבד.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-heebo), sans-serif" }}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0MEPPZ6QQR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0MEPPZ6QQR');
        `}</Script>
        <Script src="https://cdn.enable.co.il/licenses/enable-L55124s8cp12k3gg-0526-81985/init.js" strategy="afterInteractive" />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1743591240142619');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1743591240142619&ev=PageView&noscript=1" />
        </noscript>
        {children}
      </body>
    </html>
  );
}
