#!/usr/bin/env node
/**
 * Legt die ESG-gebrandete Double-Opt-In-Bestätigungsmail als Brevo-Vorlage an.
 *
 *   BREVO_SENDER_EMAIL=newsletter@esg-guetersloh.de npm run brevo:doi
 *
 * Voraussetzung: Die Absenderadresse ist in Brevo verifiziert (Senders → Add).
 * Gibt die Template-ID aus → als BREVO_DOI_TEMPLATE_ID in .env.local/Vercel setzen.
 */
import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    /* ok */
  }
}
loadEnv();

const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName = process.env.BREVO_SENDER_NAME || "ESG Gütersloh";
if (!process.env.BREVO_API_KEY) {
  console.error("✗ BREVO_API_KEY fehlt.");
  process.exit(1);
}
if (!senderEmail) {
  console.error("✗ BREVO_SENDER_EMAIL fehlt — die (in Brevo verifizierte!) Absenderadresse angeben.");
  process.exit(1);
}

const htmlContent = `<!DOCTYPE html><html lang="de"><body style="margin:0;padding:0;background-color:#f5efe3;font-family:Georgia,'Times New Roman',serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5efe3;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#fbf8f1;border:1px solid #e2d8c4;border-radius:16px;overflow:hidden;">
<tr><td style="background-color:#0b1a33;padding:28px 40px;text-align:center;">
  <div style="color:#fbf8f1;font-size:22px;font-weight:bold;letter-spacing:1px;">ESG Gütersloh</div>
  <div style="color:#e6cd92;font-size:13px;margin-top:6px;">1851 – 2026 · 175 Jahre</div>
</td></tr>
<tr><td style="padding:40px;">
  <h1 style="margin:0 0 16px;color:#0b1a33;font-size:26px;">Schön, dass du dabei sein willst!</h1>
  <p style="margin:0 0 24px;color:#2c3a56;font-size:16px;line-height:1.6;">du möchtest den Newsletter des Evangelisch Stiftischen Gymnasiums Gütersloh erhalten – Neuigkeiten, Termine und Geschichten aus 175 Jahren Schulleben. Bitte bestätige deine Anmeldung mit einem Klick:</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;"><tr><td style="border-radius:12px;background-color:#0b1a33;">
    <a href="{{ doubleoptin }}" style="display:inline-block;padding:14px 36px;color:#fbf8f1;font-size:16px;font-weight:bold;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Anmeldung bestätigen</a>
  </td></tr></table>
  <p style="margin:0;color:#2c3a56;font-size:13px;line-height:1.6;">Du hast dich nicht angemeldet? Dann kannst du diese E-Mail einfach ignorieren – ohne Bestätigung passiert nichts.</p>
</td></tr>
<tr><td style="border-top:1px solid #e2d8c4;padding:20px 40px;text-align:center;">
  <p style="margin:0;color:#8a8270;font-size:12px;line-height:1.5;">Evangelisch Stiftisches Gymnasium Gütersloh · Feldstraße 13 · 33330 Gütersloh</p>
</td></tr>
</table></td></tr></table></body></html>`;

const res = await fetch("https://api.brevo.com/v3/smtp/templates", {
  method: "POST",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: JSON.stringify({
    templateName: "ESG Newsletter — Double-Opt-In (DE)",
    subject: "Bitte bestätige deine Anmeldung zum ESG-Newsletter",
    sender: { name: senderName, email: senderEmail },
    tag: "optin",
    isActive: true,
    htmlContent,
  }),
});

const body = await res.json().catch(() => null);
if (!res.ok) {
  console.error(`✗ Brevo antwortete ${res.status}:`, JSON.stringify(body));
  process.exit(1);
}
console.log(`✓ DOI-Vorlage angelegt: id=${body.id}`);
console.log(`  → BREVO_DOI_TEMPLATE_ID="${body.id}" in .env.local und Vercel setzen.`);
