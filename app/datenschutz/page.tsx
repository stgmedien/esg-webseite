import type { Metadata } from "next";
import MinimalShell from "@/components/MinimalShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung des Evangelisch Stiftischen Gymnasiums Gütersloh – insbesondere zur Newsletter-Anmeldung.",
};

export default function DatenschutzPage() {
  return (
    <MinimalShell>
        <article className="mx-auto max-w-3xl px-5 py-16 text-ink-soft">
          <h1 className="font-display text-4xl text-ink">Datenschutzerklärung</h1>

          <p className="mt-4 rounded-lg bg-gold/10 px-4 py-3 text-sm">
            ⚠️ Entwurf — der Newsletter-Teil ist vollständig vorbereitet. Bitte vor
            Veröffentlichung durch die/den Datenschutzbeauftragte:n der Schule prüfen und um
            die übrigen Verarbeitungen (Website-Hosting, Logfiles etc.) ergänzen.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-xl text-ink">1. Verantwortlicher</h2>
            <p>
              Evangelisch Stiftisches Gymnasium Gütersloh, Feldstraße 13, 33330 Gütersloh.
              Kontakt: siehe Impressum. Datenschutzbeauftragte:r: [Name / Kontakt eintragen].
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-xl text-ink">
              2. Anmeldung zum Alumni-Newsletter (Double-Opt-In)
            </h2>
            <p>
              Für den Bezug unseres Alumni-Newsletters verarbeiten wir Ihren Vornamen, Ihre
              E-Mail-Adresse und Ihre Telefonnummer. Vorname und E-Mail-Adresse nutzen wir
              für den Versand und die persönliche Ansprache im Newsletter; die
              Telefonnummer dient der persönlichen Kontaktaufnahme im Rahmen des
              Alumni-Netzwerks und der Aktivitäten zum 175-jährigen Jubiläum
              (z.&nbsp;B. Rückfragen zu Jubiläumsband und Veranstaltungen).
            </p>
            <p>
              Die Anmeldung erfolgt im sogenannten Double-Opt-In-Verfahren: Nach dem
              Absenden des Formulars erhalten Sie eine E-Mail, in der Sie Ihre Anmeldung
              durch Klick auf einen Bestätigungslink bestätigen. Erst danach werden Sie in
              den Verteiler aufgenommen. So stellen wir sicher, dass die Anmeldung
              tatsächlich von Ihnen stammt.
            </p>
            <p>
              <strong>Rechtsgrundlage</strong> ist Ihre Einwilligung gemäß Art. 6 Abs. 1
              lit. a DSGVO. Zum Nachweis der Einwilligung protokollieren wir den Zeitpunkt
              der Anmeldung und Bestätigung sowie die verwendete IP-Adresse.
            </p>
            <p>
              <strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit mit Wirkung
              für die Zukunft widerrufen, etwa über den Abmeldelink am Ende jeder
              Newsletter-E-Mail. Der Widerruf berührt die Rechtmäßigkeit der bis dahin
              erfolgten Verarbeitung nicht.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-xl text-ink">
              3. Auftragsverarbeiter: Brevo (Sendinblue GmbH)
            </h2>
            <p>
              Für den Versand des Newsletters nutzen wir den Dienst Brevo der Sendinblue
              GmbH, Köpenicker Straße 126, 10179 Berlin. Brevo verarbeitet die oben
              genannten Daten in unserem Auftrag auf Grundlage eines
              Auftragsverarbeitungsvertrags (Art. 28 DSGVO). Brevo verarbeitet die Daten
              ausschließlich zum Zweck des Newsletter-Versands und stellt uns ggf.
              statistische Auswertungen (z. B. Öffnungs- und Klickraten) bereit.
            </p>
            <p>
              Weitere Informationen finden Sie in der Datenschutzerklärung von Brevo:{" "}
              <a
                href="https://www.brevo.com/de/legal/privacypolicy/"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-gold/60 underline-offset-2"
              >
                brevo.com/de/legal/privacypolicy
              </a>
              .
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-xl text-ink">4. Speicherdauer</h2>
            <p>
              Wir speichern Ihre Daten, solange Sie den Newsletter abonniert haben. Nach
              einer Abmeldung werden die Daten aus dem aktiven Verteiler entfernt; der
              Einwilligungsnachweis kann zur Erfüllung von Nachweispflichten für die Dauer
              etwaiger Verjährungsfristen aufbewahrt werden.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="font-display text-xl text-ink">5. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem haben Sie das
              Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (für NRW: LDI
              NRW, Düsseldorf).
            </p>
          </section>
        </article>
    </MinimalShell>
  );
}
