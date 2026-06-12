import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/db/schema";

export const runtime = "nodejs";

/**
 * Optionaler Brevo-Webhook, um den Neon-Spiegel synchron zu halten
 * (Bestätigung / Abmeldung). In Brevo unter "Transaktional → Einstellungen →
 * Webhooks" bzw. "Kontakte → Webhooks" mit dieser URL einrichten.
 * Absicherung über `?token=<BREVO_WEBHOOK_SECRET>`.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.BREVO_WEBHOOK_SECRET;
  if (secret && url.searchParams.get("token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!db) return NextResponse.json({ ok: true, skipped: "no-db" });

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = String(payload.email ?? "").toLowerCase().trim();
  const event = String(payload.event ?? "");
  if (!email) return NextResponse.json({ ok: true, skipped: "no-email" });

  try {
    if (/unsub/i.test(event)) {
      await db
        .update(newsletterSubscribers)
        .set({ status: "unsubscribed", unsubscribedAt: new Date(), updatedAt: new Date() })
        .where(eq(newsletterSubscribers.email, email));
    } else if (/optin|confirm|subscrib|list_?add|contact/i.test(event)) {
      await db
        .update(newsletterSubscribers)
        .set({ status: "confirmed", confirmedAt: new Date(), updatedAt: new Date() })
        .where(eq(newsletterSubscribers.email, email));
    }
  } catch (e) {
    console.error("[brevo webhook] Fehler:", e);
  }

  return NextResponse.json({ ok: true });
}
