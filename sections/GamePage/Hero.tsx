"use client";

import React from "react";
import { Orbitron } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundImage from "@/public/ControllerWallpaper.jpeg";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 400], [0, 200]),
    headingY: useTransform(scrollY, [0, 300], [0, -100]),
    headingOpacity: useTransform(scrollY, [0, 300], [1, 0]),
  };
}

function HeroOverlays() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--p3-charcoal) 0%, transparent 60%, var(--p3-charcoal) 100%)",
          opacity: 0.85,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--p3-white-smoke) 0%, transparent 80%)",
          opacity: 0.08,
        }}
      />
    </>
  );
}

const HERO_TITLE = `Our Games`;

const Hero: React.FC = () => {
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
      <HeroOverlays />

      <div className="relative px-4 lg:px-8 pt-20 max-w-3xl mx-auto flex flex-col items-start justify-center h-full">
        <motion.h1
          className={`${orbitron.className} uppercase font-extrabold drop-shadow-lg tracking-wide text-6xl sm:text-7xl lg:text-8xl text-center`}
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            y: headingY,
            opacity: headingOpacity,
            background: "var(--p3-snow)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "pre-line",
          }}
        >
          {HERO_TITLE}
        </motion.h1>
      </div>

      <div className="absolute bottom-[3.25rem] left-1/2 transform -translate-x-1/2 w-[90%] h-px bg-white opacity-50" />

      {/* Breadcrumbs - slightly larger text, aligned to start of divider */}
      <div className="absolute bottom-4 left-[5%] text-base text-white flex items-center space-x-2">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="opacity-60">»</span>
        <div>Game</div>
      </div>
    </motion.section>
  );
};

export default Hero;
