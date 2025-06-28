"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import GameModal from "@/components/gamemodal";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// Animation variants
const containerVariants: Variants = {
  hidden: {}, // keep visible to prevent white flash
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Decorative backgrounds
const GridBackground: React.FC = () => (
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

export default function GameShowcase() {
  const [selectedGame, setSelectedGame] = useState<(typeof AllGames)[0] | null>(
    null
  );
  const gamesToDisplay = AllGames.slice(0, 3);

  return (
    <>
      <section
        id="games"
        className="relative w-full bg-charcoal text-white py-24 overflow-hidden"
      >
        <GridBackground />
        <VerticalLines />

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-0">
          {/* Title */}
          <h2
            className={`${orbitron.className} text-left text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-lg`}
          >
            Our Games
          </h2>

          {/* Grid Container */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {gamesToDisplay.map((game, idx) => (
              <motion.div
                key={game.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`group relative bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                  idx === 0 ? "md:col-span-2 h-[500px]" : "min-h-[380px]"
                }`}
                onClick={() => setSelectedGame(game)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${game.title}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      idx === 0
                        ? "(max-width: 768px) 100vw, 70vw"
                        : "(min-width: 1024px) 33vw, 100vw"
                    }
                    priority={idx === 0}
                  />
                  {/* Overlay for title on featured */}
                  {idx === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-8 flex flex-col justify-end">
                      <h3
                        className={`${orbitron.className} text-3xl md:text-4xl font-bold text-p3-snow mb-2`}
                      >
                        {game.title}
                      </h3>
                      <span className="text-p3-ghost-white text-base font-semibold uppercase tracking-widest mb-4">
                        {game.genre}
                      </span>
                      <p className="text-p3-snow text-lg max-w-2xl line-clamp-2">
                        {game.shortDescription}
                      </p>
                    </div>
                  )}
                  {/* Small cards content */}
                  {idx !== 0 && (
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3
                        className={`${orbitron.className} text-xl md:text-2xl font-bold text-p3-snow mb-1 group-hover:text-p3-mint-flash transition-colors`}
                      >
                        {game.title}
                      </h3>
                      <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-widest text-p3-ghost-white">
                        {game.genre}
                      </span>
                    </div>
                  )}
                </div>
                {/* Hover overlay */}
                {idx !== 0 && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {game.title}
                    </h3>
                    <span className="block text-xs font-semibold uppercase tracking-widest text-white">
                      {game.genre}
                    </span>
                    <button className="mt-4 px-4 py-1.5 border-2 border-white rounded-full text-white text-sm font-semibold hover:bg-white hover:text-p3-charcoal transition">
                      View Details &rarr;
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          {AllGames.length > 3 && (
            <div className="mt-12 flex">
              <Link
                href="/game"
                className="inline-flex items-center px-10 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:bg-gray-200 transition"
              >
                View All Games &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedGame && (
          <GameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </section>
    </>
  );
}
