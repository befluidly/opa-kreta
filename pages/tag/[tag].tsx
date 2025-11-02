import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/api";
import { NextSeo } from "next-seo";
import { Post } from "../../types/post";

interface TagPageProps {
  tag: string;
  posts: Post[];
}

export default function TagPage({ tag, posts }: TagPageProps) {
  const formattedTag = tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Layout>
      {/* ✅ SEO */}
      <NextSeo
        title={`Artikels over ${formattedTag} | Opa Kreta`}
        description={`Alle artikels die te maken hebben met ${formattedTag} op Kreta.`}
        canonical={`https://www.opakreta.be/tag/${tag}`}
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
        {posts.length > 0 ? (
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
        ) : (
          <p className="text-gray-600 text-center">
            Geen artikels gevonden voor deze tag.
          </p>
        )}
      </div>
    </Layout>
  );
}

/* ✅ Static paths + props */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  ).filter(Boolean);

  const paths = allTags.map((t) => ({
    params: { tag: t },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = String(params?.tag);
  const allPosts = getAllPosts();
  const posts = allPosts.filter((p) => p.tags?.includes(tag));

  return { props: { tag, posts } };
};
