import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import Link from "next/link";

import { NextSeo } from "next-seo";

<NextSeo
  title="Shop | Opa Kreta"
  description="Binnenkort verkrijgbaar: Kreta e-books, gidsen en digitale producten."
  canonical="https://www.opakreta.be/shop"
/>

export default function ShopPlaceholder() {
  return (
    <Layout>
      <PageHero
        title="Shop"
        subtitle="Binnenkort verkrijgbaar: Kreta e-books, gidsen & digitale producten"
        imageUrl="https://cdn.pixabay.com/photo/2022/10/22/18/48/crete-7539870_1280.jpg"
      />

      <div className="max-w-screen-md mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
          Opa’s shop opent binnenkort 🏺
        </h1>
        <p className="text-gray-600 text-lg font-body leading-relaxed mb-8">
          Momenteel werk ik nog volop aan de inhoud van de website.
          Zodra er voldoende artikelen en bezoekers zijn, voeg ik hier een kleine shop toe
          met e-books, gidsen en lokale Kreta-vondsten.
        </p>

        <p className="text-gray-500 italic mb-12">
          Kom binnenkort zeker nog eens terug — of ontdek intussen Opa’s verhalen en gidsen.
        </p>

        <Link
          href="/"
          className="inline-block bg-skyBlue text-white px-6 py-3 rounded-md font-semibold hover:bg-darkCornflower transition"
        >
          ⟵ Terug naar de homepagina
        </Link>
      </div>
      <div className="max-w-screen-md mx-auto px-4 py-8 text-center border-t border-gray-200">
  <p className="text-gray-700 mb-4">
    Intussen kun je deze pagina’s verkennen:
  </p>
  <div className="flex flex-wrap justify-center gap-4">
    <Link href="/categorie/gidsen" className="text-skyBlue hover:underline">
      Gidsen
    </Link>
    <Link href="/categorie/opas-blog" className="text-skyBlue hover:underline">
      Opa’s Blog
    </Link>
    <Link href="/categorie/recepten" className="text-skyBlue hover:underline">
      Recepten
    </Link>
  </div>
</div>
    </Layout>
  );
}
