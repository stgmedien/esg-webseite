import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Anmeldung bestätigt",
  description: "Deine Newsletter-Anmeldung beim ESG Gütersloh ist bestätigt.",
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-grain flex flex-1 items-center justify-center px-5 py-20">
        <div className="animate-rise w-full max-w-lg rounded-2xl border border-line bg-paper p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-3xl text-gold">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Du bist dabei!</h1>
          <p className="mt-4 text-ink-soft">
            Deine Anmeldung ist bestätigt. Du erfährst ab jetzt zuerst, wenn es Neuigkeiten
            zum <strong className="text-ink">Jubiläumsband</strong> gibt – und bekommst den
            Film <strong className="text-ink">„175 Jahre ESG in 175 Sekunden“</strong> direkt
            in dein Postfach.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-ink px-6 py-3 text-paper transition hover:bg-ink-soft"
          >
            Zur Startseite
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
