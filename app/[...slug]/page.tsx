import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllPages, getPage, getChildren, getSiblings } from "@/lib/content";
import { accentFor, ACCENT_BG } from "@/lib/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages().map((p) => ({ slug: p.rel.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  return { title: page?.title ?? "Seite" };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const rel = slug.join("/");
  const page = getPage(rel);
  if (!page) notFound();

  const titles = new Map(getAllPages().map((p) => [p.rel, p.title]));
  const crumbs = slug.slice(0, -1).map((_, i) => {
    const path = slug.slice(0, i + 1).join("/");
    return { href: `/${path}`, label: titles.get(path) ?? slug[i] };
  });

  const children = getChildren(rel, page.bucket === "archiv");
  const siblings = getSiblings(rel).filter((s) => s.rel !== rel);
  const sidebar = children.length > 0 ? children : siblings;
  const sidebarTitle = children.length > 0 ? "In diesem Bereich" : "Auch interessant";
  const accent = accentFor(rel);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Seitenkopf */}
        <div className="border-b border-line bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
            <nav aria-label="Brotkrumen" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
              <Link href="/" className="hover:text-beere">
                Startseite
              </Link>
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-1.5">
                  <span aria-hidden>›</span>
                  <Link href={c.href} className="hover:text-beere">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
            <div className="flex flex-wrap items-center gap-4">
              <span aria-hidden className={`h-10 w-1.5 rounded-full ${ACCENT_BG[accent]}`} />
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {page.title}
              </h1>
              {page.bucket === "archiv" && (
                <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold">
                  Aus dem Archiv
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Inhalt + Seitenleiste */}
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1fr_280px] lg:py-14">
          <article className="prose-esg min-w-0 max-w-3xl" dangerouslySetInnerHTML={{ __html: page.html }} />

          {sidebar.length > 0 && (
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink-soft/70">
                {sidebarTitle}
              </h2>
              <ul className="mt-3 space-y-1 border-l border-line">
                {sidebar.map((s) => (
                  <li key={s.rel}>
                    <Link
                      href={`/${s.rel}`}
                      className="-ml-px block border-l-2 border-transparent px-4 py-1.5 text-sm text-ink-soft transition hover:border-beere hover:text-beere"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
