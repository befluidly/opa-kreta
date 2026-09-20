import React from "react";
import Image from "next/image";
import { isLocalImagePath } from "../lib/site";

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
      {/* Achtergrondafbeelding. Site-eigen paden ("/images/...") gaan via
          next/image: automatische AVIF/WebP + resizing (Cloudflare Images-
          binding, zie wrangler.jsonc) en priority, want dit is vrijwel altijd
          de LCP-kandidaat. Externe URL's (coverImage van een derde partij)
          blijven bewust een gewone <img> — next/image zou die eerst
          server-side moeten ophalen om te optimaliseren, en niet elke
          externe bron staat dat toe (hotlink-/botbescherming), terwijl een
          gewone <img> ze gewoon rechtstreeks in de browser laadt zoals
          voorheen. Zie lib/site.ts (isLocalImagePath) voor de afweging. */}
      {isLocalImagePath(imageUrl) ? (
        <Image
          src={imageUrl}
          alt={title || "Hero image"} // ✅ fallback alt-tekst
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <img
          src={imageUrl}
          alt={title || "Hero image"} // ✅ fallback alt-tekst
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

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
