// Phase 1 · Schritt 3: INVENTORY.md mit Triage-Vorschlag erzeugen.
import { readFile } from "node:fs/promises";
import { writeOut, out } from "./_util.mjs";

/** Heuristische Einordnung anhand des URL-Musters. Grenzfälle prüft der Mensch. */
function triage(rec) {
  const u = rec.url.toLowerCase();
  const drop = ["/seitenbaum", "/sitemap", "/plan/", "/36911-2", "/anmeldungen-3"];
  if (drop.some((d) => u.includes(d)) || rec.title === "(ohne Titel)") return "DROP";
  if (u.includes("alumni-portal") || u.includes("itslearning")) return "EXTERN";

  const archiv = [
    "/pressearchiv",
    "/abiturjahrgang-",
    "/unsere-schule-frueher",
    "/bilder-aus-der-",
    "/personalien-",
    "/konzerte-20",
    "/fruehere-ausstellungen",
  ];
  if (archiv.some((a) => u.includes(a))) return "ARCHIV";
  // Jahres-Container wie /schulgemeinde/2014-2/ oder Theaterstücke mit Jahr (…-2017/)
  if (/\/\d{4}-2\/?$/.test(u) || /-(20[0-1]\d|202[0-3])\/?$/.test(u)) return "ARCHIV";

  return "KEEP";
}

const BUCKET_INFO = {
  KEEP: "Behalten & auffrischen (live auf neuer Seite)",
  ARCHIV: "Archiv — kuratiert ins 175-Jahre-/History-Erlebnis",
  EXTERN: "Externes System — nur verlinken, nicht nachbauen",
  DROP: "Verwerfen/konsolidieren (leer, Dublette, technisch)",
};

async function run() {
  const content = JSON.parse(await readFile(out("content-index.json"), "utf8"));
  let media = [];
  try {
    media = JSON.parse(await readFile(out("media-index.json"), "utf8"));
  } catch {
    /* media optional */
  }

  const tagged = content.map((r) => ({ ...r, bucket: triage(r) }));
  const buckets = { KEEP: [], ARCHIV: [], EXTERN: [], DROP: [] };
  for (const r of tagged) buckets[r.bucket].push(r);
  for (const k of Object.keys(buckets)) {
    buckets[k].sort((a, b) => a.url.localeCompare(b.url));
  }

  const mediaByMime = {};
  for (const m of media) mediaByMime[m.mime] = (mediaByMime[m.mime] ?? 0) + 1;
  const pdfCount = media.filter((m) => m.mime === "application/pdf").length;
  const imgCount = media.filter((m) => (m.mime || "").startsWith("image/")).length;

  const lines = [];
  lines.push("# ESG Gütersloh — Inhalts-Inventar der Alt-Seite\n");
  lines.push(`_Automatisch erzeugt aus dem Scrape von esg-guetersloh.de._\n`);
  lines.push("## Überblick\n");
  lines.push(`- **${content.length}** Seiten/Beiträge gesichert`);
  lines.push(`- **${media.length}** Medien (${imgCount} Bilder, ${pdfCount} PDFs)`);
  lines.push(
    `- Triage: **${buckets.KEEP.length}** behalten · **${buckets.ARCHIV.length}** Archiv · ` +
      `**${buckets.EXTERN.length}** extern · **${buckets.DROP.length}** verwerfen\n`,
  );
  lines.push("> Die Triage ist ein automatischer Vorschlag nach URL-Muster. Grenzfälle gemeinsam prüfen.\n");

  for (const bucket of ["KEEP", "ARCHIV", "EXTERN", "DROP"]) {
    const rows = buckets[bucket];
    lines.push(`\n## ${bucket} — ${BUCKET_INFO[bucket]} (${rows.length})\n`);
    lines.push("| Titel | Pfad | Wörter | Bilder | Geändert |");
    lines.push("| --- | --- | ---: | ---: | --- |");
    for (const r of rows) {
      const path = "/" + r.rel;
      const mod = (r.modified ?? "").slice(0, 10);
      const title = r.title.replace(/\|/g, "\\|").slice(0, 70);
      lines.push(`| ${title} | ${path} | ${r.words} | ${r.images} | ${mod} |`);
    }
  }

  await writeOut("INVENTORY.md", lines.join("\n") + "\n");
  console.log("✓ INVENTORY.md geschrieben.");
  console.log(
    `  KEEP ${buckets.KEEP.length} · ARCHIV ${buckets.ARCHIV.length} · ` +
      `EXTERN ${buckets.EXTERN.length} · DROP ${buckets.DROP.length}`,
  );
}

run().catch((e) => {
  console.error("✗ Fehler:", e);
  process.exit(1);
});
