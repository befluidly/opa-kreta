import React from "react";

interface PageHeroProps {
  title?: string; // 👈 optioneel gemaakt
  subtitle?: string;
  imageUrl: string;
  waveColor?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  imageUrl,
  waveColor = "#ffffff",
}) => {
  return (
    <section className="relative w-full h-[45vh] min-h-[300px] md:h-[40vh] overflow-hidden animate-fade-in">
      {/* Achtergrondafbeelding */}
      <img
        src={imageUrl}
        alt={title || "Hero image"} // ✅ fallback alt-tekst
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🌊 Wave onderaan */}
      <div className="absolute bottom-0 left-0 w-screen overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-screen h-[100px] md:h-[120px] translate-y-[1px]"
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

export default PageHero;
