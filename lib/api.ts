import { Post } from "../types/post";
import generatedPosts from "./content-data.generated.json";

// 📦 Ingelezen door scripts/generate-content-data.mjs (draait via
// predev/prebuild) — zie dat bestand voor waarom dit geen fs-reads meer zijn.
const allPosts = generatedPosts as unknown as Post[];

// 📜 Alle posts ophalen (optioneel per folder)
export function getAllPosts(folder?: string): Post[] {
  const posts = folder
    ? allPosts.filter((p) => p.slug === folder || p.slug.startsWith(`${folder}/`))
    : allPosts;

  // 🕒 Nieuwste eerst
  return [...posts].sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

// 🧩 Eén specifiek artikel ophalen via slug (.md of .mdx)
export function getPostBySlug(slug: string): Post | null {
  return allPosts.find((p) => p.slug === slug) ?? null;
}
