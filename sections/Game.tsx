"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Games } from "@/constants/constants";


const loopedGames = [...Games, ...Games, ...Games];

export default function GameCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const el = containerRef.current!;
    // Start in the middle copy for infinite looping
    el.scrollLeft = el.scrollWidth / 3;

    const onScroll = () => {
      const maxScroll = el.scrollWidth;
      // Infinite loop reset
      if (el.scrollLeft <= 0) {
        el.scrollLeft = maxScroll / 3;
      } else if (el.scrollLeft + el.clientWidth >= maxScroll) {
        el.scrollLeft = maxScroll / 3;
      }

      setScrollPos(el.scrollLeft);

      // Update active index based on the card at the center
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      const idx = cards.findIndex((card) => {
        const left = card.offsetLeft;
        return left <= center && left + card.clientWidth > center;
      });
      if (idx !== -1) setActiveIndex(idx % Games.length);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const el = containerRef.current!;
    const target = el.children[idx + Games.length] as HTMLElement;
    target.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <section className="py-20 bg-[#111214] text-white">
      <div className="w-[90vw] mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-10">
          Our Games
        </h2>

        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto whitespace-nowrap px-2 scrollbar-hide snap-x snap-mandatory"
            style={{ perspective: 1000 }}
          >
            {loopedGames.map((game, idx) => {
              const realIdx = idx % Games.length;
              const isExpanded = realIdx === expandedIndex;
              const cardEl = containerRef.current?.children[idx] as HTMLElement | undefined;
              const cardCenter = cardEl
                ? cardEl.offsetLeft + cardEl.clientWidth / 2
                : 0;
              const center = scrollPos + (containerRef.current?.clientWidth || 0) / 2;
              const diff = center - cardCenter;
              const containerWidth = containerRef.current?.clientWidth || 1;
              const maxDiff = containerWidth / 2;
              // Scale from 1.1 (center) to 0.9 (edges)
              const scale = isExpanded
                ? 1.2
                : Math.max(0.9, 1.1 - (Math.abs(diff) / maxDiff) * 0.2);
              // Rotate from -30 to 30 degrees based on position
              const rotateY = isExpanded ? 0 : (diff / maxDiff) * 30;
              // Parallax effect for background
              const bgOffset = diff * 0.2;

              return (
                <motion.div
                  key={idx}
                  className="snap-center flex-shrink-0 w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] h-[600px] bg-gray-800 rounded-3xl shadow-2xl relative cursor-pointer"
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                  viewport={{ once: true }}
                  onClick={() => setExpandedIndex(isExpanded ? null : realIdx)}
                  whileHover={{ scale: isExpanded ? 1.2 : 1.1, zIndex: 30 }}
                  animate={{
                    scale,
                    rotateY,
                    zIndex: isExpanded ? 40 : 0,
                    transition: { type: "spring", stiffness: 150, damping: 20 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl"
                    style={{ transform: `translateX(${bgOffset}px)` }}
                  >
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>

                  <div className="relative p-8 flex flex-col h-full">
                    <h3 className="text-3xl font-bold mb-2">{game.title}</h3>
                    <span className="text-sm mb-4 inline-block bg-purple-600 px-3 py-1 rounded-full">
                      {game.genre}
                    </span>
                    <p className="flex-grow text-gray-200 mb-4">
                      {isExpanded ? game.fullDescription : game.shortDescription}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { duration: 0.3 } }}
                          exit={{ opacity: 0 }}
                          className="mt-auto space-y-4"
                        >
                          <div className="flex flex-wrap gap-2">
                            {game.platforms.map((plat) => (
                              <span
                                key={plat}
                                className="text-xs bg-indigo-500 px-2 py-1 rounded"
                              >
                                {plat}
                              </span>
                            ))}
                          </div>
                          <a
                            href={game.link}
                            className="inline-block px-6 py-3 bg-indigo-600 rounded-full font-medium"
                          >
                            Play Now
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {Games.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-4 h-4 rounded-full transition-transform ${
                idx === activeIndex ? "bg-white scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}