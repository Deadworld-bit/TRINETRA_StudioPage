"use client";
import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";

const playfair = Rubik({subsets: ["latin"], weight: ["400", "700"],});
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

function useHeroScrollTransforms() {
  const { scrollY } = useScroll();
  return {
    bgY: useTransform(scrollY, [0, 400], [0, 200]),
    headingY: useTransform(scrollY, [0, 300], [0, -100]),
    headingOpacity: useTransform(scrollY, [0, 300], [1, 0]),
  };
}

const overlays = [
  { bg: "linear-gradient(to bottom, var(--p3-charcoal) 0%, transparent 60%, var(--p3-charcoal) 100%)", opacity: 0.85 },
  { bg: "radial-gradient(circle at center, var(--p3-white-smoke) 0%, transparent 80%)", opacity: 0.08 },
];

interface HeroProps {
  title: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, imageUrl }) => {
  const { bgY, headingY, headingOpacity } = useHeroScrollTransforms();

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`, 
          y: bgY,
        }}
      />
      
      {overlays.map(({ bg, opacity }, i) => (
        <div key={i} className="absolute inset-0" style={{ background: bg, opacity }} />
      ))}

      {/* Dynamic Title */}
      <motion.div style={{ y: headingY, opacity: headingOpacity }} className="relative z-10 px-4">
        <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold text-p3-white-smoke`}>
          {title} 
        </h1>
      </motion.div>

      <div className={`${manrope.className} absolute bottom-8 text-sm text-p3-gilded-gold z-10`}>
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">»</span>
        <Link href="/games" className="hover:underline">Games</Link>
        <span className="mx-2">»</span>
        <span className="text-p3-white-smoke">{title}</span> 
      </div>
    </div>
  );
};

export default Hero;