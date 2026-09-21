"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { SearchIndexEntry } from "../lib/searchIndex";

interface SearchBoxProps {
  index: SearchIndexEntry[];
  // Vertaalde labels per category-waarde (bv. "gidsen" -> "Gids"/"Guides"),
  // afkomstig uit Navbar's al-geladen "nav"-namespace i.p.v. hier een eigen
  // vertaalnamespace voor te raadplegen.
  categoryLabels: Record<string, string>;
  // "icon": bureaublad — een icoontje dat een dropdown-paneel opent.
  // "inline": mobiel — staat al in het (zelf al toggle-bare) uitklapmenu,
  // dus meteen het invoerveld zelf tonen, geen extra icoon/toggle nodig.
  variant: "icon" | "inline";
  onNavigate?: () => void;
}

const MAX_RESULTS = 8;

// Eenvoudige, client-side relevantie-score — geen zoekindex/backend nodig
// voor de ±50 artikelen per taal. Lagere score = beter, -1 = geen match.
// Titel weegt het zwaarst (exact > begint ermee > bevat), dan tags, dan
// excerpt, in die volgorde.
function scoreEntry(entry: SearchIndexEntry, query: string): number {
  const title = entry.title.toLowerCase();
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  if (entry.tags?.some((tag) => tag.toLowerCase().includes(query))) return 3;
  if (entry.excerpt.toLowerCase().includes(query)) return 4;
  return -1;
}

function getMatches(index: SearchIndexEntry[], rawQuery: string): SearchIndexEntry[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];
  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry);
}

export default function SearchBox({
  index,
  categoryLabels,
  variant,
  onNavigate,
}: SearchBoxProps) {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => getMatches(index, query), [index, query]);
  const showResults = variant === "inline" ? query.trim().length > 0 : isOpen && query.trim().length > 0;

  // Klik buiten het paneel / Escape sluit de dropdown (enkel relevant voor
  // de "icon"-variant — "inline" heeft geen los open/dicht-paneel, dat zit
  // al in het uitklapmenu van Navbar).
  useEffect(() => {
    if (variant !== "icon") return;
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant]);

  function handleResultClick() {
    setQuery("");
    setIsOpen(false);
    onNavigate?.();
  }

  const resultsList = (
    <ul className="max-h-80 overflow-y-auto py-2">
      {matches.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={`/${entry.slug}`}
            onClick={handleResultClick}
            className="flex flex-col gap-0.5 px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-darkCornflower line-clamp-1">
              {entry.title}
            </span>
            <span className="text-xs text-gray-500 line-clamp-1">
              {entry.category && categoryLabels[entry.category]
                ? `${categoryLabels[entry.category]} — `
                : ""}
              {entry.excerpt}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const noResults = (
    <p className="px-4 py-3 text-sm text-gray-500">{t("noResults", { query })}</p>
  );

  if (variant === "inline") {
    return (
      <div className="w-full px-4">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("ariaLabel")}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-darkCornflower focus:outline-none focus:ring-2 focus:ring-skyBlue"
        />
        {query.trim().length > 0 && (
          <div className="mt-2 rounded-lg border border-gray-100 bg-white shadow-sm">
            {matches.length > 0 ? resultsList : noResults}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={t("ariaLabel")}
        onClick={() => {
          setIsOpen((open) => !open);
          // Bij het openen meteen focus geven — vraagt een tick omdat het
          // invoerveld nog niet in de DOM staat vóór de state-update verwerkt is.
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-darkCornflower hover:bg-gray-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-100 bg-white shadow-lg z-[120]">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("ariaLabel")}
            className="w-full px-4 py-3 text-sm text-darkCornflower rounded-t-lg focus:outline-none"
          />
          {showResults && (
            <div className="border-t border-gray-100">
              {matches.length > 0 ? resultsList : noResults}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
