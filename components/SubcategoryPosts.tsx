"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "../types/post";

interface SubcategoryPostsProps {
  posts: Post[];
}

export default function SubcategoryPosts({ posts }: SubcategoryPostsProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort();

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts;

  return (
    <>
      {/* ✅ Tag-filters */}
      {allTags.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 mb-10 flex flex-wrap gap-3 justify-start">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedTag === tag
                  ? "bg-skyBlue text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag("")}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              Alles tonen ✕
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((p) => (
            <PostCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              excerpt={p.excerpt}
              coverImage={p.coverImage}
              category={p.category}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            Geen artikels gevonden in deze subcategorie.
          </p>
        )}
      </div>
    </>
  );
}
