"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// ✅ TypeScript fix – voeg dataLayer toe aan window
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted") {
      loadGoogleTag();
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    loadGoogleTag();
  }

  function handleDecline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  function loadGoogleTag() {
    if (document.getElementById("gtag-script")) return;

    const script = document.createElement("script");
    script.id = "gtag-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-GLDSDTRDF4";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("js", new Date());
    gtag("config", "G-GLDSDTRDF4", { anonymize_ip: true });
  }

  if (!mounted) return null;
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 max-w-xl mx-auto bg-[#fffbf2] text-[#11456d] text-sm p-4 sm:p-5 shadow-xl rounded-lg border border-[#83CEEC]/30 flex flex-col sm:flex-row items-center justify-between z-50 transition-all duration-300 ease-in-out animate-fade-in">
      <p className="mb-3 sm:mb-0 sm:mr-4 text-center sm:text-left leading-relaxed">
        {t("cookieText")}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="bg-[#11456d] hover:bg-[#256395] text-[#fffbf2] font-semibold px-4 py-1.5 rounded transition-colors duration-200"
        >
          {t("cookieAccept")}
        </button>
        <button
          onClick={handleDecline}
          className="bg-[#83CEEC] hover:bg-[#256395] text-[#11456d] font-semibold px-4 py-1.5 rounded transition-colors duration-200"
        >
          {t("cookieDecline")}
        </button>
      </div>
    </div>
  );
}
