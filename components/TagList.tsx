import Link from "next/link";

interface TagListProps {
  tags?: string[];
}

export default function TagList({ tags = [] }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-darkCornflower mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className="bg-gray-100 hover:bg-skyBlue hover:text-white transition px-3 py-1 rounded-full text-sm text-darkCornflower font-medium"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
