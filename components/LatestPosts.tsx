import Link from "next/link";
import { Post } from "../types/post";

interface LatestPostsProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 mb-10">

      <h1 className="text-3xl font-title font-bold mb-8 text-darkCornflower">
  Laatste artikels
</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 items-stretch">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group block h-full"
          >
            <article
              className="
                flex flex-col justify-between h-full
                overflow-hidden rounded-xl bg-white shadow-soft
                transition-all duration-500 hover:shadow-md hover:-translate-y-1
              "
            >
              {post.coverImage && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="
                      h-52 w-full object-cover transition-transform duration-700 
                      group-hover:scale-105
                    "
                  />
                  <div
                    className="absolute inset-0 bg-spanishBlue bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 pointer-events-none"
                  ></div>
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                {post.date && (
                  <p className="text-sm text-gray-400 mb-2">
                      gepubliceerd op {" "}
                    {new Date(post.date).toLocaleDateString("nl-BE", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                <h3
                  className="
                    text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 
                    group-hover:text-spanishBlue
                  "
                >
                  {post.title}
                </h3>

                <span
                  className="
                    mt-auto inline-block text-sm font-medium text-spanishBlue 
                    group-hover:underline transition-colors
                  "
                >
                  Lees meer →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

