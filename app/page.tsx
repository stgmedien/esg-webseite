import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="bg-grain flex-1">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <span aria-hidden>✦</span> 1851 – 2026 · 175 Jahre
            </span>

            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
              Eine Schule mit{" "}
              <em className="not-italic text-gold">Geschichte.</em>
              <br />
              Und Zukunft.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Das Evangelisch Stiftische Gymnasium Gütersloh baut seine neue Website auf.
              Den Anfang macht das Wichtigste: in Verbindung bleiben. Melde dich für unseren
              Newsletter an und sei von Anfang an dabei.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/newsletter"
                className="rounded-xl bg-ink px-7 py-3.5 text-base font-medium text-paper transition hover:bg-ink-soft"
              >
                Zur Newsletter-Anmeldung
              </Link>
              <a
                href="https://esg-guetersloh.de"
                target="_blank"
                rel="noreferrer"
                className="text-base font-medium text-ink-soft underline decoration-gold/50 underline-offset-4 hover:text-ink"
              >
                Aktuelle Website ansehen ↗
              </a>
            </div>
          </div>

          <div className="animate-rise" style={{ animationDelay: "120ms" }}>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
