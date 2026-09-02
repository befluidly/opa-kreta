import type { Metadata } from "next";
import Layout from "../../../components/Layout";
import PageHero from "../../../components/PageHero";

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

export default function Over() {
  return (
    <Layout>
      {/* 🔹 Hero-afbeelding */}
      <PageHero
        title="Over Opa Kreta"
        subtitle="Leer het verhaal achter deze website kennen"
        imageUrl="/images/hero/voulisma-beach.jpg"
      />

      {/* 🔹 Inhoudssectie */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-left relative z-30">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 🔹 Tekstblok */}
          <div>
            <h1 className="text-3xl font-title font-semibold text-darkCornflower mb-6">
              Over deze website en mezelf
            </h1>

            <div className="text-gray-700 text-lg font-body leading-relaxed space-y-6">
              <p>
                Hallo, ik ben <strong>Lynn</strong> — de persoon achter deze blog.
                Deze site combineert twee van mijn passies: <em>Kreta</em> en <em>techniek</em>.
              </p>

              <p>
                Mijn eerste reis naar Kreta was in <strong>1998</strong>. Wat begon als een
                gezinsvakantie, groeide uit tot een blijvende interesse in het eiland, zijn mensen
                en zijn geschiedenis. Tijdens mijn tienerjaren bleef ik liever thuis (“wie wil nu
                met zijn ouders rondwandelen in de hitte?”), maar intussen is Kreta een plek
                geworden waar ik steeds naar terugkeer.
              </p>

              <p>
                Het eiland heeft alles wat me boeit: van prehistorie en klassieke oudheid tot
                Byzantijnse invloeden en verhalen uit de twee wereldoorlogen. Elke reis voelt als
                een stap verder in het ontdekken van dat rijke verleden.
              </p>

              <p>
                Naast mijn liefde voor Kreta heb ik ook een zwak voor technologie. Ik bouw en
                onderhoud deze website zelf en leer onderweg bij over webdesign en grafische
                vormgeving.
              </p>

              <p>
                De foto’s op deze site zijn deels van mijzelf, deels zorgvuldig geselecteerd om de
                sfeer van het eiland te tonen.
              </p>

              <p>
                Ik schrijf niet als gids of expert, maar als iemand die simpelweg geraakt is door
                Kreta — door de geschiedenis, de gastvrijheid, het eten en het ritme van het leven
                daar.
              </p>

              <p>
                Welkom op mijn blog, waar ik het echte Kreta probeer te tonen: eerlijk, warm en met
                een persoonlijke blik.
              </p>
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
