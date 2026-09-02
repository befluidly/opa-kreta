import Layout from "../../../components/Layout";
import Hero from "../../../components/Hero";
import LatestPosts from "../../../components/LatestPosts";
import IntroBox from "../../../components/IntroBox";
import ClimateBox from "../../../components/ClimateBox";
import { getAllPosts } from "../../../lib/api";
import AffiliateRow from "../../../components/AffiliateRow";
import GreekPhrases from "../../../components/GreekPhrases";
import { getTranslations, setRequestLocale } from "next-intl/server";

function postDateToTimestamp(date?: string): number {
  if (!date) return 0;
  const parsed = Date.parse(date);
  return isNaN(parsed) ? 0 : parsed;
}

export default async function EnglishHome() {
  setRequestLocale("en");
  const posts = getAllPosts(undefined, "en")
    .filter((post) => post.date)
    .sort((a, b) => postDateToTimestamp(b.date) - postDateToTimestamp(a.date))
    .slice(0, 4);

  const home = await getTranslations({ locale: "en", namespace: "home" });
  const climate = await getTranslations({ locale: "en", namespace: "climateBox" });
  const greek = await getTranslations({ locale: "en", namespace: "greekPhrases" });
  const intro = await getTranslations({ locale: "en", namespace: "introBox" });
  const common = await getTranslations({ locale: "en", namespace: "common" });

  return (
    <Layout>
      {/* Hero sectie */}
      <Hero
        imageAlt="View over Crete with mountains and sea"
        title={home("heroTitle")}
        subtitle={home("heroSubtitle")}
        cta={home("heroCta")}
        hrefPrefix="/en"
      />

      {/* Laatste artikels + Intro */}
      <section
        id="content"
        className="relative z-30 max-w-screen-xl mx-auto px-4 mt-10 md:mt-14 mb-0"
      >
        <LatestPosts
          posts={posts}
          heading={home("latestPostsHeading")}
          publishedOnLabel={home("publishedOn")}
          readMoreLabel={common("readMore")}
          dateLocale="en-GB"
        />
      </section>

      {/* 🔹 Affiliate sectie */}
      <AffiliateRow
        hotelLabel={home("hotelLabel")}
        activityLabel={home("activityLabel")}
        ticketsLabel={home("ticketsLabel")}
        flightLabel={home("flightLabel")}
      />

      {/* Klimaat & cultuur sectie */}
      <section className="max-w-screen-xl mx-auto px-4 space-y-10">
        <ClimateBox
          mapAlt={climate("mapAlt")}
          heading={climate("heading")}
          paragraph={climate("paragraph")}
          legendCold={climate("legendCold")}
          legendMild={climate("legendMild")}
          legendWarm={climate("legendWarm")}
          legendHot={climate("legendHot")}
        />
        <GreekPhrases
          helloLabel={greek("hello")}
          thanksLabel={greek("thanks")}
          pleaseLabel={greek("please")}
          excuseLabel={greek("excuse")}
        />

        {/* Over mij box */}
        <div className="pt-6 border-t border-gray-200">
          <IntroBox
            heading={intro("heading")}
            paragraph={intro("paragraph")}
            cta={intro("cta")}
            imageAlt={intro("imageAlt")}
            hrefPrefix="/en"
          />
        </div>
      </section>
    </Layout>
  );
}
