export interface Post {
  title: string;
  excerpt: string;
  intro?: string;
  date: string;
  coverImage?: string;
  heroImage?: string; // ✅ nieuw veld
  category?: string;
  subcategories?: string[];
  tags?: string[];
  slug: string;
  // "nl" (default, geen padprefix) of "en" (route-slug krijgt "en/"-prefix).
  // Zie scripts/generate-content-data.mjs (splitLocale) voor hoe dit uit het
  // bestandspad wordt afgeleid.
  locale: "nl" | "en";
  // Route-slug zonder het locale-segment — dezelfde waarde voor de nl- en
  // de en-versie van eenzelfde artikel, gebruikt om vertaalde tegenhangers
  // aan elkaar te koppelen (taal-toggle, hreflang).
  canonicalSlug: string;
  content: string;
  affiliates?: {
    title?: string;
    text?: string;
    link?: string;
    button?: string;
    image?: string; // ✅ nieuwe optionele afbeelding
  }[];
  // Optionele, gestructureerde receptvelden (CMS). Bestaande recepten hebben
  // deze niet en blijven werken via vrije tekst ("## Ingrediënten"/
  // "## Bereiding") in de MDX-body — zie RecipeLayout.tsx.
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  ingredients?: {
    amount?: string;
    unit?: string;
    name: string;
  }[];
}
