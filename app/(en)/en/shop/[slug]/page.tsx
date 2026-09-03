import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Product: ${slug}`,
    description: "View this Opa Kreta product",
  };
}

export default async function EnglishProductPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="max-w-screen-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Product: {slug}</h1>
      <p>
        Details for the product with slug <strong>{slug}</strong> will appear here.
      </p>
    </main>
  );
}
