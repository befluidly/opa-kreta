import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types/post";

// 🔹 Helper: zoek recursief naar .md of .mdx-bestanden
function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllMarkdownFiles(fullPath);
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      return [fullPath];
    }
    return [];
  });

  return files;
}

// 🔹 Alle posts ophalen (recursief)
export function getAllPosts(type = "blog"): Post[] {
  const baseDir = path.join(process.cwd(), "content", type);

  if (!fs.existsSync(baseDir)) {
    console.warn(`⚠️  Map ${baseDir} bestaat niet.`);
    return [];
  }

  const filePaths = getAllMarkdownFiles(baseDir);

  const posts = filePaths
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      const slug = filePath
        .replace(baseDir, "")
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")
        .replace(/\.(md|mdx)$/, "");

      return {
        slug,
        title: data.title || "Zonder titel",
        date: data.date ? new Date(data.date).toISOString() : null,
        excerpt: data.excerpt || content.slice(0, 160) + "...",
        coverImage: data.coverImage || null,
        category: data.category || null,
        content,
      } as Post;
    })
    .sort((a, b) => {
      // Nieuwste bovenaan
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

  return posts;
}

// 🔹 Eén specifieke post ophalen op basis van slug
export function getPostBySlug(type: string, slug: string): Post {
  const baseDir = path.join(process.cwd(), "content", type);
  const fullPathMd = path.join(baseDir, `${slug}.md`);
  const fullPathMdx = path.join(baseDir, `${slug}.mdx`);

  let filePath: string | undefined;

  if (fs.existsSync(fullPathMd)) filePath = fullPathMd;
  else if (fs.existsSync(fullPathMdx)) filePath = fullPathMdx;
  else {
    // Zoek recursief in submappen (voor bestemmingen)
    const allFiles = getAllMarkdownFiles(baseDir);
    filePath = allFiles.find(
      (f) => f.endsWith(`${slug}.md`) || f.endsWith(`${slug}.mdx`)
    );
  }

  if (!filePath) {
    throw new Error(`Post niet gevonden: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Zonder titel",
    date: data.date ? new Date(data.date).toISOString() : "",
    excerpt: data.excerpt || content.slice(0, 160) + "...",
    coverImage: data.coverImage || null,
    category: data.category || null,
    content,
  };
}
