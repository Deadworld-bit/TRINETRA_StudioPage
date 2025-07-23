// app/game/[slug]/page.tsx

import { Games as AllGames } from "@/constants/constants";
import Hero from "@/sections/DetailPage/Hero";
import GameDetail from "@/sections/DetailPage/GameDetail";
import { notFound } from "next/navigation";

const GridBackground: React.FC = () => (
  <div className="absolute inset-0 h-full w-full bg-p3-charcoal bg-grid-p3-white-smoke/[0.2] -z-10" />
);

function VerticalLines() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <div className="container mx-auto h-full relative">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-p3-white-smoke/10"
            style={{ left: `${(i + 1) * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Note: params is now a Promise<{ slug: string }>
export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // await the params to get your slug out
  const { slug } = await params;
  const game = AllGames.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="relative bg-p3-charcoal text-p3-white-smoke overflow-x-hidden">
      <GridBackground />
      <VerticalLines />
      <div className="relative z-10">
        <Hero title={game.title} imageUrl={game.image} />
        <GameDetail game={game} />
      </div>
    </main>
  );
}
