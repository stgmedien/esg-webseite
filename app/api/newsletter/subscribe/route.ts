import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { subscribeSchema, AUDIENCE_LABEL } from "@/lib/validation";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/db/schema";
import { sendDoubleOptIn, brevoConfigured } from "@/lib/brevo";

export const runtime = "nodejs";

// Einfacher In-Memory-Rate-Limiter (Best-Effort pro Serverless-Instanz).
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

function buildFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return fieldErrors;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0] ?? "").trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Zu viele Versuche. Bitte warte einen Moment." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Bitte prüfe deine Eingaben.",
        fieldErrors: buildFieldErrors(parsed.error.issues),
      },
      { status: 400 },
    );
  }

  const { email, firstName, audience, consent, website } = parsed.data;

  // Honeypot: stillschweigend akzeptieren, aber nichts tun.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (consent !== true) {
    return NextResponse.json(
      {
        ok: false,
        error: "Bitte stimme der Datenschutzerklärung zu.",
        fieldErrors: { consent: ["Deine Zustimmung ist erforderlich."] },
      },
      { status: 400 },
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const userAgent = req.headers.get("user-agent");

  // 1) Einwilligungsbeleg in Neon spiegeln (sofern konfiguriert).
  if (db) {
    try {
      await db
        .insert(newsletterSubscribers)
        .values({
          email: normalizedEmail,
          firstName: firstName || null,
          audience: audience ?? null,
          status: "pending",
          consentIp: ip === "unknown" ? null : ip,
          consentUserAgent: userAgent,
        })
        .onConflictDoUpdate({
          target: newsletterSubscribers.email,
          set: {
            audience: sql`coalesce(excluded.audience, ${newsletterSubscribers.audience})`,
            firstName: sql`coalesce(excluded.first_name, ${newsletterSubscribers.firstName})`,
            consentIp: sql`excluded.consent_ip`,
            consentUserAgent: sql`excluded.consent_user_agent`,
            updatedAt: new Date(),
          },
        });
    } catch (e) {
      // DB-Fehler darf die Anmeldung nicht blockieren — Brevo ist führend.
      console.error("[newsletter] Neon-Fehler:", e);
    }
  }

  // 2) Brevo Double-Opt-In anstoßen.
  if (brevoConfigured()) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    const result = await sendDoubleOptIn({
      email: normalizedEmail,
      attributes: {
        VORNAME: firstName || "",
        ZIELGRUPPE: audience ? AUDIENCE_LABEL[audience] : "",
      },
      redirectionUrl: `${siteUrl}/newsletter/bestaetigt`,
    });

    if (!result.ok) {
      console.error("[newsletter] Brevo-Fehler:", result);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Die Anmeldung konnte gerade nicht verarbeitet werden. Bitte versuche es in ein paar Minuten erneut.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, already: result.already ?? false });
  }

  // Demo-Modus: Brevo noch nicht verdrahtet — UI funktioniert, keine Mail.
  return NextResponse.json({ ok: true, demo: true });
}
