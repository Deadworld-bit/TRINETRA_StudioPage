"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import GameModal from "@/components/gamemodal";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/ConvertedPic/parrtern_02.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

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

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="w-full px-8 md:px-16 lg:px-32 mx-auto">
      <h2
        className={`${orbitron.className} text-left text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-lg`}
      >
        {title}
      </h2>
    </div>
  );
}

export default function GameShowcase() {
  const [selectedGame, setSelectedGame] = useState<(typeof AllGames)[0] | null>(
    null
  );

  const gamesToDisplay = AllGames.slice(0, 3);
  const featuredGame = gamesToDisplay[0];
  const smallerGames = gamesToDisplay.slice(1, 3);

  return (
    <>
      <motion.section
        id="games"
        className="relative w-full bg-charcoal text-white pt-32 pb-32 px-8 md:px-16 lg:px-32 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <GridBackground />
        <VerticalLines />
        {/* Header*/}
        <div className="relative z-10 w-full mx-auto mb-12">
          <SectionHeader title="Our Games" />
        </div>

        {/* Grid Layout */}
        <div className="relative z-10 w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 px-8 md:px-16 lg:px-32">
          {featuredGame && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="relative col-span-full md:col-span-2 bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-2xl hover:border-p3-mint-flash transition-all duration-300"
              onClick={() => setSelectedGame(featuredGame)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${featuredGame.title}`}
            >
              <div className="relative h-[350px] md:h-[500px] w-full">
                <Image
                  src={featuredGame.image}
                  alt={featuredGame.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 70vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <h3
                    className={`${orbitron.className} text-3xl md:text-4xl font-bold text-p3-snow mb-2`}
                  >
                    {featuredGame.title}
                  </h3>
                  <span className="text-p3-ghost-white text-base font-semibold uppercase tracking-widest mb-4">
                    {featuredGame.genre}
                  </span>
                  <p className="text-p3-snow text-lg max-w-2xl line-clamp-2">
                    {featuredGame.shortDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {smallerGames.map((game, i) => (
            <motion.div
              key={game.title + i}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="group bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl shadow-lg flex flex-col overflow-hidden transition hover:shadow-2xl hover:border-p3-mint-flash cursor-pointer relative min-h-[380px]"
              onClick={() => setSelectedGame(game)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${game.title}`}
            >
              <div className="relative w-full h-[180px] bg-p3-slate flex items-center justify-center overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3
                  className={`${orbitron.className} text-xl md:text-2xl font-bold text-p3-snow mb-1 group-hover:text-p3-mint-flash transition`}
                >
                  {game.title}
                </h3>
                <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-p3-ghost-white mb-3">
                  {game.genre}
                </span>
                <p className="text-p3-snow text-sm md:text-base line-clamp-3">
                  {game.shortDescription}
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 z-10">
                <div className="text-center space-y-2">
                  <h3
                    className={`${orbitron.className} text-xl font-bold text-white`}
                  >
                    {game.title}
                  </h3>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-white">
                    {game.genre}
                  </span>
                  <button
                    tabIndex={-1}
                    className="mt-3 px-4 py-1.5 border-2 border-white rounded-full text-white font-semibold text-sm bg-transparent hover:bg-white hover:text-p3-charcoal transition shadow-none outline-none"
                  >
                    View &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 w-full px-8 md:px-16 lg:px-32">
          {AllGames.length > 3 && (
            <Link
              href="/games"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-semibold rounded-lg shadow-xl transition-colors duration-300 hover:bg-gray-200"
            >
              View All Games &rarr;
            </Link>
          )}
        </div>

        {selectedGame && (
          <GameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </motion.section>
    </>
  );
}
