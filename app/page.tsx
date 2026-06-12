import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterForm from "@/components/NewsletterForm";

const schwerpunkte = [
  {
    title: "MINT-EC-Schule",
    text: "Ausgezeichnete Förderung in Mathematik, Informatik, Naturwissenschaften und Technik – von Jugend forscht bis teutolab.",
    href: "/schulprofil/mint",
    image: "/images/mint.jpg",
    accent: "bg-blau",
  },
  {
    title: "Digitales Lernen",
    text: "Seit 2004 lernen unsere Schüler:innen ab der Mittelstufe mit eigenen Laptops – als eine der ersten Schulen Deutschlands.",
    href: "/schulprofil/digitales-lernen",
    image: "/images/hero-digital.jpg",
    accent: "bg-beere",
  },
  {
    title: "Mediothek",
    text: "Unsere preisgekrönte Schulbibliothek: Lese- und Lernort, Bücherzirkus, Schreibwettbewerb und Sommerleseclub.",
    href: "/unsere-schule-heute/mediothek",
    image: "/images/mediothek.jpg",
    accent: "bg-gruen",
  },
];

const zielgruppen = [
  {
    label: "Für Schüler:innen",
    text: "Stundenpläne, AGs, Über Mittag und die digitale Schülerzeitung.",
    href: "/aktivitaeten",
    classes: "bg-gruen-soft text-gruen border-gruen/20 hover:border-gruen",
  },
  {
    label: "Für Eltern",
    text: "Anmeldung, Beratung, Elternvertretung und alle Termine im Blick.",
    href: "/schulprofil/erprobungsstufe",
    classes: "bg-blau-soft text-blau border-blau/20 hover:border-blau",
  },
  {
    label: "Für Ehemalige",
    text: "Abiturjahrgänge, Alumni-Netzwerk und 175 Jahre Schulgeschichte.",
    href: "/geschichte",
    classes: "bg-gold-soft text-gold border-gold/20 hover:border-gold",
  },
  {
    label: "Für Lehrkräfte",
    text: "Fachschaften, Gremien und Materialien für den Schulalltag.",
    href: "/schulgemeinde/lehrkraefte",
    classes: "bg-beere-soft text-beere border-beere/20 hover:border-beere",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-beere-deep">
          <Image
            src="/images/hero-digital.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-beere-deep via-beere-deep/80 to-transparent"
          />
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:py-40">
            <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-gelb/50 bg-gelb/10 px-4 py-1.5 text-sm font-bold text-gelb">
              ✦ 1851 – 2026 · Wir feiern 175 Jahre
            </p>
            <h1
              className="animate-rise mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Eine Schule mit Geschichte.
              <br />
              <span className="text-gelb">Und mit Zukunft.</span>
            </h1>
            <p
              className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
              style={{ animationDelay: "160ms" }}
            >
              Das Evangelisch Stiftische Gymnasium Gütersloh verbindet 175 Jahre Tradition
              mit digitalem Lernen, MINT-Exzellenz und einem lebendigen Schulleben aus
              Musik, Theater und Sport.
            </p>
            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/schulprofil"
                className="rounded-full bg-white px-7 py-3 text-base font-bold text-beere transition hover:bg-gelb hover:text-ink"
              >
                Schule entdecken
              </Link>
              <Link
                href="/geschichte"
                className="rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-white transition hover:border-gelb hover:text-gelb"
              >
                175 Jahre Geschichte →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Zielgruppen-Schnellzugriff ───────────────────── */}
        <section className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {zielgruppen.map((z) => (
              <Link
                key={z.label}
                href={z.href}
                className={`group rounded-2xl border p-5 transition ${z.classes}`}
              >
                <h2 className="font-extrabold tracking-tight">{z.label}</h2>
                <p className="mt-1.5 text-sm text-ink-soft">{z.text}</p>
                <span className="mt-3 inline-block text-sm font-bold transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Schwerpunkte ─────────────────────────────────── */}
        <section className="bg-paper py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-beere">
                  Wofür wir stehen
                </p>
                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Unsere Schwerpunkte
                </h2>
              </div>
              <Link
                href="/schulprofil/schwerpunkte"
                className="hidden shrink-0 text-sm font-bold text-beere hover:underline sm:block"
              >
                Alle Schwerpunkte →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {schwerpunkte.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group overflow-hidden rounded-2xl border border-line bg-background transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <span aria-hidden className={`absolute inset-x-0 bottom-0 h-1.5 ${s.accent}`} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold tracking-tight text-ink group-hover:text-beere">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 175 Jahre ────────────────────────────────────── */}
        <section className="bg-grain">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/turm-spiegelung.jpg"
                alt="Der Uhrturm des ESG, gespiegelt in einer Pfütze"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gold">Jubiläum 2026</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                175 Jahre.
                <br />
                <span className="text-beere">Eine Geschichte, die weitergeht.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                1851 begann der Unterricht mit 16 Schülern im „Physikstall“ an der
                Feldstraße. Heute sind wir eine MINT-EC-Schule mit digitalem Unterricht –
                und feiern unser Jubiläum mit einem ganzen Festjahr.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/geschichte"
                  className="rounded-full bg-beere px-7 py-3 font-bold text-white transition hover:bg-beere-deep"
                >
                  Zeitstrahl ansehen
                </Link>
                <a
                  href="https://esg-guetersloh.de/wp-content/uploads/2026/05/programm-jubilaeum-175-jahre-esg.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-beere/30 px-7 py-3 font-semibold text-beere transition hover:border-beere"
                >
                  Jubiläumsprogramm (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Aktuelles & Newsletter ───────────────────────── */}
        <section className="bg-beere-deep py-16 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gelb">
                Nichts verpassen
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Neuigkeiten direkt ins Postfach
              </h2>
              <p className="mt-4 max-w-lg text-white/80">
                Termine, Projekte, Jubiläums-Veranstaltungen: Unser Newsletter bringt das
                Schulleben zu dir – ein paarmal im Schuljahr, kompakt und kuratiert.
              </p>
              <p className="mt-6 text-sm text-white/60">
                Tagesaktuelles gibt’s von der Schülerzeitung:{" "}
                <a href="http://esblog.de" target="_blank" rel="noreferrer" className="font-bold text-gelb hover:underline">
                  ES_blo_G ↗
                </a>
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
