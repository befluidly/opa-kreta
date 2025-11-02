import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { getAllPosts } from "../lib/api";
import { Post } from "../types/post";
import Link from "next/link";
import { FaSpotify, FaBroadcastTower, FaYoutube } from "react-icons/fa";

interface TipsProps {
  posts: Post[];
}

export default function Tips({ posts }: TipsProps) {
  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Inspiratie"
        subtitle="Luister, lees en beleef het Griekse leven – radio, muziek, nieuws & meer"
        imageUrl="/images/posts/voulisma.webp"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        {/* 🔹 Titel & inleiding links uitgelijnd */}
        <div className="mb-12">
          <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
            Inspiratie uit Griekenland
          </h1>
          <p className="text-gray-700 text-lg max-w-4xl font-body leading-relaxed">
            Ontdek hier Opa’s favoriete plekjes online: Griekse radiozenders, muziek, nieuwssites,
            podcasts en video’s die de sfeer van het eilandleven tot bij jou brengen 🇬🇷✨
          </p>
        </div>

        {/* 🔹 Grid met kaarten */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* 🎧 Radio */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaBroadcastTower className="text-skyBlue text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">Internetradio</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Luister live naar Griekse zenders en breng Kreta tot leven.
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
                – Populaire hits uit Athene
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
                – Chill en upbeat vibes
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
                – Klassiekers & lokale muziek
              </li>
            </ul>
          </div>

          {/* 🎵 Spotify */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaSpotify className="text-green-500 text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">Spotify-lijsten</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Zet je koptelefoon op en droom weg bij Opa’s favoriete Griekse afspeellijsten.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://open.spotify.com/playlist/0PdTn0dusg8HNhT2IYX0Do?si=Lp5sBuJiTtCE-DVROiKQKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  Mijn persoonlijke playlist
                </a>{" "}
                – It's all greek to me
              </li>
              <li>
                <a
                  href="https://open.spotify.com/playlist/19bZqqEgvlGva1z3waqv6q?si=skVGpaevQsCfuCFtM27t6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  De Klassiekers
                </a>{" "}
                – De meer klassiekere klanken van Griekenland
              </li>
            </ul>
          </div>

          {/* 📺 YouTube */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-3 space-x-3">
              <FaYoutube className="text-red-500 text-3xl" />
              <h3 className="text-xl font-semibold text-darkCornflower">YouTube-kanalen</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Ontdek prachtige beelden van Griekenland en geniet van live muziek.
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
                – Officiële toerismekanaal
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
                – Een YouTube-kanaal over Kreta
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Artikels over Griekse artiesten */}
        {Array.isArray(posts) && posts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
              Artikels over Griekse Artiesten & Muziek
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
            Zet de muziek aan, sluit je ogen... en je hoort de zee van Kreta al 🌊🎵
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts("tips/muziek");
  return {
    props: { posts },
  };
}