"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AUDIENCES, AUDIENCE_LABEL, type Audience } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          audience: audience ?? undefined,
          consent,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        setFieldErrors(data.fieldErrors ?? {});
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Verbindungsfehler. Bitte versuche es erneut.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="animate-rise rounded-2xl border border-line bg-paper p-8 text-center shadow-sm"
        role="status"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-beere-soft text-2xl text-beere">
          ✦
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-ink">Fast geschafft!</h3>
        <p className="mt-3 text-ink-soft">
          Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Anmeldung über den
          Link darin — erst dann bist du dabei.
        </p>
        <p className="mt-2 text-sm text-ink-soft/80">
          Keine Mail erhalten? Schau kurz im Spam-Ordner nach.
        </p>
      </div>
    );
  }

  const emailErr = fieldErrors.email?.[0];
  const consentErr = fieldErrors.consent?.[0];

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-paper p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Newsletter abonnieren</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Ein paarmal im Schuljahr. Kein Spam. Jederzeit mit einem Klick abbestellbar.
      </p>

      {/* Honeypot (für Menschen unsichtbar) */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor={`${formId}-website`}>Website (bitte leer lassen)</label>
        <input
          id={`${formId}-website`}
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-ink">
            E-Mail-Adresse <span className="text-rot">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(emailErr)}
            aria-describedby={emailErr ? `${formId}-email-err` : undefined}
            placeholder="name@beispiel.de"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-beere focus:ring-2 focus:ring-beere/25"
          />
          {emailErr && (
            <p id={`${formId}-email-err`} role="alert" className="mt-1.5 text-sm text-rot">
              {emailErr}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-firstName`} className="block text-sm font-medium text-ink">
            Vorname <span className="text-ink-soft/60">(optional)</span>
          </label>
          <input
            id={`${formId}-firstName`}
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Damit wir dich persönlich ansprechen können"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-beere focus:ring-2 focus:ring-beere/25"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-ink">
            Ich bin … <span className="text-ink-soft/60">(optional)</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AUDIENCES.map((a) => {
              const active = audience === a;
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAudience(active ? null : a)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    active
                      ? "border-beere bg-beere text-white"
                      : "border-line bg-white text-ink-soft hover:border-beere/50",
                  ].join(" ")}
                >
                  {AUDIENCE_LABEL[a]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={Boolean(consentErr)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-gold accent-[var(--beere)]"
            />
            <span>
              Ich möchte den ESG-Newsletter erhalten und bin mit der Verarbeitung meiner
              Daten gemäß der{" "}
              <Link href="/datenschutz" className="text-ink underline decoration-beere/50 underline-offset-2 hover:text-beere">
                Datenschutzerklärung
              </Link>{" "}
              einverstanden. Die Einwilligung ist jederzeit widerrufbar.
            </span>
          </label>
          {consentErr && (
            <p role="alert" className="mt-1.5 text-sm text-rot">
              {consentErr}
            </p>
          )}
        </div>

        {error && status === "error" && (
          <p role="alert" className="rounded-lg bg-rot/10 px-4 py-3 text-sm text-rot">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative w-full overflow-hidden rounded-xl bg-beere px-6 py-3.5 text-base font-bold text-white transition hover:bg-beere-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Wird gesendet …" : "Anmelden"}
        </button>

        <p className="text-center text-xs text-ink-soft/70">
          Double-Opt-In nach DSGVO — du bekommst eine Bestätigungsmail.
        </p>
      </div>
    </form>
  );
}
