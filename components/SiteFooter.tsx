import Link from "next/link";
import { PORTALE } from "@/lib/nav";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Schule",
    links: [
      { label: "Schulprofil", href: "/schulprofil" },
      { label: "Unterricht", href: "/unterricht" },
      { label: "Schulleben", href: "/aktivitaeten" },
      { label: "Schulgemeinde", href: "/schulgemeinde" },
      { label: "Über Mittag", href: "/ueber-mittag" },
      { label: "Abitur am ESG", href: "/abitur-am-esg" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Aktuelles", href: "/aktuelles" },
      { label: "Termine", href: "/termine-alle" },
      { label: "Ferientage", href: "/aktuelles/ferientage" },
      { label: "Downloads", href: "/downloads" },
      { label: "Anleitungen", href: "/anleitungen" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    title: "Portale",
    links: PORTALE.map((p) => ({ ...p, external: true })),
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-beere-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-lg font-extrabold tracking-tight text-white">
            Evangelisch Stiftisches
            <br />
            Gymnasium Gütersloh
          </p>
          <p className="mt-1 text-sm font-semibold text-gelb">1851 – 2026 · 175 Jahre</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            Feldstraße 13 · 33330 Gütersloh
            <br />
            Telefon 05241 9805-0
          </address>
          <Link
            href="/geschichte"
            className="mt-5 inline-block rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white transition hover:border-gelb hover:text-gelb"
          >
            Unsere Geschichte entdecken →
          </Link>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) =>
                l.external ? (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                      {l.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Evangelisch Stiftisches Gymnasium Gütersloh</p>
          <p className="flex gap-4">
            <Link href="/kontakt-impressum" className="hover:text-white">
              Kontakt & Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
