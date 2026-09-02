"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("footer");
  const locale = useLocale();
  // Footer is een gedeeld component (components/Layout.tsx), gerenderd in
  // zowel de NL- als de EN-routeboom — zie Navbar.tsx voor dezelfde reden.
  const prefix = locale === "en" ? "/en" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data?.ok) {
        setMessage({ text: t("subscribeSuccess"), success: true });
        setEmail("");
      } else {
        setMessage({ text: data?.message || t("subscribeError"), success: false });
      }
    } catch {
      setMessage({ text: t("subscribeError"), success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-700">
        {/* Kolom 1: Over & navigatie */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">{t("brand")}</h3>
          <ul className="space-y-2">
            <li><a href={`${prefix}/over`} className="hover:text-skyBlue transition">{t("aboutUs")}</a></li>
            <li><a href={`${prefix}/categorie/opas-blog`} className="hover:text-skyBlue transition">{t("blog")}</a></li>
            <li><a href={`${prefix}/categorie/praktisch`} className="hover:text-skyBlue transition">{t("practicalTips")}</a></li>
            <li><a href={`${prefix}/categorie/gidsen`} className="hover:text-skyBlue transition">{t("sights")}</a></li>
            <li><a href={`${prefix}/contact`} className="hover:text-skyBlue transition">{t("contact")}</a></li>
          </ul>
        </div>

        {/* Kolom 2: Populaire gidsen */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">{t("popularGuides")}</h3>
          <ul className="space-y-2">
            <li><a href={`${prefix}/praktisch/auto-huren-op-kreta`} className="hover:text-skyBlue transition">{t("carRental")}</a></li>
            <li><a href={`${prefix}/categorie/gidsen/rethymnon`} className="hover:text-skyBlue transition">{t("regionRethymnon")}</a></li>
            <li><a href={`${prefix}/categorie/gidsen/heraklion`} className="hover:text-skyBlue transition">{t("regionHeraklion")}</a></li>
            <li><a href={`${prefix}/categorie/gidsen/lassithi`} className="hover:text-skyBlue transition">{t("regionLassithi")}</a></li>
            <li><a href={`${prefix}/categorie/gidsen/chania`} className="hover:text-skyBlue transition">{t("regionChania")}</a></li>
          </ul>
        </div>

        {/* Kolom 3: Affiliate tips */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">{t("usefulPartners")}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              🚗{" "}
              <a
                href="https://www.sunnycars.nl"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="hover:text-skyBlue underline"
              >
                {t("sunnyCars")}
              </a>
            </li>
            <li>
              🏨{" "}
              <a
                href="https://www.booking.com"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="hover:text-skyBlue underline"
              >
                {t("booking")}
              </a>
            </li>
            <li>
              ✈️{" "}
              <a
                href="https://www.skyscanner.nl"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="hover:text-skyBlue underline"
              >
                {t("skyscanner")}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">{t("affiliateDisclosure")}</p>
        </div>

        {/* Kolom 4: Nieuwsbrief */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">{t("newsletterHeading")}</h3>
          <p className="text-sm mb-4">{t("newsletterText")}</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded border border-gray-300 w-full text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-skyBlue text-white font-semibold px-4 py-2 rounded hover:bg-skyBlue/80 transition disabled:opacity-50"
            >
              {loading ? t("subscribing") : t("subscribe")}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-sm ${message.success ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>

      {/* Onderbalk */}
      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-600">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
