import Script from "next/script";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import type { ArticleAlternates } from "../lib/i18n-alternates";

interface LayoutProps {
  children: React.ReactNode;
  // Enkel meegegeven door artikelpagina's ([...slug]/page.tsx, RecipeLayout)
  // — laat de taal-toggle in Navbar weten welke vertaalde versie van dít
  // specifieke artikel bestaat, i.p.v. enkel het /en-prefix op het huidige
  // pad te wisselen (dat zou op een nog-niet-vertaald artikel een 404 geven).
  articleAlternates?: ArticleAlternates;
}

export default function Layout({ children, articleAlternates }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Travelpayouts verificatie */}
      <Script id="travelpayouts-verification" strategy="afterInteractive">
        {`
          (function () {
            var script = document.createElement("script");
            script.async = 1;
            script.src = 'https://emrldtp.cc/NDY1ODMx.js?t=465831';
            document.head.appendChild(script);
          })();
        `}
      </Script>

      <Navbar articleAlternates={articleAlternates} />
      <main className="flex-grow mb-20">{children}<ScrollToTopButton /></main>
      <Footer />
    </div>
  );
}
