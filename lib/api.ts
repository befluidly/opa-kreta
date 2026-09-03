import { Post } from "../types/post";
import generatedPosts from "./content-data.generated.json";

// 📦 Ingelezen door scripts/generate-content-data.mjs (draait via
// predev/prebuild) — zie dat bestand voor waarom dit geen fs-reads meer zijn.
const allPosts = generatedPosts as unknown as Post[];

// 📜 Alle posts ophalen (optioneel per folder, optioneel per taal).
// `folder` filtert op canonicalSlug (dus locale-onafhankelijk: "tips/muziek"
// matcht zowel de nl- als de en-versie) — `locale` filtert daarna verder.
export function getAllPosts(folder?: string, locale?: Post["locale"]): Post[] {
  const posts = allPosts.filter((p) => {
    const matchesFolder =
      !folder || p.canonicalSlug === folder || p.canonicalSlug.startsWith(`${folder}/`);
    const matchesLocale = !locale || p.locale === locale;
    return matchesFolder && matchesLocale;
  });

  // 🕒 Nieuwste eerst
  return [...posts].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

// 🧩 Eén specifiek artikel ophalen via route-slug (bv. "gidsen/heraklion/knossos"
// voor nl, "en/gidsen/heraklion/knossos" voor en).
export function getPostBySlug(slug: string): Post | null {
  return allPosts.find((p) => p.slug === slug) ?? null;
}

// 🌍 De vertaalde tegenhanger van een artikel opzoeken via canonicalSlug —
// gebruikt door de taal-toggle en hreflang-metadata (zie lib/i18n-alternates.ts).
export function getPostByCanonicalSlug(
  canonicalSlug: string,
  locale: Post["locale"]
): Post | null {
  return allPosts.find((p) => p.canonicalSlug === canonicalSlug && p.locale === locale) ?? null;
}
