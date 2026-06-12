import "server-only";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = join(process.cwd(), "content");

export type PageMeta = {
  /** Pfad relativ zur Site-Wurzel, z. B. "schulprofil/mint" */
  rel: string;
  title: string;
  bucket: "keep" | "archiv";
  modified?: string;
  date?: string;
};

export type Page = PageMeta & { html: string };

function walk(dir: string, prefix = ""): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.name.endsWith(".md")) out.push(rel.slice(0, -3));
  }
  return out;
}

let pageCache: PageMeta[] | null = null;

/** Alle Seiten (Frontmatter), gecacht pro Build/Prozess. */
export function getAllPages(): PageMeta[] {
  if (pageCache) return pageCache;
  pageCache = walk(CONTENT_DIR)
    .map((rel) => {
      const raw = readFileSync(join(CONTENT_DIR, `${rel}.md`), "utf8");
      const { data } = matter(raw);
      return {
        rel,
        title: String(data.title ?? rel),
        bucket: (data.bucket === "archiv" ? "archiv" : "keep") as "keep" | "archiv",
        modified: data.modified ? String(data.modified) : undefined,
        date: data.date ? String(data.date) : undefined,
      };
    })
    .sort((a, b) => a.rel.localeCompare(b.rel, "de"));
  return pageCache;
}

/** Interne Links auf die neue Site umbiegen; Uploads bleiben auf der Alt-Domain. */
function rewriteLinks(html: string): string {
  return html.replace(
    /href="https:\/\/esg-guetersloh\.de\/(?!wp-content|wp-json|wp-admin)([^"]*)"/g,
    (_, path: string) => `href="/${path.replace(/\/$/, "")}"`,
  );
}

export function getPage(rel: string): Page | null {
  const file = join(CONTENT_DIR, `${rel}.md`);
  if (!existsSync(file)) return null;
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  // Erste H1 entfernen — der Seitentitel wird vom Template gerendert.
  const body = content.replace(/^\s*# .+\n/, "");
  let html = marked.parse(body, { async: false }) as string;
  html = rewriteLinks(html);
  html = html.replaceAll("<img ", '<img loading="lazy" decoding="async" ');
  return {
    rel,
    title: String(data.title ?? rel),
    bucket: (data.bucket === "archiv" ? "archiv" : "keep") as "keep" | "archiv",
    modified: data.modified ? String(data.modified) : undefined,
    date: data.date ? String(data.date) : undefined,
    html,
  };
}

/** Direkte Unterseiten eines Pfads (nur KEEP, außer explizit gewünscht). */
export function getChildren(rel: string, includeArchive = false): PageMeta[] {
  const prefix = rel === "" ? "" : `${rel}/`;
  return getAllPages().filter((p) => {
    if (!p.rel.startsWith(prefix) || p.rel === rel) return false;
    if (p.rel.slice(prefix.length).includes("/")) return false;
    return includeArchive || p.bucket === "keep";
  });
}

/** Geschwister-Seiten (gleicher Elternpfad). */
export function getSiblings(rel: string): PageMeta[] {
  const parent = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
  return getChildren(parent);
}

export type ChronikEntry = { date: string; text: string; year: number };

/** Chronik-Einträge (datierte Listenpunkte) für den 175-Jahre-Zeitstrahl. */
export function getChronik(): ChronikEntry[] {
  const file = join(CONTENT_DIR, "unsere-schule-frueher/chronik.md");
  if (!existsSync(file)) return [];
  const { content } = matter(readFileSync(file, "utf8"));
  const entries: ChronikEntry[] = [];
  for (const m of content.matchAll(/^-\s+(.+)$/gm)) {
    const line = m[1].replace(/\\\./g, ".").trim();
    const dm = line.match(/^([^:]{3,40}?(\d{4})[^:]{0,15}):\s*(.+)$/);
    if (!dm) continue;
    entries.push({ date: dm[1].trim(), year: Number(dm[2]), text: dm[3].trim() });
  }
  return entries;
}
