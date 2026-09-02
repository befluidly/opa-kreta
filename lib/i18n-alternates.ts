import { getPostByCanonicalSlug } from "./api";

export interface ArticleAlternates {
  nl: string | null;
  en: string | null;
}

// Zoekt voor een artikel (via canonicalSlug — locale-onafhankelijk, zie
// scripts/generate-content-data.mjs) de beschikbare taalversies op en geeft
// hun volledige pad terug (of null als die taal nog niet vertaald is).
// Eén bron van waarheid voor: de taal-toggle (verbergt EN zonder vertaling),
// hreflang-metadata (generateMetadata) en de sitemap (alternateRefs).
export function getArticleAlternates(canonicalSlug: string): ArticleAlternates {
  const nlPost = getPostByCanonicalSlug(canonicalSlug, "nl");
  const enPost = getPostByCanonicalSlug(canonicalSlug, "en");

  return {
    nl: nlPost ? `/${nlPost.slug}` : null,
    en: enPost ? `/${enPost.slug}` : null,
  };
}
