import type { Metadata, Viewport } from "next";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-next",
  display: "swap",
});

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display-next",
  display: "swap",
});

const title = "Unity Martial Arts Club | Karate & Self-Defence in Ananthnagar, Bengaluru";
const description =
  "Professional Karate, Kata, Kumite and Self-Defence Training for Kids, Teenagers and Adults in Ananthnagar, Bengaluru.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Unity Martial Arts Club",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Unity Martial Arts Club",
    images: [
      {
        url: "/images/hero.jpg",
        width: 2000,
        height: 1333,
        alt: "A karate student practising a punch toward tall windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Unity Martial Arts Club",
  description,
  sport: "Karate",
  telephone: "+918050460145",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ananthnagar",
    addressRegion: "Bengaluru",
    addressCountry: "IN",
  },
  areaServed: "Ananthnagar, Bengaluru, India",
  hasMap: "https://share.google/7QPRBrl3fEyY1xSl5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body
        style={{
          ["--font-body" as string]: `${body.style.fontFamily}, "Noto Sans", "DejaVu Sans", sans-serif`,
          ["--font-display" as string]: `${display.style.fontFamily}, "Arial Narrow", sans-serif`,
        }}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
