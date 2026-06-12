// Phase 1 · Schritt 2: Mediathek indizieren und herunterladen.
//   node scrape/media.mjs --index-only   → nur Index (schnell)
//   node scrape/media.mjs                → Index + alle Dateien laden
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname } from "node:path";
import { fetchAll, fetchWithRetry, writeOut, mapLimit, out } from "./_util.mjs";

async function run() {
  const indexOnly = process.argv.includes("--index-only");

  console.log("→ Lade Mediathek-Index …");
  const media = await fetchAll("media");
  const items = media
    .map((m) => ({
      id: m.id,
      url: m.source_url,
      mime: m.mime_type,
      mediaType: m.media_type,
      title: (m.title?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
      alt: m.alt_text ?? "",
      date: m.date,
    }))
    .filter((m) => m.url);

  await writeOut("media-index.json", JSON.stringify(items, null, 2));

  const byMime = {};
  for (const m of items) byMime[m.mime] = (byMime[m.mime] ?? 0) + 1;
  console.log(`\n✓ ${items.length} Medien im Index. Typen:`);
  for (const [k, v] of Object.entries(byMime).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${String(v).padStart(5)}  ${k}`);
  }

  if (indexOnly) {
    console.log("\n(Index-Modus — keine Dateien geladen.)");
    return;
  }

  console.log(`\n→ Lade ${items.length} Dateien herunter (5 parallel, überspringt Vorhandenes) …`);
  let done = 0;
  let skipped = 0;
  let failed = 0;
  let bytes = 0;

  await mapLimit(items, 5, async (m) => {
    try {
      const u = new URL(m.url);
      const rel = u.pathname.replace(/^\/+/, ""); // wp-content/uploads/JJJJ/MM/datei.ext
      const path = out(`assets/${rel}`);
      await mkdir(dirname(path), { recursive: true });

      try {
        await stat(path);
        skipped += 1;
        done += 1;
        return;
      } catch {
        /* existiert nicht → laden */
      }

      const res = await fetchWithRetry(m.url);
      if (!res.ok) {
        failed += 1;
        return;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path, buf);
      bytes += buf.length;
      done += 1;
      if (done % 25 === 0) {
        process.stdout.write(`\r  ${done}/${items.length} — ${(bytes / 1e6).toFixed(1)} MB neu   `);
      }
    } catch {
      failed += 1;
    }
  });

  console.log(
    `\n✓ Fertig: ${done}/${items.length} vorhanden (${skipped} übersprungen), ` +
      `${(bytes / 1e6).toFixed(1)} MB neu geladen, ${failed} Fehler.`,
  );
}

run().catch((e) => {
  console.error("\n✗ Fehler:", e);
  process.exit(1);
});
