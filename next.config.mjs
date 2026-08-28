import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

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

  async redirects() {
    const isProduction = process.env.NODE_ENV === "production";

    return [
      ...(isProduction
        ? [
            {
              source: "/:path*",
              has: [{ type: "host", value: "opakreta.be" }],
              destination: "https://www.opakreta.be/:path*",
              permanent: true,
            },
          ]
        : []),

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
    ];
  },
};

export default nextConfig;
