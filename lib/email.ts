import nodemailer from "nodemailer";
import { buildDocxBuffer } from "@/lib/docx-export";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});


export async function sendContractEmail({
  to,
  contractText,
  freelancerName,
  clientName,
  sessionId,
}: {
  to: string;
  contractText: string;
  freelancerName: string;
  clientName: string;
  sessionId?: string;
}) {
  const downloadUrl = sessionId
    ? `https://mysignly.com/contract?clearing_id=${sessionId}`
    : null;

  const html = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;direction:rtl;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 0;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0F1F3D;padding:20px 32px;border-radius:10px 10px 0 0;">
            <span style="font-size:22px;font-weight:900;color:white;">Signly<span style="color:#2563EB;">.</span></span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:white;padding:32px;border:1px solid #E2E8F0;border-top:none;">
            <h1 style="font-size:22px;color:#0F172A;margin:0 0 8px;">החוזה שלך מוכן ✓</h1>
            <p style="color:#64748B;margin:0 0 24px;line-height:1.6;">
              שלום ${freelancerName},<br>
              החוזה בינך לבין <strong>${clientName}</strong> מוכן לחתימה.<br>
              מצורף החוזה המלא. שמור אותו, שלח ללקוח וחתמו שניכם.
            </p>

            ${downloadUrl ? `
            <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="background:#2563EB;border-radius:8px;padding:14px 32px;">
                  <a href="${downloadUrl}" style="color:white;text-decoration:none;font-weight:700;font-size:16px;">פתח וצפה בחוזה ←</a>
                </td>
              </tr>
            </table>
            <p style="font-size:13px;color:#94A3B8;margin:0 0 24px;">מהדף תוכלו להוריד PDF מוכן לחתימה.</p>
            ` : ""}

            <hr style="border:none;border-top:1px solid #E2E8F0;margin:0 0 16px;">
            <p style="font-size:11px;color:#94A3B8;margin:0;line-height:1.6;">
              Signly אינה משרד עורכי דין. חוזה זה אינו תחליף לייעוץ משפטי פרטני.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;padding:16px 32px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 10px 10px;">
            <p style="font-size:11px;color:#94A3B8;margin:0;">© 2026 Signly &nbsp;·&nbsp; <a href="mailto:service@mysignly.com" style="color:#94A3B8;">service@mysignly.com</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Signly" <service@mysignly.com>`,
    to,
    bcc: "service@mysignly.com",
    subject: `החוזה שלך מוכן — ${freelancerName} / ${clientName}`,
    html,
    text: `שלום ${freelancerName}, החוזה בינך לבין ${clientName} מוכן. פתח אותו כאן: ${downloadUrl ?? "https://mysignly.com"}`,
    attachments: [
      {
        filename: `חוזה-${freelancerName}-${clientName}.docx`,
        content: await buildDocxBuffer(contractText),
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    ],
  });
}
