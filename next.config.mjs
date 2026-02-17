import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/**
 * ✅ Activeer MDX-ondersteuning
 */
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});

/**
 * ✅ Next.js Configuratie
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
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],

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
    ];
  },
};

export default withMDX(nextConfig);