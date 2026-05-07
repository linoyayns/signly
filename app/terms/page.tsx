import Link from "next/link";

export const metadata = {
  title: "תקנון שימוש | Signly",
  description: "תקנון השימוש של Signly — שירות יצירת חוזי פרילנס מבוסס בינה מלאכותית",
};

export default function TermsPage() {
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
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#0F172A", letterSpacing: -1, marginBottom: 16 }}>תקנון שימוש</h1>
          <p style={{ fontSize: 14, color: "#64748B" }}>עדכון אחרון: מאי 2026</p>
        </div>

        {/* AI DISCLAIMER BOX */}
        <div style={{ background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#B91C1C", marginBottom: 8 }}>הצהרת כתב ויתור — אין כאן שירות משפטי מורשה</p>
          <p style={{ fontSize: 14, color: "#7F1D1D", lineHeight: 1.75, margin: 0 }}>
            Signly הינה פלטפורמת תוכנה המייצרת תבניות מסמכים משפטיים באמצעות בינה מלאכותית. <strong>Signly אינה משרד עורכי דין, אינה מורשית לעסוק בעריכת דין, ואינה מספקת ייעוץ משפטי מכל סוג שהוא.</strong> המסמכים המופקים על ידי השירות הינם תבניות כלליות בלבד ואינם תחליף לייעוץ מעורך דין מוסמך ומורשה בישראל. המשתמש אחראי באופן מלא לבחינת המסמך, להתאמתו לצרכיו הספציפיים ולנסיבות המשפטיות הרלוונטיות. Signly לא תישא בכל אחריות לתוצאות משפטיות, כספיות או אחרות הנובעות משימוש במסמכים שנוצרו על ידי השירות.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          {/* Section 1 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>1. כללי וקבלת התנאים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              ברוכים הבאים לשירות Signly (להלן: "השירות" או "Signly"), הזמין בכתובת <strong>mysignly.com</strong>. השירות מנוהל ומופעל על ידי Signly (להלן: "החברה").
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              תקנון זה מסדיר את תנאי השימוש בשירות. <strong>שימוש בשירות, לרבות גלישה, מילוי שאלון, ביצוע תשלום או הורדת מסמך, מהווה הסכמה מלאה ובלתי מסויגת לכל תנאי תקנון זה.</strong> אם אינך מסכים לתנאי תקנון זה — אנא הימנע משימוש בשירות.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              החברה שומרת לעצמה את הזכות לעדכן ולשנות תקנון זה בכל עת, ללא הודעה מוקדמת. עדכונים ייכנסו לתוקף עם פרסומם באתר. המשך השימוש בשירות לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>2. תיאור השירות</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              Signly הוא שירות מקוון המאפשר לפרילנסרים ועצמאים הפועלים בישראל ליצור תבניות חוזה עבודה מותאמות אישית בשפה העברית, באמצעות מנוע בינה מלאכותית.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              <strong>מה השירות כולל:</strong>
            </p>
            <ul style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, paddingRight: 20, marginBottom: 12 }}>
              <li style={{ marginBottom: 8 }}>שאלון דיגיטלי מותאם למקצוע ולסוג הפרויקט</li>
              <li style={{ marginBottom: 8 }}>יצירת תבנית חוזה פרילנס מותאמת אישית בעברית</li>
              <li style={{ marginBottom: 8 }}>תצוגה מקדימה של החוזה לפני התשלום</li>
              <li style={{ marginBottom: 8 }}>הורדת מסמך PDF מוכן לחתימה</li>
              <li style={{ marginBottom: 0 }}>תיקון אחד (revision) בתוך 24 שעות מיום התשלום, לפי פנייה למייל service@mysignly.com</li>
            </ul>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              <strong>מה השירות אינו כולל:</strong> ייעוץ משפטי אישי, ייצוג משפטי, עריכת דין, הכנת מסמכים לצרכי הגשה לבתי משפט, ניסוח הסכמים מורכבים הדורשים בחינה משפטית פרטנית, או כל שירות המוסדר בחוק לשכת עורכי הדין, התשכ"א-1961.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>3. כשירות משפטית ותנאי גיל</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              השימוש בשירות מותר לאנשים בני <strong>18 שנים ומעלה</strong> בלבד. שימוש בשירות על ידי קטין מהווה הפרה של תקנון זה.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              השירות מיועד לפרילנסרים ועצמאים הפועלים תחת הדין הישראלי ומשרתים לקוחות בישראל. החוזים המופקים בשירות מנוסחים בהתאם לדיני מדינת ישראל ואינם מתאימים בהכרח לשימוש במדינות אחרות. המשתמש מצהיר כי הוא כשיר משפטית לכרות חוזים ולהסכים לתנאים אלו.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>4. תנאי תשלום ומחירים</h2>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>4.1 תעריף השירות</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              עלות השירות הינה <strong>97 ₪ לחוזה</strong>, תשלום חד-פעמי. המחיר כולל מע"מ בשיעור החוקי הקבוע בדין הישראלי (נכון לתאריך העדכון האחרון: 18%). החברה שומרת לעצמה את הזכות לשנות את המחיר בכל עת, בכפוף לפרסום המחיר המעודכן באתר לפני ביצוע עסקה.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>4.2 אמצעי תשלום</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              התשלום מתבצע באמצעות Stripe — ספק עיבוד תשלומים בינלאומי. Signly אינה שומרת פרטי כרטיס אשראי. עיבוד התשלום מתבצע ישירות על ידי Stripe, בכפוף לתנאי השירות ומדיניות הפרטיות שלה. החברה שומרת רישום של סכום העסקה, מועד ביצועה ואישור התשלום, לצרכי ביקורת ורישום חשבונאי.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>4.3 מדיניות ביטול והחזרים</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              מאחר שמדובר במוצר דיגיטלי המועבר לאחר התשלום, <strong>לא יינתן החזר כספי לאחר הורדת קובץ ה-PDF.</strong>
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              אולם, אם המשתמש אינו מרוצה מן המסמך שהתקבל, החברה מציעה <strong>תיקון אחד (revision)</strong> ללא תשלום נוסף, ובלבד שהפנייה לתיקון נשלחה לכתובת service@mysignly.com תוך <strong>24 שעות</strong> ממועד ביצוע התשלום, ובימי עסקים בלבד. בקשת התיקון תטופל ותיחתך בתוך 24 שעות נוספות.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              בכל מקרה של ספק לגבי זכאות להחזר, ניתן לפנות לשירות הלקוחות בכתובת service@mysignly.com. החברה תבחן כל פנייה לגופה.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>5. זכויות קניין רוחני</h2>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>5.1 בעלות המשתמש על המסמך המופק</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              החוזה המותאם אישית שנוצר עבור המשתמש על בסיס הפרטים שסיפק, <strong>שייך למשתמש</strong>. המשתמש רשאי להשתמש במסמך למטרות אישיות ומסחריות הקשורות לפרויקט עבורו נוצר, לשלוח אותו ללקוחות ולחתום עליו כחוזה מחייב.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>5.2 זכויות Signly על מנגנון השירות</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              Signly שומרת על כל הזכויות, לרבות זכויות יוצרים וקניין רוחני, ב: מנגנון הבינה המלאכותית, לוגיקת יצירת החוזים, שאלוני הקלט, תבניות הבסיס, ניסוחי הסעיפים הגנריים, ממשק המשתמש, הקוד והתוכנה של השירות, וכל שאר מרכיבי המערכת. אין להעתיק, לשכפל, לבצע הנדסה לאחור, לפרסם מחדש או לעשות שימוש מסחרי בכל חלק מהמערכת.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>5.3 הרשאה מוגבלת</h3>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              המשתמש מעניק ל-Signly רשות שימוש אנונימית ומצרפית בנתוני השאלון (ללא מידע מזהה אישי) לשם שיפור השירות ואיכות המסמכים המופקים.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>6. הגבלת אחריות</h2>

            <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#1E40AF", margin: 0 }}>
                קרא/י סעיף זה בעיון — הוא מגדיר את גבולות האחריות החוזית של Signly.
              </p>
            </div>

            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              השירות מסופק "כפי שהוא" (AS IS) וכפי שהוא זמין (AS AVAILABLE), ללא כל אחריות מפורשת או משתמעת, לרבות אחריות לסחירות, כשירות למטרה מסוימת, שלמות, דיוק, עדכניות או התאמה לנסיבות ספציפיות.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              <strong>Signly לא תישא בכל אחריות לנזק ישיר, עקיף, מקרי, מיוחד, עונשי או תוצאתי</strong> — לרבות אך לא רק: אובדן הכנסה, אובדן עסקה, נזק כלכלי, הוצאות משפטיות, נזקים הנובעים ממחלוקות חוזיות — הנובע משימוש במסמכים שנוצרו על ידי השירות, מהסתמכות עליהם, מאי-הסתמכות עליהם, או מחוסר יכולת השירות לפעול.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              <strong>אחריות החברה המקסימלית בכל מקרה</strong> מוגבלת לסכום ששילם המשתמש בפועל עבור העסקה הספציפית שבגינה קמה העילה, ולא תעלה על 97 ₪.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              Signly אינה אחראית לשגיאות, חסרים, אי-דיוקים או אי-התאמה בתוכן שהמשתמש סיפק בשאלון. המשתמש הוא האחראי הבלעדי לוודא שהמידע שסיפק מדויק ומלא, ולוודא שהמסמך המופק מתאים לצרכיו לפני שימוש בו.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>7. התנהגות אסורה</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              המשתמש מתחייב שלא לעשות שימוש בשירות לאף אחת מן המטרות הבאות:
            </p>
            <ul style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, paddingRight: 20, marginBottom: 0 }}>
              <li style={{ marginBottom: 8 }}>יצירת מסמכים למטרות הונאה, הטעייה, כפייה או ביצוע עבירה פלילית</li>
              <li style={{ marginBottom: 8 }}>הפרת זכויות של צדדים שלישיים</li>
              <li style={{ marginBottom: 8 }}>ניסיון לבצע הנדסה לאחור על המערכת או לחלץ ממנה תבניות</li>
              <li style={{ marginBottom: 8 }}>שימוש אוטומטי (bot) או כריית נתונים מהשירות</li>
              <li style={{ marginBottom: 8 }}>מסירת פרטים כוזבים בשאלון</li>
              <li style={{ marginBottom: 0 }}>כל שימוש אחר המנוגד לחוק הישראלי החל</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>8. זמינות השירות</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              החברה תשאף לספק את השירות ללא הפרעות, אך אינה מתחייבת לזמינות רציפה. השירות עשוי להיות מושבת לצורכי תחזוקה, עדכונים, או מסיבות טכניות אחרות. Signly לא תישא בכל אחריות לנזק הנובע מהשבתה זמנית של השירות.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>9. הדין החל וסמכות שיפוט</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              תקנון זה, השימוש בשירות, וכל סכסוך הנובע מהם יהיו כפופים אך ורק לדיני מדינת ישראל, מבלי לתת תוקף לכללי ברירת הדין הבינלאומי.
            </p>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              <strong>סמכות השיפוט הבלעדית</strong> בכל סכסוך הנובע מתקנון זה או מן השימוש בשירות מוקנית לבתי המשפט המוסמכים במחוז תל אביב-יפו, ישראל, והצדדים מביעים הסכמתם לסמכות שיפוטית זו.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>10. הפרדת סעיפים</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 0 }}>
              אם ייקבע כי סעיף כלשהו בתקנון זה בטל, בלתי חוקי או בלתי אכיף, יישאר תוקפם של יתר הסעיפים על כנו ולא ייפגע. הסעיף הבטל יוחלף בסעיף תקף המקרב ביותר את כוונת הצדדים.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid #E2E8F0" }}>11. יצירת קשר</h2>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.85, marginBottom: 12 }}>
              לשאלות, בירורים או תלונות בנוגע לתקנון זה, ניתן לפנות אלינו בכתובת:
            </p>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: "16px 20px" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>שירות לקוחות Signly</p>
              <p style={{ fontSize: 15, color: "#2563EB", margin: 0 }}>
                <a href="mailto:service@mysignly.com" style={{ color: "#2563EB", textDecoration: "none" }}>service@mysignly.com</a>
              </p>
            </div>
          </section>

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
