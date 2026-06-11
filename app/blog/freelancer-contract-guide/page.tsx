import Link from "next/link";

export const metadata = {
  title: "חוזה לפרילנסר — מה חייב להיות בו? המדריך המלא | Signly",
  description: "מה חייב להיות בחוזה עם לקוח לפני שמתחילים לעבוד: תיאור עבודה, תשלום, תיקונים, ביטול, קניין רוחני ועוד. המדריך המלא לפרילנסרים בישראל.",
};

export default function FreelancerContractGuidePage() {
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
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#533afd", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>מדריך לפרילנסרים</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", letterSpacing: -1, marginBottom: 16, lineHeight: 1.3 }}>
            חוזה לפרילנסר — מה חייב להיות בו (ולמה בלעדיו אתה חשוף)
          </h1>
          <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.7 }}>
            המדריך המלא למה לשים בחוזה עם לקוח — לפני שמתחילים לעבוד, לא אחרי שהבעיה כבר קרתה.
          </p>
        </div>

        {/* Intro */}
        <div style={{ marginBottom: 40, fontSize: 16, lineHeight: 1.9, color: "#334155" }}>
          <p style={{ marginBottom: 16 }}>
            אתה סוגר עבודה עם לקוח. סיכמתם מחיר, סיכמתם מועד, הכל נשמע ברור. אז למה לבזבז זמן על חוזה?
          </p>
          <p>
            כי &quot;סיכמנו בוואטסאפ&quot; הוא לא הסכם — הוא תקווה. וברגע שמשהו משתבש (איחור בתשלום, בקשה ל&quot;עוד קצת תיקונים&quot;, ביטול ברגע האחרון) — אין לך שום דבר להישען עליו.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20 }}>הנה מה שחוזה מקצועי לפרילנסר חייב לכלול:</h2>

        <Section title="1. תיאור מדויק של העבודה — ומה לא כלול">
          <p>
            הסעיף הכי חשוב בחוזה. לא &quot;אני אעצב לך לוגו&quot; — אלא בדיוק כמה קונספטים, כמה סבבי תיקונים, ומה קורה אם הלקוח רוצה משהו שלא היה בתמונה מההתחלה. זה הסעיף שמונע מ-2 ימי עבודה להפוך ל-2 שבועות בחינם.
          </p>
        </Section>

        <Section title="2. תשלום — סכומים, מועדים, ומה קורה באיחור">
          <p>
            מקדמה? כמה? מתי משלמים את היתרה? ומה קורה אם הלקוח לא משלם בזמן — האם העבודה נעצרת? יש ריבית פיגורים? בלי זה, &quot;אני אעביר בקרוב&quot; יכול להימשך חודשים.
          </p>
        </Section>

        <Section title="3. תיקונים — כמה כלולים, וכמה עולה תיקון נוסף">
          <p>
            &quot;עוד שינוי קטן&quot; יכול להיות ההבדל בין פרויקט רווחי לפרויקט שמפסידים עליו כסף. חוזה טוב מגדיר מראש: כמה סבבי תיקון כלולים, ומה המחיר לכל סבב נוסף.
          </p>
        </Section>

        <Section title="4. ביטול — מה קורה אם מישהו רוצה לצאת באמצע">
          <p>
            אם הלקוח מבטל אחרי שהתחלת לעבוד — מגיע לך תשלום על מה שכבר נעשה. אם אתה צריך לבטל — מה ההתחייבות שלך כלפיו. שני הצדדים צריכים לדעת את זה מראש, לא לגלות בזמן אמת.
          </p>
        </Section>

        <Section title="5. קניין רוחני — למי שייכת התוצאה הסופית">
          <p>
            במיוחד בעיצוב, תוכן, קוד וצילום: האם הבעלות עוברת ללקוח אחרי התשלום? לפני? יש לך זכות להציג את העבודה בפורטפוליו? זה נשמע טכני — אבל זה אחד הדברים הכי שכיחים שמסתבכים בלי חוזה.
          </p>
        </Section>

        <Section title="6. סודיות, יחסי עצמאי, וכוח עליון">
          <p>
            סעיפים שנשמעים &quot;משפטיים מדי&quot; — אבל הם מה שמגן עליך אם הלקוח חושף מידע רגיש על העסק שלו, או אם נסיבות חיצוניות (כמו מצב חירום) משבשות את לוח הזמנים.
          </p>
        </Section>

        {/* CTA box */}
        <div style={{ background: "#ede9fe", border: "1px solid #c4b5fd", borderRadius: 16, padding: "28px 24px", marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
            לכתוב את כל זה לוקח שעות — ועורך דין עולה מאות שקלים
          </p>
          <p style={{ fontSize: 15, color: "#475569", marginBottom: 24, lineHeight: 1.7 }}>
            עם Signly, אתה עונה על כמה שאלות פשוטות על הפרויקט שלך — ותוך דקות מקבל חוזה מקצועי ומלא, מנוסח כמו שעורך דין היה כותב, מותאם בדיוק למקצוע שלך.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sample" style={{ display: "inline-block", padding: "14px 28px", background: "white", color: "#533afd", border: "1.5px solid #533afd", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              קבל חוזה לדוגמה — חינם
            </Link>
            <Link href="/create" style={{ display: "inline-block", padding: "14px 28px", background: "#533afd", color: "white", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              קבל את החוזה שלך עכשיו — ₪97
            </Link>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 32, marginTop: 48 }}>
          <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, marginBottom: 20 }}>
            שאלות? כתבו ל-<strong>service@mysignly.com</strong>
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/" style={{ fontSize: 14, color: "#533afd", textDecoration: "none", fontWeight: 600 }}>← דף הבית</Link>
          </div>
        </div>

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #F1F5F9" }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}
