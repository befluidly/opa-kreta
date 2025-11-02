import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { getAllPosts, getPostBySlug } from "../lib/api";
import { NextSeo } from "next-seo";
import { Post } from "../types/post";
import TagList from "../components/TagList";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

// 🔹 In-article componenten
import AffiliateBox from "../components/AffiliateBox";
import ClimateBox from "../components/ClimateBox";
import GreekPhrases from "../components/GreekPhrases";
import InfoBox from "../components/InfoBox";
import IntroBox from "../components/IntroBox";

// 🔹 Zijbalk
import AffiliateSidebarBox from "../components/AffiliateSidebarBox";

// 🔹 Layout voor recepten
import RecipeLayout from "../components/RecipeLayout";

// 🔹 Nieuw: component met regio-links
import PostRegions from "../components/PostRegions";

interface PostPageProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
  relatedPosts: Post[];
}

export default function PostPage({
  post,
  mdxSource,
  relatedPosts,
}: PostPageProps) {
  if (!post) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">
            404 — Artikel niet gevonden
          </h1>
          <p>Het lijkt erop dat deze pagina niet meer bestaat.</p>
        </div>
      </Layout>
    );
  }

  // 🔹 Recepten krijgen aparte layout
  if (post.category === "recepten") {
    return <RecipeLayout post={post} mdxSource={mdxSource} />;
  }

  const canonicalUrl = `https://www.opakreta.be/${post.slug}`;

  const components = {
    AffiliateBox,
    ClimateBox,
    GreekPhrases,
    IntroBox,
    InfoBox,
  };

  return (
    <Layout>
      {/* ✅ SEO */}
      <NextSeo
        title={post.title}
        description={post.excerpt || ""}
        canonical={canonicalUrl}
        openGraph={{
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
        }}
      />

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

      {/* 🔹 Terugknop */}
      <div className="max-w-screen-xl mx-auto px-4 mt-8 flex flex-wrap gap-3">
        <Link
          href={
            post.category === "inspiratie" || post.category === "tips"
              ? "/inspiratie"
              : post.category
              ? `/categorie/${post.category}`
              : "/"
          }
          className="inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          ← Terug naar{" "}
          {{
            "opas-blog": "Opa’s Blog",
            gidsen: "Gidsen",
            praktisch: "Praktisch",
            inspiratie: "Inspiratie",
            tips: "Inspiratie",
            shop: "Shop",
          }[post.category || ""] || "Overzicht"}
        </Link>
      </div>

      {/* 🔹 Inhoud + zijbalk */}
      <div className="max-w-screen-xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 mb-20">
        {/* Artikelinhoud */}
        <div>
          <article className="prose prose-sky lg:prose-lg xl:prose-xl font-body leading-relaxed text-gray-800 prose-img:rounded-xl max-w-full">
            <MDXRemote {...mdxSource} components={components} />
          </article>

          {/* 🔹 Nieuw: regio-links */}
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

/* ✅ Static generation */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((p) => ({
    params: { slug: p.slug.split("/") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = Array.isArray(params?.slug) ? params.slug : [params?.slug];
  const slug = slugArray.join("/");

  const post = getPostBySlug(slug);
  if (!post) return { notFound: true };

  const filePathMdx = path.join(process.cwd(), "content", `${slug}.mdx`);
  const filePathMd = path.join(process.cwd(), "content", `${slug}.md`);
  const filePath = fs.existsSync(filePathMdx) ? filePathMdx : filePathMd;

  const source = fs.readFileSync(filePath, "utf8");

  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
  });

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.category === post.category &&
        p.subcategories?.some((sub) =>
          post.subcategories?.includes(sub)
        )
    )
    .slice(0, 3);

  return {
    props: { post, mdxSource, relatedPosts },
  };
};
