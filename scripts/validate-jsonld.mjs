// Loopt na `next build` alle geprerenderde HTML-bestanden door
// (.next/server/app/**/*.html), parset elk <script type="application/ld+json">-
// blok en controleert:
//   - geldige JSON
//   - "@context" en "@type" aanwezig
//   - verplichte velden per @type (zie REQUIRED_FIELDS hieronder)
//   - alle URL-achtige velden (url/image/item/mainEntityOfPage) zijn absoluut
//     (beginnen met http(s)://)
//   - headline (Article/BlogPosting) is max. 110 tekens
//
// Faalt (exit code 1) bij de eerste harde fout hierboven. Toont daarnaast,
// ongeacht slagen/falen, een rapport per @type: aantal pagina's, en hoeveel
// daarvan een aanbevolen (niet-verplicht) veld missen.
//
// Gebruik: npm run validate:jsonld (na npm run build).

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const BUILD_DIR = path.join(process.cwd(), ".next", "server", "app");

const REQUIRED_FIELDS = {
  Recipe: ["name", "image"],
  Article: ["headline", "image", "datePublished"],
  BlogPosting: ["headline", "image", "datePublished"],
  BreadcrumbList: ["itemListElement"],
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
};

// Enkel velden die deze codebase daadwerkelijk kan vullen (zie
// lib/structuredData.ts) — dus geen aggregateRating/review/recipeInstructions/
// recipeIngredient, die worden bewust nooit gezet (zie PR-beschrijving).
const RECOMMENDED_FIELDS = {
  Recipe: [
    "description",
    "author",
    "datePublished",
    "dateModified",
    "prepTime",
    "cookTime",
    "recipeYield",
    "keywords",
  ],
  Article: ["dateModified"],
  BlogPosting: ["dateModified"],
};

// Velden die, als ze bestaan, een absolute URL moeten zijn.
const URL_FIELDS = new Set(["url", "mainEntityOfPage"]);

const MAX_HEADLINE_LENGTH = 110;

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

function extractJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = re.exec(html))) {
    blocks.push(match[1]);
  }
  return blocks;
}

function isAbsoluteUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function collectUrlStrings(value) {
  // "image" kan een string, een array van strings, of (theoretisch) een
  // ImageObject zijn — hier vlakken we alles af tot een lijst strings om te
  // controleren.
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectUrlStrings);
  if (value && typeof value === "object" && typeof value.url === "string") {
    return [value.url];
  }
  return [];
}

function validateNode(node, filePath, errors, stats) {
  const type = node["@type"];
  if (!type) {
    errors.push(`${filePath}: JSON-LD-blok zonder "@type"`);
    return;
  }

  stats[type] = stats[type] || { pages: new Set(), missingRecommended: {} };
  stats[type].pages.add(filePath);

  const required = REQUIRED_FIELDS[type];
  if (required) {
    for (const field of required) {
      if (node[field] === undefined || node[field] === null) {
        errors.push(`${filePath}: "${type}" mist verplicht veld "${field}"`);
      }
    }
  }

  const recommended = RECOMMENDED_FIELDS[type] || [];
  for (const field of recommended) {
    if (node[field] === undefined || node[field] === null) {
      stats[type].missingRecommended[field] =
        (stats[type].missingRecommended[field] || 0) + 1;
    }
  }

  if ((type === "Article" || type === "BlogPosting") && node.headline) {
    if (node.headline.length > MAX_HEADLINE_LENGTH) {
      errors.push(
        `${filePath}: "${type}" headline is ${node.headline.length} tekens (max ${MAX_HEADLINE_LENGTH}): "${node.headline}"`
      );
    }
  }

  if (node.image !== undefined) {
    for (const url of collectUrlStrings(node.image)) {
      if (!isAbsoluteUrl(url)) {
        errors.push(`${filePath}: "${type}".image is geen absolute URL: "${url}"`);
      }
    }
  }

  for (const field of URL_FIELDS) {
    if (node[field] !== undefined && !isAbsoluteUrl(node[field])) {
      errors.push(`${filePath}: "${type}".${field} is geen absolute URL: "${node[field]}"`);
    }
  }

  if (type === "BreadcrumbList" && Array.isArray(node.itemListElement)) {
    for (const item of node.itemListElement) {
      if (item.item && !isAbsoluteUrl(item.item)) {
        errors.push(
          `${filePath}: BreadcrumbList-item "${item.name}" heeft geen absolute URL: "${item.item}"`
        );
      }
    }
  }

  if (type === "Organization" && node.logo) {
    for (const url of collectUrlStrings(node.logo)) {
      if (!isAbsoluteUrl(url)) {
        errors.push(`${filePath}: Organization.logo is geen absolute URL: "${url}"`);
      }
    }
  }
}

function main() {
  let files;
  try {
    files = findHtmlFiles(BUILD_DIR);
  } catch (err) {
    console.error(
      `Kan build-output niet vinden op ${BUILD_DIR} — draai eerst "npm run build".`
    );
    console.error(err.message);
    process.exit(1);
  }

  const errors = [];
  const stats = {};
  let totalBlocks = 0;

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const relPath = path.relative(process.cwd(), file);
    const blocks = extractJsonLdBlocks(html);

    for (const raw of blocks) {
      totalBlocks++;
      let data;
      try {
        // Zelfde escape als components/JsonLd.tsx (JSON.stringify + "<" ->
        // "<") — JSON.parse begrijpt < van zichzelf al correct.
        data = JSON.parse(raw);
      } catch (err) {
        errors.push(`${relPath}: ongeldige JSON in ld+json-blok — ${err.message}`);
        continue;
      }

      if (!data["@context"]) {
        errors.push(`${relPath}: JSON-LD-blok zonder "@context"`);
      }

      const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
      for (const node of nodes) {
        validateNode(node, relPath, errors, stats);
      }
    }
  }

  console.log(`\nJSON-LD-validatie: ${files.length} HTML-pagina's doorzocht, ${totalBlocks} ld+json-blokken gevonden.\n`);

  console.log("Rapport per @type:");
  console.log("type".padEnd(16) + "pagina's".padEnd(12) + "ontbrekende aanbevolen velden");
  for (const [type, data] of Object.entries(stats)) {
    const missingSummary = Object.entries(data.missingRecommended)
      .map(([field, count]) => `${field}: ${count}`)
      .join(", ") || "-";
    console.log(type.padEnd(16) + String(data.pages.size).padEnd(12) + missingSummary);
  }
  console.log("");

  if (errors.length > 0) {
    console.error(`❌ ${errors.length} fout(en) gevonden:\n`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log("✅ Alle JSON-LD-blokken geldig.");
}

main();
