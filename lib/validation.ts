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
  firstName: z.string().trim().max(100).optional(),
  audience: z.enum(AUDIENCES).optional(),
  consent: z.boolean(),
  /** Honeypot — muss leer bleiben (Bot-Schutz). */
  website: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
