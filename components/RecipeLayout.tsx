import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Layout from "./Layout";
import PageHero from "./PageHero";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Post } from "../types/post";

import TagList from "./TagList";
import AffiliateSidebarBox from "./AffiliateSidebarBox";
import AffiliateBox from "./AffiliateBox";
import ClimateBox from "./ClimateBox";
import GreekPhrases from "./GreekPhrases";
import InfoBox from "./InfoBox";
import IntroBox from "./IntroBox";

interface RecipeLayoutProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

export default function RecipeLayout({ post, mdxSource }: RecipeLayoutProps) {
  const canonicalUrl = `https://www.opakreta.be/${post.slug}`;
  const components = { AffiliateBox, ClimateBox, GreekPhrases, InfoBox, IntroBox };

  return (
    <Layout>
      {/* SEO */}
      <NextSeo
        title={`${post.title} | Griekse Recepten`}
        description={post.intro || post.excerpt?.slice(0, 160)} // ✅ nieuw veld + fallback
        canonical={canonicalUrl}
        openGraph={{
          title: post.title,
          description: post.intro || post.excerpt?.slice(0, 160),
          url: canonicalUrl,
          images: post.coverImage ? [{ url: post.coverImage }] : [],
          siteName: "Opa Kreta",
        }}
      />


      {/* Hero */}
      <PageHero
        imageUrl={
          post.coverImage ||
          "https://images.unsplash.com/photo-1603133872878-684f46a95f2c?q=80&w=1600&auto=format&fit=crop"
        }
      />

      {/* Terugknop */}
      <div className="max-w-screen-xl mx-auto px-4 mt-8 flex flex-wrap gap-3">
        <Link
          href="/categorie/recepten"
          className="inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          ← Terug naar Recepten
        </Link>
      </div>

      {/* 🔹 HOOFDGRID: Titel + inhoud links / Tags + affiliate rechts */}
      <div className="max-w-screen-xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-10 mb-20">
        {/* 🔸 LINKERKOLOM */}
        <div>
          {/* Titel en excerpt */}
          <h1 className="text-5xl font-title font-semibold text-black mb-4 leading-tight max-w-none">
            {post.title}
          </h1>

          {post.intro && (
            <p className="text-gray-700 font-body italic leading-relaxed mb-6 max-w-none">
              {post.intro}
            </p>
          )}

          {/* Artikelinhoud */}
          <article className="recipe-content prose prose-sky lg:prose-lg xl:prose-xl font-body leading-relaxed text-gray-800 prose-img:rounded-xl max-w-full">
            <MDXRemote {...mdxSource} components={components} />
          </article>
        </div>

        {/* 🔸 RECHTERKOLOM */}
        <aside className="md:pl-4 self-start">
          {/* Tags */}
          <div className="mb-4">
            <TagList tags={post.tags} />
          </div>

          {/* Affiliate-boxen */}
          {post.affiliates && post.affiliates.length > 0 ? (
            <div className="space-y-6">
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

      {/* 🔹 Stijlen */}
      <style jsx global>{`
        .recipe-content h2 {
          font-size: 1.5rem;
          margin-top: 1.25rem; /* kleiner */
          margin-bottom: 1rem;
        }
        .recipe-content h2:first-of-type {
          margin-top: 0.75rem; /* eerste kop extra dicht bij excerpt */
        }
        .recipe-content h3 {
          font-size: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .recipe-content ul {
          line-height: 1.3;
          font-size: 1rem;
        }
        .recipe-content li {
          margin-bottom: 0.35rem;
          font-size: 1rem;
          line-height: 1.5;
        }
      `}</style>
    </Layout>
  );
}
