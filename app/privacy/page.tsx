import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות — Signly",
  description: "מדיניות הפרטיות של Signly — איך אנחנו מתייחסים למידע שלך",
};

export default function PrivacyPage() {
  return (
    <main dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: "#F8FAFC", minHeight: "100vh", color: "#0F172A" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(15,31,61,0.97)", height: 60, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>Signly<span style={{ color: "#533afd" }}>.</span></span>
        </Link>
        <Link href="/" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>← חזרה לדף הבית</Link>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 32px 100px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#533afd", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>משפטי</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -1, marginBottom: 12 }}>מדיניות פרטיות</h1>
          <p style={{ fontSize: 14, color: "#64748B" }}>עדכון אחרון: יוני 2026</p>
        </div>

        {/* Intro box */}
        <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 12, padding: "20px 24px", marginBottom: 40 }}>
          <p style={{ fontSize: 15, color: "#533afd", fontWeight: 700, marginBottom: 6 }}>בשורה אחת:</p>
          <p style={{ fontSize: 14, color: "#4c1d95", lineHeight: 1.7 }}>
            Signly משתמשת במידע שאתה מזין <strong>אך ורק כדי לייצר את החוזה שלך</strong>. אנחנו לא מוכרים מידע, לא משתפים אותו עם צדדים שלישיים ולא עושים איתו שום דבר מעבר לכך.
          </p>
        </div>

        <Section title="1. מי אנחנו">
          <p>Signly היא פלטפורמה לייצור חוזי פרילנס בעברית, המופעלת בישראל. לפניות בנושא פרטיות: <strong>privacy@mysignly.com</strong></p>
        </Section>

        <Section title="2. איזה מידע אנחנו אוספים">
          <p style={{ marginBottom: 12 }}>במהלך מילוי השאלון אתה מזין מרצונך:</p>
          <ul style={{ paddingRight: 20, lineHeight: 2, color: "#475569" }}>
            <li>שם מלא ותעודת זהות / ח.פ.</li>
            <li>עיר מגורים</li>
            <li>פרטי הלקוח שלך (שם, ת.ז., מייל)</li>
            <li>פרטי הפרויקט — תיאור, מחיר, תאריכים</li>
            <li>כתובת מייל לקבלת החוזה</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            <strong>חשוב:</strong> המידע נשמר באופן זמני בלבד ב-sessionStorage של הדפדפן שלך — כלומר, הוא נמחק ברגע שסוגרים את הטאב. אנחנו לא שומרים את הפרטים האישיים שלך בשרת לאחר מסירת החוזה.
          </p>
        </Section>

        <Section title="3. למה אנחנו משתמשים במידע">
          <p style={{ marginBottom: 12 }}>המידע שאתה מזין משמש <strong>לשלושה דברים בלבד:</strong></p>
          <ul style={{ paddingRight: 20, lineHeight: 2, color: "#475569" }}>
            <li>ייצור מסמך החוזה המותאם אישית שלך</li>
            <li>שליחת החוזה לכתובת המייל שסיפקת</li>
            <li>עיבוד התשלום דרך Invoice4U (ראה סעיף 4)</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            אנחנו <strong>לא</strong> שולחים ניוזלטרים, לא מבצעים פרסום ממוקד ולא מנתחים את המידע שלך לשום מטרה שיווקית.
          </p>
        </Section>

        <Section title="4. שיתוף עם צדדים שלישיים">
          <p style={{ marginBottom: 12 }}>המידע שלך <strong>אינו נמכר ואינו מועבר</strong> לצדדים שלישיים, למעט:</p>
          <ul style={{ paddingRight: 20, lineHeight: 2, color: "#475569" }}>
            <li><strong>Invoice4U</strong> — לצורך עיבוד התשלום בלבד, בהתאם למדיניות הפרטיות שלהם</li>
            <li><strong>Anthropic (Claude AI)</strong> — לצורך ייצור החוזה בזמן אמת. הנתונים אינם נשמרים לאחר הייצור</li>
          </ul>
        </Section>

        <Section title="5. אבטחת המידע">
          <p>
            התקשורת באתר מוצפנת באמצעות HTTPS. פרטי התשלום אינם עוברים דרך שרתי Signly — הם מטופלים ישירות על ידי Invoice4U בסביבה מאובטחת ומוצפנת.
          </p>
        </Section>

        <Section title="6. הזכויות שלך">
          <p style={{ marginBottom: 12 }}>בהתאם לחוק הגנת הפרטיות הישראלי (תשמ&quot;א-1981), יש לך זכות:</p>
          <ul style={{ paddingRight: 20, lineHeight: 2, color: "#475569" }}>
            <li>לדעת אילו פרטים קיימים עליך אצלנו</li>
            <li>לבקש תיקון של פרטים שגויים</li>
            <li>לבקש מחיקה של הפרטים שלך</li>
          </ul>
          <p style={{ marginTop: 12 }}>לכל פנייה: <strong>privacy@mysignly.com</strong> — נחזור תוך 48 שעות.</p>
        </Section>

        <Section title="7. עוגיות (Cookies)">
          <p>
            האתר משתמש בעוגיות טכניות בסיסיות בלבד הנחוצות להפעלתו התקינה. אנחנו לא משתמשים בעוגיות פרסומיות, כלי מעקב או Google Analytics.
          </p>
        </Section>

        <Section title="8. שינויים במדיניות">
          <p>
            במקרה של שינויים מהותיים, נעדכן את התאריך בראש הדף. המשך השימוש בשירות לאחר עדכון מהווה הסכמה לשינויים.
          </p>
        </Section>

        {/* Footer links */}
        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 32, marginTop: 48 }}>
          <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, marginBottom: 20 }}>
            שאלות? כתבו ל-<strong>privacy@mysignly.com</strong>
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/terms" style={{ fontSize: 14, color: "#533afd", textDecoration: "none", fontWeight: 600 }}>תקנון שימוש</Link>
            <Link href="/" style={{ fontSize: 14, color: "#533afd", textDecoration: "none", fontWeight: 600 }}>← דף הבית</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #F1F5F9" }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}
