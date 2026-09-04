import Link from "next/link";

interface IntroBoxProps {
  heading?: string;
  paragraph?: string;
  cta?: string;
  imageAlt?: string;
  hrefPrefix?: string;
}

// Ook ingebed in MDX-artikelbodies (via de `components`-prop) — vandaar de
// Nederlandse defaults, zie GreekPhrases.tsx voor dezelfde toelichting.
export default function IntroBox({
  heading = "Over",
  paragraph = "Hoi, ik ben Lynn 👋 Een echte filhelleen met een zwak voor Kreta — het eiland waar zon, zee en eenvoud nog hand in hand gaan. Sinds mijn eerste bezoek verloor ik mijn hart aan de gastvrije mensen, het heerlijke eten en de rustige levensstijl. Op deze website deel ik mijn passie voor het Griekse leven, de cultuur en de kleine ontdekkingen die Kreta zo bijzonder maken. Van verborgen stranden tot lokale tradities en tips voor een authentieke reiservaring — alles wat dit eiland zo uniek maakt, vind je hier terug.",
  cta = "Lees meer →",
  imageAlt = "Opa Kreta",
  hrefPrefix = "",
}: IntroBoxProps) {
  return (
    <section className="bg-white shadow-soft rounded-xl px-6 py-6 md:px-8 md:py-8 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-darkCornflower mb-3">{heading}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
        <Link
          href={`${hrefPrefix}/over`}
          className="inline-block text-spanishBlue font-medium hover:underline"
        >
          {cta}
        </Link>
      </div>

      {/* Afbeelding rechts */}
      <div className="flex-shrink-0">
        <img
          src="/images/over/profiel-frontpage.jpg"
          alt={imageAlt}
          className="w-40 h-40 md:w-30 md:h-30 rounded-full object-cover shadow-md"
        />
      </div>
    </section>
  );
}
