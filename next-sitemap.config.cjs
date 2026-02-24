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

    return {
      loc: path.replace("/categorie/category", "/categorie"), // corrigeer hier ook
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
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
    additionalSitemaps: ["https://www.opakreta.be/sitemap-0.xml"],
  },
};