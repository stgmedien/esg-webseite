const BREVO_BASE = "https://api.brevo.com/v3";

/** True, sobald ein Brevo-API-Key gesetzt ist. */
export function brevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

function brevoHeaders(): HeadersInit {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY ist nicht gesetzt.");
  return {
    "api-key": key,
    "content-type": "application/json",
    accept: "application/json",
  };
}

export type DoiResult =
  | { ok: true; already?: boolean }
  | { ok: false; status: number; code?: string; message?: string };

/**
 * Stößt den von Brevo verwalteten Double-Opt-In an. Brevo verschickt die
 * Bestätigungsmail, speichert den Opt-in-Beleg und fügt den Kontakt erst nach
 * Klick zur Liste hinzu — rechtssicher nach DSGVO.
 *
 * Voraussetzungen in Brevo: bestätigter Absender, eine Kontaktliste
 * (BREVO_LIST_ID) und ein DOI-Mailtemplate (BREVO_DOI_TEMPLATE_ID).
 */
export async function sendDoubleOptIn(params: {
  email: string;
  attributes?: Record<string, string | number>;
  redirectionUrl: string;
}): Promise<DoiResult> {
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  if (!Number.isFinite(listId) || listId <= 0) {
    return { ok: false, status: 0, message: "BREVO_LIST_ID fehlt oder ist ungültig." };
  }
  if (!Number.isFinite(templateId) || templateId <= 0) {
    return { ok: false, status: 0, message: "BREVO_DOI_TEMPLATE_ID fehlt oder ist ungültig." };
  }

  let res: Response;
  try {
    res = await fetch(`${BREVO_BASE}/contacts/doubleOptinConfirmation`, {
      method: "POST",
      headers: brevoHeaders(),
      body: JSON.stringify({
        email: params.email,
        attributes: params.attributes,
        includeListIds: [listId],
        templateId,
        redirectionUrl: params.redirectionUrl,
      }),
    });
  } catch (e) {
    return {
      ok: false,
      status: 0,
      message: e instanceof Error ? e.message : "Netzwerkfehler",
    };
  }

  if (res.status === 201 || res.status === 204) return { ok: true };

  let body: { code?: string; message?: string } | null = null;
  try {
    body = (await res.json()) as { code?: string; message?: string };
  } catch {
    /* ignore */
  }
  const message = body?.message ?? "";
  // Bereits vorhandene/bestätigte Kontakte sind kein Fehler für den Nutzer.
  if (res.status === 400 && /already|exist|duplicate/i.test(message)) {
    return { ok: true, already: true };
  }
  return { ok: false, status: res.status, code: body?.code, message };
}

/**
 * Kontakt direkt anlegen/aktualisieren und der Liste hinzufügen —
 * Single-Opt-In ohne Bestätigungsmail. Der Einwilligungsbeleg liegt in Neon.
 */
export async function createContact(params: {
  email: string;
  attributes?: Record<string, string | number>;
}): Promise<DoiResult> {
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!Number.isFinite(listId) || listId <= 0) {
    return { ok: false, status: 0, message: "BREVO_LIST_ID fehlt oder ist ungültig." };
  }

  let res: Response;
  try {
    res = await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers: brevoHeaders(),
      body: JSON.stringify({
        email: params.email,
        attributes: params.attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });
  } catch (e) {
    return {
      ok: false,
      status: 0,
      message: e instanceof Error ? e.message : "Netzwerkfehler",
    };
  }

  // 201 = neu angelegt, 204 = bestehender Kontakt aktualisiert
  if (res.status === 201 || res.status === 204) return { ok: true, already: res.status === 204 };

  let body: { code?: string; message?: string } | null = null;
  try {
    body = (await res.json()) as { code?: string; message?: string };
  } catch {
    /* ignore */
  }
  return { ok: false, status: res.status, code: body?.code, message: body?.message };
}

/** Konto-Infos abrufen — Verbindungstest für das Setup-Skript. */
export async function getBrevoAccount(): Promise<unknown> {
  const res = await fetch(`${BREVO_BASE}/account`, { headers: brevoHeaders() });
  if (!res.ok) throw new Error(`Brevo /account antwortete ${res.status}`);
  return res.json();
}
