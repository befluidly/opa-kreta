import type { Metadata } from "next";
import Layout from "../../../components/Layout";
import PageHero from "../../../components/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Over Opa Kreta",
  description:
    "Maak kennis met Lynn, de persoon achter Opa Kreta, en het verhaal achter deze website over het eiland Kreta.",
  alternates: { canonical: "https://www.opakreta.be/over" },
  openGraph: {
    title: "Over Opa Kreta",
    description:
      "Maak kennis met Lynn, de persoon achter Opa Kreta, en het verhaal achter deze website over het eiland Kreta.",
    url: "https://www.opakreta.be/over",
    siteName: "Opa Kreta",
    images: [{ url: "/images/hero/voulisma-beach.jpg", width: 1200, height: 630 }],
  },
};

export default async function Over() {
  setRequestLocale("nl");
  const t = await getTranslations({ locale: "nl", namespace: "over" });

  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        imageUrl="/images/hero/voulisma-beach.jpg"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-left relative z-30">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 🔹 Tekstblok */}
          <div>
            <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
              {t("heading")}
            </h1>

            <div className="text-gray-700 text-lg font-body leading-relaxed space-y-6">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p>{t("p4")}</p>
              <p>{t("p5")}</p>
              <p>{t("p6")}</p>
              <p>{t("p7")}</p>
            </div>
          </div>

          {/* 🔹 Fotocollage rechts */}
          <div className="grid grid-cols-2 gap-4 mt-10 md:mt-0">
            {/* 🔹 Bovenste rij – portretfoto’s */}
            <img
              src="/images/over/lynn4.jpg"
              alt="Lynn op Kreta"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
            <img
              src="/images/over/lynn2.jpg"
              alt="Lynn en Kreta"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />

            {/* 🔹 Middelste rij – liggende brede foto */}
            <img
              src="/images/over/lynn1.jpg"
              alt="Lynn in Tripiti"
              className="rounded-lg shadow-md object-cover w-full h-52 col-span-2"
            />

            {/* 🔹 Onderste rij – portretfoto’s */}
            <img
              src="/images/over/lynn3.jpg"
              alt="Lynn op Kreta – portret"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
            <img
              src="/images/over/tripiti-lynn.jpg"
              alt="Lynn op Kreta – portret"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
