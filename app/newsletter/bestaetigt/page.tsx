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
          <h1 className="font-display text-3xl text-ink">Willkommen an Bord!</h1>
          <p className="mt-4 text-ink-soft">
            Deine Anmeldung ist bestätigt. Du bekommst ab jetzt Neuigkeiten, Termine und
            Geschichten aus 175 Jahren ESG Gütersloh – direkt in dein Postfach.
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
