import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../../globals.css";
import { Lexend, Hepta_Slab, Dancing_Script } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import CookieConsent from "../../../components/CookieConsent";
import enMessages from "../../../messages/en.json";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});
const hepta = Hepta_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hepta",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.opakreta.be"),
  title: "Opa! Kreta | Your guide to Crete: travel tips & highlights",
  description: "Discover Crete: tips, guides and practical info for your holiday.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon-180x180.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.opakreta.be/en",
    siteName: "Opa! Kreta",
    title: "Opa! Kreta | Your guide to Crete: travel tips & highlights",
    description: "Discover Crete: tips, guides and practical info for your holiday.",
  },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Zet de locale synchroon vast vóór enige next-intl-aanroep verderop in de
  // renderboom (zie i18n/request.ts) — dit is wat statische generatie
  // mogelijk maakt ondanks het gebruik van getTranslations/useTranslations.
  setRequestLocale("en");

  return (
    <html lang="en">
      <body className={`${lexend.variable} ${hepta.variable} ${dancing.variable}`}>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GLDSDTRDF4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GLDSDTRDF4');
          `}
        </Script>

        <main className="font-title">
          <NextIntlClientProvider locale="en" messages={enMessages}>
            {children}
            <CookieConsent />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
