import { z } from "zod";

export const AUDIENCES = [
  "eltern",
  "schueler",
  "ehemalige",
  "lehrkraefte",
  "interessierte",
] as const;

export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_LABEL: Record<Audience, string> = {
  eltern: "Eltern",
  schueler: "Schüler:in",
  ehemalige: "Ehemalige:r",
  lehrkraefte: "Lehrkraft",
  interessierte: "Interessierte:r",
};

export const subscribeSchema = z.object({
  email: z.email("Bitte gib eine gültige E-Mail-Adresse ein.").max(254),
  firstName: z
    .string({ error: "Bitte gib deinen Vornamen an." })
    .trim()
    .min(2, "Bitte gib deinen Vornamen an.")
    .max(100),
  phone: z
    .string({ error: "Bitte gib deine Telefonnummer an." })
    .trim()
    .regex(/^\+?[0-9][0-9 ()/\-.]{5,24}$/, "Bitte gib eine gültige Telefonnummer an."),
  audience: z.enum(AUDIENCES).optional(),
  consent: z.boolean(),
  /** Honeypot — muss leer bleiben (Bot-Schutz). */
  website: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
