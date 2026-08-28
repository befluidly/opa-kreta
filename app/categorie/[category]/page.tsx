import type { Metadata } from "next";
import Layout from "../../../components/Layout";
import PageHero from "../../../components/PageHero";
import PostCard from "../../../components/PostCard";
import { getAllPosts } from "../../../lib/api";

interface PageProps {
  params: Promise<{ category: string }>;
}

const titleMap: Record<string, string> = {
  "opas-blog": "Opa’s Blog",
  gidsen: "Kreta Reisgidsen",
  praktisch: "Praktische informatie",
  shop: "Shop & E-books",
  recepten: "Griekse recepten",
};

const subtitleMap: Record<string, string> = {
  "opas-blog": "Verhalen en gedachten van Opa op Kreta",
  gidsen: "Ontdek de mooiste stranden, dorpen en kloven van Kreta",
  praktisch: "Handige info voor een zorgeloze reis",
  shop: "Onze digitale gidsen en partners",
  recepten: "Authentieke gerechten van Kreta en heel Griekenland",
};

const heroMap: Record<string, string> = {
  "opas-blog": "https://images.pexels.com/photos/858112/pexels-photo-858112.jpeg",
  gidsen: "https://images.pexels.com/photos/13725168/pexels-photo-13725168.jpeg",
  praktisch: "https://images.pexels.com/photos/27844218/pexels-photo-27844218.jpeg",
  shop: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  recepten: "https://images.pexels.com/photos/13054466/pexels-photo-13054466.jpeg",
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  ) as string[];
  return categories.map((c) => ({ category: c }));
}

// Komt overeen met de oude `fallback: false`: onbekende categorieën geven altijd 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const pageTitle = titleMap[category] || category;
  const pageSubtitle = subtitleMap[category] || "Artikels in deze categorie";
  const heroImage = heroMap[category] || heroMap["gidsen"];
  const canonicalUrl = `https://www.opakreta.be/categorie/${category}`;

  return {
    title: pageTitle,
    description: pageSubtitle,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageSubtitle,
      url: canonicalUrl,
      images: [{ url: heroImage }],
      siteName: "Opa Kreta",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getAllPosts().filter((p) => p.category === category);

  const pageTitle = titleMap[category] || category;
  const pageSubtitle = subtitleMap[category] || "Artikels in deze categorie";
  const heroImage = heroMap[category] || heroMap["gidsen"];

  // 🔹 Subcategorieën bepalen (rekening houdend met meerdere per post)
  const subcategories = Array.from(
    new Set(posts.flatMap((p) => p.subcategories || []).filter(Boolean))
  ).sort();

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero imageUrl={heroImage} />

      {/* ✅ Titel & introductie */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
          {pageTitle}
        </h1>

        <div className="text-gray-700 font-body leading-relaxed">
          {category === "gidsen" ? (
            <p>
              Ontdek de mooiste stranden, dorpen en kloven van Kreta. Onze
              reisgidsen brengen je op plekken die je niet in toeristische
              folders vindt.
            </p>
          ) : category === "praktisch" ? (
            <p>
              Alles wat je moet weten voor je reis naar Kreta — van autohuur tot
              geldzaken.
            </p>
          ) : category === "shop" ? (
            <p>
              Steun Opa’s Kreta met onze digitale gidsen en e-books, of boek
              via onze betrouwbare partners.
            </p>
          ) : (
            <p>{pageSubtitle}</p>
          )}
        </div>
      </div>

      {/* ✅ Voor Gidsen: toon elke subcategorie als sectie */}
      {category === "gidsen" ? (
        <>
          {/* 🔹 Filterknoppen */}
          <div className="max-w-screen-xl mx-auto px-4 mt-10 flex flex-wrap gap-3">
            {subcategories.map((sub) => {
              const label = sub
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
              return (
                <a
                  key={sub}
                  href={`#${sub}`}
                  className="px-4 py-2 bg-skyBlue text-white rounded-full text-sm font-medium hover:bg-sky-600 transition"
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* 🔹 Lijsten per subcategorie */}
          {subcategories.map((sub) => {
            const regionPosts = posts
              .filter((p) => p.subcategories?.includes(sub))
              .slice(0, 4);
            if (regionPosts.length === 0) return null;

            return (
              <section
                id={sub}
                key={sub}
                className="max-w-screen-xl mx-auto px-4 mt-12 scroll-mt-24"
              >
                {/* Titel + link */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-semibold capitalize text-darkCornflower">
                    {sub.replace(/-/g, " ")}
                  </h2>
                  <a
                    href={`/categorie/${category}/${sub}`}
                    className="text-sm text-skyBlue hover:underline"
                  >
                    Naar alle artikels →
                  </a>
                </div>

                {/* Grid met posts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regionPosts.map((p) => (
                    <PostCard
                      key={p.slug}
                      slug={p.slug}
                      title={p.title}
                      excerpt={p.excerpt}
                      coverImage={p.coverImage}
                      category={p.category}
                    />
                  ))}
                </div>

                {/* Knop onderaan */}
                <div className="mt-6 text-left">
                  <a
                    href={`/categorie/${category}/${sub}`}
                    className="inline-block bg-skyBlue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition"
                  >
                    Bekijk alle artikels over{" "}
                    {sub
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                    →
                  </a>
                </div>
              </section>
            );
          })}
        </>
      ) : (
        /* ✅ Standaard voor andere categorieën */
        <div className="max-w-screen-xl mx-auto px-4 mt-10 mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map((p) => (
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
              Geen artikels gevonden.
            </p>
          )}
        </div>
      )}
    </Layout>
  );
}
