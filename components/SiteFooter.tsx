import Link from "next/link";

const externalPortals = [
  { label: "itslearning", href: "https://esg-guetersloh.itslearning.com" },
  { label: "WebUntis", href: "https://webuntis.com" },
  { label: "Mediothek", href: "https://esg-medi.de" },
  { label: "Aktuelle Website", href: "https://esg-guetersloh.de" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-display text-sm font-semibold text-paper">
              ESG
            </span>
            <span className="font-display text-sm font-semibold text-ink">ESG Gütersloh</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Feldstraße 13, 33330 Gütersloh
            <br />
            Tel. 05241 9805-0
          </p>
        </div>

        <nav aria-label="Rechtliches">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
            Rechtliches
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/impressum" className="text-ink-soft hover:text-ink">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-ink-soft hover:text-ink">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Schnellzugriff" className="sm:col-span-2 lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
            Schnellzugriff
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {externalPortals.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  className="text-ink-soft hover:text-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-soft/70">
          © {new Date().getFullYear()} Evangelisch Stiftisches Gymnasium Gütersloh. Neue
          Website im Aufbau.
        </p>
      </div>
    </footer>
  );
}
