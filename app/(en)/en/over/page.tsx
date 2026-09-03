import type { Metadata } from "next";
import Layout from "../../../../components/Layout";
import PageHero from "../../../../components/PageHero";

export const metadata: Metadata = {
  title: "About Opa Kreta",
  description:
    "Meet Lynn, the person behind Opa Kreta, and the story behind this website about the island of Crete.",
  alternates: { canonical: "https://www.opakreta.be/en/over" },
  openGraph: {
    title: "About Opa Kreta",
    description:
      "Meet Lynn, the person behind Opa Kreta, and the story behind this website about the island of Crete.",
    url: "https://www.opakreta.be/en/over",
    siteName: "Opa Kreta",
    images: [{ url: "/images/hero/voulisma-beach.jpg", width: 1200, height: 630 }],
  },
};

export default function EnglishOver() {
  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="About Opa Kreta"
        subtitle="Get to know the story behind this website"
        imageUrl="/images/hero/voulisma-beach.jpg"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-left relative z-30">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 🔹 Tekstblok */}
          <div>
            <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
              About this website and me
            </h1>

            <div className="text-gray-700 text-lg font-body leading-relaxed space-y-6">
              <p>
                Hi, I'm <strong>Lynn</strong> — the person behind this blog. This site
                combines two of my passions: <em>Crete</em> and <em>technology</em>.
              </p>

              <p>
                My first trip to Crete was in <strong>1998</strong>. What started as a
                family holiday grew into a lasting interest in the island, its people
                and its history. As a teenager I preferred staying home ("who wants to
                walk around with their parents in the heat?"), but these days Crete is a
                place I keep coming back to.
              </p>

              <p>
                The island has everything that fascinates me: from prehistory and
                classical antiquity to Byzantine influences and stories from the two
                world wars. Every trip feels like another step in discovering that rich
                past.
              </p>

              <p>
                Besides my love for Crete, I also have a soft spot for technology. I
                build and maintain this website myself, learning about web design and
                graphic design along the way.
              </p>

              <p>
                The photos on this site are partly my own, partly carefully selected to
                show the atmosphere of the island.
              </p>

              <p>
                I don't write as a guide or an expert, but as someone who is simply
                moved by Crete — by its history, hospitality, food and the rhythm of
                life there.
              </p>

              <p>
                Welcome to my blog, where I try to show the real Crete: honest, warm and
                with a personal touch.
              </p>
            </div>
          </div>

          {/* 🔹 Fotocollage rechts */}
          <div className="grid grid-cols-2 gap-4 mt-10 md:mt-0">
            {/* 🔹 Bovenste rij – portretfoto’s */}
            <img
              src="/images/over/lynn4.jpg"
              alt="Lynn in Crete"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
            <img
              src="/images/over/lynn2.jpg"
              alt="Lynn and Crete"
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
              alt="Lynn in Crete – portrait"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
            <img
              src="/images/over/tripiti-lynn.jpg"
              alt="Lynn in Crete – portrait"
              className="rounded-lg shadow-md object-cover w-full h-64 md:h-72"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
