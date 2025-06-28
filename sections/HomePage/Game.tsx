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
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }, // Slight stagger for smooth entry
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
        className="relative w-full text-white py-24 overflow-hidden "
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12"> {/* Standardized padding */}
          {/* Title */}
          <h2
            className={`${orbitron.className} text-left text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] mb-12`} // Added drop-shadow and margin-bottom for consistency
          >
            Our Games
          </h2>

          {/* Grid Container */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12" // Removed mt-12, adjusted gap
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {gamesToDisplay.map((game, idx) => (
              <motion.div
                key={game.title}
                variants={cardVariants} // Apply new card animation
                whileHover={{ scale: 1.02 }} // Gentle scale on hover
                transition={{ type: "spring", stiffness: 300 }} // Smooth spring transition
                className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 border border-p3-mint-flash/30 ${ // Added border and consistent shadow/transition
                  idx === 0 ? "md:col-span-2 h-[500px]" : "min-h-[380px]"
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105" // Image zoom on hover
                  sizes={
                    idx === 0
                      ? "(max-width: 768px) 100vw, 70vw"
                      : "(min-width: 1024px) 33vw, 100vw"
                  }
                  priority={idx === 0}
                />
                {/* Always apply a subtle overlay */}
                <div className={baseImageOverlay} />

                {/* Content for Featured Card (idx === 0) */}
                {idx === 0 && (
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <span className={`${orbitron.className} uppercase text-sm text-p3-snow opacity-75 mb-2`}>
                      {game.genre}
                    </span>
                    <h3 className={`${orbitron.className} text-4xl md:text-5xl font-bold mb-4`}> {/* Scaled up title */}
                      {game.title}
                    </h3>
                    <p className="text-lg text-p3-white-smoke leading-relaxed line-clamp-3 max-w-2xl mb-8"> {/* Added margin-bottom */}
                      {game.shortDescription}
                    </p>
                    {/* Hover effects for featured card - positioned relative to text */}
                    <div className="relative flex flex-col items-center">
                      <div className="w-[80%] h-px bg-pure-white transform opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                      <div className="text-2xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-2"> {/* Added margin-top */}
                        &rarr;
                      </div>
                    </div>
                  </div>
                )}

                {/* Content for Smaller Cards (idx !== 0) */}
                {idx !== 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <span className={`${orbitron.className} uppercase text-sm text-p3-snow opacity-75 mb-2`}>
                      {game.genre}
                    </span>
                    <h3 className={`${orbitron.className} text-3xl sm:text-4xl font-bold tracking-wide`}> {/* Scaled up title */}
                      {game.title}
                    </h3>
                    {/* Hover effects for smaller cards - positioned at the bottom */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"> {/* Positioned at bottom */}
                      <div className="w-[80%] h-px bg-pure-white transform opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                      <div className="text-2xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-2"> {/* Added margin-top */}
                        &rarr;
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          {AllGames.length > 3 && (
            <div className="mt-16 flex justify-start"> {/* Changed text-center to flex justify-start */}
              <Link
                href="/game"
                className="inline-flex items-center px-10 py-4 bg-p3-pure-white text-p3-charcoal font-semibold rounded-lg shadow-xl hover:bg-p3-mint-flash/80 transition-colors duration-300" // Styled button to match new theme
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