"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: {}, // no opacity change on container
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- Decorative Components ---
const GridBackground: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/ConvertedPic/parrtern_02.webp")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.22,
    }}
  />
);

function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${((i + 1) * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

// --- Intro Text ---
const introText = {
  title: "Born from passion, built to play.",
  subtitle: "Who We Are",
  body:
    "At TRINETRA, we fuse creativity and dedication to craft authentic, innovative gaming experiences—leveraging structured learning and collaborative experimentation to drive technical evolution while championing originality and pushing creative boundaries beyond the merely derivative.",
};

// --- Motion Link for animation ---
const MotionLink = motion(Link);

const Introduction: React.FC = () => (
  <section
    id="whoarewe"
    className="relative w-full bg-charcoal text-white pt-32 pb-32 px-8 md:px-16 lg:px-32 overflow-hidden"
  >
    {/* Decorations */}
    <GridBackground />
    <VerticalLines />

    {/* Animated Container for content children */}
    <motion.div
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Left Content */}
      <div className="w-full lg:w-1/2 z-10 space-y-8">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          variants={fadeInUp}
        >
          {introText.title}
        </motion.h1>

        <motion.div variants={fadeInUp} className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide border-b-2 border-white inline-block pb-2">
            {introText.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
            {introText.body}
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <MotionLink
            href="/aboutus"
            className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-lg shadow-xl transition-colors duration-300 hover:bg-gray-200"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </MotionLink>
        </motion.div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 h-[500px] md:h-[600px] lg:h-[700px] relative">
        <motion.div className="w-full h-full" variants={imageVariants}>
          <Image
            src="/ConvertedPic/office_01.webp"
            alt="Architectural Design"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default Introduction;