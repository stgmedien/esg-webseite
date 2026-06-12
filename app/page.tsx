import type { Metadata } from "next";
import MinimalShell from "@/components/MinimalShell";
import JubilaeumsSignup from "@/components/JubilaeumsSignup";
import BookCover from "@/components/BookCover";

export const metadata: Metadata = {
  title: "Alumni-Newsletter — 175 Jahre ESG Gütersloh",
  description:
    "Der Alumni-Newsletter zum 175-jährigen Jubiläum des ESG Gütersloh: Neuigkeiten zum Jubiläumsband und der Film „175 Jahre ESG in 175 Sekunden“ — zuerst für Ehemalige.",
};

export default function AlumniSignupPage() {
  return (
    <MinimalShell>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-8 pb-16 sm:pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:pt-16 lg:pb-24">
        {/* Ankündigung + Formular — above the fold, auch mobil */}
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-xs font-bold tracking-[0.14em] text-gold uppercase">
            <span aria-hidden="true">✦</span> Für Ehemalige &amp; Freunde des ESG
          </p>

          <h1 className="mt-4 text-4xl leading-[1.06] font-extrabold tracking-tight text-ink sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
            Einmal ESG.
            <br />
            <span className="text-beere">Immer ESG.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Zum 175-jährigen Jubiläum verbinden wir uns neu mit allen, die hier ihre
            Schulzeit verbracht haben. Trag dich in den{" "}
            <strong className="font-semibold text-ink">Alumni-Newsletter</strong> ein und
            erfahre es zuerst: Neuigkeiten zum{" "}
            <strong className="font-semibold text-ink">Jubiläumsband</strong> und den Film{" "}
            <strong className="font-semibold text-ink">
              „175 Jahre ESG in 175&nbsp;Sekunden“
            </strong>{" "}
            — direkt in dein Postfach.
          </p>

          <div className="mt-6 sm:mt-8">
            <JubilaeumsSignup />
          </div>

          <p className="mt-5 text-sm text-ink-soft/80">
            Vom Abi-Jahrgang 1956 bis 2025: Schön, dass du wieder da bist.
          </p>
        </div>

        {/* Editorial-Motiv: Buchdeckel mit Film-Beilage */}
        <div
          className="animate-rise mx-auto w-full max-w-95 lg:mx-0 lg:justify-self-end"
          style={{ animationDelay: "120ms" }}
        >
          <BookCover />
        </div>
      </section>
    </MinimalShell>
  );
}
