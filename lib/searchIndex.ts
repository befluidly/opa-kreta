import { getAllPosts } from "./api";
import { Post } from "../types/post";

// Sterk uitgedunde versie van Post, enkel wat de navbar-zoekfunctie nodig
// heeft (components/SearchBox.tsx) — bewust NIET rechtstreeks getAllPosts()
// vanuit een client component aanroepen: dat zou de volledige, ongefilterde
// content-data.generated.json (incl. MDX-body, affiliates, ...) naar de
// browser sturen. Deze functie draait server-side (components/Layout.tsx)
// en stuurt enkel deze kleine, per-taal gefilterde lijst mee als prop.
export interface SearchIndexEntry {
  slug: string;
  // Altijd post.title (de zichtbare H1), nooit seoTitle — zelfde regel als
  // overal elders in de site (breadcrumbs, JSON-LD headline).
  title: string;
  excerpt: string;
  category?: string;
  tags?: string[];
}

export function getSearchIndex(locale: Post["locale"]): SearchIndexEntry[] {
  return getAllPosts(undefined, locale).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
  }));
}
