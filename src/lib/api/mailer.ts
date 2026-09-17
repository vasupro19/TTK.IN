import nodemailer, { type Transporter } from "nodemailer";
import type { Lead } from "@/lib/types";
import { siteConfig } from "@/lib/seo";

/**
 * Outbound email.
 *
 * Configuration lives entirely in environment variables so no credentials are
 * committed. With Gmail, `SMTP_USER` is the mailbox address and `SMTP_PASS`
 * must be a Google **App Password** (a normal account password will be
 * rejected, and App Passwords require 2-Step Verification to be on).
 *
 * If SMTP is not configured the send is skipped and logged rather than
 * throwing — a missing mail setup must never cost the business a lead.
 */

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

/** Where enquiry notifications land. */
export const LEADS_INBOX = process.env.LEADS_TO_EMAIL ?? siteConfig.leadsInbox;

/** Gmail rejects a From address that isn't the authenticated mailbox. */
const FROM_ADDRESS = process.env.LEADS_FROM_EMAIL ?? SMTP_USER ?? siteConfig.leadsInbox;

export function isMailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS);
}

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!isMailConfigured()) return null;
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

export interface MailResult {
  sent: boolean;
  skipped?: boolean;
  error?: string;
  messageId?: string;
}

async function send(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<MailResult> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[mailer] SMTP_USER/SMTP_PASS not set — email skipped. Subject:",
      options.subject
    );
    return { sent: false, skipped: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${FROM_ADDRESS}>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    console.info("[mailer] sent", { messageId: info.messageId, to: options.to });
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[mailer] send failed:", message);
    return { sent: false, error: message };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatIndianDate(value?: string): string {
  if (!value) return "Not specified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Notifies the sales inbox about a new enquiry. `replyTo` is set to the
 * traveller's address where given, so hitting Reply in Gmail answers them
 * directly.
 */
export async function sendLeadNotification(lead: Lead): Promise<MailResult> {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email ?? "Not provided"],
    ["Destination", lead.destination],
    ["Travel date", formatIndianDate(lead.travelDate)],
    ["Travellers", String(lead.travellers)],
    ["Nights", lead.nights ? String(lead.nights) : "Not specified"],
    ["Budget", lead.budget ?? "Not specified"],
    ["Package", lead.packageSlug ?? "General enquiry"],
    ["Source", lead.source],
    ["Reference", lead.id],
    [
      "Received",
      new Date(lead.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    ],
  ];

  const subject = `New enquiry: ${lead.destination} — ${lead.name} (${lead.phone})`;

  const text = [
    `New trip enquiry from ${siteConfig.domain}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message || "(none)",
    "",
    `WhatsApp the traveller: https://wa.me/91${lead.phone.replace(/^(\+?91)/, "")}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f7f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0d1b1e;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #efe7db;">
      <div style="background:#146656;padding:20px 24px;">
        <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">New trip enquiry</p>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">
          via ${escapeHtml(siteConfig.domain)} — Plan My Trip form
        </p>
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? "#ffffff" : "#fdfcfb"};">
          <td style="padding:11px 24px;font-size:13px;color:#17303f;opacity:0.7;width:150px;border-bottom:1px solid #efe7db;">${escapeHtml(label)}</td>
          <td style="padding:11px 24px;font-size:14px;font-weight:600;color:#0d1b1e;border-bottom:1px solid #efe7db;">${escapeHtml(value)}</td>
        </tr>`
          )
          .join("")}
      </table>

      <div style="padding:20px 24px;">
        <p style="margin:0 0 6px;font-size:13px;color:#17303f;opacity:0.7;">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${
          lead.message ? escapeHtml(lead.message) : "<em style='opacity:0.55;'>No message left</em>"
        }</p>
      </div>

      <div style="padding:0 24px 24px;">
        <a href="tel:+91${escapeHtml(lead.phone.replace(/^(\+?91)/, ""))}"
           style="display:inline-block;background:#146656;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;margin-right:8px;">
          Call ${escapeHtml(lead.phone)}
        </a>
        <a href="https://wa.me/91${escapeHtml(lead.phone.replace(/^(\+?91)/, ""))}"
           style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:999px;font-size:14px;font-weight:600;">
          WhatsApp
        </a>
      </div>
    </div>

    <p style="max-width:600px;margin:14px auto 0;font-size:11px;color:#17303f;opacity:0.5;text-align:center;">
      Sent automatically by the ${escapeHtml(siteConfig.name)} website. Reply to this email to answer the traveller directly.
    </p>
  </body>
</html>`;

  return send({
    to: LEADS_INBOX,
    subject,
    text,
    html,
    replyTo: lead.email,
  });
}
