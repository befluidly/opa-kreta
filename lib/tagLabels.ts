// Tags zijn vrije tekst per artikel (Sveltia CMS `tags`-veld, widget: list),
// niet een vaste, kleine taxonomie zoals categorieën/subcategorieën (zie
// lib/categoryTaxonomy.ts). Ze staan bovendien niet op i18n: true in
// config.yml, dus een EN-vertaling schrijft geen eigen Engelse tags weg —
// scripts/generate-content-data.mjs laat elke EN-post dezelfde
// (Nederlandse) tags overnemen van haar NL-tegenhanger. Op de EN-site
// toonden #tags-pills en /en/tag/*-paginas daardoor gewoon de Nederlandse
// tekst.
//
// Omdat dit vrije tekst is (geen vaste lijst), is een handmatige
// vertaalmap de enige praktische aanpak. Deze dekt alle tags die nu in
// content/ voorkomen; een nieuwe, nog niet vertaalde tag valt terug op
// kapitaliseren (zie getTagLabelEn hieronder) — geen crash, gewoon
// (voorlopig) Nederlandse tekst tot deze lijst wordt aangevuld.
const TAG_LABELS_EN: Record<string, string> = {
  accommodaties: "Accommodations",
  accomodaties: "Accommodations",
  archeologie: "Archaeology",
  "auto huren kreta": "Renting a Car in Crete",
  "beste regio kreta": "Best Region in Crete",
  "beste tijd kreta": "Best Time in Crete",
  bezienswaardigheden: "Attractions",
  chania: "Chania",
  chersonissos: "Chersonissos",
  citytrip: "City Trip",
  comfortfood: "Comfort Food",
  cultuur: "Culture",
  excursie: "Excursion",
  film: "Film",
  gastvrijheid: "Hospitality",
  gehakt: "Ground Meat",
  geschiedenis: "History",
  griekenland: "Greece",
  "grieks eten": "Greek Food",
  "griekse keuken": "Greek Cuisine",
  "griekse tradities": "Greek Traditions",
  "griekse-artiesten": "Greek Artists",
  "griekse-muziek": "Greek Music",
  hartig: "Savory",
  "hartig gebak": "Savory Pastry",
  heraklion: "Heraklion",
  huurauto: "Rental Car",
  kerken: "Churches",
  kerst: "Christmas",
  klassiekers: "Classics",
  kloosters: "Monasteries",
  knossos: "Knossos",
  koekjes: "Cookies",
  kreta: "Crete",
  "kreta per maand": "Crete Month by Month",
  "kretenzische keuken": "Cretan Cuisine",
  "laïkó": "Laïko",
  luchthavens: "Airports",
  "melina-merkouri": "Melina Merkouri",
  mizithra: "Mizithra",
  musea: "Museums",
  muziek: "Music",
  "nana-mouskouri": "Nana Mouskouri",
  olijfolie: "Olive Oil",
  "orthodox pasen": "Orthodox Easter",
  orzo: "Orzo",
  ouzo: "Ouzo",
  oven: "Oven",
  "overnachten kreta": "Staying in Crete",
  pasen: "Easter",
  pasta: "Pasta",
  reistips: "Travel Tips",
  religie: "Religion",
  rijst: "Rice",
  roadtrip: "Road Trip",
  soep: "Soup",
  stoofgerechten: "Stews",
  stoofpot: "Stew",
  strand: "Beach",
  taverna: "Taverna",
  taverne: "Taverna",
  theodorakis: "Theodorakis",
  tips: "Tips",
  "tips kreta": "Crete Tips",
  traditie: "Tradition",
  tradities: "Traditions",
  "traditioneel gerecht": "Traditional Dish",
  "trypiti gorge": "Trypiti Gorge",
  vegetarisch: "Vegetarian",
  vertis: "Vertis",
  vervoer: "Transport",
  vleesgerechten: "Meat Dishes",
  vliegen: "Flying",
  vrijheid: "Freedom",
  "waar verblijven kreta": "Where to Stay in Crete",
  "wanneer naar kreta": "When to Go to Crete",
  "weer kreta": "Crete Weather",
  wijn: "Wine",
  winter: "Winter",
  zoet: "Sweet",
};

export function getTagLabelEn(tag: string): string {
  const key = tag.trim().toLowerCase();
  return (
    TAG_LABELS_EN[key] ?? tag.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
