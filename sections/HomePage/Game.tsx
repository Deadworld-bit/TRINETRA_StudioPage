"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import GameModal from "@/components/gamemodal";
import { Playfair_Display, Manrope } from "next/font/google";
import Link from "next/link";

// Load Google Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700"] });

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const baseImageOverlay = "absolute inset-0 bg-black/40";

export default function GameShowcase() {
  const [selectedGame, setSelectedGame] = useState<(typeof AllGames)[0] | null>(
    null
  );
  const gamesToDisplay = AllGames.slice(0, 3);

  return (
    <>
      <section
        id="games"
        className={`relative w-full text-white py-16 px-8 md:px-16 lg:px-32 overflow-hidden ${playfair.className}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-p3-snow drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] mb-8`}
          >
            Our Games
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {gamesToDisplay.map((game, idx) => (
              <motion.div
                key={game.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 border border-p3-mint-flash/30 ${
                  idx === 0 ? "md:col-span-2 h-[450px]" : "min-h-[360px]"
                }`}
                onClick={() => setSelectedGame(game)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${game.title}`}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    idx === 0
                      ? "(max-width: 768px) 100vw, 70vw"
                      : "(min-width: 1024px) 33vw, 100vw"
                  }
                  priority={idx === 0}
                />
                <div className={baseImageOverlay} />

                {idx === 0 && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <span className={`${manrope.className} uppercase text-base md:text-sm text-p3-snow opacity-75 mb-2`}>{game.genre}</span>
                    <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-3`}>{game.title}</h3>
                    <p className={`${manrope.className} text-base md:text-lg text-p3-white-smoke leading-relaxed line-clamp-3 max-w-2xl mb-6`}>{game.shortDescription}</p>
                    <div className="relative flex flex-col items-center">
                      <div className="w-[80%] h-px bg-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                      <div className="text-xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-1">→</div>
                    </div>
                  </div>
                )}

                {idx !== 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <span className={`${manrope.className} uppercase text-base md:text-sm text-p3-snow opacity-75 mb-2`}>{game.genre}</span>
                    <h3 className={`${playfair.className} text-2xl md:text-3xl font-bold tracking-wide mb-2`}>{game.title}</h3>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-[80%] h-px bg-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                      <div className="text-xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-1">→</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {AllGames.length > 3 && (
            <div className="mt-12 flex justify-start">
              <Link
                href="/game"
                className={`${manrope.className} inline-flex items-center px-8 py-3 bg-p3-pure-white text-p3-charcoal font-semibold rounded-lg shadow-xl hover:bg-p3-mint-flash/80 transition-colors duration-300`}
              >
                View All Games →
              </Link>
            </div>
          )}
        </div>
        {selectedGame && <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
      </section>
    </>
  );
}
