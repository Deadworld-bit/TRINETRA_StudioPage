"use client";

import React from "react";
import { Orbitron, Montserrat } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/wallpaper_bg5.jpg";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 600], [0, 300]);
  const headingY = useTransform(scrollY, [0, 400], [0, -150]);
  const headingOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const subOpacity = useTransform(scrollY, [100, 500], [1, 0]);

  const triFill = useTransform(
    scrollY,
    [0, 150],
    ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
  );

  return (
    <motion.section
      className="relative w-full pt-20 flex flex-col items-center justify-center min-h-screen overflow-hidden text-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: bgY,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, var(--charcoal)/CB, transparent, var(--charcoal)/CB)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, var(--light-gray)/30, transparent)`,
        }}
      />

      <div className="relative px-4 lg:px-8 max-w-3xl">
        <motion.h1
          className={`${orbitron.className} uppercase font-extrabold drop-shadow-lg tracking-wide text-6xl sm:text-7xl lg:text-8xl`}
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            y: headingY,
            opacity: headingOpacity,
            background: `var(--pure-black)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to TRINETRA
        </motion.h1>

        <motion.p
          className={`${montserrat.className} mt-6 drop-shadow-md text-lg sm:text-xl md:text-2xl text-pure-black`}
          style={{ opacity: subOpacity }}
        >
          Indie Games. Bold Ideas. Made by Passion.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center"
        animate={{ y: [0, 12, 0], opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <svg
          className="w-6 h-6 stroke-dark-gray"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className={`${montserrat.className} mt-2 text-dark-gray`} style={{ fontSize: '0.875rem' }}>
          Scroll
        </span>
      </motion.div>

      {/* Bottom triangles */}
      <div className="absolute left-0 right-0 bottom-0 h-20 pointer-events-none z-10">
        <motion.div
          className="absolute left-0 bottom-0 w-1/2 h-full"
          style={{ backgroundColor: triFill, clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-1/2 h-full"
          style={{ backgroundColor: triFill, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-in-out forwards;
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;
