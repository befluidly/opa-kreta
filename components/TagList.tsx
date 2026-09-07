import Link from "next/link";
import { tagToSlug } from "../lib/tagLabels";

interface TagListProps {
  tags?: string[];
  heading?: string;
  hrefPrefix?: string;
  // Optioneel: vertaalt de weergegeven tekst van een tag (bv. naar het
  // Engels via lib/tagLabels.ts). De href blijft altijd op de ruwe
  // (Nederlandse) tag-waarde gebaseerd, want dat is ook wat de
  // /tag/[tag]-paginas als slug-bron gebruiken.
  labelFor?: (tag: string) => string;
}

export default function TagList({
  tags = [],
  heading = "Tags",
  hrefPrefix = "",
  labelFor = (tag) => tag,
}: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-darkCornflower mb-3">{heading}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`${hrefPrefix}/tag/${tagToSlug(tag)}`}
            className="bg-gray-100 hover:bg-skyBlue hover:text-white transition px-3 py-1 rounded-full text-sm text-darkCornflower font-medium"
          >
            #{labelFor(tag)}
          </Link>
        ))}
      </div>
    </div>
  );
}
