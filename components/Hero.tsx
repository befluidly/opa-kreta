import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[350px] md:h-[70vh] overflow-hidden animate-fade-in">
      {/* Achtergrondafbeelding */}
      <img
        src="/images/hero/hero.jpg"
        alt="Uitzicht over Kreta met bergen en zee"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center pt-16 md:pt-0">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Ervaar het echte Kreta
        </h1>
        <p className="hidden md:block mt-4 text-lg md:text-2xl max-w-2xl drop-shadow-md">
          Praktische tips, inspiratie en insider-advies voor jouw vakantie.
        </p>
        <a
  href="/categorie/opas-blog"
  className="mt-8 inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-6 rounded-lg transition"
>
  Ga naar Opa&apos;s Blog
</a>


      </div>

      {/* 🌊 Wave onderaan - VOLLEDIGE BREEDTE */}
      <div className="absolute bottom-0 left-0 w-screen overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-screen h-[120px] translate-y-[1px]"
        >
          <path
            fill="rgb(249 250 251)"
            fillOpacity="1"
            d="M0,192L60,197.3C120,203,240,213,360,229.3C480,245,600,267,720,245.3C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
