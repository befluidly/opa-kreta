import type { Metadata } from "next";
import Layout from "../../../../../../components/Layout";
import PageHero from "../../../../../../components/PageHero";
import SubcategoryPosts from "../../../../../../components/SubcategoryPosts";
import { getAllPosts } from "../../../../../../lib/api";
import { regionInfo } from "../../../../../../lib/regionInfo";
import { SUBCATEGORIES_BY_CATEGORY } from "../../../../../../lib/categoryTaxonomy";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

const titleMap: Record<string, string> = {
  gidsen: "Crete Travel Guides",
  "opas-blog": "Opa's Blog",
  praktisch: "Practical Tips",
  tips: "Tavernas & Recommendations",
  shop: "Shop & E-books",
};

const heroImageMap: Record<string, string> = {
  gidsen:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  "opas-blog": "https://images.pexels.com/photos/858112/pexels-photo-858112.jpeg",
  praktisch: "https://images.pexels.com/photos/27844218/pexels-photo-27844218.jpeg",
};

const heroSubMap: Record<string, string> = {
  chania: "/images/posts/olijfbomen.webp",
  heraklion: "/images/posts/messara.webp",
  rethymnon: "/images/posts/rethymno2.webp",
  lassithi: "/images/posts/voulisma.webp",
  cultuur: "/images/posts/rethymno4.webp",
  geschiedenis: "/images/posts/komos.webp",
  "eten-en-drinken": "/images/posts/rethymno1.webp",
  "natuur-en-wandelen": "/images/posts/zakros.webp",
};

export async function generateStaticParams() {
  // Vaste lijst i.p.v. afgeleid uit bestaande EN-posts — zie
  // lib/categoryTaxonomy.ts en de gelijkaardige toelichting in
  // ../page.tsx: zonder dit genereerde deze pagina nul paden zolang er
  // geen EN-vertalingen bestaan, en 404'te elke /en/categorie/*/*-URL.
  const paths: { category: string; subcategory: string }[] = [];
  for (const [category, subcategories] of Object.entries(SUBCATEGORIES_BY_CATEGORY)) {
    for (const subcategory of subcategories) {
      paths.push({ category, subcategory });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const pageTitle = titleMap[category] || category;
  const formattedSubcategory = subcategory
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const canonicalUrl = `https://www.opakreta.be/en/categorie/${category}/${subcategory}`;
  const title = `${pageTitle}: ${formattedSubcategory}`;
  const description = `All articles about ${formattedSubcategory}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: heroImageMap[category] || heroImageMap["gidsen"] }],
      siteName: "Opa Kreta",
    },
  };
}

export default async function EnglishSubCategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;

  const pageTitle = titleMap[category] || category;
  const formattedSubcategory = subcategory
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const allPosts = getAllPosts(undefined, "en");
  const posts = allPosts.filter(
    (p) => p.category === category && p.subcategories?.includes(subcategory)
  );

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero
        title={`${pageTitle}: ${formattedSubcategory}`}
        subtitle={`Discover the best of ${formattedSubcategory}`}
        imageUrl={
          heroSubMap[subcategory] || heroImageMap[category] || heroImageMap["gidsen"]
        }
      />

      {/* ✅ Titel */}
      <div className="max-w-screen-xl mx-auto px-4 mt-10 text-left">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-8">
          {formattedSubcategory}
        </h1>

        {/* ✅ Terugkeerknop */}
        <div className="mb-8">
          <a
            href={`/en/categorie/${category}`}
            className="inline-flex items-center gap-2 text-skyBlue font-medium hover:underline"
          >
            ← Back to all {category === "gidsen" ? "guides" : "articles"}
          </a>
        </div>
      </div>

      {/* ✅ Twee kolommen layout */}
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mb-20">
        {/* 🔹 Artikels links (incl. tag-filters, client-side) */}
        <main className="lg:w-2/3 w-full order-1">
          <SubcategoryPosts posts={posts} />
        </main>

        {/* 🔹 Sidebar rechts */}
        <aside className="lg:w-1/3 w-full order-2">
          <div className="bg-white rounded-lg shadow-md p-6 text-gray-700 leading-relaxed space-y-5">
            {regionInfo[subcategory] ? (
              <>
                <h3 className="text-xl font-semibold text-darkCornflower mb-3">
                  {regionInfo[subcategory].title}
                </h3>
                {regionInfo[subcategory].description.map((p, i) => (
                  <p key={i} className="mb-5">
                    {p}
                  </p>
                ))}
                <h4 className="text-base font-semibold text-skyBlue mb-2">Info</h4>
                <ul className="space-y-1 text-gray-700">
                  {regionInfo[subcategory].info.map((item, i) => (
                    <li key={i}>
                      <span className="font-medium text-darkCornflower">
                        {item.label}:
                      </span>{" "}
                      {item.value}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No additional information available for this region yet.</p>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
