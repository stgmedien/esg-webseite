"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "error" | "success";

type ApiResponse = {
  ok?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
    consent?: string[];
    firstName?: string[];
    phone?: string[];
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9][0-9 ()/\-.]{5,24}$/;

export default function JubilaeumsSignup() {
  const uid = useId();
  const emailId = `${uid}-email`;
  const emailErrId = `${uid}-email-error`;
  const firstNameId = `${uid}-firstname`;
  const firstNameErrId = `${uid}-firstname-error`;
  const phoneId = `${uid}-phone`;
  const phoneErrId = `${uid}-phone-error`;
  const consentId = `${uid}-consent`;
  const consentErrId = `${uid}-consent-error`;
  const honeypotId = `${uid}-website`;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot — bleibt leer.
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setEmailError(null);
    setFirstNameError(null);
    setPhoneError(null);
    setConsentError(null);
    setFormError(null);

    // Sofortiges Feedback ohne Server-Roundtrip
    const trimmedFirstName = firstName.trim();
    const trimmedPhone = phone.trim();
    const trimmed = email.trim();
    if (trimmedFirstName.length < 2) {
      setFirstNameError("Bitte gib deinen Vornamen an.");
      firstNameRef.current?.focus();
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setEmailError("Bitte gib eine gültige E-Mail-Adresse ein.");
      emailRef.current?.focus();
      return;
    }
    if (!PHONE_PATTERN.test(trimmedPhone)) {
      setPhoneError("Bitte gib eine gültige Telefonnummer an.");
      phoneRef.current?.focus();
      return;
    }
    if (!consent) {
      setConsentError("Bitte bestätige kurz den Datenschutzhinweis.");
      consentRef.current?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          firstName: trimmedFirstName,
          phone: trimmedPhone,
          audience: "ehemalige",
          consent: true,
          website,
        }),
      });
      const data: ApiResponse = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        const nextFirstNameError = data.fieldErrors?.firstName?.[0] ?? null;
        const nextEmailError = data.fieldErrors?.email?.[0] ?? null;
        const nextPhoneError = data.fieldErrors?.phone?.[0] ?? null;
        const nextConsentError = data.fieldErrors?.consent?.[0] ?? null;
        const anyFieldError =
          nextFirstNameError || nextEmailError || nextPhoneError || nextConsentError;
        setStatus("error");
        setFirstNameError(nextFirstNameError);
        setEmailError(nextEmailError);
        setPhoneError(nextPhoneError);
        setConsentError(nextConsentError);
        setFormError(
          anyFieldError
            ? null
            : (data.error ?? "Das hat gerade nicht geklappt. Bitte versuche es noch einmal."),
        );
        if (nextFirstNameError) firstNameRef.current?.focus();
        else if (nextEmailError) emailRef.current?.focus();
        else if (nextPhoneError) phoneRef.current?.focus();
        else if (nextConsentError) consentRef.current?.focus();
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError("Verbindungsfehler. Bitte versuche es gleich noch einmal.");
    }
  }

  // ── Erfolgszustand: inline, kein Redirect ────────────────────────
  if (status === "success") {
    return (
      <div
        role="status"
        className="animate-rise rounded-3xl border border-line bg-paper p-7 text-center shadow-[0_30px_60px_-30px_rgba(94,33,56,0.35)] sm:p-9"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gelb-soft ring-1 ring-gold/30"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none">
            <path
              d="M4 8.5 12 13l8-4.5M4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
          Fast geschafft!
        </h2>
        <p className="mt-3 text-ink-soft">
          Bestätige deine Anmeldung über den Link in der Mail an{" "}
          <strong className="font-semibold break-all text-ink">{email.trim()}</strong> — erst
          dann bist du dabei.
        </p>
        <p className="mt-2 text-sm text-ink-soft/80">
          Keine Mail da? Wirf einen Blick in den Spam-Ordner.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setConsent(false);
          }}
          className="mt-6 rounded-full px-4 py-2 text-sm font-semibold text-beere underline decoration-beere/40 underline-offset-4 transition hover:decoration-beere focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere"
        >
          Andere Adresse eintragen
        </button>
      </div>
    );
  }

  // ── Formular ─────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "loading"}
      className="rounded-3xl border border-line bg-paper p-6 shadow-[0_30px_60px_-30px_rgba(94,33,56,0.35)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-bold tracking-[0.3em] text-beere uppercase">
          Alumni-Newsletter
        </h2>
        <span className="rounded-full bg-gelb px-2.5 py-0.5 text-[11px] font-bold text-ink">
          Kostenlos
        </span>
      </div>

      {/* Honeypot — für Menschen unsichtbar, bleibt leer */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={honeypotId}>Website (bitte leer lassen)</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={firstNameId} className="block text-sm font-semibold text-ink">
          Dein Vorname
        </label>
        <input
          ref={firstNameRef}
          id={firstNameId}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          placeholder="z. B. Johanna"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (firstNameError) setFirstNameError(null);
          }}
          aria-invalid={firstNameError ? true : undefined}
          aria-describedby={firstNameError ? firstNameErrId : undefined}
          className={[
            "mt-2 w-full rounded-2xl border bg-white px-5 py-3.5 text-base text-ink placeholder:text-ink-soft/50",
            "transition outline-none focus:ring-4",
            firstNameError
              ? "border-rot focus:border-rot focus:ring-rot/15"
              : "border-line focus:border-beere focus:ring-beere/15",
          ].join(" ")}
        />
        {firstNameError && (
          <p id={firstNameErrId} role="alert" className="mt-2 text-sm font-medium text-rot">
            {firstNameError}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor={emailId} className="block text-sm font-semibold text-ink">
          Deine E-Mail-Adresse
        </label>
        <input
          ref={emailRef}
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="name@beispiel.de"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(null);
          }}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrId : undefined}
          className={[
            "mt-2 w-full rounded-2xl border bg-white px-5 py-3.5 text-base text-ink placeholder:text-ink-soft/50",
            "transition outline-none focus:ring-4",
            emailError
              ? "border-rot focus:border-rot focus:ring-rot/15"
              : "border-line focus:border-beere focus:ring-beere/15",
          ].join(" ")}
        />
        {emailError && (
          <p id={emailErrId} role="alert" className="mt-2 text-sm font-medium text-rot">
            {emailError}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor={phoneId} className="block text-sm font-semibold text-ink">
          Deine Telefonnummer
        </label>
        <input
          ref={phoneRef}
          id={phoneId}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="z. B. 0171 2345678"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (phoneError) setPhoneError(null);
          }}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? phoneErrId : undefined}
          className={[
            "mt-2 w-full rounded-2xl border bg-white px-5 py-3.5 text-base text-ink placeholder:text-ink-soft/50",
            "transition outline-none focus:ring-4",
            phoneError
              ? "border-rot focus:border-rot focus:ring-rot/15"
              : "border-line focus:border-beere focus:ring-beere/15",
          ].join(" ")}
        />
        {phoneError && (
          <p id={phoneErrId} role="alert" className="mt-2 text-sm font-medium text-rot">
            {phoneError}
          </p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-start gap-3">
          <input
            ref={consentRef}
            id={consentId}
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (consentError) setConsentError(null);
            }}
            aria-invalid={consentError ? true : undefined}
            aria-describedby={consentError ? consentErrId : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-(--beere) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere"
          />
          <label htmlFor={consentId} className="cursor-pointer text-sm leading-relaxed text-ink-soft">
            Das ESG darf mir den Alumni-Newsletter schicken. Es gilt die{" "}
            <Link
              href="/datenschutz"
              className="font-semibold text-ink underline decoration-beere/40 underline-offset-2 transition hover:text-beere focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere"
            >
              Datenschutzerklärung
            </Link>
            ; Widerruf jederzeit möglich.
          </label>
        </div>
        {consentError && (
          <p id={consentErrId} role="alert" className="mt-2 text-sm font-medium text-rot">
            {consentError}
          </p>
        )}
      </div>

      {formError && (
        <p role="alert" className="mt-4 rounded-xl bg-rot/8 px-4 py-3 text-sm font-medium text-rot">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-beere px-6 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(131,50,83,0.6)] transition hover:bg-beere-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-beere active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:active:scale-100"
      >
        {status === "loading" ? (
          <>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5 animate-spin motion-reduce:animate-none"
              fill="none"
            >
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Wird gesendet …
          </>
        ) : (
          <>
            Jetzt eintragen
            <span
              aria-hidden="true"
              className="transition-transform motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft/80">
        Du bekommst eine Bestätigungsmail (Double-Opt-In).
        <br className="sm:hidden" /> Kein Spam, Abmeldung mit einem Klick.
      </p>
    </form>
  );
}
