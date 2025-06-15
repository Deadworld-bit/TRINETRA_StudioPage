"use client";

import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import GameModal from "@/components/gamemodal";

const platformOptions = [
  "All",
  "PC",
  "Xbox",
  "PlayStation",
  "Switch",
  "iOS",
  "Android",
];

export default function GameShowcase() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);
  const [selectedGame, setSelectedGame] = useState<(typeof AllGames)[0] | null>(
    null
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleFontSize(parseFloat(computed.fontSize));
    }
  }, []);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Filtered games by platform
  const Games = useMemo(() => {
    if (selectedPlatform === "All") return AllGames;
    return AllGames.filter((game) =>
      game.platforms
        .map((p) => p.toLowerCase())
        .includes(selectedPlatform.toLowerCase())
    );
  }, [selectedPlatform]);

  return (
    <>
      <section
        id="games"
        className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
      >
        {/* Vertical Lines Background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.75"
              style={{
                left: `${(i * 100) / 6}%`,
                background: "rgba(20, 106, 163, 0.13)",
                opacity: 0.7,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* Watermark */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full">
            <h1
              className="font-extrabold uppercase leading-none text-white/5 tracking-tighter whitespace-nowrap"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.10)",
                WebkitTextFillColor: "var(--charcoal)",
                color: "var(--charcoal)",
                fontSize: `${titleFontSize * 1.75}px`,
                lineHeight: 1,
                transition: "font-size 0.2s",
              }}
            >
              Our Games
            </h1>
          </div>
          <h2
            ref={titleRef}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-pure-white drop-shadow-lg"
            style={{
              transition: "font-size 0.2s",
            }}
          >
            Our Games
          </h2>
        </div>

        <div className="h-12 sm:h-16 md:h-20" />

        {/* Sort Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10">
          <div className="flex flex-wrap gap-3 items-center">
            {platformOptions.map((platform) => (
              <button
                key={platform}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition
                  ${
                    selectedPlatform === platform
                      ? "bg-p2-mint-flash text-p2-charcoal shadow"
                      : "bg-p2-slate/60 text-p2-mint-flash hover:bg-p2-mint-flash/30"
                  }
                `}
                onClick={() => setSelectedPlatform(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
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
              <div className="col-span-full text-center text-p2-gray-whisper text-lg py-20">
                No games found for this platform.
              </div>
            )}
            {Games.map((game, i) => (
              <motion.div
                key={game.title + game.image + i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="
                  group bg-p2-slate border border-p2-mint-flash/30 rounded-2xl shadow-lg 
                  flex flex-col overflow-hidden transition hover:shadow-2xl hover:border-p2-mint-flash
                  cursor-pointer relative
                  min-h-[420px] md:min-h-[480px] lg:min-h-[520px]
                "
                onClick={() => setSelectedGame(game)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${game.title}`}
              >
                {/* Game Image */}
                <div className="relative w-full aspect-[4/3] bg-p2-slate min-h-[220px] md:min-h-[260px] lg:min-h-[320px]">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 500px, 100vw"
                    priority={i === 0}
                  />
                </div>
                {/* Game Info */}
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-2 group-hover:text-p2-mint-flash transition">
                    {game.title}
                  </h3>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-p2-mint-flash mb-2">
                    {game.genre}
                  </span>
                  <p className="text-p2-gray-whisper text-base mb-4 line-clamp-3">
                    {game.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="bg-p2-mint-flash/10 text-p2-mint-flash text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                  <span className="text-lg font-semibold text-pure-white">
                    Click to view details
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Game Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </>
  );
}
