import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import { getAllPosts } from "../../../../lib/api";
import Link from "next/link";
import { FaSpotify, FaBroadcastTower, FaYoutube } from "react-icons/fa";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Discover Opa's favourite spots online: Greek radio stations, music, news sites, podcasts and videos that bring island life straight to you.",
  alternates: { canonical: "https://www.opakreta.be/en/inspiratie" },
  openGraph: {
    title: "Inspiration",
    description:
      "Discover Opa's favourite spots online: Greek radio stations, music, news sites, podcasts and videos that bring island life straight to you.",
    url: "https://www.opakreta.be/en/inspiratie",
    siteName: "Opa Kreta",
    images: [{ url: "/images/posts/voulisma.webp", width: 1200, height: 630 }],
  },
};

export default async function EnglishTips() {
  setRequestLocale("en");
  const posts = getAllPosts("tips/muziek", "en");
  const t = await getTranslations({ locale: "en", namespace: "inspiratie" });

  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageUrl="/images/posts/voulisma.webp"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        {/* 🔹 Titel & inleiding links uitgelijnd */}
        <div className="mb-12">
          <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
            {t("heading")}
          </h1>
          <p className="text-gray-700 text-lg max-w-4xl font-body leading-relaxed">
            {t("intro")}
          </p>
        </div>

        {/* 🔹 Grid met kaarten */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 🎧 Radio */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaBroadcastTower className="text-skyBlue text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">{t("radioHeading")}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t("radioText")}</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.sfera.gr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  🎵 Sfera FM
                </a>{" "}
                – Popular hits from Athens
              </li>
              <li>
                <a
                  href="https://www.zuccaradio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  🎶 Zucca Radio
                </a>{" "}
                – Chill and upbeat vibes
              </li>
              <li>
                <a
                  href="https://www.ert.gr/radio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  🇬🇷 ERT Radio
                </a>{" "}
                – Classics & local music
              </li>
            </ul>
          </div>

          {/* 🎵 Spotify */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaSpotify className="text-green-500 text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">{t("spotifyHeading")}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t("spotifyText")}</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://open.spotify.com/playlist/0PdTn0dusg8HNhT2IYX0Do?si=Lp5sBuJiTtCE-DVROiKQKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  My personal playlist
                </a>{" "}
                – It's all Greek to me
              </li>
              <li>
                <a
                  href="https://open.spotify.com/playlist/19bZqqEgvlGva1z3waqv6q?si=skVGpaevQsCfuCFtM27t6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  The Classics
                </a>{" "}
                – The more classic sounds of Greece
              </li>
            </ul>
          </div>

          {/* 📺 YouTube */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaYoutube className="text-red-500 text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">{t("youtubeHeading")}</h3>
            </div>
            <p className="text-gray-600 mb-4">{t("youtubeText")}</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/c/greece"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Visit Greece
                </a>{" "}
                – Official tourism channel
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@cretetheisland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Crete the Island
                </a>{" "}
                – A YouTube channel about Crete
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Artikels over Griekse artiesten */}
        {Array.isArray(posts) && posts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
              {t("articlesHeading")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-darkCornflower group-hover:text-skyBlue mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Afsluiting */}
        <div className="mt-20 border-t border-sky-100 pt-8 text-center text-gray-600 font-body italic">
          <p className="text-lg">{t("closingText")}</p>
        </div>
      </div>
    </Layout>
  );
}
