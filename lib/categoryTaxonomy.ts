// Vaste lijst van categorieën/subcategorieën die de site kent, los van welke
// content er op een gegeven moment in bestaat. Nodig omdat generateStaticParams
// voor de EN-categoriepagina's voorheen de lijst afleidde uit reeds-bestaande
// EN-posts — zolang er nog geen enkel EN-artikel is, gaf dat een lege lijst,
// waardoor elke /en/categorie/*-URL 404'te i.p.v. de al-geschreven "nog geen
// artikelen"-melding te tonen. Deze vaste lijst komt overeen met de bestaande,
// werkende NL-categoriepagina's (afgeleid uit de daadwerkelijke content) en
// met de submap-structuur van de Sveltia CMS-collecties.
export const CATEGORIES = [
  "gidsen",
  "praktisch",
  "opas-blog",
  "recepten",
  "inspiratie",
] as const;

export const SUBCATEGORIES_BY_CATEGORY: Record<string, readonly string[]> = {
  gidsen: [
    "chania",
    "heraklion",
    "rethymnon",
    "lassithi",
    "cultuur",
    "geschiedenis",
    "eten-en-drinken",
    "natuur-en-wandelen",
  ],
  "opas-blog": ["feestdagen-en-tradities", "het-leven-op-kreta", "verhalen-van-onderweg"],
  inspiratie: ["muziek"],
};
