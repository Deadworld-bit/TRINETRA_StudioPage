"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Games, Game } from "@/constants/constants";
import GameModal from "@/components/gamemodal";

// Heroicons (outline) for nicer arrows
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MARGIN_RIGHT_PERCENT = 4;    // Percentage gap between cards
const AUTOSCROLL_INTERVAL = 5000;  // 5 seconds

export default function GameCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Determine how many cards to show at once based on window.innerWidth
  const getVisibleCount = () => {
    if (typeof window === "undefined") {
      // During SSR, assume 1
      return 1;
    }
    const w = window.innerWidth;
    if (w >= 1024) return 3; // desktop
    if (w >= 640) return 2;  // tablet
    return 1;                // mobile
  };

  const [visibleCount, setVisibleCount] = useState<number>(() => getVisibleCount());

  // Update visibleCount on window resize
  useEffect(() => {
    const updateCount = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
    };
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // Wrap index around [0 .. Games.length−1]
  const clamp = useCallback((index: number): number => {
    const len = Games.length;
    if (len === 0) return 0;
    return ((index % len) + len) % len;
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => clamp(c - 1));
  }, [clamp]);

  const next = useCallback(() => {
    setCurrent((c) => clamp(c + 1));
  }, [clamp]);

  // Compute each card’s width so that (visibleCount × cardWidth) + ((visibleCount−1) × margin) = 100%
  const itemWidthPercent = useMemo(() => {
    if (visibleCount <= 1) {
      return 100;
    }
    return (100 - (visibleCount - 1) * MARGIN_RIGHT_PERCENT) / visibleCount;
  }, [visibleCount]);

  // Compute how far to shift the flex container so that the "current" card is centered
  const xOffset = useMemo(() => {
    // e.g. if itemWidthPercent = 30.666... then initialCenterOffset = (100 - 30.666..) / 2
    const initialCenteringOffset = (100 - itemWidthPercent) / 2;
    const stepPerItem = itemWidthPercent + MARGIN_RIGHT_PERCENT; 
    // Move left by (current × stepPerItem)% from the centering offset
    return `calc(${initialCenteringOffset}% - ${current * stepPerItem}%)`;
  }, [current, itemWidthPercent]);

  // Auto‐scroll unless hovering or modal is open or there’s only 1 game
  useEffect(() => {
    if (isHovering || Games.length <= 1 || isModalOpen) return;
    const timerId = setInterval(next, AUTOSCROLL_INTERVAL);
    return () => clearInterval(timerId);
  }, [current, isHovering, next, isModalOpen]);

  const handleGameCardClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <section
        className="relative py-16 bg-dark-gray text-white overflow-hidden"
        id="games"
      >
        <h2 className="text-6xl font-extrabold text-center mb-12">
          Our Games
        </h2>

        {/* Full‐width container (no max‐width) */}
        <div
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: xOffset }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {Games.map((game, idx) => {
              const isLast = idx === Games.length - 1;
              return (
                <div
                  key={`${game.title}-${idx}`}
                  className="flex-shrink-0 p-2"
                  style={{
                    width: `${itemWidthPercent}%`,
                    marginRight: isLast ? "0%" : `${MARGIN_RIGHT_PERCENT}%`,
                  }}
                >
                  <div
                    className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl
                               transform transition-transform duration-300 hover:scale-105"
                    onClick={() => handleGameCardClick(game)}
                  >
                    {/* Image */}
                    <div className="relative h-96 w-full">
                      <Image
                        src={game.image}
                        alt={game.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl"
                      />
                    </div>

                    {/* Always‐visible bottom gradient for readability */}
                    <div className="absolute bottom-0 left-0 w-full h-24
                                    bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                    {/* On‐hover overlay (darken + center title) */}
                    <div className="absolute inset-0 bg-black bg-opacity-40
                                    flex items-center justify-center
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300"
                    >
                      <h3 className="text-3xl md:text-4xl font-semibold text-white px-4 text-center">
                        {game.title}
                      </h3>
                    </div>

                    {/* Always show a smaller title at bottom center */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                      <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {game.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Prev / Next buttons */}
          {Games.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-[-1.5rem] sm:left-[-2rem] top-1/2 -translate-y-1/2
                           bg-white rounded-full p-3 shadow-lg hover:bg-white/90
                           transition-colors duration-200 z-10"
                aria-label="Previous game"
              >
                <ChevronLeftIcon className="h-6 w-6 text-dark-gray" />
              </button>
              <button
                onClick={next}
                className="absolute right-[-1.5rem] sm:right-[-2rem] top-1/2 -translate-y-1/2
                           bg-white rounded-full p-3 shadow-lg hover:bg-white/90
                           transition-colors duration-200 z-10"
                aria-label="Next game"
              >
                <ChevronRightIcon className="h-6 w-6 text-dark-gray" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {Games.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Games.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-white w-4 h-4"
                    : "bg-gray-500 w-3 h-3 hover:bg-gray-400"
                }`}
                aria-label={`Go to game ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Game modal */}
      {isModalOpen && selectedGame && (
        <GameModal game={selectedGame} onClose={closeModal} />
      )}
    </>
  );
}
