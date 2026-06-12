# ESG Gütersloh — Neue Website

Fundament der neuen Website des Evangelisch Stiftischen Gymnasiums Gütersloh.
Stack: **Next.js 16** (App Router, TypeScript) · **Tailwind CSS v4** · **Neon Postgres**
(via Drizzle) · **Brevo** (Newsletter/Double-Opt-In) · Deployment auf **Vercel**.

Erstes Feature: **Newsletter-Anmeldung mit Double-Opt-In** unter `/newsletter`
(und auf der Startseite). Das Fundament trägt das spätere Mitgliederportal.

## Schnellstart (lokal)

```bash
npm install
cp .env.example .env.local   # Werte eintragen (s. u.)
npm run dev                  # http://localhost:3000
```

Die Seite läuft auch **ohne** ausgefüllte `.env.local`: Das Formular funktioniert dann
im „Demo-Modus" (keine echte Mail, keine DB-Schreibung) — gut zum Ansehen der UI.

## Einrichtung der Dienste

### 1. Neon (Postgres)
1. Projekt auf [neon.tech](https://neon.tech) anlegen, Connection-String kopieren.
2. In `.env.local` als `DATABASE_URL` eintragen (`?sslmode=require`).
3. Schema anlegen: `npm run db:push`
   (Tabelle `newsletter_subscribers` + Enums). `npm run db:studio` öffnet einen Browser.

### 2. Brevo (Newsletter)
1. API-Key v3 in `.env.local` als `BREVO_API_KEY` eintragen.
2. Verbindung testen + Liste anlegen:
   ```bash
   npm run brevo:setup     # testet Key, listet Listen & Templates
   npm run brevo:create    # legt Liste "ESG Newsletter" an → BREVO_LIST_ID
   ```
3. In Brevo eine **Absenderadresse bestätigen** (Senders → Add a sender), z. B.
   `newsletter@esg-guetersloh.de`. Für gute Zustellbarkeit später DKIM/Domain-Auth.
4. In Brevo eine **DOI-Bestätigungsmail** als Vorlage anlegen, deren `id` als
   `BREVO_DOI_TEMPLATE_ID` eintragen (in der Vorlage den Bestätigungslink-Platzhalter
   verwenden, den Brevo für Double-Opt-In bereitstellt).
5. `BREVO_LIST_ID` und `BREVO_DOI_TEMPLATE_ID` in `.env.local` setzen.

### 3. Env-Variablen
Siehe [`.env.example`](.env.example): `DATABASE_URL`, `BREVO_API_KEY`, `BREVO_LIST_ID`,
`BREVO_DOI_TEMPLATE_ID`, `NEXT_PUBLIC_SITE_URL`, optional `BREVO_WEBHOOK_SECRET`.

## Deployment (Vercel)
1. Repo mit Vercel verbinden (Framework wird als Next.js erkannt).
2. Alle Env-Variablen im Vercel-Projekt hinterlegen
   (`NEXT_PUBLIC_SITE_URL` = Prod-URL).
3. Deploy. Danach Brevo-Webhook (optional) auf
   `https://<domain>/api/brevo/webhook?token=<BREVO_WEBHOOK_SECRET>` zeigen lassen.

## Projektstruktur
```
app/
  page.tsx                       Startseite (Hero + Anmeldung)
  newsletter/page.tsx            Newsletter-Landingpage
  newsletter/bestaetigt/page.tsx DOI-Redirect-Ziel
  impressum/, datenschutz/       Rechtsseiten (Entwürfe)
  api/newsletter/subscribe/      POST: Validierung -> Neon -> Brevo DOI
  api/brevo/webhook/             optionaler Status-Sync
components/                      NewsletterForm, SiteHeader, SiteFooter
db/schema.ts                     Drizzle-Schema (newsletter_subscribers)
lib/                             brevo.ts, db.ts, validation.ts
scripts/brevo-setup.mjs          Brevo-Verbindungstest & Liste anlegen
```

## Roadmap
Phase 1 Scraping & Inventar der Alt-Seite · Phase 2 Content-Triage ·
Phase 3 öffentliche Seite (175-Jahre-Konzept, KI-Assistent) · Phase 4 Mitgliederportal.
Siehe Projektplan.
