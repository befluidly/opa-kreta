import { Post } from "../types/post";
import { absoluteUrl } from "./site";
import { getSubcategoryLabelEn } from "./categoryTaxonomy";

const SITE_NAME = "Opa! Kreta";
// public/images/logo/Opa_logo-blauw.png is het logo dat ook echt in de
// Navbar wordt getoond (components/Navbar.tsx) — zie de PR-beschrijving
// voor waarom net dit bestand (i.p.v. één van de andere logo-varianten
// in diezelfde map) gekozen is.
const LOGO_PATH = "/images/logo/Opa_logo-blauw.png";

// STAP 0-bevinding: de /over-pagina noemt expliciet "Lynn" als de persoon
// achter de site ("ik ben Lynn — de persoon achter deze blog"), geen
// achternaam. Dat is een duidelijke naam, dus author = Person "Lynn" i.p.v.
// de Organization-fallback — zie de PR-beschrijving.
const AUTHOR_NAME = "Lynn";

type Locale = "nl" | "en";

// --- WebSite + Organization (enkel homepage NL/EN) --------------------

export function buildHomeJsonLd(locale: Locale) {
  const homeUrl = locale === "en" ? absoluteUrl("/en") : absoluteUrl("/");

  const organization = {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${homeUrl}#website`,
    name: SITE_NAME,
    url: homeUrl,
    inLanguage: locale,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, organization],
  };
}

// --- BreadcrumbList -----------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

// Categorie-titels zoals ze echt als H1 op /categorie/{category} staan (zie
// titleMap in app/(nl|en)/categorie/[category]/page.tsx). Bewust hier
// gedupliceerd i.p.v. geïmporteerd, want die bestanden exporteren hun map
// niet — zelfde patroon als de bestaande categoryLabels/titleMap-duplicatie
// die al op meerdere plekken in deze codebase voorkomt. Bij wijziging van
// de titleMap daar, deze twee maps meenemen.
const CATEGORY_TITLE_NL: Record<string, string> = {
  "opas-blog": "Opa’s Blog",
  gidsen: "Kreta Reisgidsen",
  praktisch: "Praktische informatie",
  recepten: "Griekse recepten",
};
const CATEGORY_TITLE_EN: Record<string, string> = {
  "opas-blog": "Opa's Blog",
  gidsen: "Crete Travel Guides",
  praktisch: "Practical Information",
  recepten: "Greek Recipes",
};

// "inspiratie"-artikelen (tips/muziek) linken in de zichtbare navigatie
// (BackButton, fallbackHref in [...slug]/page.tsx) niet naar
// /categorie/inspiratie maar naar de losse /inspiratie-pagina — de
// breadcrumb volgt dezelfde, daadwerkelijk zichtbare hiërarchie. Titel komt
// uit messages/nl.json en messages/en.json ("inspiratie.heading").
const INSPIRATIE_CRUMB: Record<Locale, BreadcrumbItem> = {
  nl: { name: "Inspiratie uit Griekenland", url: "/inspiratie" },
  en: { name: "Inspiration from Greece", url: "/en/inspiratie" },
};

function formatSubcategoryNl(subcategory: string): string {
  return subcategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Bouwt de breadcrumb-hiërarchie voor een artikelpagina: Home > Categorie
// [> Subcategorie] > Artikel. Het subcategorie-niveau wordt enkel
// toegevoegd wanneer een artikel EXACT 1 subcategorie heeft — bij 0 (geen
// duidelijk niveau) of >1 (bv. Knossos: heraklion + geschiedenis, geen van
// beide is "de" subcategorie) zou een gekozen subcategorie een verzonnen,
// niet-eenduidig pad zijn. Zie PR-beschrijving.
export function buildBreadcrumbItemsForPost(post: Post): BreadcrumbItem[] {
  const locale = post.locale;
  const hrefPrefix = locale === "en" ? "/en" : "";
  const items: BreadcrumbItem[] = [
    { name: "Home", url: locale === "en" ? "/en" : "/" },
  ];

  if (post.category === "inspiratie") {
    items.push(INSPIRATIE_CRUMB[locale]);
  } else if (post.category) {
    const categoryTitle =
      (locale === "en" ? CATEGORY_TITLE_EN : CATEGORY_TITLE_NL)[post.category] ??
      post.category;
    items.push({
      name: categoryTitle,
      url: `${hrefPrefix}/categorie/${post.category}`,
    });

    if (post.subcategories && post.subcategories.length === 1) {
      const sub = post.subcategories[0];
      items.push({
        name: locale === "en" ? getSubcategoryLabelEn(sub) : formatSubcategoryNl(sub),
        url: `${hrefPrefix}/categorie/${post.category}/${sub}`,
      });
    }
  }

  items.push({ name: post.title, url: `/${post.slug}` });

  return items;
}

export function buildCategoryBreadcrumbItems(
  category: string,
  categoryTitle: string,
  locale: Locale
): BreadcrumbItem[] {
  const hrefPrefix = locale === "en" ? "/en" : "";
  return [
    { name: "Home", url: locale === "en" ? "/en" : "/" },
    { name: categoryTitle, url: `${hrefPrefix}/categorie/${category}` },
  ];
}

export function buildSubcategoryBreadcrumbItems(
  category: string,
  categoryTitle: string,
  subcategory: string,
  subcategoryTitle: string,
  locale: Locale
): BreadcrumbItem[] {
  const hrefPrefix = locale === "en" ? "/en" : "";
  return [
    { name: "Home", url: locale === "en" ? "/en" : "/" },
    { name: categoryTitle, url: `${hrefPrefix}/categorie/${category}` },
    {
      name: subcategoryTitle,
      url: `${hrefPrefix}/categorie/${category}/${subcategory}`,
    },
  ];
}

// --- Recipe ---------------------------------------------------------------

// STAP 0-bevinding: alle 10 bestaande recepten hebben ingredients: [],
// prepTime: '' en cookTime: '' (lege CMS-velden) — ingrediënten en
// bereidingsstappen staan uitsluitend als vrije MDX-tekst in de body
// ("## Ingrediënten" / "## Bereiding"). Die body is niet betrouwbaar te
// parsen: stap-nummering is inconsistent (melomakarona.mdx hergebruikt "2."
// drie keer), en sommige recepten splitsen ingrediënten/stappen op met
// vetgedrukte subkopjes (bv. spanakopita.mdx: "**_Taartvorm_**" binnen
// "## Bereiding"). Om nooit een fout of onvolledig recipeIngredient/
// recipeInstructions-veld te tonen, worden beide bewust weggelaten — zie
// PR-beschrijving. Zodra een recept de gestructureerde `ingredients`-lijst
// écht invult, kan recipeIngredient hier alsnog toegevoegd worden.
export function buildRecipeJsonLd(post: Post) {
  const image = post.coverImage;
  if (!image) return null; // "image" is verplicht — nooit een stockfoto verzinnen.

  const locale = post.locale;
  const canonicalUrl = absoluteUrl(`/${post.slug}`);

  const recipe: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: post.title,
    image: [absoluteUrl(image)],
    inLanguage: locale,
    mainEntityOfPage: canonicalUrl,
    recipeCuisine: locale === "en" ? "Greek" : "Grieks",
  };

  if (post.excerpt) recipe.description = post.excerpt;
  if (post.date) recipe.datePublished = post.date;
  recipe.author = { "@type": "Person", name: AUTHOR_NAME };
  if (post.prepTime) recipe.prepTime = post.prepTime;
  if (post.cookTime) recipe.cookTime = post.cookTime;
  if (post.servings) recipe.recipeYield = String(post.servings);
  if (post.tags && post.tags.length > 0) recipe.keywords = post.tags.join(", ");

  return recipe;
}

// --- Article / BlogPosting -------------------------------------------------

const MAX_HEADLINE_LENGTH = 110;

export function buildArticleJsonLd(
  post: Post,
  type: "Article" | "BlogPosting"
) {
  const image = post.heroImage || post.coverImage;
  if (!image) return null; // "image" is verplicht — nooit een stockfoto verzinnen.
  if (!post.date) return null; // "datePublished" is verplicht.

  const canonicalUrl = absoluteUrl(`/${post.slug}`);
  const headline =
    post.title.length > MAX_HEADLINE_LENGTH
      ? post.title.slice(0, MAX_HEADLINE_LENGTH)
      : post.title;

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    image: [absoluteUrl(image)],
    datePublished: post.date,
    inLanguage: post.locale,
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Person", name: AUTHOR_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_PATH) },
    },
  };

  // Geen dateModified-veld bestaat vandaag in de frontmatter (zie Deel 2,
  // audit-punt j) — nooit terugvallen op de build-timestamp, dus dit veld
  // blijft weg totdat dat veld er echt is.

  return article;
}
