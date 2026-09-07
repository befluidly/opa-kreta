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

// Subcategorie-slugs zijn de Nederlandse waarden uit SUBCATEGORIES_BY_CATEGORY
// hierboven (dat is ook de waarde die in de content-frontmatter en de
// Sveltia-CMS-selectvelden staat). Op de EN-paginas kapitaliseerden we
// voorheen enkel de ruwe slug (bv. "eten-en-drinken" -> "Eten En Drinken"),
// wat voor plaatsnamen toevallig klopt maar voor de rest gewoon Nederlands
// bleef. Deze map geeft de echte Engelse labels; plaatsnamen (die in beide
// talen hetzelfde zijn) hoeven er niet expliciet in te staan — de fallback
// in getSubcategoryLabelEn() kapitaliseert die net zo correct.
const SUBCATEGORY_LABELS_EN: Record<string, string> = {
  cultuur: "Culture",
  geschiedenis: "History",
  "eten-en-drinken": "Food & Drink",
  "natuur-en-wandelen": "Nature & Hiking",
  "feestdagen-en-tradities": "Holidays & Traditions",
  "het-leven-op-kreta": "Life on Crete",
  "verhalen-van-onderweg": "Travel Stories",
  muziek: "Music",
};

export function getSubcategoryLabelEn(subcategory: string): string {
  return (
    SUBCATEGORY_LABELS_EN[subcategory] ??
    subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
