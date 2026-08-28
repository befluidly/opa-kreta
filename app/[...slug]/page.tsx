import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import TagList from "../../components/TagList";

// 🔹 In-article componenten
import AffiliateBox from "../../components/AffiliateBox";
import ClimateBox from "../../components/ClimateBox";
import GreekPhrases from "../../components/GreekPhrases";
import InfoBox from "../../components/InfoBox";
import IntroBox from "../../components/IntroBox";

// 🔹 Zijbalk
import AffiliateSidebarBox from "../../components/AffiliateSidebarBox";

// 🔹 Layout voor recepten
import RecipeLayout from "../../components/RecipeLayout";

// 🔹 Component met regio-links
import PostRegions from "../../components/PostRegions";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const categoryLabels: Record<string, string> = {
  "opas-blog": "Opa’s Blog",
  gidsen: "Gidsen",
  praktisch: "Praktisch",
  inspiratie: "Inspiratie",
  tips: "Inspiratie",
  shop: "Shop",
  recepten: "Recepten",
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug.split("/") }));
}

// Komt overeen met de oude `fallback: false`: onbekende paden geven altijd 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonicalUrl = `https://www.opakreta.be/${post.slug}`;

  if (post.category === "recepten") {
    const title = `${post.title} | Griekse Recepten`;
    const description = post.intro || post.excerpt?.slice(0, 160) || "";
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: post.title,
        description,
        url: canonicalUrl,
        siteName: "Opa Kreta",
        images: post.coverImage ? [{ url: post.coverImage }] : [],
      },
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage
        ? [{ url: post.coverImage }]
        : [
            {
              url: "https://opakreta.be/images/hero/kreta-sea.jpg",
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      siteName: "Opa Kreta",
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // 🔹 Recepten krijgen aparte layout
  if (post.category === "recepten") {
    return <RecipeLayout post={post} source={post.content} />;
  }

  const components = {
    AffiliateBox,
    ClimateBox,
    GreekPhrases,
    IntroBox,
    InfoBox,
  };

  const fallbackHref =
    post.category === "inspiratie" || post.category === "tips"
      ? "/inspiratie"
      : post.category
      ? `/categorie/${post.category}`
      : "/";

  const categoryLabel = categoryLabels[post.category || ""] || "Overzicht";

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.category === post.category &&
        p.subcategories?.some((sub) => post.subcategories?.includes(sub))
    )
    .slice(0, 3);

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero
        title={post.title}
        subtitle={post.category || "Kreta"}
        imageUrl={
          post.heroImage ||
          post.coverImage ||
          "https://images.unsplash.com/photo-1584956861644-c860bb6a6a81?q=80&w=1600&auto=format&fit=crop"
        }
      />

      {/* 🔹 Terugknoppen */}
      <div className="max-w-screen-xl mx-auto px-4 mt-8 flex flex-wrap gap-3">
        <BackButton fallbackHref={fallbackHref} />

        <Link
          href={fallbackHref}
          className="inline-block bg-white border border-skyBlue text-skyBlue font-semibold py-3 px-6 rounded-lg transition hover:bg-skyBlue/10"
        >
          Naar {categoryLabel}
        </Link>
      </div>

      {/* 🔹 Inhoud + zijbalk */}
      <div className="max-w-screen-xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 mb-20">
        {/* Artikelinhoud */}
        <div>
          <article
            className="
              prose prose-sky lg:prose-lg xl:prose-xl
              font-body leading-relaxed text-gray-800
              prose-img:rounded-xl max-w-full

              prose-table:w-full
              prose-table:border-collapse
              prose-table:my-8

              prose-th:bg-skyBlue/10
              prose-th:text-darkCornflower
              prose-th:font-semibold
              prose-th:p-3
              prose-th:border
              prose-th:border-gray-200

              prose-td:p-3
              prose-td:border
              prose-td:border-gray-200

              prose-tr:align-top
            "
          >
            <MDXRemote
              source={post.content}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {/* 🔹 Regio-links */}
          <PostRegions post={post} />

          {/* 🔹 Gerelateerde posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-10">
              <h3 className="text-2xl font-semibold text-darkCornflower mb-6">
                Meer uit deze categorie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/${rp.slug}`} className="block">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                      {rp.coverImage && (
                        <img
                          src={rp.coverImage}
                          alt={rp.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-darkCornflower mb-2">
                          {rp.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 🔹 Zijbalk */}
        <aside className="md:pl-4">
          <TagList tags={post.tags} />

          {/* 🔹 Dynamische affiliateboxen */}
          {post.affiliates && post.affiliates.length > 0 ? (
            <div className="space-y-6 mt-6">
              {post.affiliates.map((a, index) => (
                <AffiliateSidebarBox
                  key={index}
                  title={a.title}
                  text={a.text}
                  link={a.link}
                  button={a.button}
                  image={a.image}
                />
              ))}
            </div>
          ) : (
            <AffiliateSidebarBox />
          )}
        </aside>
      </div>
    </Layout>
  );
}
