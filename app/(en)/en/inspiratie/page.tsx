import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import { getAllPosts } from "../../../../lib/api";
import Link from "next/link";
import { FaSpotify, FaBroadcastTower, FaYoutube } from "react-icons/fa";

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

export default function EnglishTips() {
  const posts = getAllPosts("tips/muziek", "en");

  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Inspiration"
        subtitle="Listen, read and experience Greek life – radio, music, news & more"
        imageUrl="/images/posts/voulisma.webp"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        {/* 🔹 Titel & inleiding links uitgelijnd */}
        <div className="mb-12">
          <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
            Inspiration from Greece
          </h1>
          <p className="text-gray-700 text-lg max-w-4xl font-body leading-relaxed">
            Discover Opa's favourite spots online: Greek radio stations, music, news
            sites, podcasts and videos that bring island life straight to you 🇬🇷✨
          </p>
        </div>

        {/* 🔹 Grid met kaarten */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 🎧 Radio */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaBroadcastTower className="text-skyBlue text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">Internet radio</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Listen live to Greek stations and bring Crete to life.
            </p>
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
              <h3 className="text-xl font-semibold text-darkCornflower">Spotify playlists</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Put your headphones on and drift away with Opa's favourite Greek playlists.
            </p>
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
              <h3 className="text-xl font-semibold text-darkCornflower">YouTube channels</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Discover beautiful footage of Greece and enjoy live music.
            </p>
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
              Articles about Greek Artists & Music
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
          <p className="text-lg">
            Turn on the music, close your eyes... and you can already hear the sea of Crete 🌊🎵
          </p>
        </div>
      </div>
    </Layout>
  );
}
