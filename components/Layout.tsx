import Script from "next/script";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({ children }: { children: React.ReactNode }) {
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

      <Navbar />
      <main className="flex-grow mb-20">{children}<ScrollToTopButton /></main>
      <Footer />
    </div>
  );
}
