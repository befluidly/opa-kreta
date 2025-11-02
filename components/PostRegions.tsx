import Link from "next/link";
import { Post } from "../types/post";

interface PostRegionsProps {
  post: Post;
}

export default function PostRegions({ post }: PostRegionsProps) {
  if (!post.subcategories || post.subcategories.length === 0) return null;

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold text-darkCornflower mb-3">
        Ook interessant in deze regio’s:
      </h3>
      <div className="flex flex-wrap gap-3">
        {post.subcategories.map((sub) => (
          <Link
            key={sub}
            href={`/categorie/${post.category}/${sub}`}
            className="px-3 py-1 bg-skyBlue text-white rounded-full text-sm font-medium hover:bg-sky-600 transition"
          >
            {sub
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </Link>
        ))}
      </div>
    </div>
  );
}
