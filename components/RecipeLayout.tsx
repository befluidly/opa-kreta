import Layout from "./Layout";
import PageHero from "./PageHero";
import Link from "next/link";
import { Post } from "../types/post";
import { getMdxComponent } from "../lib/mdx";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticleAlternates } from "../lib/i18n-alternates";

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

export default async function RecipeLayout({ post }: RecipeLayoutProps) {
  // RecipeLayout wordt door zowel de NL- als de EN-routeboom rechtstreeks
  // geïmporteerd (geen aparte kopie per taal, zoals de meeste pagina's) —
  // de locale komt daarom uit post.locale in plaats van uit een prop.
  const locale = post.locale;
  setRequestLocale(locale);
  const hrefPrefix = locale === "en" ? "/en" : "";

  const recepten = await getTranslations({ locale, namespace: "recepten" });
  const common = await getTranslations({ locale, namespace: "common" });
  const climateT = await getTranslations({ locale, namespace: "climateBox" });
  const greekT = await getTranslations({ locale, namespace: "greekPhrases" });
  const introT = await getTranslations({ locale, namespace: "introBox" });
  const alternates = getArticleAlternates(post.canonicalSlug);

  // Zelfde aanpak als app/(en)/en/[...slug]/page.tsx: componenten die ook
  // ingebed kunnen worden in de MDX-body krijgen hier vast-gebonden,
  // locale-passende props mee i.p.v. de Nederlandse standaardwaarden.
  const components = {
    AffiliateBox: (props: React.ComponentProps<typeof AffiliateBox>) => (
      <AffiliateBox label={common("affiliateBoxDefaultLabel")} {...props} />
    ),
    ClimateBox: (props: React.ComponentProps<typeof ClimateBox>) => (
      <ClimateBox
        mapAlt={climateT("mapAlt")}
        heading={climateT("heading")}
        paragraph={climateT("paragraph")}
        legendCold={climateT("legendCold")}
        legendMild={climateT("legendMild")}
        legendWarm={climateT("legendWarm")}
        legendHot={climateT("legendHot")}
        {...props}
      />
    ),
    GreekPhrases: (props: React.ComponentProps<typeof GreekPhrases>) => (
      <GreekPhrases
        helloLabel={greekT("hello")}
        thanksLabel={greekT("thanks")}
        pleaseLabel={greekT("please")}
        excuseLabel={greekT("excuse")}
        {...props}
      />
    ),
    InfoBox: (props: React.ComponentProps<typeof InfoBox>) => (
      <InfoBox title={common("infoBoxDefaultTitle")} {...props} />
    ),
    IntroBox: (props: React.ComponentProps<typeof IntroBox>) => (
      <IntroBox
        heading={introT("heading")}
        paragraph={introT("paragraph")}
        cta={introT("cta")}
        imageAlt={introT("imageAlt")}
        hrefPrefix={hrefPrefix}
        {...props}
      />
    ),
  };
  const MdxContent = getMdxComponent(post.slug);

  return (
    <Layout articleAlternates={alternates}>
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
          href={`${hrefPrefix}/categorie/recepten`}
          className="inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          {recepten("backToRecipes")}
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
                  <strong>{recepten("prepTime")}:</strong> {post.prepTime}
                </span>
              )}
              {post.cookTime && (
                <span>
                  <strong>{recepten("cookTime")}:</strong> {post.cookTime}
                </span>
              )}
              {post.servings && (
                <span>
                  <strong>{recepten("servings")}:</strong> {post.servings}
                </span>
              )}
            </div>
          )}

          {post.ingredients && post.ingredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-title font-semibold text-darkCornflower mb-3">
                {recepten("ingredients")}
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
            <TagList tags={post.tags} heading={common("tags")} hrefPrefix={hrefPrefix} />
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
                  defaultTitle={common("affiliateSidebarDefaultTitle")}
                  defaultText={common("affiliateSidebarDefaultText")}
                  defaultButton={common("affiliateSidebarDefaultButton")}
                />
              ))}
            </div>
          ) : (
            <AffiliateSidebarBox
              defaultTitle={common("affiliateSidebarDefaultTitle")}
              defaultText={common("affiliateSidebarDefaultText")}
              defaultButton={common("affiliateSidebarDefaultButton")}
            />
          )}
        </aside>
      </div>
    </Layout>
  );
}
