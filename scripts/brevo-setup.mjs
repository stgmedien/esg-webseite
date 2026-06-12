#!/usr/bin/env node
/**
 * Brevo-Setup-Helfer.
 *   node scripts/brevo-setup.mjs            → testet den API-Key + zeigt Listen & Templates
 *   node scripts/brevo-setup.mjs --create   → legt die Liste "ESG Newsletter" an
 *
 * Liest BREVO_API_KEY aus der Umgebung oder aus .env.local.
 */
import { readFileSync } from "node:fs";

function loadEnv() {
  if (process.env.BREVO_API_KEY) return;
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    /* keine .env.local — ok */
  }
}

const BASE = "https://api.brevo.com/v3";

async function api(path, init = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) throw new Error(`${path} → ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

async function main() {
  loadEnv();
  if (!process.env.BREVO_API_KEY) {
    console.error("✗ BREVO_API_KEY fehlt. In .env.local setzen oder exportieren.");
    process.exit(1);
  }

  const account = await api("/account");
  console.log(`✓ Verbunden mit Brevo: ${account.email ?? "(unbekannt)"}`);
  if (account.plan) {
    const p = Array.isArray(account.plan) ? account.plan[0] : account.plan;
    console.log(`  Plan: ${p?.type ?? "?"}`);
  }

  if (process.argv.includes("--create")) {
    const folders = await api("/contacts/folders?limit=50");
    const folderId = folders.folders?.[0]?.id ?? 1;
    const created = await api("/contacts/lists", {
      method: "POST",
      body: JSON.stringify({ name: "ESG Newsletter", folderId }),
    });
    console.log(`✓ Liste "ESG Newsletter" angelegt → BREVO_LIST_ID=${created.id}`);
  }

  const lists = await api("/contacts/lists?limit=50");
  console.log("\nVorhandene Listen (BREVO_LIST_ID):");
  for (const l of lists.lists ?? []) {
    console.log(`  ${l.id}\t${l.name}\t(${l.totalSubscribers ?? 0} Kontakte)`);
  }

  const templates = await api("/smtp/templates?limit=50");
  console.log("\nMailtemplates (BREVO_DOI_TEMPLATE_ID — passendes DOI-Template wählen):");
  for (const t of templates.templates ?? []) {
    console.log(`  ${t.id}\t${t.name}\t${t.isActive ? "aktiv" : "inaktiv"}`);
  }
  if (!(templates.templates ?? []).length) {
    console.log("  (noch keine Vorlagen — in Brevo eine DOI-Bestätigungsmail anlegen)");
  }
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
