import React from "react";

interface ClimateBoxProps {
  mapAlt?: string;
  heading?: string;
  paragraph?: string;
  legendCold?: string;
  legendMild?: string;
  legendWarm?: string;
  legendHot?: string;
}

// Ook ingebed in MDX-artikelbodies (via de `components`-prop) — vandaar de
// Nederlandse defaults, zie GreekPhrases.tsx voor dezelfde toelichting.
const ClimateBox: React.FC<ClimateBoxProps> = ({
  mapAlt = "Kaart van Kreta",
  heading = "Klimaat op Kreta",
  paragraph = "Kreta geniet van een heerlijk mediterraan klimaat, met warme, droge zomers en milde, aangename winters. Van mei tot oktober kun je rekenen op zonzeker weer, heldere blauwe luchten en een verkoelende zeebries die het zelfs op warme dagen aangenaam maakt. De zomermaanden zijn ideaal voor zonliefhebbers en strandgangers, terwijl het voorjaar en najaar juist perfect zijn voor wie de drukte wil vermijden. Dan kleurt het eiland frisgroen, staan de bloemen in bloei en is de temperatuur ideaal om te wandelen, fietsen of charmante dorpjes te verkennen in alle rust.",
  legendCold = "Koud",
  legendMild = "Mild",
  legendWarm = "Warm",
  legendHot = "Heet",
}) => {
  const months = [
    { name: "Jan", max: 5 },
    { name: "Feb", max: 9 },
    { name: "Mar", max: 13 },
    { name: "Apr", max: 19 },
    { name: "May", max: 23 },
    { name: "Jun", max: 27 },
    { name: "Jul", max: 31 },
    { name: "Aug", max: 31 },
    { name: "Sep", max: 26 },
    { name: "Oct", max: 19 },
    { name: "Nov", max: 12 },
    { name: "Dec", max: 7 },
  ];

  const absMax = 50; // schaal

  const getColor = (temp: number) => {
    if (temp < 10) return "from-blue-500 to-blue-300";
    if (temp < 20) return "from-yellow-400 to-orange-300";
    if (temp < 30) return "from-orange-400 to-red-400";
    return "from-red-500 to-red-700";
  };

  return (
    <section className="relative mt-0 mb-16">
      <div className="bg-skyBlue/20 backdrop-blur-sm rounded-[20px] shadow-soft p-10 md:p-14 max-w-screen-xl mx-auto">

        {/* 🔹 Rij 1 – Kaart + Tekst */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/hero/kreta-map.png"
              alt={mapAlt}
              className="rounded-xl shadow-md w-full max-w-[520px]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-title text-darkCornflower mb-4">{heading}</h1>
            <p className="font-body text-gray-800 text-[1.05rem] leading-relaxed">
              {paragraph}
            </p>
          </div>
        </div>

        {/* 🔹 Scheidingslijn */}
        <div className="border-t border-white mb-10"></div>

        {/* 🔹 Rij 2 – Temperatuur grafiek */}
        <div className="w-full flex justify-between items-end h-[10rem] relative">
          {months.map((m) => {
            const height = (m.max / absMax) * 100;
            const color = getColor(m.max);
            return (
              <div
                key={m.name}
                className="flex flex-col items-center justify-end h-full"
              >
                {/* Temperatuur-label */}
                <p className="text-base text-gray-800 mb-2 font-semibold">
                  {m.max}°
                </p>

                {/* Balk */}
                <div
                  className={`w-6 md:w-7 rounded-t-md bg-gradient-to-t ${color} transition-all duration-700 ease-out`}
                  style={{
                    height: `${height}%`,
                    minHeight: "16px",
                  }}
                ></div>

                {/* Maand */}
                <p className="text-sm mt-2 text-gray-700 font-medium">
                  {m.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* 🔹 Legenda */}
        <div className="flex justify-center gap-4 mt-10 text-sm text-gray-700 font-body flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded bg-blue-500"></span>
            <span>{legendCold}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded bg-yellow-400"></span>
            <span>{legendMild}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded bg-orange-400"></span>
            <span>{legendWarm}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded bg-red-500"></span>
            <span>{legendHot}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateBox;
