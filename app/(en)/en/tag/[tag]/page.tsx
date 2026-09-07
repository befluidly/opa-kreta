import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "../../../../../components/Layout";
import PageHero from "../../../../../components/PageHero";
import PostCard from "../../../../../components/PostCard";
import { getAllPosts } from "../../../../../lib/api";
import { getTagLabelEn, tagToSlug as toSlug } from "../../../../../lib/tagLabels";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts(undefined, "en");
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).filter(
    Boolean
  ) as string[];

  return allTags.map((t) => ({ tag: toSlug(t) }));
}

// De param is enkel de URL-slug (bv. "auto-huren-kreta") — voor een
// correcte vertaling zoeken we de originele (Nederlandse) tag-waarde op
// via de posts die effectief deze tag dragen, en vertalen die.
function findFormattedTag(tagSlug: string, posts: ReturnType<typeof getAllPosts>): string {
  for (const post of posts) {
    const original = (post.tags || []).find((t) => toSlug(t) === tagSlug);
    if (original) return getTagLabelEn(original);
  }
  return tagSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const allPosts = getAllPosts(undefined, "en");
  const formattedTag = findFormattedTag(tagSlug, allPosts);
  const canonicalUrl = `https://www.opakreta.be/en/tag/${tagSlug}`;

  return {
    title: `Articles about ${formattedTag} | Opa Kreta`,
    description: `All articles related to ${formattedTag} on Crete.`,
    alternates: { canonical: canonicalUrl },
    robots: { index: false, follow: true },
    openGraph: {
      title: `Articles about ${formattedTag}`,
      description: `All articles related to ${formattedTag} on Crete.`,
      url: canonicalUrl,
      images: [
        {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
        },
      ],
      siteName: "Opa Kreta",
    },
  };
}

export default async function EnglishTagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const allPosts = getAllPosts(undefined, "en");
  const formattedTag = findFormattedTag(tagSlug, allPosts);

  const posts = allPosts.filter((p) => (p.tags || []).some((pt) => toSlug(pt) === tagSlug));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero
        title={`#${formattedTag}`}
        subtitle={`All articles tagged "${formattedTag}"`}
        imageUrl="/images/posts/zakros-palatialcomplex.webp"
      />

      {/* ✅ Inhoud */}
      <div className="max-w-screen-xl mx-auto px-4 mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              excerpt={p.excerpt}
              coverImage={p.coverImage}
              category={p.category}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
