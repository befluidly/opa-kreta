interface AffiliateLink {
  label: string;
  url: string;
}

interface AffiliateBoxProps {
  links?: AffiliateLink[];
  align?: "left" | "center" | "right";
  type?: "inline" | "box";
  title?: string;
  label?: string;
}

export default function AffiliateBox({
  links = [],
  align = "center",
  type = "inline",
  title,
  label = "Boeken & Praktisch",
}: AffiliateBoxProps) {
  if (!Array.isArray(links) || links.length === 0) return null;

  const justify =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  // Stijl voor knoppen
  const buttonClass =
    "inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-3 px-5 rounded-lg transition text-sm no-underline hover:no-underline";

  // ✅ Inline versie: gewoon een rij knoppen
  if (type === "inline") {
    return (
      <div className={`flex flex-wrap gap-3 my-6 ${justify}`}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }

  // ✅ Box versie: met titel, border, schaduw, witte achtergrond
return (
  <aside className="my-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
    <div className="text-sm font-semibold uppercase text-skyBlue">
      {label}
    </div>
    {title && (
      <h3 className="text-lg font-semibold text-darkCornflower mt-1">
        {title}
      </h3>
    )}

    <div className={`flex flex-wrap gap-3 mt-4 ${justify}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {link.label}
        </a>
      ))}
    </div>
  </aside>
  );
}
