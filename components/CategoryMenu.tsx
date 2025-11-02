"use client";

import { useState } from "react";

interface Post {
  title: string;
  excerpt: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  posts: Post[];
}

const categories: Category[] = [
  {
    id: "praktisch",
    label: "Praktisch",
    posts: [
      {
        title: "Auto huren op Kreta",
        excerpt: "Alles wat je moet weten over prijzen, verzekeringen en borg.",
        image: "https://source.unsplash.com/400x250/?car,crete",
      },
      {
        title: "Openbaar vervoer",
        excerpt: "Hoe reis je met de bus over het eiland?",
        image: "https://source.unsplash.com/400x250/?bus,greece",
      },
    ],
  },
  {
    id: "eten-drinken",
    label: "Eten & Drinken",
    posts: [
      {
        title: "Top 5 tavernes in Chania",
        excerpt: "Van mezze tot verse vis: onze favorieten.",
        image: "https://source.unsplash.com/400x250/?greek-food",
      },
      {
        title: "Raki en Ouzo",
        excerpt: "Het verschil tussen de nationale drankjes uitgelegd.",
        image: "https://source.unsplash.com/400x250/?ouzo,drink",
      },
    ],
  },
  {
    id: "cultuur",
    label: "Cultuur",
    posts: [
      {
        title: "Knossos en de Minoërs",
        excerpt: "Ontdek de oudste Europese beschaving.",
        image: "https://source.unsplash.com/400x250/?knossos",
      },
      {
        title: "Lokale festivals",
        excerpt: "Dans, muziek en tradities op Kreta.",
        image: "https://source.unsplash.com/400x250/?festival,crete",
      },
    ],
  },
  {
    id: "natuur",
    label: "Natuur",
    posts: [
      {
        title: "Samariakloof wandelen",
        excerpt: "Een van de langste kloven van Europa.",
        image: "https://source.unsplash.com/400x250/?samaria-gorge",
      },
      {
        title: "De mooiste stranden",
        excerpt: "Balos, Elafonissi en nog veel meer verborgen parels.",
        image: "https://source.unsplash.com/400x250/?beach,crete",
      },
    ],
  },
];

const CategoryPosts = () => {
  const [activeCategory, setActiveCategory] = useState("praktisch");
  const activePosts =
    categories.find((c) => c.id === activeCategory)?.posts || [];

  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-6">
      {/* Knoppen */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`py-3 px-6 rounded-[5px] font-semibold transition 
              ${
                activeCategory === cat.id
                  ? "bg-skyBlue text-white"
                  : "bg-gray-200 text-darkCornflower hover:bg-gray-300"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {activePosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-darkCornflower mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPosts;