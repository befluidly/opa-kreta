import Layout from "./Layout";
import PageHero from "./PageHero";
import Link from "next/link";
import { Post } from "../types/post";
import { getMdxComponent } from "../lib/mdx";

import TagList from "./TagList";
import AffiliateSidebarBox from "./AffiliateSidebarBox";
import AffiliateBox from "./AffiliateBox";
import ClimateBox from "./ClimateBox";
import GreekPhrases from "./GreekPhrases";
import InfoBox from "./InfoBox";
import IntroBox from "./IntroBox";

interface RecipeLayoutProps {
  post: Post;
}

export default function RecipeLayout({ post }: RecipeLayoutProps) {
  const components = { AffiliateBox, ClimateBox, GreekPhrases, InfoBox, IntroBox };
  const MdxContent = getMdxComponent(post.slug);

  return (
    <Layout>
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

          {/* Gestructureerde receptinfo (optioneel, via CMS) — bestaande
              recepten hebben deze velden niet en tonen dit blok dus niet;
              "Bereiding" blijft in alle gevallen vrije tekst in de body. */}
          {(post.prepTime || post.cookTime || post.servings) && (
            <div className="flex flex-wrap gap-6 mb-6 text-gray-700 font-body">
              {post.prepTime && (
                <span>
                  <strong>Voorbereiding:</strong> {post.prepTime}
                </span>
              )}
              {post.cookTime && (
                <span>
                  <strong>Kooktijd:</strong> {post.cookTime}
                </span>
              )}
              {post.servings && (
                <span>
                  <strong>Porties:</strong> {post.servings}
                </span>
              )}
            </div>
          )}

          {post.ingredients && post.ingredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-title font-semibold text-darkCornflower mb-3">
                Ingrediënten
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-800 font-body">
                {post.ingredients.map((ing, index) => (
                  <li key={index}>
                    {[ing.amount, ing.unit, ing.name].filter(Boolean).join(" ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Artikelinhoud */}
          <article className="recipe-content prose prose-sky lg:prose-lg xl:prose-xl font-body leading-relaxed text-gray-800 prose-img:rounded-xl max-w-full">
            {MdxContent && <MdxContent components={components} />}
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
    </Layout>
  );
}
