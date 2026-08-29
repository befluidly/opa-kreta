import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Product: ${slug}`,
    description: "Bekijk dit product van Opa Kreta",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="max-w-screen-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Product: {slug}</h1>
      <p>
        Hier komt de detailinformatie van het product met slug <strong>{slug}</strong>.
      </p>
    </main>
  );
}
