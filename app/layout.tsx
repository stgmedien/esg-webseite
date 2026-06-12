import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://esg-guetersloh.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ESG Gütersloh – Evangelisch Stiftisches Gymnasium",
    template: "%s · ESG Gütersloh",
  },
  description:
    "Das Evangelisch Stiftische Gymnasium Gütersloh – seit 1851. MINT-EC-Schule, digitales Lernen, Musik und Theater: eine Schule mit Geschichte und Zukunft.",
  openGraph: {
    title: "ESG Gütersloh – Evangelisch Stiftisches Gymnasium",
    description:
      "Eine Schule mit Geschichte und Zukunft: 175 Jahre ESG Gütersloh – MINT-EC, digitales Lernen, Musik und Theater.",
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
    <html lang="de" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
