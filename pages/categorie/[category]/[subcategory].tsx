import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Layout from "../../../components/Layout";
import PageHero from "../../../components/PageHero";
import PostCard from "../../../components/PostCard";
import { getAllPosts } from "../../../lib/api";
import { NextSeo } from "next-seo";
import { Post } from "../../../types/post";
import { regionInfo } from "../../../lib/regionInfo";

interface SubCategoryPageProps {
  category: string;
  subcategory: string;
  posts: Post[];
}

export default function SubCategoryPage({
  category,
  subcategory,
  posts,
}: SubCategoryPageProps) {
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
    "opas-blog":
      "https://images.pexels.com/photos/858112/pexels-photo-858112.jpeg",
    praktisch:
      "https://images.pexels.com/photos/27844218/pexels-photo-27844218.jpeg",
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

  const pageTitle = titleMap[category] || category;
  const formattedSubcategory = subcategory
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const [selectedTag, setSelectedTag] = useState<string>("");

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  ).sort();

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts;

  return (
    <Layout>
      {/* ✅ SEO */}
      <NextSeo
        title={`${pageTitle}: ${formattedSubcategory}`}
        description={`Alle artikels binnen ${formattedSubcategory}`}
        canonical={`https://www.opakreta.be/categorie/${category}/${subcategory}`}
        openGraph={{
          title: `${pageTitle}: ${formattedSubcategory}`,
          description: `Alle artikels binnen ${formattedSubcategory}`,
          url: `https://www.opakreta.be/categorie/${category}/${subcategory}`,
          images: [{ url: heroImageMap[category] || heroImageMap["gidsen"] }],
          siteName: "Opa Kreta",
        }}
      />

      {/* ✅ Hero */}
      <PageHero
        title={`${pageTitle}: ${formattedSubcategory}`}
        subtitle={`Ontdek de mooiste plekken van ${formattedSubcategory}`}
        imageUrl={
          heroSubMap[subcategory] ||
          heroImageMap[category] ||
          heroImageMap["gidsen"]
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

      {/* ✅ Tag-filters */}
      {allTags.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 mb-10 flex flex-wrap gap-3 justify-start">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag(selectedTag === tag ? "" : tag)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTag === tag
                  ? "bg-skyBlue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag("")}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              Alles tonen ✕
            </button>
          )}
        </div>
      )}

      {/* ✅ Twee kolommen layout */}
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mb-20">
        {/* 🔹 Artikels links */}
        <main className="lg:w-2/3 w-full order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((p) => (
                <PostCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  coverImage={p.coverImage}
                  category={p.category}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-full">
                Geen artikels gevonden in deze subcategorie.
              </p>
            )}
          </div>
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

/* ✅ Static paths + props */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  const paths: { params: { category: string; subcategory: string } }[] = [];

  for (const p of posts) {
    if (p.category && Array.isArray(p.subcategories)) {
      for (const sub of p.subcategories) {
        paths.push({ params: { category: p.category, subcategory: sub } });
      }
    }
  }

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = String(params?.category);
  const subcategory = String(params?.subcategory);

  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (p) => p.category === category && p.subcategories?.includes(subcategory)
  );

  return { props: { category, subcategory, posts } };
};
