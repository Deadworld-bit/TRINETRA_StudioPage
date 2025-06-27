"use client";

import React from "react";
import Link from "next/link";
import { Orbitron } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/ConvertedPic/ControllerWallpaper.webp";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 400], [0, 200]),
    headingY: useTransform(scrollY, [0, 300], [0, -100]),
    headingOpacity: useTransform(scrollY, [0, 300], [1, 0]),
  };
}

const overlays = [
  {
    bg: "linear-gradient(to bottom, var(--p3-charcoal) 0%, transparent 60%, var(--p3-charcoal) 100%)",
    opacity: 0.85,
  },
  {
    bg: "radial-gradient(circle at center, var(--p3-white-smoke) 0%, transparent 80%)",
    opacity: 0.08,
  },
];

const HERO_TITLE = `Our Games`;

const Hero = () => {
  const { bgY, headingY, headingOpacity } = useHeroScrollTransforms();

  return (
    <motion.section
      id="contact"
      className="relative w-full h-[66vh] overflow-hidden text-left"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundPositionY: bgY,
      }}
    >
      {overlays.map(({ bg, opacity }, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{ background: bg, opacity }}
        />
      ))}

      <div className="relative flex flex-col items-start justify-center h-full px-4 pt-20 lg:px-8 max-w-3xl mx-auto">
        <motion.h1
          className={`${orbitron.className} uppercase font-extrabold drop-shadow-lg tracking-wide text-6xl sm:text-7xl lg:text-8xl`}
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            y: headingY,
            opacity: headingOpacity,
            background: "var(--p3-pure-white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "pre-line",
          }}
        >
          {HERO_TITLE}
        </motion.h1>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-[4rem] left-1/2 w-[80%] h-px bg-p3-pure-white opacity-70 transform -translate-x-1/2" />

      {/* Breadcrumbs */}
      <div className="absolute bottom-6 left-[10%] flex items-center space-x-2 text-lg text-pure-white">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="opacity-60">»</span>
        <span>Games</span>
      </div>
    </motion.section>
  );
};

export default Hero;
