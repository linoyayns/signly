import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold" style={{ color: "#0F1F3D" }}>Signly</span>
          <Link
            href="/create"
            className="text-sm font-semibold px-5 py-2 rounded text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            צור חוזה
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#0F1F3D" }}>
            שלחת הצעה.<br />הלקוח אישר.<br /><span style={{ color: "#2563EB" }}>ואין לך חוזה.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            חוזה פרילנסר מקצועי בעברית, מוכן תוך דקות ספורות.<br />
            אני לא עורך דין.<br />
            אני AI שלמד מעשרות חוזים ישראליים אמיתיים — ויודע בדיוק אילו סעיפים מגינים עליך.
          </p>

          <Link
            href="/create"
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded"
            style={{ backgroundColor: "#2563EB" }}
          >
            צור חוזה עכשיו
          </Link>

          {/* Trust badges */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">✓</span>
              <span>נבדק על ידי עורכי דין</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">✓</span>
              <span>מותאם לחוק הישראלי</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">✓</span>
              <span>מחיר אחד: 97₪</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-t border-gray-200 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: "#0F1F3D" }}>
            איך זה עובד
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "עונה על שאלות", desc: "ממשק שיחה פשוט. 10 שאלות קצרות על הפרויקט שלך." },
              { step: "02", title: "משלם 97₪", desc: "תשלום מאובטח. חד-פעמי. ללא מנוי." },
              { step: "03", title: "מוריד חוזה", desc: "חוזה מקצועי בעברית, מוכן לחתימה." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-4xl font-bold mb-4" style={{ color: "#2563EB", opacity: 0.35 }}>
                  {step}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "#0F1F3D" }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#0F1F3D" }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            מוכן להגן על עצמך?
          </h2>
          <p className="text-gray-300 mb-8">
            אל תתחיל פרויקט ללא חוזה. 5 דקות עכשיו חוסכות לך כאב ראש בעתיד.
          </p>
          <Link
            href="/create"
            className="inline-block px-8 py-4 text-lg font-semibold rounded bg-white"
            style={{ color: "#0F1F3D" }}
          >
            צור חוזה עכשיו — 97₪
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400 bg-white">
        © 2025 Signly. כל הזכויות שמורות.
        {" · "}
        <Link href="/accessibility" className="underline hover:text-gray-600">
          הצהרת נגישות
        </Link>
      </footer>
    </main>
  );
}
