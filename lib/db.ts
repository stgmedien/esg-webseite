import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

const databaseUrl = process.env.DATABASE_URL;

/** True, sobald eine Neon-Verbindung konfiguriert ist. */
export const dbConfigured = Boolean(databaseUrl);

/**
 * Drizzle-Client gegen Neon (HTTP-Treiber, ideal für Vercel-Serverless).
 * Bewusst `null`, wenn `DATABASE_URL` fehlt — so funktioniert die UI bereits
 * lokal/in der Vorschau, bevor die Datenbank verdrahtet ist.
 */
export const db = databaseUrl ? drizzle(neon(databaseUrl), { schema }) : null;
