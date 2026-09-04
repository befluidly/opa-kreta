interface GreekPhrasesProps {
  helloLabel?: string;
  thanksLabel?: string;
  pleaseLabel?: string;
  excuseLabel?: string;
}

// Ook ingebed in MDX-artikelbodies (via de `components`-prop) — vandaar de
// Nederlandse defaults: content blijft vandaag altijd Nederlands, enkel de
// pagina's zelf (homepage) geven expliciet vertaalde labels mee. De Griekse
// woorden (Yassou, Efharisto, ...) zijn geen Nederlandse tekst en blijven dus
// hoe dan ook ongewijzigd.
export default function GreekPhrases({
  helloLabel = "Hallo:",
  thanksLabel = "Bedankt:",
  pleaseLabel = "Alsjeblieft:",
  excuseLabel = "Excuseer:",
}: GreekPhrasesProps) {
  return (
    <section className="text-center pt-4 pb-12 text-darkCornflower">
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-40">
        <div className="space-y-3">
          <p className="font-body text-lg tracking-wide">{helloLabel}</p>
          <p className="font-handwriting text-4xl mt-2">Yassou</p>
        </div>
        <div className="space-y-3">
          <p className="font-body text-lg tracking-wide">{thanksLabel}</p>
          <p className="font-handwriting text-4xl mt-2">Efharisto</p>
        </div>
        <div className="space-y-3">
          <p className="font-body text-lg tracking-wide">{pleaseLabel}</p>
          <p className="font-handwriting text-4xl mt-2">Parakaló</p>
        </div>
        <div className="space-y-3">
          <p className="font-body text-lg tracking-wide">{excuseLabel}</p>
          <p className="font-handwriting text-4xl mt-2">Signómi</p>
        </div>
      </div>
    </section>
  );
}
