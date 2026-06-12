/**
 * Kuratierte Hauptnavigation. Die Bereichsfarben führen die
 * Zielgruppen-Farbcodierung der alten Website modern weiter
 * (Beere = Standard, Grün = Schüler, Blau = Eltern, Gelb = International).
 */
export type NavSection = {
  label: string;
  href: string;
  /** Tailwind-Akzentklasse für Hover-/Aktivmarker */
  accent: "beere" | "gruen" | "blau" | "gelb";
  /** Hub-Pfad in content/, dessen Kinder das Dropdown füllen */
  hub?: string;
  /** Zusätzliche, manuell kuratierte Einträge */
  extra?: { label: string; href: string }[];
};

export const MAIN_NAV: NavSection[] = [
  {
    label: "Aktuelles",
    href: "/aktuelles",
    accent: "beere",
    hub: "aktuelles",
    extra: [
      { label: "Termine", href: "/termine-alle" },
      { label: "Klausurplan", href: "/termine-alle/klausurplan" },
      { label: "175 Jahre ESG", href: "/geschichte" },
    ],
  },
  { label: "Schulprofil", href: "/schulprofil", accent: "beere", hub: "schulprofil" },
  { label: "Unterricht", href: "/unterricht", accent: "blau", hub: "unterricht" },
  { label: "Schulleben", href: "/aktivitaeten", accent: "gruen", hub: "aktivitaeten" },
  { label: "Schulgemeinde", href: "/schulgemeinde", accent: "gelb", hub: "schulgemeinde" },
  {
    label: "Unsere Schule",
    href: "/unsere-schule-heute",
    accent: "beere",
    hub: "unsere-schule-heute",
    extra: [
      { label: "Über Mittag", href: "/ueber-mittag" },
      { label: "Abitur am ESG", href: "/abitur-am-esg" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
];

export const PORTALE = [
  { label: "itslearning", href: "https://esg-guetersloh.itslearning.com" },
  { label: "WebUntis", href: "https://webuntis.com" },
  { label: "ES_blo_G (Schülerzeitung)", href: "http://esblog.de" },
  { label: "Mediothek", href: "https://esg-medi.de" },
];

export const ACCENT_TEXT: Record<NavSection["accent"], string> = {
  beere: "text-beere",
  gruen: "text-gruen",
  blau: "text-blau",
  gelb: "text-gold",
};

export const ACCENT_BG: Record<NavSection["accent"], string> = {
  beere: "bg-beere",
  gruen: "bg-gruen",
  blau: "bg-blau",
  gelb: "bg-gelb",
};

/** Bereichs-Akzent einer Seite anhand ihres Pfads. */
export function accentFor(rel: string): NavSection["accent"] {
  if (rel.startsWith("unterricht")) return "blau";
  if (rel.startsWith("aktivitaeten") || rel.startsWith("ueber-mittag")) return "gruen";
  if (rel.startsWith("schulgemeinde")) return "gelb";
  return "beere";
}
