import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import BackButton from "../../../../components/BackButton";
import { getAllPosts, getPostByCanonicalSlug } from "../../../../lib/api";
import { getArticleAlternates } from "../../../../lib/i18n-alternates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts("audiogidsen", "nl");
  return posts.map((p) => ({ slug: p.canonicalSlug.replace("audiogidsen/", "") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostByCanonicalSlug(`audiogidsen/${slug}`, "nl");
  if (!post) return {};

  const canonicalUrl = `https://www.opakreta.be/${post.slug}`;
  const alternates = getArticleAlternates(post.canonicalSlug);
  const languages: Record<string, string> = {};
  if (alternates.nl) {
    languages.nl = `https://www.opakreta.be${alternates.nl}`;
    languages["x-default"] = languages.nl;
  }
  if (alternates.en) languages.en = `https://www.opakreta.be${alternates.en}`;

  return {
    title: `${post.title} | Audiogids`,
    description: post.excerpt || "",
    alternates: { canonical: canonicalUrl, languages },
    openGraph: {
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      siteName: "Opa Kreta",
    },
  };
}

export default async function AudiogidsPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostByCanonicalSlug(`audiogidsen/${slug}`, "nl");
  if (!post) {
    notFound();
  }

  const alternates = getArticleAlternates(post.canonicalSlug);
  const stops = post.stops || [];

  return (
    <Layout articleAlternates={alternates}>
      <PageHero
        title={post.title}
        subtitle={post.price || "Gratis"}
        imageUrl={
          post.coverImage ||
          "https://images.unsplash.com/photo-1584956861644-c860bb6a6a81?q=80&w=1600&auto=format&fit=crop"
        }
      />

      <div className="max-w-screen-md mx-auto px-4 mt-8">
        <BackButton fallbackHref="/" />

        <h1 className="text-4xl font-title font-semibold text-black mt-6 mb-2 leading-tight">
          {post.title}
        </h1>
        {post.excerpt && <p className="text-gray-700 font-body mb-10">{post.excerpt}</p>}

        {stops.length === 0 ? (
          <p className="text-gray-600 font-body italic mb-20">
            Deze audiogids is nog in voorbereiding.
          </p>
        ) : (
          <ol className="space-y-8 mb-20">
            {stops.map((stop, index) => (
              <li key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-darkCornflower mb-4">
                  {index + 1}. {stop.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-6 rounded-lg transition"
                  >
                    📍 Navigeer hierheen
                  </a>
                  <audio controls src={stop.audioUrl} className="h-10" />
                  {stop.duration && (
                    <span className="text-gray-600 font-body text-sm">{stop.duration}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Layout>
  );
}
