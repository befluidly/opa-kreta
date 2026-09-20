import Link from "next/link";
import Image from "next/image";
import { Post } from "../types/post";
import { isLocalImagePath } from "../lib/site";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  date?: string;
  category?: string;
  readMoreLabel?: string;
  dateLocale?: string;
}

export default function PostCard({
  slug,
  title,
  excerpt,
  coverImage,
  date,
  readMoreLabel = "Lees meer →",
  dateLocale = "nl-BE",
}: PostCardProps) {
  return (
    <Link key={slug} href={`/${slug}`} className="group block h-full">
      <article
        className="
          flex flex-col justify-between h-full
          overflow-hidden rounded-lg bg-white shadow-soft
          transition-all duration-500 hover:shadow-md hover:-translate-y-1
        "
      >
        {coverImage && (
          // h-40 staat op deze wrapper i.p.v. op de afbeelding zelf —
          // next/image's fill-modus vereist een ouder met een vaste hoogte
          // en position: relative (beide al aanwezig hier). Zie PageHero.tsx
          // voor waarom externe coverImage-URL's een gewone <img> blijven
          // i.p.v. next/image (lib/site.ts, isLocalImagePath).
          <div className="relative overflow-hidden h-40 w-full">
            {isLocalImagePath(coverImage) ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="
                  object-cover transition-transform duration-700
                  group-hover:scale-105
                "
              />
            ) : (
              <img
                src={coverImage}
                alt={title}
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

        <div className="p-4 flex flex-col justify-between flex-grow">
          {date && (
            <p className="text-xs text-gray-400 mb-1">
              {new Date(date).toLocaleDateString(dateLocale, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
          <h3
            className="
              text-base font-semibold text-gray-900 mb-2 transition-colors duration-300 
              group-hover:text-spanishBlue
            "
          >
            {title}
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
  );
}
