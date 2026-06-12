import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-grain flex flex-1 items-center justify-center px-5 py-24">
        <div className="max-w-lg text-center">
          <p className="text-7xl font-extrabold tracking-tight text-beere/20">404</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Diese Seite gibt es (noch) nicht.
          </h1>
          <p className="mt-4 text-ink-soft">
            Die neue ESG-Website ist im Aufbau — vielleicht ist dieser Inhalt umgezogen
            oder wurde ins Archiv übernommen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-beere px-6 py-2.5 font-bold text-white transition hover:bg-beere-deep"
            >
              Zur Startseite
            </Link>
            <Link
              href="/geschichte"
              className="rounded-full border border-beere/30 px-6 py-2.5 font-semibold text-beere transition hover:border-beere"
            >
              Ins Archiv
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
