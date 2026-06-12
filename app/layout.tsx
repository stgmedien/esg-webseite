import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://esg-guetersloh.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ESG Gütersloh – Newsletter",
    template: "%s · ESG Gütersloh",
  },
  description:
    "Bleib in Verbindung mit dem Evangelisch Stiftischen Gymnasium Gütersloh – Neuigkeiten, Termine und Geschichten aus 175 Jahren Schulleben. Jetzt zum Newsletter anmelden.",
  openGraph: {
    title: "ESG Gütersloh – Newsletter",
    description:
      "Neuigkeiten, Termine und Geschichten aus 175 Jahren ESG Gütersloh – direkt in dein Postfach.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
