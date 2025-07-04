"use client";

import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";
import { Games as AllGames } from "@/constants/constants";
import GameModal from "@/components/gamemodal";

// Font configuration
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// Constants
const platformOptions = ["All", "PC", "Xbox", "PlayStation", "iOS", "Android"];
const cardBaseStyles =
  "bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:border-p3-mint-flash cursor-pointer relative";
const overlayStyles =
  "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 z-10";
const buttonStyles = "px-5 py-2 rounded-full font-semibold text-sm transition";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

// Interfaces
interface Game {
  title: string;
  image: string;
  genre: string;
  shortDescription: string;
  platforms: string[];
  fullDescription: string;
  downloadLinks: { [platform: string]: string };
}

interface TitleProps {
  title: string;
}

interface CardProps {
  game: Game;
  onClick: () => void;
}

interface GameCardProps extends CardProps {
  i: number;
}

interface FeaturedGameCardProps {
  game: Game;
  onClick: () => void;
}

// Section Title Component
function SectionTitle({ title }: TitleProps) {
  return (
    <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start"> {/* Changed items-center to items-start for left alignment */}
      <h2
        className={`${orbitron.className} text-left text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-0 text-p3-snow drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]`} // Changed text-center to text-left
      >
        {title}
      </h2>
    </div>
  );
}

// Platform Filter Bar Component
function PlatformFilterBar({
  selectedPlatform,
  setSelectedPlatform,
}: {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-start"> {/* Changed justify-center to justify-start for left alignment */}
      {platformOptions.map((platform) => (
        <button
          key={platform}
          className={`${buttonStyles} ${
            selectedPlatform === platform
              ? "bg-p3-ghost-white text-p3-charcoal shadow"
              : "bg-p3-slate text-p3-ghost-white hover:bg-p3-ghost-white/30"
          }`}
          onClick={() => setSelectedPlatform(platform)}
        >
          {platform}
        </button>
      ))}
    </div>
  );
}

// Game Card Component
export function GameCard({ game, i, onClick }: GameCardProps) {
  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="
        group relative cursor-pointer overflow-hidden rounded-2xl
        shadow-xl transition-transform duration-300
        hover:scale-[1.02] focus:scale-[1.02]
      "
      style={{ aspectRatio: "16 / 9" }}
    >
      <Image
        src={game.image}
        alt={game.title}
        fill
        className="object-cover"
        priority={i === 0}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
        <span
          className={`${orbitron.className} uppercase text-sm text-p3-snow opacity-75`}
        >
          {game.genre}
        </span>
        <h3
          className={`${orbitron.className} uppercase text-2xl sm:text-3xl text-p3-ghost-white tracking-wide`}
        >
          {game.title}
        </h3>
      </div>

      <div
        className="
          absolute bottom-15 left-1/2 w-[80%] h-px bg-pure-white transform -translate-x-1/2
          opacity-0 transition-opacity duration-300
          group-hover:opacity-60
        "
      />
      <div
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-p3-pure-white
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      >
        →
      </div>
    </motion.div>
  );
}
// Featured Game Card Component
export function FeaturedGameCard({ game, onClick }: FeaturedGameCardProps) {
  return (
    <motion.div
      onClick={onClick}
      role="button"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="
        group relative cursor-pointer overflow-hidden rounded-2xl
        shadow-xl transition-transform duration-300
        hover:scale-[1.02] focus:scale-[1.02]
        border border-p3-mint-flash/30
      "
      style={{ aspectRatio: "16 / 9" }}
    >
      {/* Background Image */}
      <Image
        src={game.image}
        alt={game.title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />

      {/* Featured Badge */}
      <span
        className="
          absolute top-4 left-4 px-3 py-1 bg-p3-mint-flash/90
          text-p3-pure-white font-bold uppercase rounded-full
          text-xs tracking-wider shadow-md
          group-hover:bg-p3-mint-flash
          transition-colors duration-300
        "
      >
        Featured
      </span>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
        <span
          className={`${orbitron.className} uppercase text-sm text-p3-snow opacity-75`}
        >
          {game.genre}
        </span>
        <h3
          className={`${orbitron.className} uppercase text-3xl sm:text-4xl text-p3-ghost-white tracking-wide`}
        >
          {game.title}
        </h3>
      </div>

      {/* Hover Effects */}
      <div
        className="
          absolute bottom-15 left-1/2 w-[80%] h-px bg-p3-pure-white
          transform -translate-x-1/2
          opacity-0 transition-opacity duration-300
          group-hover:opacity-60
        "
      />
      <div
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-p3-pure-white
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      >
        →
      </div>
    </motion.div>
  );
}

// Main Game Showcase Component
export default function GameShowcase() {
  // Removed unused refs and states for title font size calculation
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");

  // Filter games by selected platform
  const Games = useMemo(() => {
    if (selectedPlatform === "All") return AllGames;
    return AllGames.filter((game) =>
      game.platforms
        .map((p) => p.toLowerCase())
        .includes(selectedPlatform.toLowerCase())
    );
  }, [selectedPlatform]);

  // Select first game as featured
  const featuredGame = AllGames[0];

  return (
    <>
      <section
        id="games"
        className="relative overflow-hidden py-12 sm:py-20 md:py-28" 
      >
        {/* Featured Games Section Title */}
        <SectionTitle
          title="Featured Games"
        />

        <div className="h-8 sm:h-12 md:h-16" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          {featuredGame && (
            <FeaturedGameCard
              game={featuredGame}
              onClick={() => setSelectedGame(featuredGame)}
            />
          )}
        </div>

        <div className="h-8 sm:h-12 md:h-16" />

        {/* Latest Games Section Title */}
        <SectionTitle
          title="Latest Games"
        />

        <div className="h-12 sm:h-16 md:h-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <PlatformFilterBar
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {Games.length === 0 && (
              <div className="col-span-full text-center text-p3-slate text-lg py-20">
                No games found for this platform.
              </div>
            )}
            {Games.map((game, i) => (
              <GameCard
                key={`${game.title}-${game.image}-${i}`}
                game={game}
                i={i}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </div>
      </section>
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </>
  );
}