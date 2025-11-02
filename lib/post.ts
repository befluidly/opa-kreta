import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../types/post";

// Alle hoofd- en submappen waar content in zit
const contentRoot = path.join(process.cwd(), "content");

// 🔁 Recursieve helper: loopt door alle submappen
function getMarkdownFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFilesRecursively(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      return [fullPath];
    } else {
      return [];
    }
  });
  return files;
}

// 📦 Alle posts ophalen
export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentRoot)) {
    console.warn(`⚠️  Map ${contentRoot} bestaat niet.`);
    return [];
  }

  const allFiles = getMarkdownFilesRecursively(contentRoot);

  const posts = allFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const relativePath = path.relative(contentRoot, filePath);
    const slug = relativePath.replace(/\.md$/, ""); // zonder .md

    return { ...data, slug } as Post;
  });

  return posts;
}

// 📄 Eén post ophalen op basis van slug
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(contentRoot, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug, content } as Post;
}
