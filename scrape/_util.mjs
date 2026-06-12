// Gemeinsame Helfer für die Phase-1-Crawler (rein lesend gegen esg-guetersloh.de).
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE = "https://esg-guetersloh.de";
export const BASE = `${SITE}/wp-json/wp/v2`;
export const ROOT = new URL("./output/", import.meta.url); // scrape/output/

const UA = "ESG-Migration/1.0 (freundlicher Eigen-Scrape der eigenen Schulseite)";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const out = (rel) => fileURLToPath(new URL(rel, ROOT));

export async function fetchWithRetry(url, opts = {}, tries = 4) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { ...opts, headers: { "user-agent": UA, ...(opts.headers ?? {}) } });
      if (res.ok || res.status === 400 || res.status === 404) return res;
      last = res;
    } catch (e) {
      last = e;
    }
    await sleep(600 * (i + 1));
  }
  if (last instanceof Response) return last;
  throw last;
}

/** Alle Seiten einer paginierten WP-REST-Collection einsammeln. */
export async function fetchAll(endpoint, perPage = 100) {
  const result = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = `${BASE}/${endpoint}?per_page=${perPage}&page=${page}`;
    const res = await fetchWithRetry(url);
    if (res.status === 400) break; // hinter der letzten Seite
    if (!res.ok) {
      console.warn(`\n  ! ${endpoint} Seite ${page}: HTTP ${res.status}`);
      break;
    }
    totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1") || 1;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    result.push(...data);
    process.stdout.write(`\r  ${endpoint}: Seite ${page}/${totalPages} — ${result.length} Einträge   `);
    page += 1;
    await sleep(300);
  } while (page <= totalPages);
  process.stdout.write("\n");
  return result;
}

export async function writeOut(rel, content) {
  const path = out(rel);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
  return path;
}

/** Begrenzte Parallelität ohne externe Dependency. */
export async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length || 1) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

export function stripHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(html) {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).length : 0;
}

export function extractAssetUrls(html = "") {
  const urls = new Set();
  const re = /(?:src|href|data-src)=["']([^"']+\.(?:jpe?g|png|gif|webp|svg|pdf|docx?|pptx?|xlsx?))["']/gi;
  let m;
  while ((m = re.exec(html))) urls.add(m[1]);
  return [...urls];
}

export function extractVideoEmbeds(html = "") {
  const urls = new Set();
  const patterns = [
    /(?:src|href)=["']([^"']*(?:youtube\.com|youtu\.be|vimeo\.com)[^"']*)["']/gi,
    /<source[^>]+src=["']([^"']+\.(?:mp4|webm|mov))["']/gi,
    /(?:src|href)=["']([^"']+\.(?:mp4|webm|mov))["']/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) urls.add(m[1]);
  }
  return [...urls];
}

/** Vollständige URL → relativer Pfad (für Datei-Ablage). */
export function urlToRelPath(link) {
  try {
    const u = new URL(link);
    const p = u.pathname.replace(/^\/+|\/+$/g, "");
    return p || "index";
  } catch {
    return "index";
  }
}
