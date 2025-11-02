import Head from "next/head";
import Script from "next/script";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ✅ Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

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

      <Navbar />
      <main className="flex-grow mb-20">{children}<ScrollToTopButton /></main>
      <Footer />
    </div>
  );
}
