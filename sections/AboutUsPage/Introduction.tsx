"use client";

import React from "react";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { motion, Variants } from "framer-motion";
import { aboutus } from "@/constants/constants";
import { FiArrowRight } from "react-icons/fi";
import { FaUser, FaEnvelope } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Subcomponents ---
function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${(i * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/parrtern_02.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="my-8 p-6 rounded-lg bg-gradient-to-r from-p3-mint-flash/10 to-transparent border-l-4 border-p3-mint-flash text-p3-mint-flash text-xl md:text-2xl font-semibold shadow-lg"
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p className="text-center">{children}</p>
    </motion.div>
  );
}

// --- Main Component ---

const Introduction: React.FC = () => {
  const about = aboutus[0];

  const pillars = [
    "Diverse Team of Passionate Creators",
    "Originality and Bold Ideas at Our Core",
    "Collaborative Spirit to Bring Visions to Life",
  ];

  const highlight =
    "We champion originality, pushing creative boundaries beyond the derivative.";

  return (
    <motion.section
      className="relative w-full bg-charcoal text-p3-white-smoke py-24 px-4 md:px-12 lg:px-24 overflow-hidden"
      id="whoarewe"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <GridBackground />
      <VerticalLines />

      {/* Watermark and Title */}

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.span
            className={`${orbitron.className} text-p3-coral-burst text-lg font-bold mb-3 tracking-wider uppercase`}
            variants={fadeInUp}
          >
            Who We Are
          </motion.span>
          <motion.h2
            className={`${orbitron.className} text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-p3-snow drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]`}
            variants={fadeInUp}
          >
            TRINETRA: A Fusion of Creativity and Dedication.
          </motion.h2>

          <motion.div
            className="text-lg md:text-xl text-p3-white-smoke/90 mb-8"
            style={{ lineHeight: 1.7, maxWidth: "60ch" }}
            variants={fadeInUp}
          >
            {about.text_2.map((paragraph, idx) => (
              <p key={idx} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <HighlightBox>{highlight}</HighlightBox>
        </div>

        {/* Right: Image & Pillars */}
        <div className="lg:w-1/2 w-full">
          <motion.div
            className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl group"
            variants={fadeInUp}
          >
            <Image
              src="/office_01.jpg"
              alt="Studio Interior"
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Pillars/Bullets */}
          <motion.ul
            className="mt-8 flex flex-col gap-4"
            variants={containerVariants}
          >
            {pillars.map((pillar, idx) => (
              <motion.li
                key={idx}
                className="relative flex items-center gap-4 text-base md:text-lg text-p3-white-smoke group"
                variants={staggerVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="flex-shrink-0 w-6 h-6 bg-p3-mint-flash/20 text-p3-mint-flash rounded-full flex items-center justify-center font-bold group-hover:bg-p3-mint-flash group-hover:text-p3-charcoal transition-colors duration-300">
                  ✓
                </span>
                <span style={{ lineHeight: 1.6 }}>{pillar}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
      </div>
    </motion.section>
  );
};

export default Introduction;