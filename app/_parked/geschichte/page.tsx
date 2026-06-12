import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getChronik, getAllPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "175 Jahre ESG – Unsere Geschichte",
  description:
    "1851 bis 2026: Der Zeitstrahl des Evangelisch Stiftischen Gymnasiums Gütersloh – von 16 Schülern im Physikstall zur MINT-EC-Schule.",
};

const archivBereiche = [
  { label: "Chronik der Schulgeschichte", href: "/unsere-schule-frueher/chronik" },
  { label: "Baugeschichte", href: "/unsere-schule-frueher/baugeschichte" },
  { label: "Bilder aus der Schulgeschichte", href: "/unsere-schule-frueher/bilder-aus-der-schulgeschichte" },
  { label: "Bilder aus der Baugeschichte", href: "/unsere-schule-frueher/bilder-aus-der-baugeschichte" },
  { label: "Pressearchiv", href: "/aktuelles/pressearchiv" },
  { label: "Abiturjahrgänge", href: "/abitur-am-esg" },
];

/** Epochen-Grenzen für die Gliederung des Zeitstrahls */
const epochen = [
  { from: 0, to: 1900, title: "Gründerzeit", sub: "Vom Physikstall zum preußischen Gymnasium" },
  { from: 1900, to: 1945, title: "Bewegte Jahrzehnte", sub: "Neubau, Weltkriege, Umbrüche" },
  { from: 1945, to: 2000, title: "Neuanfang & Wachstum", sub: "Wiederaufbau und Öffnung" },
  { from: 2000, to: 9999, title: "Digitale Schule", sub: "Laptops, MINT-EC, Smart School" },
];

export default function GeschichtePage() {
  const chronik = getChronik();
  const hasArchiv = new Set(getAllPages().map((p) => p.rel));

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Kopf */}
        <section className="relative isolate overflow-hidden bg-beere-deep">
          <Image
            src="/images/abitur-1926.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25 grayscale"
            sizes="100vw"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-beere-deep via-beere-deep/70 to-beere-deep/40" />
          <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:py-32">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gelb">Jubiläum 2026</p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
              175 Jahre ESG
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
              Von 16 Schülern im „Physikstall“ zur digitalen MINT-EC-Schule: Die Geschichte
              des Evangelisch Stiftischen Gymnasiums ist die Geschichte Güterslohs – erzählt
              entlang unserer Schulchronik.
            </p>
            <div className="mx-auto mt-10 flex max-w-md items-center gap-4 text-white/80">
              <span className="text-3xl font-extrabold text-white">1851</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gelb via-gelb/60 to-gelb" />
              <span className="text-3xl font-extrabold text-gelb">2026</span>
            </div>
          </div>
        </section>

        {/* Zeitstrahl */}
        <section className="mx-auto max-w-4xl px-5 py-16">
          {epochen.map((epoche) => {
            const entries = chronik.filter((e) => e.year >= epoche.from && e.year < epoche.to);
            if (entries.length === 0) return null;
            return (
              <div key={epoche.title} className="mb-14">
                <div className="sticky top-28 z-10 -mx-2 mb-6 rounded-xl bg-background/95 px-2 py-2 backdrop-blur">
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                    {epoche.title}
                  </h2>
                  <p className="text-sm text-ink-soft">{epoche.sub}</p>
                </div>
                <ol className="relative border-l-2 border-beere/25 pl-7">
                  {entries.map((e, i) => (
                    <li key={`${e.year}-${i}`} className="relative mb-7">
                      <span
                        aria-hidden
                        className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-[3px] border-beere bg-background"
                      />
                      <p className="text-sm font-extrabold uppercase tracking-wide text-beere">
                        {e.date}
                      </p>
                      <p className="mt-1 leading-relaxed text-ink-soft">{e.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </section>

        {/* Archiv-Einstiege */}
        <section className="bg-paper py-16">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">
              Tiefer eintauchen
            </h2>
            <p className="mt-2 max-w-2xl text-ink-soft">
              Unser digitales Archiv: historische Bilder, die vollständige Chronik und das
              Pressearchiv aus über einem Jahrhundert Schulleben.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {archivBereiche
                .filter((a) => hasArchiv.has(a.href.slice(1)))
                .map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="group flex items-center justify-between rounded-2xl border border-line bg-background px-6 py-5 transition hover:border-beere hover:shadow-lg"
                  >
                    <span className="font-bold text-ink group-hover:text-beere">{a.label}</span>
                    <span aria-hidden className="text-beere transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
