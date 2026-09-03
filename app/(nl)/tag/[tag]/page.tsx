import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import PostCard from "../../../../components/PostCard";
import { getAllPosts } from "../../../../lib/api";

interface PageProps {
  params: Promise<{ tag: string }>;
}

/** Zet een tag om naar een URL-veilige slug */
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // verwijder rare tekens
    .replace(/\s+/g, "-"); // spaties -> -

/** Maak een slug terug leesbaar (voor titel/hero) */
const toTitle = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export async function generateStaticParams() {
  const posts = getAllPosts(undefined, "nl");
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).filter(
    Boolean
  ) as string[];

  return allTags.map((t) => ({ tag: toSlug(t) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const formattedTag = toTitle(tagSlug);
  const canonicalUrl = `https://www.opakreta.be/tag/${tagSlug}`;

  return {
    title: `Artikels over ${formattedTag} | Opa Kreta`,
    description: `Alle artikels die te maken hebben met ${formattedTag} op Kreta.`,
    alternates: { canonical: canonicalUrl },
    robots: { index: false, follow: true },
    openGraph: {
      title: `Artikels over ${formattedTag}`,
      description: `Alle artikels die te maken hebben met ${formattedTag} op Kreta.`,
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

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const formattedTag = toTitle(tagSlug);

  const allPosts = getAllPosts(undefined, "nl");
  const posts = allPosts.filter((p) => (p.tags || []).some((pt) => toSlug(pt) === tagSlug));

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Layout>
      {/* ✅ Hero */}
      <PageHero
        title={`#${formattedTag}`}
        subtitle={`Alle artikels met de tag "${formattedTag}"`}
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
