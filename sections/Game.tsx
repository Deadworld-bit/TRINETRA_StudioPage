"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gameImage1 from "@/public/wallpaper_bg1.jpg";
import gameImage2 from "@/public/wallpaper_bg1.jpg";

const games = [
  {
    title: "Echoes of the Void",
    description:
      "A sci-fi adventure where every choice alters the fabric of space-time.",
    features: [
      "Dynamic narrative branching",
      "Hand-painted celestial art",
      "Procedural galaxy generation",
    ],
    image: gameImage1,
  },
  {
    title: "Pixel Quest: Chronicles",
    description:
      "Relive the golden age of RPGs with a modern twist on classic mechanics.",
    features: [
      "Retro-inspired pixel art",
      "Deep character customization",
      "Open-world exploration",
    ],
    image: gameImage2,
  },
];

export default function GameCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active dot based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const children = Array.from(container.children);
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const idx = children.findIndex((child) => {
        const { offsetLeft, clientWidth } = child as HTMLElement;
        return offsetLeft + clientWidth / 2 > scrollLeft + width / 2;
      });
      setActiveIndex(idx === -1 ? children.length - 1 : idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.children[index];
    target.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <section className="relative bg-[#111214] text-gray-100 overflow-hidden py-20">
      {/* Slanted divider removed for brevity */}
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Our Games
        </h2>
        <div
          ref={containerRef}
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-none"
        >
          {games.map((game, idx) => (
            <motion.div
              key={idx}
              className="snap-center flex-shrink-0 w-[80vw] sm:w-3/4 md:w-1/2 lg:w-1/3 bg-gray-800 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 sm:h-64 md:h-72">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {game.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-200">
                  {game.description}
                </p>
                <ul className="mt-2 space-y-1">
                  {game.features.map((feat, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="inline-block w-2 h-2 mr-2 bg-purple-500 rounded-full" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Dots navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {games.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === activeIndex ? "bg-white scale-110" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
