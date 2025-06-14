"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Games, Game } from "@/constants/constants";
import GameModal from "@/components/gamemodal";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MARGIN_RIGHT_PERCENT = 4;
const AUTOSCROLL_INTERVAL = 5000;

// Custom hook: returns how many cards should be visible based on window width
function useVisibleCount(): number {
  const getCount = () => {
    if (typeof window === "undefined") return 1; // SSR guard
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState<number>(1);

  useEffect(() => {
    const update = () => setVisibleCount(getCount());
    update(); // initial
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visibleCount;
}

// Custom hook: clamps an index into [0 .. len−1], even if negative or > len
function useClampIndex(length: number): (index: number) => number {
  return useCallback(
    (i: number) => {
      if (length === 0) return 0;
      return ((i % length) + length) % length;
    },
    [length]
  );
}

// GameCard component (renders a single game in the carousel)
interface GameCardProps {
  game: Game;
  widthPercent: number;
  isLast: boolean;
  onClick: (g: Game) => void;
}

function GameCard({ game, widthPercent, isLast, onClick }: GameCardProps) {
  return (
    <div
      className="flex-shrink-0 p-2"
      style={{
        width: `${widthPercent}%`,
        marginRight: isLast ? "0%" : `${MARGIN_RIGHT_PERCENT}%`,
      }}
    >
      <div
        className="
          group 
          relative 
          cursor-pointer 
          overflow-hidden 
          rounded-2xl 
          shadow-xl 
          transform 
          transition-transform 
          duration-300 
          hover:scale-105
        "
        onClick={() => onClick(game)}
      >
        {/* Game Image */}
        <div className="relative h-96 w-full">
          <Image
            src={game.image}
            alt={game.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl"
          />
        </div>
        <div
          className="
            absolute 
            bottom-0 
            left-0 
            w-full 
            h-24 
            bg-gradient-to-t 
            from-black/70 
            to-transparent 
            pointer-events-none
          "
        />
        <div
          className="
            absolute 
            inset-0 
            bg-black 
            bg-opacity-40 
            flex 
            items-center 
            justify-center 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300
          "
        >
          <h3 className="text-3xl md:text-4xl font-semibold text-white px-4 text-center">
            {game.title}
          </h3>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            {game.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

// Main GameCarousel component
export default function GameCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  const visibleCount = useVisibleCount();
  const clampIndex = useClampIndex(Games.length);

  // Navigate to previous/next, wrapping around
  const prev = useCallback(
    () => setCurrent((c) => clampIndex(c - 1)),
    [clampIndex]
  );
  const next = useCallback(
    () => setCurrent((c) => clampIndex(c + 1)),
    [clampIndex]
  );

  const itemWidthPercent = useMemo(() => {
    if (visibleCount <= 1) return 100;
    return (100 - (visibleCount - 1) * MARGIN_RIGHT_PERCENT) / visibleCount;
  }, [visibleCount]);

  const xOffset = useMemo(() => {
    const initialCenteringOffset = (100 - itemWidthPercent) / 2;
    const step = itemWidthPercent + MARGIN_RIGHT_PERCENT;
    return `calc(${initialCenteringOffset}% - ${current * step}%)`;
  }, [current, itemWidthPercent]);

  useEffect(() => {
    if (isHovering || isModalOpen || Games.length <= 1) return;
    const id = setInterval(next, AUTOSCROLL_INTERVAL);
    return () => clearInterval(id);
  }, [isHovering, isModalOpen, next]);

  // Open/close modal logic
  const handleCardClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
    document.body.style.overflow = "unset";
  };

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      const size = parseFloat(computed.fontSize);
      setTitleFontSize(size);
    }
  }, []);

  // Render
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
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${(i * 100) / 6}%`,
                background:
                  "linear-gradient(180deg,rgba(96,211,148,0.13),rgba(96,211,148,0.06) 60%,rgba(96,211,148,0.13))", // p2-mint-flash
                filter: "blur(0.5px)",
                opacity: 0.7,
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
        <div
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Flex‐container that slides left/right */}
          <motion.div
            className="flex"
            animate={{ x: xOffset }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {Games.map((game, idx) => (
              <GameCard
                key={`${game.title}-${idx}`}
                game={game}
                widthPercent={itemWidthPercent}
                isLast={idx === Games.length - 1}
                onClick={handleCardClick}
              />
            ))}
          </motion.div>
          {Games.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous game"
                className="
                  absolute 
                  left-[-1.5rem] sm:left-[-2rem] 
                  top-1/2 
                  -translate-y-1/2 
                  bg-white 
                  rounded-full 
                  p-3 
                  shadow-lg 
                  hover:bg-white/90 
                  transition-colors 
                  duration-200 
                  z-10
                "
              >
                <ChevronLeftIcon className="h-6 w-6 text-dark-gray" />
              </button>
              <button
                onClick={next}
                aria-label="Next game"
                className="
                  absolute 
                  right-[-1.5rem] sm:right-[-2rem] 
                  top-1/2 
                  -translate-y-1/2 
                  bg-white 
                  rounded-full 
                  p-3 
                  shadow-lg 
                  hover:bg-white/90 
                  transition-colors 
                  duration-200 
                  z-10
                "
              >
                <ChevronRightIcon className="h-6 w-6 text-dark-gray" />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators below carousel */}
        {Games.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Games.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to game ${idx + 1}`}
                className={`
                  rounded-full 
                  transition-all 
                  duration-300 
                  ${
                    idx === current
                      ? "bg-white w-4 h-4"
                      : "bg-gray-500 w-3 h-3 hover:bg-gray-400"
                  }
                `}
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
}
