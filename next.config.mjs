import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

initOpenNextCloudflareForDev();

// Koppelt i18n/request.ts aan next-intl. We gebruiken next-intl enkel voor
// zijn vertaalwoordenboek (useTranslations/getTranslations +
// NextIntlClientProvider) — NIET voor zijn routing-middleware: welke taal
// een pagina toont wordt al structureel bepaald door app/(nl)/ vs.
// app/(en)/en/ (zie middleware.ts voor waarom we geen tweede, potentieel
// conflicterende middleware willen naast de bestaande apex→www-redirect).
// Elke aanroep (getTranslations({locale, ...}) op de server,
// NextIntlClientProvider locale=... op de client) geeft daarom expliciet
// zijn eigen locale mee; i18n/request.ts is enkel het fallback-pad.
const withNextIntl = createNextIntlPlugin();

/**
 * ✅ Next.js Configuratie
 *
 * MDX-content (content/**\/*.mdx) wordt volledig gerenderd via
 * `next-mdx-remote/rsc` (zie app/[...slug]/page.tsx en components/RecipeLayout.tsx).
 * Er zijn geen .mdx-bestanden die als echte route/pagina fungeren, dus de
 * `@next/mdx`-webpack/Turbopack-loader is hier niet nodig.
 */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },

  // De apex→www-redirect (opakreta.be -> www.opakreta.be) staat niet hier,
  // maar in middleware.ts — zie de toelichting daar.
  async redirects() {
    return [
      {
        source: "/categorie/category/:path*",
        destination: "/categorie/:path*",
        permanent: true,
      },
      {
        source: "/categorie/shop",
        destination: "/shop",
        permanent: true,
      },

      // 404's uit Search Console (SEO-audit) — foutieve/verouderde slugs
      // die naar hun echte artikel of, bij gebrek daaraan, de dichtstbijzijnde
      // categoriepagina verwijzen.
      {
        source: "/opas-blog/het-leven-op-kreta/heraklion-in-the-winter",
        destination: "/opas-blog/het-leven-op-kreta/heraklion-in-de-winter",
        permanent: true,
      },
      {
        source: "/opas-blog/het-leven-op-kreta/heraklion-in-heraklion-in-de-winter",
        destination: "/opas-blog/het-leven-op-kreta/heraklion-in-de-winter",
        permanent: true,
      },
      // Let op trailing slash-variant: trailingSlash: false (hierboven)
      // redirect "/het-leven-op-kreta/" al sitewide naar "/het-leven-op-kreta"
      // vóórdat deze redirects() gematcht worden — dus een aparte entry met
      // een trailing slash in de source zou hier nooit geraakt worden. De
      // slash-variant volgt gewoon 2 hops (net als elke andere URL op deze
      // site met een trailing slash), zonder lus, en komt op dezelfde
      // bestemming uit.
      {
        source: "/opas-blog/het-leven-op-kreta/het-leven-op-kreta",
        destination: "/categorie/opas-blog/het-leven-op-kreta",
        permanent: true,
      },
      {
        source: "/gidsen/heraklion/knossos-hoe-lang-je-nodig",
        destination: "/gidsen/heraklion/knossos-hoe-lang-heb-je-nodig",
        permanent: true,
      },
      {
        source: "/praktisch/auto-huren-kreta",
        destination: "/praktisch/auto-huren-op-kreta",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
