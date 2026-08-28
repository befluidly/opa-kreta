"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data?.ok) {
        setMessage("Bedankt! 🎉 Je bent ingeschreven.");
        setEmail("");
      } else {
        setMessage(data?.message || "Er ging iets mis. Probeer opnieuw.");
      }
    } catch {
      setMessage("Er ging iets mis. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-700">
        {/* Kolom 1: Over & navigatie */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">Hidden Crete</h3>
          <ul className="space-y-2">
            <li><a href="/over" className="hover:text-skyBlue transition">Over ons</a></li>
            <li><a href="/categorie/opas-blog" className="hover:text-skyBlue transition">Opa’s blog</a></li>
            <li><a href="/categorie/praktisch" className="hover:text-skyBlue transition">Praktische tips</a></li>
            <li><a href="/categorie/gidsen" className="hover:text-skyBlue transition">Bezienswaardigheden</a></li>
            <li><a href="/contact" className="hover:text-skyBlue transition">Contact</a></li>
          </ul>
        </div>

        {/* Kolom 2: Populaire gidsen */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">Populaire gidsen</h3>
          <ul className="space-y-2">
            <li><a href="/praktisch/auto-huren-op-kreta" className="hover:text-skyBlue transition">Auto huren op Kreta</a></li>
            <li><a href="/categorie/gidsen/rethymnon" className="hover:text-skyBlue transition">Regio Rethymnon</a></li>
            <li><a href="/categorie/gidsen/heraklion" className="hover:text-skyBlue transition">Regio Heraklion</a></li>
            <li><a href="/categorie/gidsen/lassithi" className="hover:text-skyBlue transition">Regio Lassithi</a></li>
            <li><a href="/categorie/gidsen/chania" className="hover:text-skyBlue transition">Regio Chania</a></li>
          </ul>
        </div>

        {/* Kolom 3: Affiliate tips */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">Handige partners</h3>
          <ul className="space-y-2 text-sm">
            <li>
              🚗{" "}
              <a
                href="https://www.sunnycars.nl"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="hover:text-skyBlue underline"
              >
                Sunny Cars – huurauto zonder zorgen
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
                Booking.com – hotels & appartementen
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
                Skyscanner – goedkope vluchten
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-gray-500">
            * Sommige links zijn affiliate — wij ontvangen mogelijk een kleine commissie, zonder extra kosten voor jou.
          </p>
        </div>

        {/* Kolom 4: Nieuwsbrief */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-skyBlue">Blijf op de hoogte</h3>
          <p className="text-sm mb-4">
            Ontvang 1x per maand inspiratie, verborgen plekjes en reistips over Kreta.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Jouw e-mailadres"
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
              {loading ? "Even geduld..." : "Inschrijven"}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-sm ${message.includes("Bedankt") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Onderbalk */}
      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Opa! Kreta — Handige links zijn mogelijk affiliate (sponsored).
      </div>
    </footer>
  );
}
