import type { Metadata } from "next";
import Link from "next/link";
import MinimalShell from "@/components/MinimalShell";

export const metadata: Metadata = {
  title: "Anmeldung bestätigt",
  description: "Deine Anmeldung zum Alumni-Newsletter des ESG Gütersloh ist bestätigt.",
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <MinimalShell>
      <div className="flex items-center justify-center px-5 py-20">
        <div className="animate-rise w-full max-w-lg rounded-3xl border border-line bg-paper p-10 text-center shadow-[0_30px_60px_-30px_rgba(94,33,56,0.35)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gelb-soft text-3xl text-gold ring-1 ring-gold/30">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Du bist dabei!</h1>
          <p className="mt-4 text-ink-soft">
            Deine Anmeldung zum <strong className="text-ink">Alumni-Newsletter</strong> ist
            bestätigt. Du erfährst ab jetzt zuerst, wenn es Neuigkeiten zum{" "}
            <strong className="text-ink">Jubiläumsband</strong> gibt – und bekommst den Film{" "}
            <strong className="text-ink">„175 Jahre ESG in 175 Sekunden“</strong> direkt in
            dein Postfach.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-2xl bg-beere px-6 py-3 font-bold text-white transition hover:bg-beere-deep"
          >
            Zurück zur Seite
          </Link>
        </div>
      </div>
    </MinimalShell>
  );
}
