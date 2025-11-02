import type { AppProps } from "next/app";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";
import { Lexend, Hepta_Slab, Dancing_Script } from "next/font/google";
import CookieConsent from "../components/CookieConsent";

// 👇 Fonts als CSS-variabelen registreren
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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${lexend.variable} ${hepta.variable} ${dancing.variable} font-title`}
    >
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <CookieConsent /> {/* 👈 Cookie banner */}
    </main>
  );
}
