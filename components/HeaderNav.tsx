"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type NavItem = {
  label: string;
  href: string;
  accent: "beere" | "gruen" | "blau" | "gelb";
  children: { label: string; href: string }[];
};

const ACCENT_BAR: Record<NavItem["accent"], string> = {
  beere: "bg-beere",
  gruen: "bg-gruen",
  blau: "bg-blau",
  gelb: "bg-gelb",
};

export default function HeaderNav({
  items,
  portale,
}: {
  items: NavItem[];
  portale: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40">
      {/* Schmale Top-Leiste: Portale */}
      <div className="bg-beere-deep text-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-1.5 text-xs">
          <p className="hidden font-semibold tracking-wide sm:block">
            1851 – 2026 · <span className="text-gelb">175 Jahre ESG</span>
          </p>
          <nav aria-label="Externe Portale" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {portale.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                {p.label} ↗
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hauptleiste */}
      <div className="border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <Link href="/" className="shrink-0" aria-label="Zur Startseite">
            <Image
              src="/images/esg-logo.svg"
              alt="ESG – Evangelisch Stiftisches Gymnasium Gütersloh"
              width={954}
              height={254}
              priority
              className="h-11 w-auto sm:h-13"
            />
          </Link>

          {/* Desktop-Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="relative block rounded-lg px-3 py-2 text-[15px] font-semibold text-ink transition hover:bg-beere-soft"
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100 ${ACCENT_BAR[item.accent]}`}
                  />
                </Link>
                {item.children.length > 0 && (
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="max-h-[70vh] w-max min-w-56 max-w-2xl overflow-auto rounded-2xl border border-line bg-paper p-2 shadow-xl">
                      <div className={item.children.length > 8 ? "grid grid-cols-2 gap-x-2" : ""}>
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block rounded-lg px-3 py-2 text-sm text-ink-soft transition hover:bg-beere-soft hover:text-beere"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/newsletter"
              className="hidden rounded-full bg-beere px-5 py-2 text-sm font-semibold text-white transition hover:bg-beere-deep sm:block"
            >
              Newsletter
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${open ? "top-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition ${open ? "top-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile-Menü */}
        {open && (
          <nav aria-label="Mobile Navigation" className="border-t border-line bg-paper lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-5 py-4">
              {items.map((item) => (
                <div key={item.href} className="rounded-xl border border-line">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4 py-3 font-semibold text-ink"
                    >
                      {item.label}
                    </Link>
                    {item.children.length > 0 && (
                      <button
                        type="button"
                        aria-label={`${item.label} aufklappen`}
                        aria-expanded={expanded === item.href}
                        onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                        className="px-4 py-3 text-ink-soft"
                      >
                        <span
                          className={`inline-block transition-transform ${expanded === item.href ? "rotate-180" : ""}`}
                        >
                          ▾
                        </span>
                      </button>
                    )}
                  </div>
                  {expanded === item.href && item.children.length > 0 && (
                    <div className="border-t border-line px-2 py-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-4 py-2 text-sm text-ink-soft hover:bg-beere-soft hover:text-beere"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-beere px-4 py-3 text-center font-semibold text-white"
              >
                Newsletter abonnieren
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
