"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Introduction: React.FC = () => {
  const whoWeAreIntro =
    "At TRINETRA, we fuse creativity and dedication to craft authentic, innovative gaming experiences—leveraging structured learning and collaborative experimentation to drive technical evolution while championing originality and pushing creative boundaries beyond the merely derivative.";

  function GridBackground() {
    return (
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
  }

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

  return (
    <motion.section
      className="relative w-full bg-charcoal text-white pt-32 pb-32 px-8 md:px-16 lg:px-32 overflow-hidden"
      id="whoarewe"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <GridBackground />
      <VerticalLines />
      {/* Vertical Lines Decoration */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* Left Side: Content */}
        <div className="lg:w-1/2 w-full z-10">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            variants={fadeInUp}
          >
            Born from passion, built to play.
          </motion.h1>

          {/* "Who We Are" Section */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide mb-6 border-b-2 border-white pb-2 inline-block">
              Who We Are
            </h2>
            <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-xl">
              {whoWeAreIntro}
            </p>
          </motion.div>

          {/* "View More" Button */}
          <motion.div variants={fadeInUp}>
            <Link href="/aboutus" passHref>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-black font-semibold rounded-lg shadow-xl transition-colors duration-300 hover:bg-gray-200"
              >
                View More
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 w-full h-[500px] md:h-[600px] lg:h-[700px] relative">
          <motion.div
            className="w-full h-full"
            variants={fadeInUp}
            initial={{ opacity: 0, x: 80 }} // increased initial x offset
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/ConvertedPic/office_01.webp"
              alt="Architectural Design"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Introduction;
