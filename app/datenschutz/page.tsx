import type { Metadata } from "next";
import MinimalShell from "@/components/MinimalShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung des Evangelisch Stiftischen Gymnasiums Gütersloh – Informationen zur Verarbeitung personenbezogener Daten beim Besuch unserer Website und bei der Newsletter-Anmeldung.",
};

const linkClass = "text-ink underline decoration-gold/60 underline-offset-2";

export default function DatenschutzPage() {
  return (
    <MinimalShell>
      <article className="mx-auto max-w-3xl px-5 py-16 text-ink-soft">
        <h1 className="font-display text-4xl text-ink">Datenschutzerklärung</h1>

        <p className="mt-4">
          Wir freuen uns über Ihren Besuch unserer Website und Ihr Interesse an unserer
          Schule. Wir nehmen den Datenschutz ernst. Mit dieser Datenschutzerklärung
          informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten auf
          dieser Website sowie über Ihre Rechte nach der Datenschutz-Grundverordnung
          (DSGVO).
        </p>

        {/* 1. Verantwortlicher */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die bei Ihrem Besuch dieser Website verarbeiteten
            personenbezogenen Daten ist:
          </p>
          <p>
            Evangelisch Stiftisches Gymnasium Gütersloh
            <br />
            vertreten durch die Schulleitung OStD Martin Fugmann
            <br />
            Feldstraße 13, 33330 Gütersloh
            <br />
            Telefon: +49 5241 989050, Telefax: +49 5241 9890522
            <br />
            E-Mail:{" "}
            <a href="mailto:sekretariat@esg-guetersloh.de" className={linkClass}>
              sekretariat@esg-guetersloh.de
            </a>
            <br />
            Website:{" "}
            <a
              href="https://www.esg-guetersloh.de"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              www.esg-guetersloh.de
            </a>
          </p>
        </section>

        {/* 2. Datenschutzbeauftragte:r */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">2. Datenschutzbeauftragte:r</h2>
          <p>
            Wir haben eine externe Datenschutzbeauftragte bzw. einen externen
            Datenschutzbeauftragten benannt. Der Name wird nicht öffentlich genannt. Sie
            erreichen unsere Datenschutzbeauftragte bzw. unseren Datenschutzbeauftragten
            über den oben genannten Verantwortlichen, vorzugsweise schriftlich oder per
            E-Mail an{" "}
            <a href="mailto:sekretariat@esg-guetersloh.de" className={linkClass}>
              sekretariat@esg-guetersloh.de
            </a>{" "}
            mit dem Hinweis „An die Datenschutzbeauftragte / den Datenschutzbeauftragten“.
          </p>
        </section>

        {/* 3. Allgemeine Angaben zur Datenverarbeitung */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            3. Allgemeine Angaben zur Datenverarbeitung
          </h2>
          <p>
            Soweit wir im Zusammenhang mit Ihrem Besuch unserer Website personenbezogene
            Daten verarbeiten, erfolgt das stets im Einklang mit der DSGVO und in
            Übereinstimmung mit den für uns geltenden weiteren europäischen oder
            landesspezifischen Datenschutzbestimmungen.
          </p>

          <h3 className="font-display text-lg text-ink">
            Umfang der Verarbeitung, Datenarten und Zwecke
          </h3>
          <p>
            Wir verarbeiten im Zusammenhang mit Ihrem Besuch unserer Website Ihre
            personenbezogenen Daten nur, soweit
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              das zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte
              und Leistungen erforderlich ist,
            </li>
            <li>eine gesetzliche Grundlage besteht oder</li>
            <li>eine konkrete Einwilligung vorliegt.</li>
          </ul>
          <p>
            Wegen der verwendeten Datenarten bzw. Kategorien von Daten und den verfolgten
            Zwecken verweisen wir auf die nachfolgenden Ausführungen.
          </p>

          <h3 className="font-display text-lg text-ink">Rechtsgrundlage der Verarbeitung</h3>
          <p>
            Sofern nachfolgend nicht näher angegeben und konkretisiert, sind
            Rechtsgrundlagen für die Verarbeitungen personenbezogener Daten durch uns als
            Verantwortliche:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              bei Verarbeitungen, im Rahmen derer wir eine Einwilligung für einen
              bestimmten Verarbeitungszweck einholen: Art. 6 Abs. 1 lit. a DSGVO;
            </li>
            <li>
              bei Verarbeitungen, die zur Erfüllung eines Vertrags, dessen Vertragspartei
              die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich sind: Art. 6 Abs. 1 lit. b DSGVO;
            </li>
            <li>
              bei Verarbeitungen, die erfolgen, weil wir einer entsprechenden rechtlichen
              Verpflichtung unterliegen: Art. 6 Abs. 1 lit. c DSGVO;
            </li>
            <li>
              bei Verarbeitungen, die wegen lebenswichtiger Interessen der betroffenen
              Person oder einer anderen natürlichen Person erforderlich sind: Art. 6 Abs. 1
              lit. d DSGVO;
            </li>
            <li>
              bei Verarbeitungen, die zur Wahrung eines berechtigten Interesses von uns
              oder einem Dritten erforderlich sind und bei denen die Interessen,
              Grundrechte und Grundfreiheiten der betroffenen Person nicht überwiegen:
              Art. 6 Abs. 1 lit. f DSGVO.
            </li>
          </ul>

          <h3 className="font-display text-lg text-ink">
            Dauer der Speicherung, Löschung und Sperrung
          </h3>
          <p>
            Der Zeitraum, für den wir Ihre personenbezogenen Daten verarbeiten, richtet
            sich ausschließlich danach, wie lange dies für den jeweiligen mit der
            Verarbeitung verfolgten Zweck erforderlich ist oder welche Aufbewahrungsfristen
            vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen
            Gesetzgeber in Gesetzen oder Vorschriften, denen wir unterliegen, vorgegeben
            wurden. Die Kriterien für die Dauer der Speicherung sind somit die
            Erforderlichkeit sowie die etwaige gesetzliche Aufbewahrungsfrist. Wenn der
            Speicherungszweck wegfällt und keine vorgeschriebene Speicherfrist besteht oder
            eine etwaig bestehende Speicherfrist abgelaufen ist, werden die
            personenbezogenen Daten routinemäßig und gemäß den gesetzlichen Vorschriften
            von uns gesperrt oder gelöscht.
          </p>

          <h3 className="font-display text-lg text-ink">
            Datenübermittlungen in Drittländer
          </h3>
          <p>
            Eine Verarbeitung Ihrer personenbezogenen Daten in einem Land außerhalb der
            Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR) – sog.
            Drittland –, auch z. B. im Rahmen der Inanspruchnahme eines Dienstleisters oder
            einer Offenlegung von Daten an Dritte, erfolgt nur, wenn Sie entweder darin
            eingewilligt haben oder das zur Erfüllung unserer (vor)vertraglichen Pflichten,
            aufgrund einer rechtlichen Verpflichtung oder im Rahmen unseres berechtigten
            Interesses geschieht. Und wir machen das, außer es besteht eine vertragliche
            oder gesetzliche Erlaubnis, auch dann nur, wenn eine der Voraussetzungen des
            Art. 44 DSGVO erfüllt ist. Konkrete Angaben zu Drittlandübermittlungen und den
            jeweiligen Garantien finden Sie in den nachstehenden Abschnitten zu den
            eingesetzten Dienstleistern.
          </p>

          <h3 className="font-display text-lg text-ink">Änderungsvorbehalt</h3>
          <p>
            Wir behalten uns die Anpassung dieser Datenschutzerklärung vor, wenn Änderungen
            dies erforderlich machen.
          </p>
        </section>

        {/* 4. Bereitstellung der Website & Server-Logfiles + Hosting Vercel */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            4. Bereitstellung der Website, Server-Logfiles und Hosting (Vercel)
          </h2>

          <h3 className="font-display text-lg text-ink">
            Bereitstellung der Website und Erstellung von Logfiles
          </h3>
          <p>
            Mit jedem Aufruf erfasst unsere Website automatisch allgemeine Daten und
            Informationen. Diese Daten und Informationen werden in den Logfiles des Servers
            gespeichert. Erfasst werden können:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>der verwendete Browsertyp nebst Version,</li>
            <li>das vom zugreifenden System verwendete Betriebssystem,</li>
            <li>Datum und Uhrzeit eines Zugriffs auf unsere Website,</li>
            <li>
              die Internetseite, von welcher ein zugreifendes System auf unsere
              Internetseite gelangt (sog. Referrer),
            </li>
            <li>die Internet-Protokoll-Adresse (IP-Adresse),</li>
            <li>der Internet-Service-Provider des zugreifenden Systems,</li>
            <li>
              die abgerufene Datei bzw. URL sowie Unterseiten, welche über ein zugreifendes
              System auf unserer Internetseite angesteuert werden,
            </li>
            <li>
              sonstige vergleichbare Daten und Informationen, die der Gefahrenabwehr im
              Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.
            </li>
          </ul>
          <p>Diese Informationen sind notwendig, um</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>die Inhalte unserer Website korrekt auszuliefern sowie zu optimieren,</li>
            <li>
              die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme
              und der Technik der Website zu gewährleisten,
            </li>
            <li>Sicherheitsanalysen durchzuführen und</li>
            <li>etwaige Angriffe abzuwehren.</li>
          </ul>
          <p>
            Wir ziehen keine Rückschlüsse auf betroffene Personen. Die Server-Logfiles
            fallen bei unserem Hosting-Dienstleister Vercel (siehe unten) als
            Auftragsverarbeiter an und werden nur statistisch sowie mit dem Ziel
            ausgewertet, den Datenschutz und die Datensicherheit zu erhöhen. Eine
            Zusammenführung
            dieser Daten mit anderen Datenquellen zur Identifizierung Ihrer Person nehmen
            wir nicht vor. Die Daten der Server-Logfiles werden getrennt von allen durch
            eine betroffene Person angegebenen personenbezogenen Daten gespeichert.
          </p>
          <p>
            <strong>Rechtsgrundlage</strong> für die vorübergehende Speicherung der Daten
            ist Art. 6 Abs. 1 lit. f DSGVO. In der Funktionalität der Website, der
            Durchführung von Sicherheitsanalysen und der Abwehr von Gefahren liegt unser
            berechtigtes Interesse. Die Daten bzw. die in den Server-Logfiles enthaltenen
            IP-Adressen werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer
            Erhebung nicht mehr erforderlich sind, d. h. sobald die jeweilige Sitzung
            beendet ist und keine Speicherung mehr zur Gefahrenabwehr oder zur Klärung einer
            Störung benötigt wird.
          </p>

          <h3 className="font-display text-lg text-ink">Hosting (Vercel)</h3>
          <p>
            Wir hosten unsere Website beim Anbieter Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA (nachfolgend „Vercel“). Vercel ist ein US-amerikanisches
            Unternehmen. Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen
            Daten auf den Servern von Vercel verarbeitet. Hierbei kann es sich insbesondere
            um die oben beschriebenen Server-Logfiles handeln, die der Browser Ihres
            Endgeräts automatisch übermittelt. Diese Daten dienen der technischen
            Bereitstellung, der Sicherstellung der Stabilität und Sicherheit (z. B. der
            Abwehr von Angriffen wie DDoS) sowie der ordnungsgemäßen Auslieferung der
            Website.
          </p>
          <p>
            Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen, sicheren
            und effizienten Darstellung unserer Website.
          </p>
          <p>
            <strong>Auftragsverarbeitung:</strong> Wir haben mit Vercel einen Vertrag über
            Auftragsverarbeitung (Data Processing Addendum, AVV) gemäß Art. 28 DSGVO
            geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich
            vorgeschriebenen Vertrag, der gewährleistet, dass Vercel die personenbezogenen
            Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung
            der DSGVO verarbeitet.
          </p>
          <p>
            <strong>Datenübermittlung in die USA:</strong> Da Vercel Daten auch in den USA
            verarbeiten kann, findet eine Übermittlung personenbezogener Daten in ein
            Drittland im Sinne der Art. 44 ff. DSGVO statt. Vercel Inc. ist unter dem
            EU-U.S. Data Privacy Framework (DPF) zertifiziert. Die Europäische Kommission
            hat mit ihrem Angemessenheitsbeschluss vom 10. Juli 2023 festgestellt, dass das
            DPF ein angemessenes Datenschutzniveau für Datenübermittlungen an in den USA
            zertifizierte Unternehmen gewährleistet. Soweit und solange die Zertifizierung
            von Vercel besteht, ist die Übermittlung damit auf Grundlage des
            Angemessenheitsbeschlusses zulässig. Den aktuellen Zertifizierungsstatus von
            Vercel können Sie auf der offiziellen Liste des US-Handelsministeriums unter{" "}
            <a
              href="https://www.dataprivacyframework.gov/list"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              dataprivacyframework.gov/list
            </a>{" "}
            einsehen. Ergänzend hat Vercel in seiner Auftragsverarbeitungsvereinbarung die
            Standardvertragsklauseln der EU-Kommission (Durchführungsbeschluss (EU)
            2021/914) als geeignete Garantien im Sinne des Art. 46 Abs. 2 lit. c DSGVO
            einbezogen, die als zusätzliche bzw. ergänzende Absicherung der
            Datenübermittlung dienen.
          </p>
          <p>
            Weitere Informationen zum Datenschutz bei Vercel sowie die
            Auftragsverarbeitungsvereinbarung finden Sie unter{" "}
            <a
              href="https://vercel.com/legal/dpa"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              vercel.com/legal/dpa
            </a>{" "}
            und{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
        </section>

        {/* 5. Newsletter-Anmeldung */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">5. Anmeldung zum Newsletter</h2>
          <p>
            Auf unserer Website bieten wir Ihnen die Möglichkeit, unseren Newsletter zu
            abonnieren. Für die Anmeldung verarbeiten wir ausschließlich die folgenden von
            Ihnen angegebenen Daten:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Ihren Vornamen,</li>
            <li>Ihre E-Mail-Adresse,</li>
            <li>
              Ihre Einwilligung (durch Setzen des entsprechenden Häkchens im Formular).
            </li>
          </ul>
          <p>
            Diese Angaben nutzen wir ausschließlich für den Versand des Newsletters und die
            persönliche Ansprache darin. Der Zweck der Verarbeitung ist die Zusendung von
            Informationen über unsere Schule und das Schulleben an die von Ihnen angegebene
            E-Mail-Adresse.
          </p>
          <p>
            <strong>Ablauf der Anmeldung (Single-Opt-In):</strong> Mit dem Absenden des
            Formulars und dem Setzen des Häkchens willigen Sie in den Erhalt des Newsletters
            ein und werden unmittelbar in den Verteiler aufgenommen. Eine gesonderte
            Bestätigungs-E-Mail (Double-Opt-In) versenden wir nicht.
          </p>
          <p>
            <strong>Rechtsgrundlage</strong> für den Versand des Newsletters ist Ihre
            Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p>
            <strong>Einwilligungsnachweis:</strong> Zum Nachweis der von Ihnen erteilten
            Einwilligung protokollieren wir den Zeitpunkt der Anmeldung, die dabei
            verwendete IP-Adresse sowie den übermittelten Browser-Kennzeichner (User-Agent).
            Rechtsgrundlage für diese Protokollierung ist unser berechtigtes Interesse an
            einer rechtssicheren Dokumentation der Einwilligung (Art. 6 Abs. 1 lit. f DSGVO)
            zur Erfüllung unserer Rechenschaftspflicht aus Art. 5 Abs. 2 i. V. m. Art. 7
            Abs. 1 DSGVO.
          </p>
          <p>
            <strong>Widerruf und Abmeldung:</strong> Sie können Ihre Einwilligung jederzeit
            mit Wirkung für die Zukunft widerrufen, etwa über den Abmeldelink am Ende jeder
            Newsletter-E-Mail oder durch eine formlose Mitteilung an die oben genannten
            Kontaktdaten des Verantwortlichen. Der Widerruf berührt die Rechtmäßigkeit der
            bis dahin erfolgten Verarbeitung nicht.
          </p>
          <p>
            <strong>Speicherdauer:</strong> Wir speichern Ihre Daten, solange Sie den
            Newsletter abonniert haben. Nach einer Abmeldung werden die Daten aus dem
            aktiven Verteiler entfernt; der Einwilligungsnachweis kann zur Erfüllung von
            Nachweispflichten für die Dauer etwaiger Verjährungsfristen aufbewahrt werden.
          </p>
          <p>
            <strong>Empfänger:</strong> Für den Versand des Newsletters setzen wir den
            Dienstleister Brevo (siehe Abschnitt 6) ein. Die Speicherung des
            Newsletter-Eintrags sowie des Einwilligungsbelegs erfolgt in unserer Datenbank
            bei Neon (siehe Abschnitt 7).
          </p>
        </section>

        {/* 6. Brevo */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            6. Newsletter-Versanddienstleister (Brevo)
          </h2>
          <p>
            Für den Versand unseres Newsletters nutzen wir den Dienst Brevo. Anbieter in
            Deutschland ist die Sendinblue GmbH, Köpenicker Straße 126, 10179 Berlin.
          </p>
          <p>
            Brevo verarbeitet die von Ihnen bei der Newsletter-Anmeldung angegebenen Daten
            (insbesondere Vorname und E-Mail-Adresse) ausschließlich zum Zweck des Versands
            unseres Newsletters. Die Daten werden auf Servern innerhalb der Europäischen
            Union gespeichert. Sollte Brevo im Einzelfall Sub-Auftragsverarbeiter mit
            Drittlandbezug einsetzen, erfolgt dies auf Grundlage geeigneter Garantien
            (insbesondere EU-Standardvertragsklauseln gemäß Art. 46 DSGVO); Einzelheiten
            ergeben sich aus den Datenschutzhinweisen von Brevo.
          </p>
          <p>
            Rechtsgrundlage für den Versand bleibt Ihre Einwilligung nach Art. 6 Abs. 1
            lit. a DSGVO (siehe Abschnitt 5); der Einsatz von Brevo erfolgt im Rahmen der
            Auftragsverarbeitung nach Art. 28 DSGVO.
          </p>
          <p>
            Mit Brevo haben wir einen Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO
            geschlossen. Dieser ist als Auftragsverarbeitungsvereinbarung integraler
            Bestandteil der Allgemeinen Geschäftsbedingungen der Brevo-Dienste. Brevo
            handelt dabei ausschließlich weisungsgebunden in unserem Auftrag. Nähere
            Informationen zum Datenschutz bei Brevo finden Sie unter{" "}
            <a
              href="https://www.brevo.com/de/legal/privacypolicy/"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              brevo.com/de/legal/privacypolicy
            </a>
            .
          </p>
        </section>

        {/* 7. Neon */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            7. Datenbank / Speicherung (Neon)
          </h2>
          <p>
            Zur Speicherung der über das Newsletter-Formular verarbeiteten Daten (Vorname,
            E-Mail-Adresse und Einwilligungsbeleg) nutzen wir den Datenbankdienst Neon
            (Serverless Postgres). Anbieter ist die Neon, LLC, 160 Spear Street, 15th Floor,
            San Francisco, CA 94105, USA (seit Juni 2025 ein Unternehmen der
            Databricks-Gruppe). Neon betreibt die Datenbankinfrastruktur auf Amazon Web
            Services (AWS). Unser Projekt ist in der Region AWS Europe (Frankfurt),
            eu-central-1, eingerichtet, sodass die in der Datenbank gespeicherten
            personenbezogenen Daten physisch innerhalb der Europäischen Union (Frankfurt am
            Main) verarbeitet und gespeichert werden.
          </p>
          <p>
            Die Nutzung von Neon erfolgt im Interesse einer sicheren, zuverlässigen und
            leistungsfähigen Bereitstellung unseres Onlineangebots. Soweit die Speicherung
            dem Vollzug der von Ihnen erteilten Einwilligung dient, beruht sie auf Art. 6
            Abs. 1 lit. a DSGVO; im Übrigen stellt der Betrieb der Datenbank ein berechtigtes
            Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO dar.
          </p>
          <p>
            Mit Neon haben wir einen Vertrag zur Auftragsverarbeitung (Data Processing
            Addendum) nach Art. 28 DSGVO geschlossen. Neon setzt seinerseits
            Sub-Auftragsverarbeiter ein, insbesondere Amazon Web Services (AWS) als
            Infrastrukturdienstleister. Da die Neon, LLC ihren Sitz in den USA hat, kann
            trotz Datenspeicherung in der EU ein Zugriff nach US-Recht (z. B. CLOUD Act)
            nicht völlig ausgeschlossen werden. Für etwaige Datenübermittlungen mit
            Drittlandbezug stützt sich Neon im Rahmen des Auftragsverarbeitungsvertrags auf
            die EU-Standardvertragsklauseln (Standard Contractual Clauses, Module Two/Three)
            gemäß Art. 46 Abs. 2 lit. c DSGVO als geeignete Garantien. Weitere
            Informationen finden Sie in der Datenschutzdokumentation von Neon unter{" "}
            <a
              href="https://neon.com/dpa"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              neon.com/dpa
            </a>{" "}
            und{" "}
            <a
              href="https://neon.com/subprocessors"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              neon.com/subprocessors
            </a>
            .
          </p>
        </section>

        {/* 8. Schriftarten */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">8. Schriftarten (lokal gehostet)</h2>
          <p>
            Zur einheitlichen Darstellung verwenden wir die Schriftart „Open Sans“. Diese
            Schriftart wird ausschließlich lokal von unserem Server ausgeliefert: Die
            Schriftdateien werden bereits zum Zeitpunkt der Erstellung der Website (Build)
            über die Funktion <code>next/font</code> heruntergeladen und mit ausgeliefert.
            Beim Aufruf unserer Website wird daher <strong>keine Verbindung zu Servern von
            Google</strong> (insbesondere nicht zur Google-Fonts-CDN) hergestellt; es
            werden in diesem Zusammenhang keine personenbezogenen Daten, insbesondere keine
            IP-Adressen, an Google übermittelt.
          </p>
        </section>

        {/* 9. Keine Cookies / kein Tracking */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            9. Keine Cookies, kein Tracking
          </h2>
          <p>
            Unsere Website setzt <strong>keine Cookies</strong> und keine vergleichbaren
            Technologien zur Wiedererkennung Ihres Endgeräts ein. Wir verwenden{" "}
            <strong>keine Analyse-, Tracking- oder Marketing-Tools</strong> (etwa zur
            Reichweitenmessung oder Webanalyse), schalten <strong>keine Werbung</strong> und
            betreiben <strong>kein Profiling</strong>. Eine Erstellung von Nutzungsprofilen
            oder ein seitenübergreifendes Nachverfolgen Ihres Verhaltens findet nicht statt.
          </p>
        </section>

        {/* 10. Datensicherheit */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            10. Datensicherheit (Art. 32 DSGVO) und Verschlüsselung
          </h2>
          <p>
            Wir treffen nach den Vorgaben von Art. 32 DSGVO geeignete technische und
            organisatorische Sicherheitsmaßnahmen, um Ihre im Zusammenhang mit Ihrem Besuch
            und Ihrer Nutzung dieser Internetseite verarbeiteten personenbezogenen Daten vor
            Verlust und Missbrauch angemessen zu schützen. Insbesondere wird unsere gesamte
            Website über eine SSL- bzw. TLS-Verschlüsselung (HTTPS) ausgeliefert, sodass die
            von Ihnen übermittelten Daten – etwa bei der Newsletter-Anmeldung – während der
            Übertragung verschlüsselt sind und nicht von Dritten mitgelesen werden können.
            Dennoch ist es internetbasierten Datenübertragungen grundsätzlich immanent, dass
            sie Sicherheitslücken aufweisen können. Ein absoluter Schutz kann daher nicht
            gewährleistet werden.
          </p>
        </section>

        {/* 11. Empfänger */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">11. Empfänger</h2>
          <p>Zugriff auf Ihre personenbezogenen Daten erhalten:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              innerhalb unserer Schule diejenigen Personen bzw. Stellen, die sie zur
              Erfüllung der mit ihrer Verarbeitung verfolgten Zwecke benötigen;
            </li>
            <li>
              von uns auf Grundlage des Art. 28 DSGVO beauftragte Dienstleister
              (Auftragsverarbeiter) – im Rahmen dieser Website insbesondere der
              Hosting-Anbieter Vercel, der Datenbankdienst Neon sowie der
              Newsletter-Versanddienstleister Brevo; über Verträge zur Auftragsverarbeitung
              sind die Weisungsgebundenheit, die Datensicherheit und der vertrauliche Umgang
              mit Ihren Daten durch diese Dienstleister sichergestellt;
            </li>
            <li>
              Dritte bei Vorliegen einer gesetzlichen Erlaubnis oder Ihrer Einwilligung.
            </li>
          </ul>
        </section>

        {/* 12. Rechte der betroffenen Person */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">12. Rechte der betroffenen Person</h2>
          <p>
            Als von einer Verarbeitung personenbezogener Daten betroffene Person stehen
            Ihnen nach der DSGVO die folgenden Rechte zu:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Recht auf Auskunft:</strong> Jede betroffene Person hat das Recht, von
              dem Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende
              personenbezogene Daten verarbeitet werden; ist dies der Fall, so hat sie ein
              Recht auf Auskunft im gesetzlich vorgegebenen Umfang.
            </li>
            <li>
              <strong>Recht auf Berichtigung:</strong> Die betroffene Person hat das Recht,
              von dem Verantwortlichen unverzüglich die Berichtigung sie betreffender
              unrichtiger personenbezogener Daten zu verlangen. Unter Berücksichtigung der
              Zwecke der Verarbeitung hat die betroffene Person das Recht, die
              Vervollständigung unvollständiger personenbezogener Daten – auch mittels einer
              ergänzenden Erklärung – zu verlangen.
            </li>
            <li>
              <strong>Recht auf Löschung (Recht auf Vergessenwerden):</strong> Die betroffene
              Person hat das Recht, von dem Verantwortlichen zu verlangen, dass sie
              betreffende personenbezogene Daten unverzüglich gelöscht werden, sofern einer
              der in Art. 17 Abs. 1 DSGVO genannten Gründe zutrifft und keiner der
              gesetzlichen Ausschlussgründe (Art. 17 Abs. 3 DSGVO) vorliegt – etwa wenn die
              Daten für die verfolgten Zwecke nicht mehr notwendig sind, die Einwilligung
              widerrufen wurde und es an einer anderweitigen Rechtsgrundlage fehlt, ein
              wirksamer Widerspruch eingelegt wurde oder die Daten unrechtmäßig verarbeitet
              wurden.
            </li>
            <li>
              <strong>Recht auf Einschränkung der Verarbeitung:</strong> Die betroffene
              Person hat das Recht, von dem Verantwortlichen die Einschränkung der
              Verarbeitung zu verlangen, wenn eine der Voraussetzungen des Art. 18 Abs. 1
              DSGVO gegeben ist (insbesondere bei bestrittener Richtigkeit der Daten, bei
              unrechtmäßiger Verarbeitung anstelle der Löschung, bei nicht mehr benötigten,
              aber zur Rechtsverteidigung erforderlichen Daten oder bei eingelegtem
              Widerspruch).
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit:</strong> Die betroffene Person hat das
              Recht, die sie betreffenden personenbezogenen Daten, die sie einem
              Verantwortlichen bereitgestellt hat, in einem strukturierten, gängigen und
              maschinenlesbaren Format zu erhalten, und sie hat das Recht, diese Daten einem
              anderen Verantwortlichen ohne Behinderung zu übermitteln, sofern die
              Verarbeitung auf einer Einwilligung (Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2
              lit. a DSGVO) oder auf einem Vertrag (Art. 6 Abs. 1 lit. b DSGVO) beruht und
              die Verarbeitung mithilfe automatisierter Verfahren erfolgt. Sie hat zudem das
              Recht zu erwirken, dass die personenbezogenen Daten direkt von einem
              Verantwortlichen an einen anderen übermittelt werden, soweit dies technisch
              machbar ist.
            </li>
            <li>
              <strong>Widerspruchsrecht:</strong> Die betroffene Person hat das Recht, aus
              Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die
              Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6
              Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen. Dies gilt auch für
              ein etwaiges auf diese Bestimmungen gestütztes Profiling. Im Falle des
              Widerspruchs verarbeiten wir die personenbezogenen Daten nicht mehr, es sei
              denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung
              nachweisen, die den Interessen, Rechten und Freiheiten der betroffenen Person
              überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen.
            </li>
            <li>
              <strong>Recht auf Widerruf einer datenschutzrechtlichen Einwilligung:</strong>{" "}
              Die betroffene Person hat das Recht, eine Einwilligung zur Verarbeitung
              personenbezogener Daten jederzeit zu widerrufen. Durch den Widerruf der
              Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum
              Widerruf erfolgten Verarbeitung nicht berührt.
            </li>
            <li>
              <strong>Beschwerderecht bei einer Aufsichtsbehörde:</strong> Die betroffene
              Person hat unbeschadet eines anderweitigen verwaltungsrechtlichen oder
              gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
              Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts,
              ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn sie der
              Ansicht ist, dass die Verarbeitung der sie betreffenden personenbezogenen
              Daten gegen die DSGVO verstößt (siehe Abschnitt 14).
            </li>
          </ul>
          <p>
            <strong>
              Bereitstellung der personenbezogenen Daten – gesetzliche oder vertragliche
              Vorgaben:
            </strong>{" "}
            Die Bereitstellung personenbezogener Daten ist teilweise gesetzlich
            vorgeschrieben oder kann sich aus vertraglichen Regelungen ergeben. Im Rahmen
            der Newsletter-Anmeldung ist die Angabe von Vorname und E-Mail-Adresse weder
            gesetzlich noch vertraglich vorgeschrieben; sie ist jedoch erforderlich, um
            Ihnen den Newsletter zusenden zu können. Ohne diese Angaben können wir den
            Newsletter nicht versenden. Bei Fragen dazu, ob eine Verpflichtung zur
            Bereitstellung besteht und welche Folgen die Nichtbereitstellung hätte, wenden
            Sie sich gern an uns über die oben genannten Kontaktdaten.
          </p>
        </section>

        {/* 13. Automatisierte Entscheidungsfindung */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            13. Automatisierte Entscheidungsfindung und Profiling
          </h2>
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des
            Art. 22 DSGVO nehmen wir nicht vor.
          </p>
        </section>

        {/* 14. Aufsichtsbehörde */}
        <section className="mt-10 space-y-3">
          <h2 className="font-display text-2xl text-ink">
            14. Zuständige Datenschutzaufsichtsbehörde
          </h2>
          <p>
            Die für uns zuständige Datenschutzaufsichtsbehörde ist:
          </p>
          <p>
            Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
            (LDI NRW)
            <br />
            Kavalleriestraße 2, 40213 Düsseldorf
            <br />
            Telefon: 0211/38424-0, Fax: 0211/38424-10
            <br />
            E-Mail:{" "}
            <a href="mailto:poststelle@ldi.nrw.de" className={linkClass}>
              poststelle@ldi.nrw.de
            </a>
          </p>
        </section>

        <p className="mt-12 text-sm text-ink-soft/80">Stand: Juni 2026</p>
      </article>
    </MinimalShell>
  );
}
