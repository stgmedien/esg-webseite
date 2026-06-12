import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JubilaeumsSignup from "@/components/JubilaeumsSignup";
import BookCover from "@/components/BookCover";

export const metadata: Metadata = {
  title: "Jubiläumspost — Buch & Film zum 175-jährigen Jubiläum",
  description:
    "Der Jubiläumsband zum 175-jährigen Bestehen des ESG Gütersloh — und der Film „175 Jahre ESG in 175 Sekunden“. Trag dich ein und erfahre zuerst davon.",
};

export default function NewsletterPage() {
  return (
    <>
      {/* Kapitalband: schmaler Goldstreifen wie am Buchblock */}
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-gold via-gelb to-gold" />

      {/* Mini-Kopf: nur das Logo, keine Navigation */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-5 sm:pt-7">
        <Link
          href="/"
          aria-label="Zur Startseite des ESG Gütersloh"
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
          Jubiläumspost · 1851–2026
        </p>
      </header>

      <main className="bg-grain flex-1">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-8 pb-16 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-16 lg:pb-24">
          {/* Ankündigung + Formular — above the fold, auch mobil */}
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-xs font-bold tracking-[0.14em] text-gold uppercase">
              <span aria-hidden="true">✦</span> Erscheint im Jubiläumsjahr 2026
            </p>

            <h1 className="mt-4 text-4xl leading-[1.06] font-extrabold tracking-tight text-ink sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
              Das Buch zum Jubiläum.
              <br />
              <span className="text-beere">Der Film in 175&nbsp;Sekunden.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Zum 175-jährigen Bestehen erscheint der{" "}
              <strong className="font-semibold text-ink">Jubiläumsband</strong> — und der Film{" "}
              <strong className="font-semibold text-ink">
                „175 Jahre ESG in 175&nbsp;Sekunden“
              </strong>
              . Trag dich ein und erfahre es zuerst: Neuigkeiten zum Buch, den Film direkt ins
              Postfach.
            </p>

            <div className="mt-6 sm:mt-8">
              <JubilaeumsSignup />
            </div>
          </div>

          {/* Editorial-Motiv: Buchdeckel mit Film-Beilage */}
          <div
            className="animate-rise mx-auto w-full max-w-95 lg:mx-0 lg:justify-self-end"
            style={{ animationDelay: "120ms" }}
          >
            <BookCover />
          </div>
        </section>
      </main>

      {/* Mini-Fuß: nur Rechtliches */}
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
