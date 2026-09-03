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
