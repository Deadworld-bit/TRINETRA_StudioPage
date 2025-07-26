import { Games as AllGames } from "@/constants/constants";
import Hero from "@/sections/DetailPage/Hero";
import GameDetail from "@/sections/DetailPage/GameDetail";
import { notFound } from "next/navigation";

const GridBackground: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.22,
    }}
  />
);

function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${((i + 1) * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = AllGames.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="relative bg-p3-charcoal text-p3-white-smoke overflow-x-hidden">
      <GridBackground imageUrl={game.backgroundPic} />
      <VerticalLines />
      <div className="relative z-10">
        <Hero title={game.title} imageUrl={game.image} />
        <GameDetail game={game} />
      </div>
    </main>
  );
}
