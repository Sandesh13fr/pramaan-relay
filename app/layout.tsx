import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pramaan-relay.vercel.app"),
  title: "Pramaan Relay | Accountable DLC handoff prototype",
  description:
    "An independent civic-tech prototype that makes Digital Life Certificate delivery to a pension agency traceable, retryable, and accountable.",
  icons: {
    icon: "/pramaan-relay-logo.png",
    apple: "/pramaan-relay-logo.png",
  },
  openGraph: {
    title: "Pramaan Relay",
    description: "A life certificate should not die between systems.",
    type: "website",
    images: [{ url: "/hero-pensioner.png", width: 1536, height: 1024 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>
        {/*
        THESIS: Make the invisible agency handoff the first thing a reviewer can operate, refusing a status-only dashboard.
        OWN-WORLD: Deep civic green, coral action, off-white fields, crisp rules, documentary imagery, and compact evidence labels.
        STORY: Understand generated versus accepted, run a synthetic journey, see who owns the next action, then download a paper certificate.
        FIRST VIEWPORT: Direct claim and citizen image lead into the scenario selector; the working reducer begins immediately below.
        FORM: Trust-first public-service process tool, preserving the existing brand and interaction model.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        {children}
      </body>
    </html>
  );
}
