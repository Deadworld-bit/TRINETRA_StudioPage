import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Games } from "@/constants/constants"; 
import { Game } from "@/constants/constants"; 
import GameModal from "@/components/gamemodal"; 

const ITEM_WIDTH_PERCENT = 50;
const MARGIN_RIGHT_PERCENT = 4;
const AUTOSCROLL_INTERVAL = 5000;

const GameCarousel: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const clamp = useCallback((index: number): number => {
    const len = Games.length;
    if (len === 0) return 0;
    return ((index % len) + len) % len;
  }, []);

  const prev = useCallback((): void => {
    setCurrent((c) => clamp(c - 1));
  }, [clamp]);

  const next = useCallback((): void => {
    setCurrent((c) => clamp(c + 1));
  }, [clamp]);

  const xOffset = useMemo<string>(() => {
    const initialCenteringOffset = (100 - ITEM_WIDTH_PERCENT) / 2;
    const stepPerItem = ITEM_WIDTH_PERCENT + MARGIN_RIGHT_PERCENT;
    return `calc(${initialCenteringOffset}% - ${current * stepPerItem}%)`;
  }, [current]);

  useEffect(() => {
    if (isHovering || Games.length <= 1 || isModalOpen) {
      return;
    }
    const timerId = setInterval(next, AUTOSCROLL_INTERVAL);
    return () => clearInterval(timerId);
  }, [current, isHovering, next, isModalOpen]);

  const handleGameCardClick = (game: Game): void => {
    setSelectedGame(game);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedGame(null); 
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="relative py-16 bg-dark-gray text-white overflow-hidden" id ="games">
        <h2 className="text-6xl font-extrabold text-center mb-12">Our Games</h2>

        <div
          className="relative overflow-hidden w-full max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: xOffset }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {Games.map((game, idx) => (
              <div
                key={`${game.title}-${idx}`} 
                className={`flex-shrink-0 p-2`}
                style={{
                  width: `${ITEM_WIDTH_PERCENT}%`,
                  marginRight:
                    idx === Games.length - 1
                      ? "0%"
                      : `${MARGIN_RIGHT_PERCENT}%`,
                }}
              >
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl h-full flex flex-col"
                  onClick={() => handleGameCardClick(game)}
                >
                  <div className="relative h-96 w-full">
                    <Image
                      src={game.image}
                      alt={game.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-3xl md:text-4xl font-semibold text-white px-4 text-center">
                      {game.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {Games.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full text-white z-10"
                aria-label="Previous game"
              >
                &#8249;
              </button>
              <button
                onClick={next}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full text-white z-10"
                aria-label="Next game"
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {Games.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Games.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === current
                    ? "bg-white scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                aria-label={`Go to game ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && selectedGame && (
        <GameModal game={selectedGame} onClose={closeModal} />
      )}
    </>
  );
};

export default GameCarousel;