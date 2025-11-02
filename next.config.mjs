import createMDX from "@next/mdx";

/**
 * ✅ Activeer MDX-ondersteuning
 */
const withMDX = createMDX({
  extension: /\.mdx?$/,
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
      // ✅ non-www → www redirect enkel in productie
      ...(isProduction
        ? [
            {
              source: "/:path*",
              has: [{ type: "host", value: "opakreta.be" }], // ⬅️ Enkel exact domein zonder www
              destination: "https://www.opakreta.be/:path*",
              permanent: true,
            },
          ]
        : []),

      // ✅ Correctie voor oude categorie-URLs
      {
        source: "/categorie/category/:path*",
        destination: "/categorie/:path*",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
