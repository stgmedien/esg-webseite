import { redirect } from "next/navigation";

/** Die Anmeldung lebt jetzt auf der Startseite — alte Links/QR-Codes bleiben gültig. */
export default function NewsletterRedirect() {
  redirect("/");
}
