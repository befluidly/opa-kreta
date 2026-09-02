"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");
  // Navbar is een gedeeld component (components/Layout.tsx) dat in zowel de
  // NL- als de EN-routeboom gerenderd wordt — de links moeten dus zelf een
  // "/en"-prefix toevoegen op de EN-site, anders stuurt elke klik je terug
  // naar de Nederlandse versie van die pagina.
  const locale = useLocale();
  const prefix = locale === "en" ? "/en" : "";

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

            <div className="ml-auto">
              <Link
                href={`${prefix}/shop`}
                className="hover:text-spanishBlue font-semibold transition-colors text-[18px]"
              >
                {t("shop")}
              </Link>
            </div>
          </div>

          {/* Hamburger / Close button (mobile) */}
          <button
            className="md:hidden text-3xl focus:outline-none z-[110] text-darkCornflower"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-20 right-0 h-full w-64 bg-white shadow-lg z-[90] transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center py-6 space-y-5 text-darkCornflower text-lg font-medium">
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
            href={`${prefix}/categorie/shop`}
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
