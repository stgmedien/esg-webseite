import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Der Newsletter des ESG Gütersloh: Neuigkeiten, Termine und Geschichten aus 175 Jahren Schulleben – direkt in dein Postfach.",
};

const benefits = [
  {
    title: "Neuigkeiten aus dem Schulleben",
    text: "Projekte, Konzerte, Theater, Wettbewerbe und Auszeichnungen – kompakt und kuratiert.",
  },
  {
    title: "Termine, die zählen",
    text: "Ferien, Anmeldezeiträume, Elternabende und große Veranstaltungen rechtzeitig im Blick.",
  },
  {
    title: "175 Jahre Geschichte(n)",
    text: "Zum Jubiläum: Geschichten und Bilder aus dem Archiv – von 1851 bis heute.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-grain flex-1">
        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          {/* Linke Spalte: Story */}
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <span aria-hidden>✦</span> 1851 – 2026 · 175 Jahre ESG
            </span>

            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Bleib in{" "}
              <em className="not-italic text-gold">Verbindung</em>
              <br />
              mit deiner Schule.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Seit 175 Jahren ist das Evangelisch Stiftische Gymnasium ein Ort, an dem
              Geschichte und Zukunft zusammenkommen. Mit unserem Newsletter verpasst du
              nichts Wichtiges – egal ob du Schüler:in, Elternteil, Ehemalige:r oder einfach
              neugierig bist.
            </p>

            <ul className="mt-10 space-y-5">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs text-paper"
                  >
                    ✦
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{b.title}</h3>
                    <p className="text-ink-soft">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 border-t border-line pt-6 text-sm text-ink-soft">
              <span className="font-display text-3xl text-ink">1851</span>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold to-transparent" />
              <span className="font-display text-3xl text-gold">2026</span>
            </div>
          </div>

          {/* Rechte Spalte: Formular */}
          <div className="animate-rise lg:pt-4" style={{ animationDelay: "120ms" }}>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
