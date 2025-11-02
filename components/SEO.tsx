import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

export default function SEO({
  title = "Opa Kreta – Verhalen, tips & gidsen over Kreta",
  description = "Lees de verhalen van Opa over het leven op Kreta, handige reistips, gidsen en persoonlijke ervaringen.",
  canonical,
  image = "https://www.opakreta.be/images/hero/kreta-sea.jpg", // ✅ met www
}: SEOProps) {
  const router = useRouter();

  // Huidige pad zonder trailing slash
  const currentPath = router.asPath.replace(/\/$/, "");
  const siteUrl = "https://www.opakreta.be";

  // Als canonical expliciet wordt doorgegeven, gebruik die — anders bouw het op
  const fullCanonical = canonical
    ? `${siteUrl}/${canonical.replace(/^\/+/, "")}`
    : `${siteUrl}${currentPath || ""}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={fullCanonical}
      openGraph={{
        title,
        description,
        url: fullCanonical,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        siteName: "Opa Kreta",
      }}
      twitter={{
        cardType: "summary_large_image",
        site: "@opakreta",
      }}
    />
  );
}
