// Phase 1 · Schritt 1: Alle Seiten & Beiträge als Markdown sichern,
// plus Index (Wörter, Bilder), Asset- und Video-Liste.
import TurndownService from "turndown";
import { fetchAll, writeOut, urlToRelPath, wordCount, stripHtml, extractAssetUrls, extractVideoEmbeds } from "./_util.mjs";

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });

function frontmatter(obj) {
  const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const lines = Object.entries(obj)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: "${esc(v)}"`);
  return `---\n${lines.join("\n")}\n---\n`;
}

async function run() {
  const index = [];
  const assetUrls = new Set();
  const videos = [];

  for (const type of ["pages", "posts"]) {
    console.log(`\n→ Lade ${type} …`);
    const items = await fetchAll(type);
    console.log(`  ${items.length} ${type} geladen.`);

    for (const it of items) {
      const title = stripHtml(it.title?.rendered ?? "") || "(ohne Titel)";
      const html = it.content?.rendered ?? "";
      const rel = urlToRelPath(it.link);

      const md =
        frontmatter({
          title,
          type: type === "posts" ? "post" : "page",
          slug: it.slug,
          url: it.link,
          status: it.status,
          date: it.date,
          modified: it.modified,
          wp_id: it.id,
        }) +
        `\n# ${title}\n\n` +
        td.turndown(html) +
        "\n";
      await writeOut(`content/${rel}.md`, md);

      const assets = extractAssetUrls(html);
      assets.forEach((u) => assetUrls.add(u));
      const vids = extractVideoEmbeds(html);
      if (vids.length) videos.push({ page: it.link, title, videos: vids });

      index.push({
        wp_id: it.id,
        type: type === "posts" ? "post" : "page",
        title,
        url: it.link,
        rel,
        status: it.status,
        words: wordCount(html),
        images: assets.filter((u) => /\.(jpe?g|png|gif|webp|svg)$/i.test(u)).length,
        modified: it.modified,
      });
    }
  }

  await writeOut("content-index.json", JSON.stringify(index, null, 2));
  await writeOut("inline-assets.json", JSON.stringify([...assetUrls].sort(), null, 2));
  await writeOut("videos.json", JSON.stringify(videos, null, 2));

  const totalVideos = videos.reduce((n, v) => n + v.videos.length, 0);
  console.log(`\n✓ ${index.length} Seiten/Beiträge als Markdown gespeichert.`);
  console.log(`✓ ${assetUrls.size} verlinkte Assets gesammelt (inline-assets.json).`);
  console.log(`✓ ${totalVideos} Video-Einbettungen auf ${videos.length} Seiten (videos.json).`);
}

run().catch((e) => {
  console.error("\n✗ Fehler:", e);
  process.exit(1);
});
