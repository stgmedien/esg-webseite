import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-lg font-semibold text-paper">
            ESG
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-ink">
              ESG Gütersloh
            </span>
            <span className="block text-xs text-ink-soft">
              Evangelisch Stiftisches Gymnasium
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold sm:inline">
            1851 – 2026 · 175 Jahre
          </span>
          <Link
            href="/newsletter"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-ink-soft"
          >
            Newsletter
          </Link>
        </div>
      </div>
    </header>
  );
}
