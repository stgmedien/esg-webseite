#!/usr/bin/env node
/**
 * Kuratierter Content-Import: scrape/output → content/
 * - übernimmt KEEP- und ARCHIV-Seiten (Triage wie scrape/inventory.mjs)
 * - bereinigt Markdown (doppelte H1, http→https, www-Host)
 * - ergänzt Frontmatter um `bucket` (keep|archiv)
 * Das Ergebnis wird ins Repo committet und ist die Datenbasis der Website.
 */
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const SCRAPE = new URL("../scrape/output/", import.meta.url).pathname;
const OUT = new URL("../content/", import.meta.url).pathname;

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
  if (/\/\d{4}-2\/?$/.test(u) || /-(20[0-1]\d|202[0-3])\/?$/.test(u)) return "ARCHIV";
  return "KEEP";
}

function cleanMarkdown(md, title) {
  // Frontmatter abtrennen
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  const fm = m ? m[1] : "";
  let body = m ? md.slice(m[0].length) : md;

  // Doppelte H1 am Anfang entfernen (Scraper schrieb Titel + Seite hat eigene H1)
  const esc = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  body = body.replace(new RegExp(`^\\s*# ${esc}\\s*\\n+# ${esc}\\s*\\n`, ""), `# ${title}\n\n`);
  // Falls immer noch zwei beliebige identische H1s direkt aufeinander folgen
  body = body.replace(/^(# .+)\n+\1\n/m, "$1\n\n");

  // Hosts vereinheitlichen
  body = body
    .replaceAll("http://www.esg-guetersloh.de", "https://esg-guetersloh.de")
    .replaceAll("http://esg-guetersloh.de", "https://esg-guetersloh.de")
    .replaceAll("https://www.esg-guetersloh.de", "https://esg-guetersloh.de");

  return { fm, body: body.trim() + "\n" };
}

async function run() {
  const index = JSON.parse(await readFile(join(SCRAPE, "content-index.json"), "utf8"));
  await rm(OUT, { recursive: true, force: true });

  let kept = 0;
  let archived = 0;
  let skipped = 0;

  for (const rec of index) {
    const bucket = triage(rec);
    if (bucket === "DROP" || bucket === "EXTERN") {
      skipped += 1;
      continue;
    }
    const src = join(SCRAPE, "content", `${rec.rel}.md`);
    let raw;
    try {
      raw = await readFile(src, "utf8");
    } catch {
      skipped += 1;
      continue;
    }
    const { fm, body } = cleanMarkdown(raw, rec.title);
    const dest = join(OUT, `${rec.rel}.md`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, `---\n${fm}\nbucket: "${bucket.toLowerCase()}"\n---\n\n${body}`);
    if (bucket === "KEEP") kept += 1;
    else archived += 1;
  }

  console.log(`✓ content/: ${kept} aktuelle Seiten, ${archived} Archiv-Seiten (${skipped} übersprungen).`);
}

run().catch((e) => {
  console.error("✗", e);
  process.exit(1);
});
