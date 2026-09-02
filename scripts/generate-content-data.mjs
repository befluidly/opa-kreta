// Leest alle content/**/*.md(x)-bestanden in en zet ze om in build-time
// gegenereerde bestanden die lib/api.ts en de MDX-pagina's gewoon kunnen
// `import`-en. Draait automatisch vóór `next dev` en `next build` (zie de
// predev/prebuild-scripts in package.json).
//
// Waarom dit nodig is (twee losse Cloudflare Workers-beperkingen):
//
// 1. Geen bestandssysteem op runtime — lib/api.ts las content vroeger in via
//    fs.readFileSync/readdirSync. Dat werkt op een normale Node-server, maar
//    Cloudflare Workers hebben geen doorlopend filesystem: die calls vinden
//    daar niets en falen stil (console.warn, geen throw), waardoor elke
//    artikel- en categoriepagina in productie 404 gaf.
//    => Post-metadata + ruwe MDX-body worden hier al ingelezen tot JSON
//       (content-data.generated.json), zodat lib/api.ts dat gewoon als data
//       kan importeren.
//
// 2. Geen eval() op runtime — next-mdx-remote compileert MDX-content pas op
//    het moment van renderen, en voert die gecompileerde code dan uit via
//    `new Function(...)`. Cloudflare Workers verbieden dynamische code-
//    generatie (eval/new Function) volledig, wat op de gedeployde site een
//    harde 500 gaf op elke post- en receptenpagina ("EvalError: Code
//    generation from strings disallowed for this context").
//    => Elke MDX-body wordt hier al bij de build gecompileerd tot een
//       gewone, statisch te bundelen JS-module (@mdx-js/mdx met
//       outputFormat "program", dezelfde aanpak als @next/mdx zelf
//       gebruikt) i.p.v. pas op runtime. lib/generated-content/index.js
//       importeert al die modules statisch en app/[...slug]/page.tsx en
//       components/RecipeLayout.tsx renderen ze rechtstreeks — geen eval
//       meer nodig.
//
// Imports/exports die in de MDX-bron zelf staan (zoals
// `import InfoBox from "../../components/InfoBox"`) worden verwijderd vóór
// het compileren, exact zoals next-mdx-remote dat altijd al deed (zie
// removeImportsExportsPlugin in dat pakket) — dit hield sowieso al nooit
// meer in dan dode regels, componenten worden uitsluitend via de
// `components`-prop meegegeven.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");
const dataOutputPath = path.join(process.cwd(), "lib", "content-data.generated.json");
const generatedContentDir = path.join(process.cwd(), "lib", "generated-content");

function safeString(value) {
  return typeof value === "string" ? value : "";
}

// Meertaligheid (Sveltia CMS i18n.structure: multiple_folders, zie
// public/admin/config.yml): de standaardtaal (nl) staat via
// omit_default_locale_from_file_path NOOIT als los padsegment in content/ —
// enkel Engelse bestanden krijgen een "en"-segment, ergens ná de
// collectie-folder (die per collectie een andere diepte kan hebben, bv.
// "tips/muziek" is zelf al 2 niveaus diep). Omdat geen enkele bestaande
// categorie-, subcategorie- of bestandsnaam ooit letterlijk "en" heet, is
// een simpele, diepte-onafhankelijke regel voldoende: het eerste losse
// "en"-padsegment (waar dan ook) markeert de Engelse versie; alles zonder
// zo'n segment is Nederlands. `canonicalSlug` is het pad zonder dat
// locale-segment — dezelfde waarde voor de nl- en de en-versie van eenzelfde
// artikel, en dus de sleutel om vertaalde tegenhangers aan elkaar te koppelen.
function splitLocale(relativeSlug) {
  const parts = relativeSlug.split("/");
  const localeIndex = parts.indexOf("en");

  if (localeIndex === -1) {
    return { locale: "nl", canonicalSlug: relativeSlug };
  }

  const canonicalSlug = [...parts.slice(0, localeIndex), ...parts.slice(localeIndex + 1)].join(
    "/"
  );
  return { locale: "en", canonicalSlug };
}

function getAllContentFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries.flatMap((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? getAllContentFiles(res) : res;
  });

  return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function buildPost(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const relativePath = path.relative(contentDirectory, filePath);
  const rawSlug = relativePath.replace(/\\/g, "/").replace(/\.mdx?$/, "");
  const { locale, canonicalSlug } = splitLocale(rawSlug);
  // Route-slug: ongewijzigd voor nl (blijft exact het bestaande pad — geen
  // van de 48 bestaande NL-URL's verandert), en/-geprefixt voor en.
  const slug = locale === "nl" ? canonicalSlug : `en/${canonicalSlug}`;

  return {
    slug,
    ...data,
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
    locale,
    canonicalSlug,
    // Optionele, gestructureerde receptvelden (CMS) — gewoon doorgegeven
    // zoals ze zijn, geen normalisatie nodig zoals bij subcategories.
    prepTime: safeString(data.prepTime) || undefined,
    cookTime: safeString(data.cookTime) || undefined,
    servings: typeof data.servings === "number" ? data.servings : undefined,
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : undefined,
  };
}

// Verwijdert top-level import/export-statements uit de MDX-AST, net zoals
// next-mdx-remote's removeImportsExportsPlugin (unist-util-remove op
// 'mdxjsEsm'-nodes) — puur zodat een los `import X from "..."`-regeltje in
// de content niet als een echte (nu wél opgeloste) module-import belandt in
// de gecompileerde output.
function remarkStripImportsExports() {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== "mdxjsEsm");
  };
}

async function compileMdxToModule(rawMdxBody) {
  const compiled = await compile(rawMdxBody, {
    outputFormat: "program",
    remarkPlugins: [remarkStripImportsExports, remarkGfm],
    development: false,
  });
  return String(compiled);
}

async function main() {
  if (!fs.existsSync(contentDirectory)) {
    console.warn(`⚠️ Map ${contentDirectory} bestaat niet.`);
    fs.writeFileSync(dataOutputPath, "[]\n");
    fs.rmSync(generatedContentDir, { recursive: true, force: true });
    fs.mkdirSync(generatedContentDir, { recursive: true });
    fs.writeFileSync(
      path.join(generatedContentDir, "index.js"),
      "export const mdxComponents = {};\n"
    );
    return;
  }

  const filePaths = getAllContentFiles(contentDirectory);
  const posts = filePaths.map(buildPost);

  fs.writeFileSync(dataOutputPath, JSON.stringify(posts, null, 2) + "\n");

  fs.rmSync(generatedContentDir, { recursive: true, force: true });
  fs.mkdirSync(generatedContentDir, { recursive: true });

  const indexImports = [];
  const indexEntries = [];

  for (const [i, post] of posts.entries()) {
    const moduleSource = await compileMdxToModule(post.content);
    const outFile = path.join(generatedContentDir, `${post.slug}.mdx.js`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, moduleSource);

    const importName = `post_${i}`;
    const importPath = `./${post.slug}.mdx.js`.split(path.sep).join("/");
    indexImports.push(`import * as ${importName} from ${JSON.stringify(importPath)};`);
    indexEntries.push(`  ${JSON.stringify(post.slug)}: ${importName}.default,`);
  }

  const indexSource =
    indexImports.join("\n") +
    "\n\nexport const mdxComponents = {\n" +
    indexEntries.join("\n") +
    "\n};\n";

  fs.writeFileSync(path.join(generatedContentDir, "index.js"), indexSource);

  console.log(
    `✅ ${posts.length} content-bestanden ingelezen en gecompileerd naar lib/generated-content/`
  );
}

main();
