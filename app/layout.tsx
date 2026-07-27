import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, pricing } from "@/lib/site";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Live-Musik-Duo aus ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: `Zwei Musiker, vier Instrumente: Klavier, Geige, Gitarre und Bass. Live-Musik für Hochzeit, Trauerfeier, Geburtstag und Firmenfeier in ${site.regionLong}. Jetzt Termin anfragen.`,
  keywords: [
    "Livemusik Mönchengladbach",
    "Musiker Hochzeit Mönchengladbach",
    "Trauerfeier Musik",
    "Band buchen Mönchengladbach",
    "Geiger Hochzeit",
    "Pianist Trauerfeier",
    "Live Duo Niederrhein",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Live-Musik-Duo aus ${site.city}`,
    description: `Klavier, Geige, Gitarre, Bass. Live für Hochzeit, Trauerfeier, Geburtstag und Firmenfeier in ${site.regionLong}.`,
    images: [
      {
        url: "/hero.jpg",
        width: 2560,
        height: 1434,
        alt: `${site.name} – Lennard und Jonah an ihren Instrumenten`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – Live-Musik-Duo aus ${site.city}`,
    description: `Klavier, Geige, Gitarre, Bass. Live für jeden Anlass in ${site.regionLong}.`,
    images: ["/hero.jpg"],
  },
  // Gesteuert über `live` in lib/site.ts – siehe Kommentar dort.
  robots: { index: site.live, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
  colorScheme: "dark",
};

/** Strukturierte Daten – hilft Google, uns als lokale Band zu verstehen. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: site.name,
  url: site.url,
  image: `${site.url}/hero.jpg`,
  email: site.email,
  telephone: site.phoneLink,
  genre: ["Rock", "Pop", "Klassik", "Akustik"],
  description: `Live-Musik-Duo aus ${site.city}: Klavier, Geige, Gitarre und Bass für Hochzeiten, Trauerfeiern, Geburtstage und Firmenfeiern.`,
  member: [
    { "@type": "Person", name: "Lennard", jobTitle: "Klavier, Keyboard, Geige" },
    { "@type": "Person", name: "Jonah", jobTitle: "Gitarre, Bass" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "DE",
  },
  makesOffer: pricing.map((p) => ({
    "@type": "Offer",
    name: `Live-Musik: ${p.title}`,
    description: p.detail,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: p.from,
      maxPrice: p.to,
      priceCurrency: "EUR",
    },
  })),
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", address: site.city },
    geoRadius: site.radiusKm * 1000,
  },
  sameAs: [site.socials.instagram, site.socials.tiktok, site.socials.youtube],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* Ohne JavaScript gibt es keine Einblend-Animation – dann muss
            der Inhalt von Anfang an sichtbar sein. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
