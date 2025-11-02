// pages/shop/[slug].tsx
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <p>Product wordt geladen...</p>;
  }

  return (
    <>
      <NextSeo title={`Product: ${slug}`} description="Bekijk dit product van Opa Kreta" />
      <main className="max-w-screen-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Product: {slug}</h1>
        <p>Hier komt de detailinformatie van het product met slug <strong>{slug}</strong>.</p>
      </main>
    </>
  );
}
