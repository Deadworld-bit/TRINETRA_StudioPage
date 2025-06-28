"use client";

import Hero from "@/sections/GamePage/Hero";
import Game from "@/sections/GamePage/Game";

// --- Decorative Components ---
const GridBackground: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/wallpaper_bg15.jpg")',
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

export default function GamePage() {
  return (
    <div>
      <Hero />
      <div className="relative w-full bg-charcoal">
        <GridBackground />
        <VerticalLines />
        <Game />
      </div>
    </div>
  );
}
