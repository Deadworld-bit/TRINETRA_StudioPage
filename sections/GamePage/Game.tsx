"use client";

import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import {
  FaSteam,
  FaGooglePlay,
  FaPlaystation,
  FaXbox,
  FaAppStore,
} from "react-icons/fa";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import GameModal from "@/components/gamemodal";
import { FaTag } from "react-icons/fa";
import { Orbitron } from "next/font/google";

// Use Orbitron for consistency
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const platformOptions = ["All", "PC", "Xbox", "PlayStation", "iOS", "Android"];

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

// Vertical lines background
function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${(i * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/parrtern_02.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

// Watermark and Title
function SectionTitle({
  titleRef,
  titleFontSize,
  watermark,
  title,
}: {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  titleFontSize: number;
  watermark: string;
  title: string;
}) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
      {/* Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full">
        <h1
          className={`${orbitron.className} font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap`}
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.10)",
            WebkitTextFillColor: "var(--p3-charcoal)",
            fontSize: `${titleFontSize * 1.75}px`,
            lineHeight: 1,
            transition: "font-size 0.2s",
          }}
        >
          {watermark}
        </h1>
      </div>
      <h2
        ref={titleRef}
        className={`${orbitron.className} relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-p3-snow drop-shadow-lg`}
        style={{
          transition: "font-size 0.2s",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function PlatformDivider() {
  return (
    <div
      className="fixed left-0 w-screen z-20"
      style={{
        position: "relative",
        background: "var(--charcoal)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-6 px-6 py-10 mx-auto rounded-2xl">
        <span
          className="text-white text-2xl md:text-4xl font-semibold text-left leading-snug mb-4 md:mb-0"
          style={{ fontFamily: "inherit" }}
        >
          Get ready to play your heart out!
          <br className="hidden md:block" />
          Download now and unlock a world of gaming wonders.
        </span>
        <div className="flex items-center gap-6 md:ml-8">
          <FaSteam className="text-white" size={38} />
          <FaGooglePlay className="text-white" size={38} />
          <FaPlaystation className="text-white" size={38} />
          <FaXbox className="text-white" size={38} />
          <FaAppStore className="text-white" size={38} />
        </div>
      </div>
    </div>
  );
}

// Platform Filter Bar
function PlatformFilterBar({
  selectedPlatform,
  setSelectedPlatform,
}: {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {platformOptions.map((platform) => (
        <button
          key={platform}
          className={`px-5 py-2 rounded-full font-semibold text-sm transition
            ${
              selectedPlatform === platform
                ? "bg-p3-ghost-white text-p3-charcoal shadow"
                : "bg-p3-slate text-p3-ghost-white hover:bg-p3-ghost-white/30"
            }
          `}
          onClick={() => setSelectedPlatform(platform)}
        >
          {platform}
        </button>
      ))}
    </div>
  );
}

// Game Card
function GameCard({
  game,
  i,
  onClick,
}: {
  game: (typeof AllGames)[0];
  i: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      key={game.title + game.image + i}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="
        group bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl shadow-lg 
        flex flex-col overflow-hidden transition hover:shadow-2xl hover:border-p3-mint-flash
        cursor-pointer relative
        min-h-[420px] md:min-h-[480px] lg:min-h-[520px]
      "
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${game.title}`}
    >
      {/* Game Image - fixed aspect ratio, center-cropped, fixed height */}
      <div className="relative w-full h-[250px] bg-p3-slate flex items-center justify-center overflow-hidden">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover object-center w-full h-full"
          sizes="(min-width: 1024px) 500px, 100vw"
          priority={i === 0}
        />
      </div>
      {/* Game Info */}
      <div className="flex flex-col flex-1 p-8">
        <h3
          className={`${orbitron.className} text-2xl md:text-3xl font-bold text-p3-snow mb-2 group-hover:text-p3-mint-flash transition`}
        >
          {game.title}
        </h3>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-p3-ghost-white mb-2">
          {game.genre}
        </span>
        <p className="text-p3-snow text-base mb-4 line-clamp-3">
          {game.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {game.platforms.map((platform) => (
            <span
              key={platform}
              className="bg-p3-slate text-p3-ghost-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
      {/* Overlay on hover: 90% black, title/genre in white, minimalist outline button */}
      <div
        className="
        absolute inset-0 flex flex-col items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-black/90 z-10
      "
      >
        <div className="text-center space-y-3">
          <h3 className={`${orbitron.className} text-2xl font-bold text-white`}>
            {game.title}
          </h3>
          <span className="block text-xs font-semibold uppercase tracking-widest text-white">
            {game.genre}
          </span>
          <button
            tabIndex={-1}
            className="
              mt-4 px-5 py-2 border-2 border-white rounded-full
              text-white font-semibold text-sm bg-transparent
              hover:bg-white hover:text-p3-charcoal transition
              shadow-none outline-none
            "
          >
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Featured Game Card
function FeaturedGameCard({
  game,
  onClick,
}: {
  game: (typeof AllGames)[0];
  onClick: () => void;
}) {
  return (
    <motion.div
      key={game.title + game.image}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className="
        group bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl shadow-lg 
        flex flex-col md:flex-row overflow-hidden transition hover:shadow-2xl hover:border-p3-mint-flash
        cursor-pointer relative
        min-h-[300px] md:min-h-[350px]
      "
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${game.title}`}
    >
      {/* Game Image - larger for featured section */}
      <div className="relative w-full md:w-1/2 h-[250px] md:h-[350px] bg-p3-slate flex items-center justify-center overflow-hidden">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover object-center w-full h-full"
          sizes="(min-width: 1024px) 700px, 100vw"
          priority
        />
      </div>
      {/* Game Info */}
      <div className="flex flex-col flex-1 p-8">
        <h3
          className={`${orbitron.className} text-3xl md:text-4xl font-bold text-p3-snow mb-2 group-hover:text-p3-mint-flash transition`}
        >
          {game.title}
        </h3>
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-p3-ghost-white mb-2">
          {game.genre}
        </span>
        <p className="text-p3-snow text-lg mb-4 line-clamp-4">
          {game.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {game.platforms.map((platform) => (
            <span
              key={platform}
              className="bg-p3-slate text-p3-ghost-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
      {/* Overlay on hover: 90% black, title/genre in white, minimalist outline button */}
      <div
        className="
        absolute inset-0 flex flex-col items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-black/90 z-10
      "
      >
        <div className="text-center space-y-3">
          <h3
            className={`${orbitron.className} text-3xl md:text-4xl font-bold text-white`}
          >
            {game.title}
          </h3>
          <span className="block text-sm font-semibold uppercase tracking-widest text-white">
            {game.genre}
          </span>
          <button
            tabIndex={-1}
            className="
              mt-4 px-5 py-2 border-2 border-white rounded-full
              text-white font-semibold text-sm bg-transparent
              hover:bg-white hover:text-p3-charcoal transition
              shadow-none outline-none
            "
          >
            View →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function GameShowcase() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredTitleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);
  const [featuredTitleFontSize, setFeaturedTitleFontSize] =
    useState<number>(48);
  const [selectedGame, setSelectedGame] = useState<(typeof AllGames)[0] | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleFontSize(parseFloat(computed.fontSize));
    }
    if (featuredTitleRef.current) {
      const computed = window.getComputedStyle(featuredTitleRef.current);
      setFeaturedTitleFontSize(parseFloat(computed.fontSize));
    }
  }, []);

  // Filtered games by platform
  const Games = useMemo(() => {
    if (selectedPlatform === "All") return AllGames;
    return AllGames.filter((game) =>
      game.platforms
        .map((p) => p.toLowerCase())
        .includes(selectedPlatform.toLowerCase())
    );
  }, [selectedPlatform]);

  // Select the first game as the featured game (modify this logic as needed)
  const featuredGame = AllGames[0];

  return (
    <>
      <section
        id="games"
        className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
      >
        <VerticalLines />
        <GridBackground />

        {/* Featured Games Section */}
        <SectionTitle
          titleRef={featuredTitleRef}
          titleFontSize={featuredTitleFontSize}
          watermark="Featured Games"
          title="Featured Games"
        />

        <div className="h-8 sm:h-12 md:h-16" />

        {/* Featured Game Card */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          {featuredGame && (
            <FeaturedGameCard
              game={featuredGame}
              onClick={() => setSelectedGame(featuredGame)}
            />
          )}
        </div>

        <div className="h-8 sm:h-12 md:h-16" />

        {/* Watermark and Title for All Games */}
        <SectionTitle
          titleRef={titleRef}
          titleFontSize={titleFontSize}
          watermark="Latest Games"
          title="Latest Games"
        />

        <div className="h-12 sm:h-16 md:h-20" />

        {/* Sort Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
          <PlatformFilterBar
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>

        {/* Game Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3 
              gap-10
            "
          >
            {Games.length === 0 && (
              <div className="col-span-full text-center text-p3-slate text-lg py-20">
                No games found for this platform.
              </div>
            )}
            {Games.map((game, i) => (
              <GameCard
                key={game.title + game.image + i}
                game={game}
                i={i}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <div className="relative z-20">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <PlatformDivider />
        </div>
      </div> */}
      {/* Game Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </>
  );
}
