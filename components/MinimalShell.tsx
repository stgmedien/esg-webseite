import Link from "next/link";
import Image from "next/image";

/**
 * Schlanker Seitenrahmen ohne Website-Navigation: nur Logo, Inhalt und
 * rechtlicher Mini-Footer. Solange ausschließlich der Alumni-Sign-up
 * öffentlich ist, nutzen alle sichtbaren Seiten diesen Rahmen.
 */
export default function MinimalShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-gold via-gelb to-gold" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-5 sm:pt-7">
        <Link
          href="/"
          aria-label="Zur Anmeldung für den Alumni-Newsletter"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-beere"
        >
          <Image
            src="/images/esg-logo.svg"
            alt="ESG – Evangelisch Stiftisches Gymnasium Gütersloh"
            width={954}
            height={254}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <p className="hidden text-[11px] font-bold tracking-[0.28em] text-ink-soft uppercase sm:block">
          Alumni-Newsletter · 1851–2026
        </p>
      </header>

      <main className="bg-grain flex-1">{children}</main>

      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ink-soft sm:flex-row">
          <p>© 2026 Evangelisch Stiftisches Gymnasium Gütersloh</p>
          <nav aria-label="Rechtliches" className="flex items-center gap-6">
            <Link
              href="/datenschutz"
              className="rounded-sm underline-offset-4 transition hover:text-beere hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="rounded-sm underline-offset-4 transition hover:text-beere hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere"
            >
              Impressum
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
