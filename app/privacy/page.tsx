import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות | Signly",
  description: "מדיניות הפרטיות של Signly — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך",
};

export default function PrivacyPage() {
  return (
    <main dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", backgroundColor: "#FFFFFF", color: "#0F172A", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,31,61,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)", height: 60, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: "white", textDecoration: "none" }}>
            Signly<span style={{ color: "#2563EB" }}>.</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
            ← חזרה לדף הבית
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 40px 80px" }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#2563EB", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>מסמך משפטי</div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#0F172A", letterSpacing: -1, marginBottom: 16 }}>מדיניות פרטיות</h1>
          <p style={{ fontSize: 14, color: "#64748B" }}>עדכון אחרון: מאי 2026</p>
        </div>

        {/* INTRO BOX */}
        <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>
            Signly מחויבת להגן על פרטיות המשתמשים. מדיניות פרטיות זו מסבירה אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם, ומה הזכויות שלך. מדיניות זו חלה על כל שימוש באתר <strong>mysignly.com</strong> ובשירותיו. השימוש בשירות מהווה הסכמה למדיניות זו.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>1. מי אחראי לעיבוד הנתונים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              <strong>שם העסק:</strong> Signly
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              <strong>כתובת לפניות פרטיות:</strong>{" "}
              <a href="mailto:service@mysignly.com" style={{ color: "#2563EB", textDecoration: "none" }}>service@mysignly.com</a>
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              Signly היא הגוף האחראי (Controller) על עיבוד הנתונים האישיים שנאספים במסגרת השירות, בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותקנותיו.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>2. אילו נתונים אנו אוספים</h2>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>2.1 נתונים שאתה מספק ישירות</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {[
                { label: "שם מלא", desc: "לצורך הכנסתו לחוזה המופק" },
                { label: "כתובת דואר אלקטרוני", desc: "לצורך משלוח קובץ ה-PDF ומענה לפניות שירות לקוחות" },
                { label: "פרטי הפרויקט", desc: "תשובות לשאלון — שם הלקוח, תיאור הפרויקט, תנאים כספיים, מועדים וכד'" },
                { label: "שדה בקשות מיוחדות", desc: "אם בחרת להוסיף סעיפים ספציפיים" },
              ].map(({ label, desc }) => (
                <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563EB", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{label}: </span>
                    <span style={{ fontSize: 14, color: "#64748B" }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>2.2 נתוני תשלום</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              פרטי כרטיס האשראי מוזנים ישירות לממשק של Stripe ו<strong>אינם עוברים דרך שרתי Signly ואינם נשמרים אצלנו בשום צורה.</strong> אנו שומרים אך ורק את: מזהה עסקה, סכום, מטבע, ומועד התשלום — לצרכי רישום חשבונאי ועמידה בדרישות חוק.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>2.3 נתונים טכניים</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              כחלק מהפעלת האתר, עשויים להיאסף באופן אוטומטי: כתובת IP, סוג דפדפן, מערכת הפעלה, עמודים שנצפו ומשך הביקור — באמצעות תשתיות הגישה של Vercel (ספק האירוח). נתונים אלו משמשים לניתוח טכני בלבד ואינם משויכים לזהות המשתמש.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>3. כיצד אנו משתמשים בנתונים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              אנו משתמשים בנתוניך <strong>אך ורק</strong> למטרות הבאות:
            </p>
            <ul style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, paddingRight: 20, marginBottom: 12 }}>
              <li style={{ marginBottom: 8 }}><strong>יצירת החוזה המותאם אישית</strong> — הנתונים שסיפקת בשאלון מועברים למנוע ה-AI לצורך הפקת המסמך</li>
              <li style={{ marginBottom: 8 }}><strong>משלוח קובץ ה-PDF</strong> — כתובת המייל משמשת להעברת המסמך המוכן</li>
              <li style={{ marginBottom: 8 }}><strong>שירות לקוחות ותיקונים</strong> — מענה לפניות ולבקשות שיפור</li>
              <li style={{ marginBottom: 8 }}><strong>עמידה בחובות חוקיות</strong> — שמירת רישומי עסקה לצרכי חשבונאות ומס</li>
              <li style={{ marginBottom: 0 }}><strong>שיפור השירות</strong> — ניתוח סטטיסטי אנונימי ומצרפי של תבניות שאלונים (ללא מידע מזהה)</li>
            </ul>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              <strong>אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלך לצדדים שלישיים לצרכי שיווק.</strong>
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>4. שמירת נתונים ומחיקתם</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              {[
                { item: "תשובות השאלון ותוכן החוזה", retention: "נמחקים לאחר הפקת ה-PDF ומשלוחו" },
                { item: "כתובת מייל", retention: "נשמרת עד 30 יום לצורך אפשרות שירות לקוחות, לאחר מכן נמחקת" },
                { item: "רישומי עסקה (לא פרטי כרטיס)", retention: "נשמרים 7 שנים בהתאם לחוק עוסקים וחשבונאות" },
                { item: "לוגים טכניים", retention: "נשמרים עד 90 יום ונמחקים" },
              ].map(({ item, retention }, i) => (
                <div key={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: i % 2 === 0 ? "#F8FAFC" : "white", borderBottom: i < 3 ? "1px solid #E2E8F0" : "none" }}>
                  <div style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: "#0F172A", borderLeft: "1px solid #E2E8F0" }}>{item}</div>
                  <div style={{ padding: "12px 16px", fontSize: 14, color: "#64748B" }}>{retention}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              מאחר שאין מערכת חשבונות משתמשים בשירות, <strong>לא נשמר מידע אישי מתמשך.</strong> כל ביקור בשירות הוא עצמאי ואינו מקושר לביקורים קודמים.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>5. קובצי Cookie ועוגיות</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              Signly עושה שימוש מינימלי בעוגיות (Cookies):
            </p>
            <ul style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, paddingRight: 20, marginBottom: 12 }}>
              <li style={{ marginBottom: 8 }}><strong>עוגיות סשן (Session Cookies)</strong> — נחוצות להפעלת השאלון ולשמירת ההתקדמות בתהליך. נמחקות עם סיום הדפדפן.</li>
              <li style={{ marginBottom: 0 }}><strong>עוגיות תשלום</strong> — שמשמשות את Stripe לאבטחת תהליך התשלום. כפופות למדיניות הפרטיות של Stripe.</li>
            </ul>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              <strong>אין שימוש בעוגיות מעקב, עוגיות פרסום, או כלי ניתוח צד שלישי כגון Google Analytics.</strong> ניתן להגדיר את הדפדפן לחסום עוגיות, אך הדבר עשוי לפגוע בפונקציונליות השאלון.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>6. שיתוף מידע עם צדדים שלישיים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 16 }}>
              Signly עובדת עם ספקי שירות חיצוניים הנחוצים להפעלת השירות. להלן הספקים ותפקידם:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  name: "Stripe",
                  role: "עיבוד תשלומים",
                  data: "מידע עסקה (לא פרטי כרטיס — אלה עוברים ישירות ל-Stripe)",
                  link: "https://stripe.com/privacy",
                  linkText: "מדיניות פרטיות Stripe",
                },
                {
                  name: "Vercel",
                  role: "אירוח האתר",
                  data: "לוגים טכניים, כתובות IP (אנונימיות)",
                  link: "https://vercel.com/legal/privacy-policy",
                  linkText: "מדיניות פרטיות Vercel",
                },
                {
                  name: "Anthropic / Claude AI",
                  role: "יצירת תוכן החוזה",
                  data: "תוכן השאלון (ללא מידע תשלום), לצורך הפקת המסמך בלבד",
                  link: "https://www.anthropic.com/privacy",
                  linkText: "מדיניות פרטיות Anthropic",
                },
              ].map(({ name, role, data, link, linkText }) => (
                <div key={name} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.08)", padding: "3px 10px", borderRadius: 100 }}>{role}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#64748B", marginBottom: 8, lineHeight: 1.6 }}><strong>מידע מועבר:</strong> {data}</p>
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#2563EB", textDecoration: "none" }}>{linkText} ←</a>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginTop: 16, marginBottom: 0 }}>
              כל הספקים מחויבים חוזית לשמור על אבטחת המידע ולא לעשות בו שימוש מעבר לתכלית המוגדרת. מידע אישי לא יועבר לצדדים שלישיים נוספים, פרט לחובות חוקיות (למשל: צו שיפוטי).
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>7. אבטחת מידע</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              Signly נוקטת אמצעים טכניים וארגוניים סבירים להגנה על המידע:
            </p>
            <ul style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, paddingRight: 20, marginBottom: 12 }}>
              <li style={{ marginBottom: 8 }}>תקשורת מוצפנת באמצעות HTTPS/TLS לכל תהליכי האתר</li>
              <li style={{ marginBottom: 8 }}>פרטי כרטיס אשראי אינם עוברים ואינם נשמרים בשרתינו</li>
              <li style={{ marginBottom: 8 }}>גישה מוגבלת לנתוני משתמשים — לצוות הנחוץ בלבד</li>
              <li style={{ marginBottom: 0 }}>מחיקה אוטומטית של נתוני שאלון לאחר הפקת המסמך</li>
            </ul>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              עם זאת, אף מערכת אינה חסינה לחלוטין. Signly לא תוכל להתחייב לאבטחה מוחלטת, ולא תישא באחריות לדליפות הנובעות מגורמים שמחוץ לשליטתה הסבירה.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>8. זכויותיך לפי חוק הגנת הפרטיות הישראלי</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 16 }}>
              בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותיקוניו, עומדות לך הזכויות הבאות:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { right: "זכות עיון", desc: "לקבל מידע על אילו נתונים אישיים מוחזקים אצלנו בנוגע אליך" },
                { right: "זכות תיקון", desc: "לבקש תיקון של מידע אישי שגוי, לא מדויק, או לא עדכני" },
                { right: "זכות מחיקה", desc: "לבקש מחיקת מידע אישי בכפוף לחובות שמירה חוקיות" },
                { right: "זכות הגבלת עיבוד", desc: "לבקש הגבלת השימוש בנתוניך בנסיבות מסוימות" },
                { right: "זכות הגשת תלונה", desc: "לפנות לרשות הגנת הפרטיות של מדינת ישראל בכל פנייה בנוגע לעיבוד מידעך" },
              ].map(({ right, desc }) => (
                <div key={right} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(37,99,235,0.1)", color: "#2563EB", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</div>
                  <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, margin: 0 }}>
                    <strong style={{ color: "#0F172A" }}>{right}</strong> — {desc}
                  </p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginTop: 16, marginBottom: 0 }}>
              לממש את זכויותיך, יש לפנות אלינו בכתובת{" "}
              <a href="mailto:service@mysignly.com" style={{ color: "#2563EB", textDecoration: "none" }}>service@mysignly.com</a>.
              נשיב לפנייתך תוך 30 יום.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>9. קישורים חיצוניים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              האתר עשוי להכיל קישורים לאתרים חיצוניים. Signly אינה אחראית למדיניות הפרטיות של אתרים אלו ואינה שולטת בהם. מומלץ לעיין במדיניות הפרטיות של כל אתר חיצוני לפני מסירת מידע אישי.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>10. שינויים במדיניות הפרטיות</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              Signly שומרת לעצמה את הזכות לעדכן מדיניות זו בכל עת. שינויים מהותיים יפורסמו באתר. המשך השימוש בשירות לאחר פרסום שינויים מהווה הסכמה לנוסח המעודכן. תאריך "עדכון אחרון" בראש המסמך יעודכן בהתאם.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>11. יצירת קשר — פניות פרטיות</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              לכל שאלה, בקשה לממש זכות, או תלונה הקשורה לפרטיות:
            </p>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "20px 24px" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>ממונה הגנת הפרטיות — Signly</p>
              <p style={{ fontSize: 15, color: "#2563EB", marginBottom: 8 }}>
                <a href="mailto:service@mysignly.com" style={{ color: "#2563EB", textDecoration: "none" }}>service@mysignly.com</a>
              </p>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>זמן תגובה מקסימלי: 30 יום ממועד קבלת הפנייה</p>
            </div>
          </section>

          {/* Footer note */}
          <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "16px 20px", borderRight: "3px solid #2563EB" }}>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0 }}>
              מדיניות זו כתובה בהתאם לדרישות חוק הגנת הפרטיות, התשמ"א-1981, ותיקון מס׳ 2 לחוק (2023). לבדיקת עמידה בתקנות אחרות (GDPR ועוד) יש לפנות לייעוץ משפטי מתאים.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "24px 40px", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Link href="/" style={{ fontSize: 16, fontWeight: 900, color: "#0F172A", textDecoration: "none" }}>Signly<span style={{ color: "#2563EB" }}>.</span></Link>
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
