import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

/**
 * Zielgruppen-Segmentierung. Dient später auch dem Mitgliederportal
 * (Alumni / Förderverein / Eltern bauen auf denselben Rollen auf).
 */
export const audienceEnum = pgEnum("audience", [
  "eltern",
  "schueler",
  "ehemalige",
  "lehrkraefte",
  "interessierte",
]);

export const subscriberStatusEnum = pgEnum("subscriber_status", [
  "pending", // Anmeldung abgeschickt, Double-Opt-In ausstehend
  "confirmed", // E-Mail bestätigt
  "unsubscribed", // abgemeldet
]);

/**
 * Spiegel der Newsletter-Abonnenten. Brevo ist die führende Quelle für den
 * Versand; diese Tabelle hält den DSGVO-Einwilligungsbeleg (Zeitpunkt, IP,
 * User-Agent) und dient als Datenbasis für das spätere Mitgliederportal.
 */
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  audience: audienceEnum("audience"),
  status: subscriberStatusEnum("status").notNull().default("pending"),
  brevoContactId: text("brevo_contact_id"),
  // DSGVO-Nachweis der Einwilligung
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull().defaultNow(),
  consentIp: text("consent_ip"),
  consentUserAgent: text("consent_user_agent"),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
