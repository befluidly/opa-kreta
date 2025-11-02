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
}
