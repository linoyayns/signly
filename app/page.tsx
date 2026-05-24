import Link from "next/link";
import { ScrollInit } from "@/components/ScrollInit";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", backgroundColor: "#FFFFFF", color: "#0F172A" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,31,61,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", height: 60, display: "flex", alignItems: "center" }}>
        <div className="mob-nav" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>
            Signly<span style={{ color: "#2563EB" }}>.</span>
          </span>
          <Link href="#how" className="nav-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.15s ease" }}>
            איך זה עובד
          </Link>
          <Link href="#pricing" className="nav-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.15s ease" }}>
            תמחור
          </Link>
          <Link
            href="/create"
            style={{ fontSize: 14, fontWeight: 700, padding: "8px 20px", borderRadius: 8, background: "#2563EB", color: "white", textDecoration: "none" }}
          >
            צור חוזה
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "120px 40px 80px", background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", color: "#2563EB", borderRadius: 100, padding: "6px 14px", fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB", display: "inline-block" }} />
            חוזים לפרילנסרים ישראלים
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.2, letterSpacing: -1.5, color: "#0F172A", marginBottom: 24, wordBreak: "keep-all" }}>
            <span className="hero-line hero-line-1">שלחת הצעה.</span>
            <span className="hero-line hero-line-2">הלקוח אישר.</span>
            <span className="hero-line hero-line-3" style={{ color: "#2563EB" }}>ואין לך חוזה.</span>
          </h1>
          <p className="hero-sub" style={{ fontSize: 18, color: "#64748B", lineHeight: 1.75, marginBottom: 40 }}>
            ענה על שאלות קצרות על הפרויקט שלך — ותוך דקות תקבל חוזה מקצועי בעברית, עם כל הסעיפים שמגינים עליך.<br />
            נבנה לפי עשרות חוזים ישראלים אמיתיים. מותאם לפרויקט שלך, לא תבנית גנרית.
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <Link
              href="/create"
              className="btn-glow"
              style={{ padding: "16px 32px", fontSize: 17, fontWeight: 700, background: "#2563EB", color: "white", borderRadius: 10, textDecoration: "none" }}
            >
              צור את החוזה שלי
            </Link>
            <Link
              href="#how"
              style={{ padding: "16px 24px", fontSize: 16, fontWeight: 600, background: "transparent", color: "#0F172A", border: "1.5px solid #CBD5E1", borderRadius: 10, textDecoration: "none" }}
            >
              איך זה עובד?
            </Link>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "#94A3B8", textDecoration: "line-through", fontWeight: 500 }}>עורך דין: 600–1,800₪</span>
            <span style={{ width: 1, height: 16, background: "#CBD5E1", display: "inline-block" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#2563EB" }}>Signly: 97₪ בלבד</span>
          </div>
          <div className="hero-trust" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["ללא הרשמה", "מוכן תוך דקות", "רואים את החוזה לפני שמשלמים"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                <span style={{ width: 18, height: 18, background: "#2563EB", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSIONS */}
      <section style={{ padding: "80px 40px", background: "#FFFFFF" }}>
        <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>למי זה מיועד</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5 }}>
              אם אתה עובד עם לקוחות,<br />אתה צריך חוזה.
            </h2>
          </div>
          <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "🎨", name: "מעצבים", desc: "UX/UI, גרפיקה, מיתוג – הגן על העבודה שלך" },
              { icon: "📷", name: "צלמים", desc: "הגדר בעלות, זכויות שימוש ותנאי מסירה" },
              { icon: "✍️", name: "כותבים", desc: "קופי, תוכן, עריכה – הגדר בעלות ולוחות זמנים" },
              { icon: "💬", name: "מאמנים", desc: "פיטנס, עסקים, קואוצ'ינג – הגדר תנאים ברורים" },
              { icon: "💻", name: "מפתחים", desc: "הגן על הקוד שלך ועל תנאי התשלום" },
              { icon: "📊", name: "יועצים", desc: "ניהול, שיווק, אסטרטגיה – הגדר תנאים ברורים" },
            ].map(({ icon, name, desc }) => (
              <div key={name} className="card-hover" style={{ padding: "24px 20px", border: "1px solid #E2E8F0", borderRadius: 12, background: "#F8FAFC" }}>
                <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1 }}>{icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{name}</div>
                <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#64748B" }}>
            ועוד מקצועות רבים — אם אתה עצמאי שעובד עם לקוחות, הכלי הזה בשבילך.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "80px 40px", background: "#F8FAFC" }}>
        <div className="reveal" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>תהליך</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5, marginBottom: 12 }}>שלושה שלבים. חוזה מוכן.</h2>
            <p style={{ fontSize: 16, color: "#64748B" }}>לא צריך לדעת משפטים. לא צריך להיות עורך דין. ענה על כמה שאלות וזהו.</p>
          </div>
          <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { step: "1", title: "ענה על שאלות", desc: "שאלון קצר ומדויק שמתאים לסוג הפרויקט שלך – מה, כמה, מתי" },
              { step: "2", title: "קבל חוזה", desc: "אני מייצר חוזה מקיף בעברית עם כל הסעיפים הנחוצים לפרויקט שלך" },
              { step: "3", title: "הורד PDF", desc: "מסמך מוכן לחתימה. שלח ללקוח, חתמו שניכם, התחל לעבוד בביטחה" },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(37,99,235,0.1)", color: "#2563EB", fontSize: 22, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  {step}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(124,58,237,0.08))", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 14, padding: "22px 28px", marginTop: 44, textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>
              חוזה שנכתב לפי אותם כללים שמקצוענים עובדים איתם.
            </p>
            <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 20px" }}>
              מותאם לפרויקט שלך — לא תבנית גנרית.
            </p>
            <Link href="/create" style={{ padding: "14px 32px", fontSize: 16, fontWeight: 700, background: "#2563EB", color: "white", borderRadius: 10, textDecoration: "none" }}>
              צור את החוזה שלי
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONALIZATION */}
      <section style={{ padding: "80px 40px", background: "#FFFFFF" }}>
        <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>שאלון חכם</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5, marginBottom: 12 }}>השאלון שחושב בשבילך.</h2>
            <p style={{ fontSize: 16, color: "#64748B", maxWidth: 580, margin: "0 auto" }}>הוא לא שואל שאלות גנריות. הוא מכיר את המקצוע שלך, ומציע הגנות שלא חשבת עליהן.</p>
          </div>
          <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            {[
              {
                profession: "צלם / צלמת",
                question: '"צילמת אלף תמונות. הלקוח בוחר 30. ואז אומר \'לא מה שציפיתי\' — ומסרב לשלם. מה כתוב בחוזה שלך?"',
                desc: "חוזה שמגדיר מראש כמה תמונות, באיזה סגנון ומה נחשב \"מסירה\" — סוגר את הדיון עוד לפני שהוא נפתח.",
              },
              {
                profession: "מעצב / כותב",
                question: '"הלקוח מכר את העסק שלו לחברה גדולה. החברה ממשיכה להשתמש בלוגו שעיצבת — בלי לשלם לך שקל נוסף. מה החוזה שלך אומר על זה?"',
                desc: "שאלה שעולה אחרי שזה כבר קרה. עדיף שהתשובה תהיה כתובה מראש.",
              },
              {
                profession: "יועץ / מאמן",
                question: '"לימדת לקוח את המתודולוגיה שלך. עכשיו הוא מקיים סדנאות בדיוק עם אותה שיטה — ולא הזכיר אותך. מה מגן עליך בחוזה?"',
                desc: "יש הבדל בין \"השתמש בתוצאות\" לבין \"שכפל את השיטה\". החוזה צריך להגדיר את הגבול.",
              },
            ].map(({ profession, question, desc }) => (
              <div key={profession} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 14, padding: "28px 24px" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>{profession}</div>
                <p style={{ fontSize: 14, color: "#64748B", marginBottom: 14, lineHeight: 1.6 }}>השאלון שואל אותך:</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 12, lineHeight: 1.5, borderRight: "3px solid #2563EB", paddingRight: 12 }}>{question}</p>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <p style={{ fontSize: 16, color: "#0F172A", fontWeight: 600, lineHeight: 1.6, maxWidth: 600 }}>
              יש משהו ספציפי שחשוב לך? תכתוב אותו בשפה שלך. אדאג שזה ייכנס לחוזה בניסוח ברור ומפורש.
            </p>
            <Link href="/create" style={{ padding: "14px 28px", fontSize: 16, fontWeight: 700, background: "#2563EB", color: "white", borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              צור את החוזה שלי
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section style={{ padding: "80px 40px", background: "#F8FAFC" }}>
        <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", color: "#2563EB", borderRadius: 100, padding: "6px 14px", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                👁 רואים לפני שמשלמים
              </div>
              <h2 style={{ fontSize: 34, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5, lineHeight: 1.25, marginBottom: 16 }}>
                החוזה שלך מוכן.<br />תראה אותו לפני שאתה משלם.
              </h2>
              <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.75, marginBottom: 24 }}>
                אחרי שאתה עונה על השאלון, אני מראה לך חלק מהחוזה שיצרתי עבורך — עם הפרטים שלך, מנוסח ומוכן. רואים שזה טוב? רק אז משלמים.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["הטקסט האמיתי שייכנס לחוזה שלך", "עם השם שלך ושם הלקוח שלך", "לפני כל תשלום"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#64748B" }}>
                    <span style={{ width: 20, height: 20, background: "#2563EB", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 16, padding: 28, boxShadow: "0 20px 40px rgba(0,0,0,0.10)", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 11, fontWeight: 700, textAlign: "center", color: "#64748B", letterSpacing: 2, marginBottom: 8 }}>SIGNLY CONTRACT</div>
              <div style={{ fontSize: 15, fontWeight: 800, textAlign: "center", borderBottom: "2px solid #0F172A", paddingBottom: 12, marginBottom: 16 }}>
                הסכם התקשרות –<br />שירותי עיצוב גרפי
              </div>
              <div style={{ fontSize: 13, color: "#0F172A", lineHeight: 1.8, direction: "rtl" }}>
                <p style={{ marginBottom: 10 }}><strong>הצדדים להסכם:</strong></p>
                <p style={{ marginBottom: 6 }}>נותן שירות: <strong>נועה כהן עיצוב</strong></p>
                <p style={{ marginBottom: 16 }}>לקוח: <strong>סטודיו ABC בע&quot;מ</strong></p>
                <p style={{ marginBottom: 10 }}><strong>1. תיאור השירות:</strong></p>
                <p style={{ marginBottom: 16 }}>נותן השירות יספק שירותי עיצוב גרפי הכוללים עיצוב לוגו, חומרים שיווקיים וסט מותג מלא...</p>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, white)", borderRadius: "0 0 16px 16px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748B" }}>
                  🔒 ממשיכים לסעיפים נוספים אחרי התשלום
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 40px", background: "#FFFFFF" }}>
        <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>פרילנסרים שכבר השתמשו</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5, marginBottom: 10 }}>מה הם אומרים.</h2>
            <p style={{ fontSize: 13, color: "#94A3B8" }}>פרילנסרים שכבר עובדים עם חוזה</p>
          </div>
          <div className="mob-testimonials" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {[
              {
                stars: "★★★★★",
                text: "\"הלקוח ניסה לטעון שלא הוסכם על מספר התיקונים. פתחתי את החוזה, הראיתי לו סעיף 4. השיחה הסתיימה תוך דקה.\"",
                author: "נועה כ. — מעצבת גרפית, תל אביב",
              },
              {
                stars: "★★★★★",
                text: "\"תמיד ידעתי שצריך חוזה. פשוט לא ידעתי מאיפה להתחיל. לקח לי 3 דקות, קיבלתי משהו שנראה מקצועי באמת.\"",
                author: "יובל מ. — צלם, חיפה",
              },
              {
                stars: "★★★★☆",
                text: "\"קיבלתי את החוזה, שלחתי ללקוח — ואז נזכרתי שרציתי להוסיף סעיף על זכויות הפצה. שלחתי מייל, ותוך כמה שעות קיבלתי גרסה מעודכנת. לא ציפיתי שיגיבו כל כך מהר.\"",
                author: "שירה ל. — כותבת תוכן, ירושלים",
              },
              {
                stars: "★★★★★",
                text: "\"עורך דין ביקש ממני 1,200₪ על חוזה בסיסי. אני עסק בתחילת הדרך — זה לא ריאלי. מצאתי את Signly, שילמתי ₪97 וקיבלתי חוזה שנראה בדיוק כמו מה שציפיתי לקבל שם.\"",
                author: "מאיה ר. — מאיירת פרילנס, באר שבע",
              },
            ].map(({ stars, text, author }) => (
              <div key={author} className="card-hover" style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ color: "#F59E0B", fontSize: 16, letterSpacing: 2 }}>{stars}</div>
                  <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 700, background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 99, padding: "2px 8px" }}>✓ מאומת</div>
                </div>
                <p style={{ fontSize: 15, color: "#0F172A", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>{text}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>{author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / AI */}
      <section style={{ padding: "80px 40px", background: "#FFFFFF" }}>
        <div className="reveal" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(124,58,237,0.08) 100%)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 20, padding: "48px 56px", textAlign: "center", marginBottom: 44 }}>
            <h3 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", marginBottom: 14 }}>
              למדנו ממי שעושה את זה הכי טוב.
            </h3>
            <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.75, maxWidth: 660, margin: "0 auto 32px" }}>
              עברנו על מעל 50 חוזים ישראלים שנכתבו על ידי עורכי דין מנוסים — כדי להבין אילו סעיפים חוזרים בכל חוזה מקצועי, אילו ניסוחים עומדים בלחץ משפטי, ואיך גבולות מוגדרים בצורה ברורה ואכיפה.<br /><br />
              <strong style={{ color: "#0F172A" }}>התוצאה: חוזה שנכתב לפי אותם כללים שמקצוענים עובדים איתם — מותאם לפרויקט שלך, בניסוח שעומד בבית משפט.</strong>
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
              {[
                { num: "3 דק׳", label: "ממילוי שאלון ועד חוזה מוכן" },
                { num: "₪97", label: "מחיר אחד. ללא הפתעות" },
                { num: "2026", label: "מעודכן לחוק הישראלי" },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: "#2563EB", letterSpacing: -1.5, display: "block", lineHeight: 1, marginBottom: 6 }}>{num}</span>
                  <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mob-col1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { title: "מותאם לחוק הישראלי", desc: "כל סעיף תואם את חוק החוזים, חוק זכויות יוצרים וחוק הגנת הפרטיות הישראלי." },
              { title: "בצד שלך, תמיד", desc: "דאגנו לכל הסעיפים שמגנים עליך ועל הזכויות שלך — כולל כאלה שאולי לא ידעת שצריך לבקש." },
              { title: "שדה פתוח לבקשות", desc: "יש סעיף מיוחד שחשוב לך? כתוב בשפה שלך — נמיר לניסוח משפטי." },
            ].map(({ title, desc }) => (
              <div key={title} className="card-hover" style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 24, background: "white", border: "1px solid #E2E8F0", borderRadius: 12 }}>
                <div style={{ width: 42, height: 42, background: "rgba(37,99,235,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB", flexShrink: 0, fontSize: 18 }}>✓</div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", marginBottom: 4 }}>{title}</h4>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 40px", background: "#F8FAFC" }}>
        <div className="reveal" style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>תמחור</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -0.5, marginBottom: 12 }}>מחיר אחד. ללא הפתעות.</h2>
          <p style={{ fontSize: 16, color: "#64748B", marginBottom: 40 }}>עורכי דין לוקחים בין 500-1,800₪ על חוזה. אנחנו לוקחים 97₪.</p>
          <div style={{ background: "white", border: "1.5px solid #E2E8F0", borderRadius: 20, padding: "40px 32px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>חד-פעמי</div>
            <div style={{ fontSize: 72, fontWeight: 900, color: "#0F172A", letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}><span style={{ fontSize: 32 }}>₪</span>97</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 32 }}>ללא מנוי · ללא הפתעות</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32, textAlign: "right" }}>
              {[
                "חוזה מקצועי בעברית, מלא וסגור",
                "מבוסס על עשרות חוזים ישראלים אמיתיים",
                "כולל סעיפי תשלום, ביטול ובעלות",
                "PDF להורדה מיידית",
                "ללא הרשמה, ללא מנוי",
                "לא מרוצה? שלח מייל ותקבל תיקון תוך 24 שעות",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#374151" }}>
                  <span style={{ color: "#2563EB", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/create"
              className="btn-glow"
              style={{ display: "block", width: "100%", padding: "16px", fontSize: 17, fontWeight: 700, background: "#2563EB", color: "white", borderRadius: 10, textDecoration: "none", textAlign: "center" }}
            >
              צור את החוזה שלי עכשיו
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 40px", background: "#FFFFFF" }}>
        <div className="reveal" style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", textAlign: "center", marginBottom: 48, letterSpacing: -0.5 }}>שאלות נפוצות</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                q: "האם החוזה תקף מבחינה משפטית?",
                a: "חוזה שנחתם בין שני צדדים תקף משפטית בישראל. Signly מכינה את המסמך ברמה מקצועית: שולחים ללקוח, חותמים, ומתחילים לעבוד. Signly אינה משרד עורכי דין. לעסקאות מורכבות מומלץ לקבל ייעוץ פרטני.",
              },
              {
                q: "כמה זמן לוקח ליצור חוזה?",
                a: "בממוצע 3-5 דקות. עונים על שאלות קצרות על הפרויקט שלך, המערכת מייצרת חוזה מותאם, ואת/ה מקבל PDF מוכן להורדה.",
              },
              {
                q: "מה קורה אם לא מרוצה מהחוזה?",
                a: "שלח מייל ל-service@mysignly.com עם מה שרצית לשנות, ונחזור אליך עם גרסה מעודכנת תוך 24 שעות בימי עסקים. בלי בירוקרטיה.",
              },
              {
                q: "האם צריך להירשם?",
                a: "לא. ממלאים שאלון, משלמים, ומקבלים PDF. אין סיסמאות, אין פרופיל, אין מנוי.",
              },
              {
                q: "לאיזה סוגי פרויקטים מתאים?",
                a: "לכל פרילנסר או עצמאי שעובד עם לקוחות: מעצבים, צלמים, כותבים, מפתחים, מאמנים, יועצים ועוד. אם אתה מספק שירות בתמורה לתשלום – הכלי הזה בשבילך.",
              },
              {
                q: "מה ההבדל בין Signly לתבנית חינמית?",
                a: "תבנית חינמית היא גנרית — אותו טקסט לצלם, למעצב ולמאמן. Signly שואל אותך שאלות ספציפיות למקצוע שלך ולפרויקט, ומייצר חוזה שמתאים בדיוק למה שסיכמת עם הלקוח. בנוסף: תבנית חינמית לא תזכיר לך שאלות שלא חשבת עליהן.",
              },
              {
                q: "האם הלוגו של Signly יופיע על המסמך הסופי?",
                a: "לא. החוזה הוא שלך לחלוטין — עם השם שלך, עם פרטי הפרויקט שלך, ובלי שום ציון של Signly. הלקוח שלך מקבל מסמך נקי ומקצועי.",
              },
            ].map(({ q, a }, i) => (
              <div key={q} style={{ padding: "24px 0", borderBottom: i < 6 ? "1px solid #E2E8F0" : "none" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ padding: "80px 40px", background: "#0F172A", textAlign: "center" }}>
        <div className="reveal" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "white", marginBottom: 16, letterSpacing: -0.5 }}>
            מוכן להגן על עצמך?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginBottom: 36, lineHeight: 1.7 }}>
            אל תתחיל פרויקט ללא חוזה. 3 דקות עכשיו חוסכות לך כאב ראש בעתיד.
          </p>
          <Link
            href="/create"
            className="btn-glow"
            style={{ display: "inline-block", padding: "18px 40px", fontSize: 18, fontWeight: 700, background: "white", color: "#0F172A", borderRadius: 10, textDecoration: "none" }}
          >
            צור את החוזה שלי ←
          </Link>
        </div>
      </section>

      <ScrollInit />

      {/* FOOTER */}
      <footer className="mob-footer" style={{ borderTop: "1px solid #E2E8F0", padding: "24px 40px", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 900, color: "#0F172A" }}>Signly<span style={{ color: "#2563EB" }}>.</span></span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/accessibility" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>הצהרת נגישות</Link>
          <Link href="/terms" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>תקנון</Link>
          <Link href="/privacy" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>מדיניות פרטיות</Link>
        </div>
        <span style={{ fontSize: 13, color: "#94A3B8" }}>© 2026 Signly. כל הזכויות שמורות.</span>
      </footer>

    </main>
  );
}
