import type { Metadata } from "next";
import MinimalShell from "@/components/MinimalShell";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum des Evangelisch Stiftischen Gymnasiums Gütersloh.",
};

export default function ImpressumPage() {
  return (
    <MinimalShell>
        <article className="prose-esg mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl text-ink">Impressum</h1>

          <p className="mt-4 rounded-lg bg-gold/10 px-4 py-3 text-sm text-ink-soft">
            ⚠️ Entwurf — bitte vor Veröffentlichung mit den offiziellen Angaben der Schule
            abgleichen (Schulträger, Vertretungsberechtigte, Aufsichtsbehörde).
          </p>

          <div className="mt-8 space-y-6 text-ink-soft">
            <section>
              <h2 className="font-display text-xl text-ink">Angaben gemäß § 5 DDG</h2>
              <p className="mt-2">
                Evangelisch Stiftisches Gymnasium Gütersloh
                <br />
                Feldstraße 13
                <br />
                33330 Gütersloh
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">Vertreten durch</h2>
              <p className="mt-2">[Schulleitung — Name eintragen]</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">Kontakt</h2>
              <p className="mt-2">
                Telefon: 05241 9805-0
                <br />
                E-Mail: [offizielle Kontaktadresse eintragen]
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">Schulträger / Aufsicht</h2>
              <p className="mt-2">[Schulträger und zuständige Schulaufsichtsbehörde eintragen]</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <p className="mt-2">[Name und Anschrift der verantwortlichen Person]</p>
            </section>
          </div>
        </article>
    </MinimalShell>
  );
}
