import Link from "next/link";
import MinimalShell from "@/components/MinimalShell";

export default function NotFound() {
  return (
    <MinimalShell>
      <div className="flex items-center justify-center px-5 py-24">
        <div className="max-w-lg text-center">
          <p className="text-7xl font-extrabold tracking-tight text-beere/20">404</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Diese Seite ist gerade nicht verfügbar.
          </h1>
          <p className="mt-4 text-ink-soft">
            Zum 175-jährigen Jubiläum gibt es hier im Moment genau eine Seite: die
            Anmeldung zum Alumni-Newsletter.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-2xl bg-beere px-6 py-3 font-bold text-white transition hover:bg-beere-deep"
          >
            Zur Anmeldung
          </Link>
        </div>
      </div>
    </MinimalShell>
  );
}
