"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { ArticleAlternates } from "../lib/i18n-alternates";
import type { SearchIndexEntry } from "../lib/searchIndex";
import SearchBox from "./SearchBox";

interface NavBarProps {
  // Enkel meegegeven op artikelpagina's — zie components/Layout.tsx.
  articleAlternates?: ArticleAlternates;
  // Server-side opgebouwd in Layout.tsx (getSearchIndex) — zie SearchBox.tsx.
  searchIndex: SearchIndexEntry[];
}

const NavBar = ({ articleAlternates, searchIndex }: NavBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");
  // category-waarden (post.category) komen exact overeen met deze
  // vertaalsleutels — zie de opas-blog->blog-uitzondering hieronder.
  const categoryLabels: Record<string, string> = {
    "opas-blog": t("blog"),
    gidsen: t("gidsen"),
    praktisch: t("praktisch"),
    inspiratie: t("inspiratie"),
    recepten: t("recepten"),
  };
  // Navbar is een gedeeld component (components/Layout.tsx) dat in zowel de
  // NL- als de EN-routeboom gerenderd wordt — de links moeten dus zelf een
  // "/en"-prefix toevoegen op de EN-site, anders stuurt elke klik je terug
  // naar de Nederlandse versie van die pagina.
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";
  const pathname = usePathname();

  // Taal-toggle: op een artikelpagina (articleAlternates meegegeven door
  // Layout) tonen we enkel wat er ook echt vertaald is, zodat er nooit naar
  // een niet-bestaande EN-versie gelinkt wordt. Op elke andere ("chrome")
  // pagina bestaat de EN-tegenhanger altijd op hetzelfde pad met een
  // /en-prefix, dus volstaat het om dat prefix te wisselen op het huidige pad.
  const nlHref = articleAlternates
    ? articleAlternates.nl
    : locale === "en"
      ? pathname.replace(/^\/en/, "") || "/"
      : pathname;
  const enHref = articleAlternates
    ? articleAlternates.en
    : locale === "en"
      ? pathname
      : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-[100] bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={prefix || "/"} className="flex items-center h-full">
            <div className="relative w-32 h-8 md:h-10">
              <Image
                src="/images/logo/Opa_logo-blauw.png"
                alt={t("logoAlt")}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center flex-1 justify-between ml-10 text-darkCornflower">
            <div className="flex space-x-8 items-center text-[18px] font-medium tracking-wide">
              <Link href={prefix || "/"} className="hover:text-spanishBlue transition-colors">
                {t("home")}
              </Link>
              <Link
                href={`${prefix}/categorie/opas-blog`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("blog")}
              </Link>
              <Link
                href={`${prefix}/categorie/gidsen`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("gidsen")}
              </Link>
              <Link
                href={`${prefix}/categorie/praktisch`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("praktisch")}
              </Link>
              <Link
                href={`${prefix}/inspiratie`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("inspiratie")}
              </Link>
              <Link
                href={`${prefix}/categorie/recepten`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("recepten")}
              </Link>
              {/* <Link
                href={`${prefix}/over`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("over")}
              </Link> */}
              <Link
                href={`${prefix}/contact`}
                className="hover:text-spanishBlue transition-colors"
              >
                {t("contact")}
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <SearchBox index={searchIndex} categoryLabels={categoryLabels} variant="icon" />

              <Link
                href={`${prefix}/shop`}
                className="hover:text-spanishBlue font-semibold transition-colors text-[18px]"
              >
                {t("shop")}
              </Link>

              {/* 🌐 Taal-toggle: enkel EN tonen als er een vertaling bestaat.
                  Extra marge + scheidingslijn t.o.v. "Shop" zodat de toggle
                  zelf beter opvalt i.p.v. te verdwijnen naast Shop. */}
              <div className="flex items-center gap-1 text-sm font-semibold ml-2 pl-4 border-l border-gray-200">
                {nlHref && (
                  <Link
                    href={nlHref}
                    className={
                      locale === "nl"
                        ? "text-darkCornflower"
                        : "text-gray-400 hover:text-spanishBlue transition-colors"
                    }
                  >
                    NL
                  </Link>
                )}
                {nlHref && enHref && <span className="text-gray-300">|</span>}
                {enHref && (
                  <Link
                    href={enHref}
                    className={
                      locale === "en"
                        ? "text-darkCornflower"
                        : "text-gray-400 hover:text-spanishBlue transition-colors"
                    }
                  >
                    EN
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 📱 Taal-toggle + hamburger (mobiel). Zelfde "NL | EN"-teksstijl
              als de desktop-toggle verderop (bewust niet hernaar
              gerefactored — desktop blijft ongewijzigd), maar met een groter
              tikoppervlak (min. 44×44px via min-w/min-h, niet via grotere
              tekst) en taal-metadata (lang/aria-label/aria-current) voor
              screenreaders. Toggle en hamburger delen één flex-groep zodat
              de hamburger niet verspringt wanneer er maar 1 taal te tonen
              is (niet-vertaald artikel) — enkel de toggle zelf krimpt dan,
              logo (links) en hamburger (uiterst rechts) blijven op hun
              plek. */}
          <div className="flex items-center gap-2 md:hidden">
            {(nlHref || enHref) && (
              <div className="flex items-center text-sm font-semibold">
                {nlHref && (
                  <Link
                    href={nlHref}
                    lang="nl"
                    aria-label="Nederlands"
                    aria-current={locale === "nl" ? "page" : undefined}
                    className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] ${
                      locale === "nl" ? "text-darkCornflower" : "text-gray-400"
                    }`}
                  >
                    NL
                  </Link>
                )}
                {nlHref && enHref && (
                  <span className="text-gray-300" aria-hidden="true">
                    |
                  </span>
                )}
                {enHref && (
                  <Link
                    href={enHref}
                    lang="en"
                    aria-label="English"
                    aria-current={locale === "en" ? "page" : undefined}
                    className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] ${
                      locale === "en" ? "text-darkCornflower" : "text-gray-400"
                    }`}
                  >
                    EN
                  </Link>
                )}
              </div>
            )}

            <button
              className="text-3xl focus:outline-none z-[110] text-darkCornflower"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-20 right-0 h-full w-64 bg-white shadow-lg z-[90] transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center py-6 space-y-5 text-darkCornflower text-lg font-medium">
          <SearchBox
            index={searchIndex}
            categoryLabels={categoryLabels}
            variant="inline"
            onNavigate={() => setMenuOpen(false)}
          />

          <Link href={prefix || "/"} onClick={() => setMenuOpen(false)}>
            {t("home")}
          </Link>
          <Link href={`${prefix}/categorie/opas-blog`} onClick={() => setMenuOpen(false)}>
            {t("blog")}
          </Link>
          <Link href={`${prefix}/categorie/gidsen`} onClick={() => setMenuOpen(false)}>
            {t("gidsen")}
          </Link>
          <Link href={`${prefix}/categorie/praktisch`} onClick={() => setMenuOpen(false)}>
            {t("praktisch")}
          </Link>
          <Link href={`${prefix}/inspiratie`} onClick={() => setMenuOpen(false)}>
            {t("inspiratie")}
          </Link>
          <Link href={`${prefix}/categorie/recepten`} onClick={() => setMenuOpen(false)}>
            {t("recepten")}
          </Link>
          <Link href={`${prefix}/over`} onClick={() => setMenuOpen(false)}>
            {t("over")}
          </Link>
          <Link href={`${prefix}/contact`} onClick={() => setMenuOpen(false)}>
            {t("contact")}
          </Link>
          <Link
            href={`${prefix}/shop`}
            className="font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            {t("shop")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
