import Layout from "../components/Layout";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import IntroBox from "../components/IntroBox";
import ClimateBox from "../components/ClimateBox";
import { getAllPosts } from "../lib/api";
import { Post } from "../types/post";
import AffiliateRow from "../components/AffiliateRow";
import GreekPhrases from "../components/GreekPhrases";

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      {/* Hero sectie */}
      <Hero />

      {/* Laatste artikels + Intro */}
      <section
        id="content"
        className="relative z-30 max-w-screen-xl mx-auto px-4 mt-10 md:mt-14 mb-0"
      >
        <LatestPosts posts={posts} />
      </section>

      {/* 🔹 Nieuwe Affiliate sectie */}
      <AffiliateRow />

      {/* Klimaat & cultuur sectie */}
      <section className="max-w-screen-xl mx-auto px-4 space-y-10">
        <ClimateBox />
        <GreekPhrases />

        {/* Over mij box */}
        <div className="pt-6 border-t border-gray-200">
          <IntroBox />
        </div>
      </section>
    </Layout>
  );
}


/* 🔹 Static props: haalt de laatste posts op */
export async function getStaticProps() {
  const posts = getAllPosts()
    .filter((post) => post.date)
    .sort((a, b) => {
      const dateA = postDateToTimestamp(a.date);
      const dateB = postDateToTimestamp(b.date);
      return dateB - dateA;
    })
    .slice(0, 4);

  return {
    props: { posts },
  };
}

/* 🔸 Helper-functie: veilig parsen van datums */
function postDateToTimestamp(date?: string): number {
  if (!date) return 0;
  const parsed = Date.parse(date);
  return isNaN(parsed) ? 0 : parsed;
}
