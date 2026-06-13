import type { Metadata } from "next";
import MinimalShell from "@/components/MinimalShell";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum des Evangelisch Stiftischen Gymnasiums Gütersloh.",
};

const linkClass = "text-ink underline decoration-gold/60 underline-offset-2";

export default function ImpressumPage() {
  return (
    <MinimalShell>
      <article className="mx-auto max-w-3xl px-5 py-16 text-ink-soft">
        <h1 className="font-display text-4xl text-ink">Impressum</h1>

        <div className="mt-8 space-y-6">
          <section className="space-y-2">
            <h2 className="font-display text-xl text-ink">Angaben gemäß § 5 DDG</h2>
            <p>
              Evangelisch Stiftisches Gymnasium Gütersloh
              <br />
              Feldstraße 13
              <br />
              33330 Gütersloh
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl text-ink">Vertreten durch die Schulleitung</h2>
            <p>
              OStD Martin Fugmann (Schulleiter)
              <br />
              StD Thomas Rimpel (Ständiger Vertreter des Schulleiters)
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl text-ink">Kontakt</h2>
            <p>
              Telefon: +49 5241 989050
              <br />
              Telefax: +49 5241 9890522
              <br />
              E-Mail:{" "}
              <a href="mailto:sekretariat@esg-guetersloh.de" className={linkClass}>
                sekretariat@esg-guetersloh.de
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl text-ink">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>
              OStD Martin Fugmann
              <br />
              Evangelisch Stiftisches Gymnasium Gütersloh
              <br />
              Feldstraße 13, 33330 Gütersloh
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl text-ink">Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <a href="/datenschutz" className={linkClass}>
                Datenschutzerklärung
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </MinimalShell>
  );
}
