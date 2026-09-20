import Link from "next/link";
import Image from "next/image";
import { Post } from "../types/post";
import { isLocalImagePath } from "../lib/site";

interface LatestPostsProps {
  posts: Post[];
  heading?: string;
  publishedOnLabel?: string;
  readMoreLabel?: string;
  dateLocale?: string;
}

export default function LatestPosts({
  posts,
  heading = "Laatste artikels",
  publishedOnLabel = "gepubliceerd op",
  readMoreLabel = "Lees meer →",
  dateLocale = "nl-BE",
}: LatestPostsProps) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 mb-10">

      <h1 className="text-3xl font-title font-bold mb-8 text-darkCornflower">
  {heading}
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
                // h-52 staat op deze wrapper i.p.v. op de afbeelding zelf —
                // next/image's fill-modus vereist een ouder met een vaste
                // hoogte en position: relative (beide al aanwezig hier). Zie
                // PostCard.tsx voor waarom externe coverImage-URL's een
                // gewone <img> blijven i.p.v. next/image (lib/site.ts,
                // isLocalImagePath).
                <div className="relative overflow-hidden h-52 w-full">
                  {isLocalImagePath(post.coverImage) ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      className="
                        object-cover transition-transform duration-700
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="
                        absolute inset-0 h-full w-full object-cover transition-transform duration-700
                        group-hover:scale-105
                      "
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-spanishBlue bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 pointer-events-none"
                  ></div>
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                {post.date && (
                  <p className="text-sm text-gray-400 mb-2">
                      {publishedOnLabel} {" "}
                    {new Date(post.date).toLocaleDateString(dateLocale, {
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
                  {readMoreLabel}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

