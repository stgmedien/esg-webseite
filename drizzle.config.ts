import { defineConfig } from "drizzle-kit";

// .env.local laden, damit `drizzle-kit push/generate/studio` DATABASE_URL kennt.
try {
  process.loadEnvFile(".env.local");
} catch {
  /* keine .env.local — DATABASE_URL kommt aus der Umgebung */
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
