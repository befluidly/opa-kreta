// Voor hreflang tussen NL/EN-artikelparen: leest de door
// scripts/generate-content-data.mjs gegenereerde platte post-lijst in (al
// aanwezig tegen de tijd dat next-sitemap draait, zie de "build"-script in
// package.json: prebuild → next build → next-sitemap). Dit is bewust GEEN
// import van lib/i18n-alternates.ts — dat is een TS/ESM-module bedoeld voor
// de Next.js-app, terwijl dit bestand als plain CJS-script draait.
let generatedPosts = [];
try {
  generatedPosts = require("./lib/content-data.generated.json");
} catch {
  // Nog niet gegenereerd (bv. bij een verse checkout zonder build) — dan
  // bevat de sitemap simpelweg geen hreflang-alternates, geen harde fout.
}

function getArticleAlternateRefs(path, siteUrl) {
  const post = generatedPosts.find((p) => p.slug === path.replace(/^\//, ""));
  if (!post) return null;

  const nlPost = generatedPosts.find(
    (p) => p.canonicalSlug === post.canonicalSlug && p.locale === "nl"
  );
  const enPost = generatedPosts.find(
    (p) => p.canonicalSlug === post.canonicalSlug && p.locale === "en"
  );

  // hrefIsAbsolute: true is vereist — anders behandelt next-sitemap deze
  // al-volledige URL alsnog als relatief en plakt het de eigen `loc` van de
  // pagina erachter (zie normalizeSitemapField in next-sitemap's
  // url-set-builder), wat een dubbel pad zoals ".../contact/contact" geeft.
  const refs = [];
  if (nlPost)
    refs.push({ href: `${siteUrl}/${nlPost.slug}`, hreflang: "nl", hrefIsAbsolute: true });
  if (enPost)
    refs.push({ href: `${siteUrl}/${enPost.slug}`, hreflang: "en", hrefIsAbsolute: true });

  // Enkel zinvol als er ook echt een vertaald paar is (niet bij een
  // eenzame NL- of EN-versie).
  return refs.length > 1 ? refs : null;
}

// Vaste NL/EN-paren voor de niet-content-pagina's (chrome) — klein genoeg
// om hier rechtstreeks te lijsten i.p.v. via content-data.generated.json.
const CHROME_ALTERNATE_PAIRS = [
  ["/", "/en"],
  ["/contact", "/en/contact"],
  ["/over", "/en/over"],
  ["/inspiratie", "/en/inspiratie"],
  ["/shop", "/en/shop"],
];

function getChromeAlternateRefs(path, siteUrl) {
  const pair = CHROME_ALTERNATE_PAIRS.find(([nl, en]) => nl === path || en === path);
  if (!pair) return null;
  const [nl, en] = pair;
  return [
    { href: `${siteUrl}${nl}`, hreflang: "nl", hrefIsAbsolute: true },
    { href: `${siteUrl}${en}`, hreflang: "en", hrefIsAbsolute: true },
  ];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 🌍 Juiste domein voor canonical links
  siteUrl: "https://www.opakreta.be",

  // 📁 Map waar de sitemap wordt opgeslagen
  outDir: "./public",

  // ✅ Automatisch detecteren van dynamische routes
  generateRobotsTxt: true,

  // 🧭 Exclude foutieve of tijdelijke routes
  exclude: [
    "/404",
    "/_error",
    "/categorie/category/*", // oude verkeerde structuur
    "/posts/*",              // oude legacy routes
    "/components/*",         // interne componentpaden

    // ✅ NIEUW: tagpagina’s uit sitemap houden
    "/tag/*",
  ],

  // 🧱 Dynamische parameters zoals [category] en [subcategory] automatisch invullen
  transform: async (config, path) => {
    // 🧹 Corrigeer foutieve canonicals
    path = path.replace("/categorie/category", "/categorie");

    // Sla interne of admin-routes over
    if (
      path.startsWith("/_next") ||
      path.startsWith("/api") ||
      path.startsWith("/components") ||
      path.startsWith("/posts") ||
      path.startsWith("/categorie/category") ||
      path.startsWith("/tag") // ✅ NIEUW: extra zekerheid
    ) {
      return null;
    }

    // 🔗 Canonical + prioriteit op basis van diepte
    const depth = path.split("/").length - 1;
    let priority = 0.7;
    if (path === "/") priority = 1.0;
    else if (depth === 2) priority = 0.8; // /categorie/gidsen
    else if (depth >= 3) priority = 0.6; // /categorie/gidsen/chania

    const alternateRefs =
      getArticleAlternateRefs(path, config.siteUrl) || getChromeAlternateRefs(path, config.siteUrl);

    return {
      loc: path.replace("/categorie/category", "/categorie"), // corrigeer hier ook
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
      ...(alternateRefs ? { alternateRefs } : {}),
    };
  },

  // 🔧 Robots.txt configuratie
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: [
          "/_next/",
          "/api/",
          "/categorie/category/",
          "/tag/", // ✅ NIEUW: tagpagina’s niet laten crawlen
        ],
      },
    ],
    additionalSitemaps: [],
  },
};