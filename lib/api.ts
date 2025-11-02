import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types/post";

// 📂 Basismap voor alle content
const contentDirectory = path.join(process.cwd(), "content");

// 🧭 Helperfunctie om altijd een string te garanderen
function safeString(value: any): string {
  return typeof value === "string" ? value : "";
}

// 🔁 Recursief alle markdown- en mdx-bestanden ophalen
function getAllContentFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? getAllContentFiles(res) : res;
  });

  // ✅ zowel .md als .mdx meenemen
  return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

// 📜 Alle posts ophalen (optioneel per folder)
export function getAllPosts(folder?: string): Post[] {
  const targetDir = folder
    ? path.join(contentDirectory, folder)
    : contentDirectory;

  if (!fs.existsSync(targetDir)) {
    console.warn(`⚠️ Map ${targetDir} bestaat niet.`);
    return [];
  }

  const filePaths = getAllContentFiles(targetDir);

  const posts: Post[] = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const relativePath = path.relative(contentDirectory, filePath);

    return {
      slug: relativePath
        .replace(/\\/g, "/")
        .replace(/\.mdx?$/, ""),
      ...data,
      title: safeString(data.title) || "Untitled",
      excerpt:
        safeString(data.excerpt) ||
        (typeof content === "string" ? content.slice(0, 160) + "..." : ""),
      date: data.date ? new Date(data.date).toISOString() : "",
      coverImage: safeString(data.coverImage),
      heroImage: safeString(data.heroImage), // ✅ toegevoegd
      category: safeString(data.category),
      subcategories: Array.isArray(data.subcategories)
        ? data.subcategories
        : data.subcategory
          ? [safeString(data.subcategory)]
          : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      content: typeof content === "string" ? content : "",
    };

  });

  // 🕒 Nieuwste eerst
  return posts.sort(
    (a, b) =>
      new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

// 🧩 Eén specifiek artikel ophalen via slug (.md of .mdx)
export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(contentDirectory, `${slug}.mdx`);
  const mdPath = path.join(contentDirectory, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;

  if (!filePath) {
    console.warn(`⚠️ Bestand niet gevonden: ${slug}`);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data, // ✅ Neem alles mee uit de frontmatter (affiliates, enz.)
    title: safeString(data.title) || "Untitled",
    excerpt:
      safeString(data.excerpt) ||
      (typeof content === "string" ? content.slice(0, 160) + "..." : ""),
    date: data.date ? new Date(data.date).toISOString() : "",
    coverImage: safeString(data.coverImage),
    heroImage: safeString(data.heroImage),
    category: safeString(data.category),
    subcategories: Array.isArray(data.subcategories)
      ? data.subcategories
      : data.subcategory
        ? [safeString(data.subcategory)]
        : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    content: typeof content === "string" ? content : "",
  };
}
