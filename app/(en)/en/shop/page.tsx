import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop | Opa Kreta",
  description: "Coming soon: Crete e-books, guides and digital products.",
  alternates: { canonical: "https://www.opakreta.be/en/shop" },
  openGraph: {
    title: "Shop | Opa Kreta",
    description: "Coming soon: Crete e-books, guides and digital products.",
    url: "https://www.opakreta.be/en/shop",
    siteName: "Opa Kreta",
  },
};

export default function EnglishShopPlaceholder() {
  return (
    <Layout>
      <PageHero
        title="Shop"
        subtitle="Coming soon: Crete e-books, guides & digital products"
        imageUrl="https://cdn.pixabay.com/photo/2022/10/22/18/48/crete-7539870_1280.jpg"
      />

      <div className="max-w-screen-md mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
          Opa's shop opens soon 🏺
        </h1>
        <p className="text-gray-600 text-lg font-body leading-relaxed mb-8">
          I'm still working hard on the content of the website. Once there are enough
          articles and visitors, I'll add a small shop here with e-books, guides and
          local Crete finds.
        </p>

        <p className="text-gray-500 italic mb-12">
          Be sure to check back soon — or explore Opa's stories and guides in the
          meantime.
        </p>

        <Link
          href="/en"
          className="inline-block bg-skyBlue text-white px-6 py-3 rounded-md font-semibold hover:bg-darkCornflower transition"
        >
          ⟵ Back to the homepage
        </Link>
      </div>
      <div className="max-w-screen-md mx-auto px-4 py-8 text-center border-t border-gray-200">
        <p className="text-gray-700 mb-4">In the meantime you can explore these pages:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/en/categorie/gidsen" className="text-skyBlue hover:underline">
            Guides
          </Link>
          <Link href="/en/categorie/opas-blog" className="text-skyBlue hover:underline">
            Opa's Blog
          </Link>
          <Link href="/en/categorie/recepten" className="text-skyBlue hover:underline">
            Recipes
          </Link>
        </div>
      </div>
    </Layout>
  );
}
