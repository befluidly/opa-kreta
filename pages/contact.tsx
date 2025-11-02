import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { getAllPosts } from "../lib/tags";
import Link from "next/link";
import { useState } from "react";
import { Post } from "../types/post";
import { FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";

interface ContactProps {
  posts: Post[];
}

export default function Contact({ posts = [] }: ContactProps) {
  const uniqueCategories: string[] = Array.from(
    new Set(
      posts
        .map((p) => p.category)
        .filter((c): c is string => typeof c === "string" && c.trim() !== "")
    )
  );

  const categories = ["Alles", ...uniqueCategories];
  const [activeCategory, setActiveCategory] = useState<string>("Alles");

  const activePosts =
    activeCategory === "Alles"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Contact"
        subtitle="Stuur Opa Kreta een bericht, vraag of samenwerking"
        imageUrl="https://images.pexels.com/photos/29399456/pexels-photo-29399456.jpeg"
      />

      {/* 🔹 Inhoud zonder box */}
      <div className="max-w-screen-xl mx-auto px-4 -mt-0 text-left relative z-30">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-4">
          Neem contact op
        </h1>

        <p className="text-gray-700 font-body leading-relaxed mb-8 max-w-2xl">
          Heb je een vraag over Kreta, een tip voor de site of wil je samenwerken?
          Opa hoort het graag! Vul het formulier hieronder in of stuur een berichtje
          via sociale media.
        </p>

        {/* 🔹 Contactformulier */}
        <form className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Je naam"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
            />
            <input
              type="email"
              placeholder="Je e-mailadres"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-skyBlue focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Je bericht"
            className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-skyBlue focus:outline-none"
          />

          <button
            type="submit"
            className="bg-skyBlue text-white py-3 px-8 rounded-md font-semibold hover:bg-sky-600 transition"
          >
            Verstuur bericht
          </button>
        </form>

        {/* 🔹 Contactinfo & sociale media */}
        <div className="mt-14 grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-skyBlue text-xl" />
            <span>opa@opakreta.be</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaInstagram className="text-skyBlue text-xl" />
            <a
              href="https://www.instagram.com/opakreta"
              target="_blank"
              rel="noopener noreferrer"
            >
              @opaskreta
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaFacebook className="text-skyBlue text-xl" />
            <a
              href="https://www.facebook.com/opakreta"
              target="_blank"
              rel="noopener noreferrer"
            >
              /opakreta
            </a>
          </div>
        </div>

        {/* 🔹 Afsluitend tekstje */}
        <div className="text-center mt-16 text-gray-600 font-body italic">
          <p>
            Opa is meestal te vinden op een terrasje in Heraklion — een antwoord komt dus soms pas na de koffie ☕️😉
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
