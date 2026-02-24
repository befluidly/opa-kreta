import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/api";
import { NextSeo } from "next-seo";
import { Post } from "../../types/post";

interface TagPageProps {
  tag: string; // slug uit de URL, bv. "agios-nikolaos"
  formattedTag: string; // mooi voor de UI, bv. "Agios Nikolaos"
  posts: Post[];
}

/** Zet een tag om naar een URL-veilige slug */
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // verwijder rare tekens
    .replace(/\s+/g, "-"); // spaties -> -

/** Maak een slug terug leesbaar (voor titel/hero) */
const toTitle = (slug: string) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

export default function TagPage({ tag, formattedTag, posts }: TagPageProps) {
  return (
    <Layout>
      {/* ✅ SEO: Tagpagina’s niet indexeren, maar links wel volgen */}
      <NextSeo
        title={`Artikels over ${formattedTag} | Opa Kreta`}
        description={`Alle artikels die te maken hebben met ${formattedTag} op Kreta.`}
        canonical={`https://www.opakreta.be/tag/${tag}`}
        noindex={true}
        nofollow={false}
        openGraph={{
          title: `Artikels over ${formattedTag}`,
          description: `Alle artikels die te maken hebben met ${formattedTag} op Kreta.`,
          url: `https://www.opakreta.be/tag/${tag}`,
          images: [
            {
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
            },
          ],
          siteName: "Opa Kreta",
        }}
      />

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

/* ✅ Static paths + props */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  // Verzamel alle tags uit content
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).filter(
    Boolean
  ) as string[];

  // Maak URL-slugs van tags
  const paths = allTags.map((t) => ({
    params: { tag: toSlug(t) },
  }));

  // Belangrijk: geen dynamische onbekende tags laten crawlen
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tagSlug = String(params?.tag || "").toLowerCase().trim();

  const allPosts = getAllPosts();

  // Vind posts waarvan minstens 1 tag (geslugified) matcht met de URL-tag
  const posts = allPosts.filter((p) =>
    (p.tags || []).some((pt) => toSlug(pt) === tagSlug)
  );

  // Geen posts? Maak er een echte 404 van (voorkomt Soft 404)
  if (posts.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      tag: tagSlug,
      formattedTag: toTitle(tagSlug),
      posts,
    },
  };
};