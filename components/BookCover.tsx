import Image from "next/image";

/**
 * Dekoratives Editorial-Motiv: der Jubiläumsband als gestalteter Buchdeckel
 * (Beere mit Goldprägung) samt eingelegter „Beilage“ — dem Film-Ticket.
 * Rein visuell, daher komplett aria-hidden; die Inhalte stehen als Text
 * auf der Seite selbst.
 */

const FOIL: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(115deg, var(--gold) 6%, var(--gold-soft) 30%, var(--gelb) 48%, var(--gold) 68%, var(--gold-soft) 94%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

function Perforation() {
  return (
    <div className="flex items-center justify-around px-1 py-[3px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="h-1 w-1.5 rounded-[1px] bg-paper/70" />
      ))}
    </div>
  );
}

export default function BookCover() {
  return (
    <div
      aria-hidden="true"
      className="group relative mx-auto w-full max-w-90 select-none pb-16 sm:max-w-95"
    >
      {/* Weicher Schlagschatten unter dem Buch */}
      <div className="absolute inset-x-8 bottom-14 h-10 rounded-full bg-beere-deep/25 blur-2xl" />

      {/* Buch: Seitenblock + Deckel */}
      <div className="relative aspect-3/4 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-translate-y-1.5">
        {/* Buchblock (Seiten) */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border border-line bg-paper" />
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-sm border border-line bg-paper" />

        {/* Deckel */}
        <div
          className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-lg shadow-[0_24px_50px_-18px_rgba(94,33,56,0.55)]"
          style={{
            background:
              "linear-gradient(150deg, var(--beere) 0%, var(--beere-deep) 90%)",
          }}
        >
          {/* Buchrücken mit Falz-Licht */}
          <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/45 via-white/10 to-black/10" />

          {/* Goldprägung: doppelter Zierrahmen */}
          <div className="absolute inset-4 left-8 rounded-xs border border-gold-soft/60" />
          <div className="absolute inset-5.5 left-9.5 rounded-xs border border-gold-soft/25" />

          {/* Deckel-Typografie */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-10 pr-8 pl-12 text-center">
            <div className="space-y-1">
              <p className="text-[9px] font-bold tracking-[0.35em] text-gold-soft/90 uppercase">
                Evangelisch Stiftisches
              </p>
              <p className="text-[9px] font-bold tracking-[0.35em] text-gold-soft/90 uppercase">
                Gymnasium Gütersloh
              </p>
            </div>

            <div>
              <p
                className="text-[5.25rem] leading-none font-extrabold tracking-tight sm:text-[6rem]"
                style={FOIL}
              >
                175
              </p>
              <p className="mt-1 pl-[0.5em] text-xs font-bold tracking-[0.5em] text-gold-soft uppercase">
                Jahre
              </p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold-soft/50" />
              <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-gold-soft/90">
                1851&thinsp;–&thinsp;2026
              </p>
            </div>

            <p className="text-[10px] font-bold tracking-[0.32em] text-gold-soft/80 uppercase">
              Der Jubiläumsband
            </p>
          </div>

          {/* Leichter Glanz über dem Einband */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/25" />
        </div>
      </div>

      {/* Beilage: Film-Ticket, schräg unter dem Buch hervorlugend */}
      <div className="absolute -right-1 bottom-0 w-[88%] max-w-80 -rotate-3 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-rotate-1 sm:-right-5">
        <div className="relative flex items-stretch overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_40px_-16px_rgba(36,28,32,0.4)]">
          {/* Filmstreifen mit Archivbild (Festumzug 1926) */}
          <div className="flex w-26 shrink-0 flex-col bg-ink">
            <Perforation />
            <div className="relative min-h-16 flex-1">
              <Image
                src="/images/festumzug-1926.jpg"
                alt=""
                fill
                sizes="104px"
                className="object-cover opacity-90 grayscale"
              />
            </div>
            <Perforation />
          </div>

          {/* Abriss-Kante */}
          <div className="relative border-l border-dashed border-line">
            <span className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-background" />
            <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-background" />
          </div>

          {/* Ticket-Text */}
          <div className="flex-1 px-4 py-3.5">
            <p className="text-[9px] font-bold tracking-[0.3em] text-beere uppercase">
              Beilage · Der Film
            </p>
            <p className="mt-1 text-sm leading-snug font-extrabold text-ink">
              175 Jahre ESG
              <br />
              in 175 Sekunden
            </p>
            <p className="mt-1.5 inline-block rounded-full bg-gelb px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink">
              Zuerst für Abonnenten
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
