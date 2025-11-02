import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { Marked } from "marked";

/**
 * Markdown (voor .md bestanden)
 */
const renderer = {
  heading(text: string, level: number) {
    return `<h${level}>${text}</h${level}>`;
  },
};

const marked = new Marked({ renderer });

/**
 * Converteert een .md of .mdx-bestand naar content en frontmatter
 */
export async function parseMarkdownFile(filePath: string) {
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const ext = path.extname(filePath);

  let html = "";

  if (ext === ".mdx") {
    // ✅ Compileer MDX-bestand naar JS (voor runtime rendering)
    const compiled = await compile(content, { outputFormat: "function-body" });
    html = String(compiled);
  } else {
    // ✅ Gewone Markdown → HTML
    const parsed = await marked.parse(content);
    html = typeof parsed === "string" ? parsed : "";
  }

  return {
    frontmatter: data,
    content: html,
  };
}
