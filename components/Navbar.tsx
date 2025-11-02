"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-[100] bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <div className="relative w-32 h-8 md:h-10">
              <Image
                src="/images/logo/Opa_logo-blauw.png"
                alt="Opa! Kreta"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center flex-1 justify-between ml-10 text-darkCornflower">
            <div className="flex space-x-8 items-center text-[18px] font-medium tracking-wide">
              <Link href="/" className="hover:text-spanishBlue transition-colors">
                Home
              </Link>
              <Link
                href="/categorie/opas-blog"
                className="hover:text-spanishBlue transition-colors"
              >
                Opa’s Blog
              </Link>
              <Link
                href="/categorie/gidsen"
                className="hover:text-spanishBlue transition-colors"
              >
                Gids
              </Link>
              <Link
                href="/categorie/praktisch"
                className="hover:text-spanishBlue transition-colors"
              >
                Praktisch
              </Link>
              <Link
                href="/inspiratie"
                className="hover:text-spanishBlue transition-colors"
              >
                Inspiratie
              </Link>
              <Link
                href="/categorie/recepten"
                className="hover:text-spanishBlue transition-colors"
              >
                Recepten
              </Link>
              <Link
                href="/over"
                className="hover:text-spanishBlue transition-colors"
              >
                Over
              </Link>
              <Link
                href="/contact"
                className="hover:text-spanishBlue transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="ml-auto">
              <Link
                href="/shop"
                className="hover:text-spanishBlue font-semibold transition-colors text-[18px]"
              >
                Shop
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
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/categorie/opas-blog" onClick={() => setMenuOpen(false)}>
            Opa’s Blog
          </Link>
          <Link href="/categorie/gidsen" onClick={() => setMenuOpen(false)}>
            Gids
          </Link>
          <Link href="/categorie/praktisch" onClick={() => setMenuOpen(false)}>
            Praktisch
          </Link>
          <Link href="/inspiratie" onClick={() => setMenuOpen(false)}>
            Inspiratie
          </Link>
          <Link href="/categorie/recepten" onClick={() => setMenuOpen(false)}>
            Recepten
          </Link>
          <Link href="/over" onClick={() => setMenuOpen(false)}>
            Over
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link
            href="/categorie/shop"
            className="font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
