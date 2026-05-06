export default function AccessibilityPage() {
  return (
    <main className="min-h-screen px-6 py-16" style={{ backgroundColor: "#F8F9FA" }} dir="rtl">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded p-10">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0F1F3D" }}>
          הצהרת נגישות
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Signly מחויבת לנגישות האתר לכלל המשתמשים, לרבות אנשים עם מוגבלויות, בהתאם לתקן הישראלי 5568 ורמת AA של WCAG 2.1.
        </p>

        <h2 className="text-xl font-bold mb-3" style={{ color: "#0F1F3D" }}>מה בוצע לשיפור הנגישות</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 leading-relaxed">
          <li>האתר בנוי עם תמיכה מלאה בכיוון RTL (ימין לשמאל)</li>
          <li>שימוש בשפה ברורה ופשוטה</li>
          <li>ניגודיות צבעים עומדת בדרישות WCAG AA</li>
          <li>תוסף נגישות מותקן באתר המאפשר התאמות תצוגה אישיות</li>
          <li>האתר תומך בניווט במקלדת</li>
        </ul>

        <h2 className="text-xl font-bold mb-3" style={{ color: "#0F1F3D" }}>מה טרם הושלם</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          אנו ממשיכים לעבוד על שיפור הנגישות בכל חלקי האתר. ייתכן שחלק מהתכנים אינם נגישים במלואם.
        </p>

        <h2 className="text-xl font-bold mb-3" style={{ color: "#0F1F3D" }}>יצירת קשר בנושא נגישות</h2>
        <p className="text-gray-700 mb-2 leading-relaxed">
          נתקלתם בבעיית נגישות? נשמח לשמוע ולתקן.
        </p>
        <p className="text-gray-700 mb-6">
          מייל:{" "}
          <a href="mailto:service@mysignly.com" className="text-blue-600 underline">
            service@mysignly.com
          </a>
        </p>

        <p className="text-sm text-gray-400">
          הצהרה זו עודכנה לאחרונה: מאי 2026
        </p>
      </div>
    </main>
  );
}
