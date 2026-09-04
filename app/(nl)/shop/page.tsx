import type { Metadata } from "next";
import Layout from "../../../components/Layout";
import PageHero from "../../../components/PageHero";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Shop | Opa Kreta",
  description: "Binnenkort verkrijgbaar: Kreta e-books, gidsen en digitale producten.",
  alternates: { canonical: "https://www.opakreta.be/shop" },
  openGraph: {
    title: "Shop | Opa Kreta",
    description: "Binnenkort verkrijgbaar: Kreta e-books, gidsen en digitale producten.",
    url: "https://www.opakreta.be/shop",
    siteName: "Opa Kreta",
  },
};

export default async function ShopPlaceholder() {
  setRequestLocale("nl");
  const t = await getTranslations({ locale: "nl", namespace: "shop" });

  return (
    <Layout>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageUrl="https://cdn.pixabay.com/photo/2022/10/22/18/48/crete-7539870_1280.jpg"
      />

      <div className="max-w-screen-md mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
          {t("heading")}
        </h1>
        <p className="text-gray-600 text-lg font-body leading-relaxed mb-8">{t("intro")}</p>

        <p className="text-gray-500 italic mb-12">{t("closingText")}</p>

        <Link
          href="/"
          className="inline-block bg-skyBlue text-white px-6 py-3 rounded-md font-semibold hover:bg-darkCornflower transition"
        >
          {t("backHome")}
        </Link>
      </div>
      <div className="max-w-screen-md mx-auto px-4 py-8 text-center border-t border-gray-200">
        <p className="text-gray-700 mb-4">{t("exploreLabel")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/categorie/gidsen" className="text-skyBlue hover:underline">
            {t("gidsen")}
          </Link>
          <Link href="/categorie/opas-blog" className="text-skyBlue hover:underline">
            {t("blog")}
          </Link>
          <Link href="/categorie/recepten" className="text-skyBlue hover:underline">
            {t("recepten")}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
