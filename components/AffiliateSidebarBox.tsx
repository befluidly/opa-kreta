interface AffiliateSidebarBoxProps {
  title?: string;
  text?: string;
  link?: string;
  button?: string;
  image?: string;
  defaultTitle?: string;
  defaultText?: string;
  defaultButton?: string;
  imageAltFallback?: string;
}

export default function AffiliateSidebarBox({
  title,
  text,
  link,
  button,
  image,
  defaultTitle = "Onze Aanbeveling",
  defaultText = "Boek je huurauto of accommodatie via onze betrouwbare partners. Zo steun je Opa’s Kreta en betaal je niets extra!",
  defaultButton = "Bekijk deals",
  imageAltFallback = "Aanbevolen deal",
}: AffiliateSidebarBoxProps) {
  if (!link) return null;

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden p-4 text-sm text-skyBlue">
      {/* ✅ optionele afbeelding */}
      {image && (
        <div className="mb-3 -mx-4 -mt-4">
          <img
            src={image}
            alt={title || imageAltFallback}
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-darkCornflower mb-3">
        {title || defaultTitle}
      </h3>

      <p className="text-sm text-gray-700 mb-3">{text || defaultText}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-skyBlue hover:bg-skyBlue/80 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        ➜ {button || defaultButton}
      </a>
    </div>
  );
}