import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import SubcategoryPosts from "../../../../components/SubcategoryPosts";
import { getAllPosts } from "../../../../lib/api";
import { regionInfo } from "../../../../lib/regionInfo";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

const titleMap: Record<string, string> = {
  gidsen: "Kreta Reisgidsen",
  "opas-blog": "Opa’s Blog",
  praktisch: "Praktische Tips",
  tips: "Tavernas & Aanraders",
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
  const posts = getAllPosts();
  const paths: { category: string; subcategory: string }[] = [];

  for (const p of posts) {
    if (p.category && Array.isArray(p.subcategories)) {
      for (const sub of p.subcategories) {
        paths.push({ category: p.category, subcategory: sub });
      }
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
  const canonicalUrl = `https://www.opakreta.be/categorie/${category}/${subcategory}`;
  const title = `${pageTitle}: ${formattedSubcategory}`;
  const description = `Alle artikels binnen ${formattedSubcategory}`;

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

export default async function SubCategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;

  const pageTitle = titleMap[category] || category;
  const formattedSubcategory = subcategory
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (p) => p.category === category && p.subcategories?.includes(subcategory)
  );

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero
        title={`${pageTitle}: ${formattedSubcategory}`}
        subtitle={`Ontdek de mooiste plekken van ${formattedSubcategory}`}
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
            href={`/categorie/${category}`}
            className="inline-flex items-center gap-2 text-skyBlue font-medium hover:underline"
          >
            ← Keer terug naar alle{" "}
            {category === "gidsen" ? "reisgidsen" : "artikels"}
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
              <p>Geen extra informatie beschikbaar voor deze regio.</p>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
