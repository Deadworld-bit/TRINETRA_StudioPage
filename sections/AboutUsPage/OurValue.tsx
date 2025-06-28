"use client";

import React from "react"; // useRef, useLayoutEffect, useState are no longer needed
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Orbitron, Inter } from "next/font/google"; // Ensure Inter is imported

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"] }); // Inter font for body text

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ValueContent() {
  return (
    <motion.div
      className="flex flex-col justify-center text-left space-y-6 md:space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.p
        // Matched text size to Introduction's main body text
        className={`${inter.className} text-lg md:text-xl leading-relaxed text-p3-white-smoke`}
        variants={fadeInUp}
      >
        <span className="text-p3-snow font-medium">TRINETRA</span> operates on
        principles of{" "}
        <span className="text-p3-mint-flash font-semibold">
          open collaboration
        </span>{" "}
        and{" "}
        <span className="text-p3-mint-flash font-semibold">
          shared growth
        </span>
        . We encourage team cohesion through{" "}
        <span className="italic">Game Jams</span> and small-scale development
        projects.
      </motion.p>
      <motion.ul
        // Matched text size to Introduction's pillar/bullet text
        className={`${inter.className} list-disc list-inside space-y-3 text-base md:text-lg leading-relaxed text-p3-white-smoke`}
        variants={fadeInUp}
      >
        <li>
          <span className="text-p3-mint-flash font-semibold">
            Diversity of thought
          </span>
        </li>
        <li>
          <span className="text-p3-mint-flash font-semibold">
            Transparent communication
          </span>
        </li>
        <li>
          <span className="text-p3-mint-flash font-semibold">
            Mutual respect
          </span>
        </li>
      </motion.ul>
      <motion.p
        // Matched text size to Introduction's main body text
        className={`${inter.className} text-lg md:text-xl leading-relaxed text-p3-white-smoke`}
        variants={fadeInUp}
      >
        We remain adaptable in structure, welcoming creative contributors
        regardless of geographic origin or professional background.
      </motion.p>
    </motion.div>
  );
}

function ValueImage() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02, rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex justify-center items-center p-4 md:p-0"
    >
      <div className="w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-p3-snow/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300">
        <Image
          src="/collab_01.jpg"
          alt="Team collaborating to reflect TRINETRA's values of diversity and growth"
          fill={false}
          width={700}
          height={525}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </motion.div>
  );
}

export default function OurValue() {
  // Removed useRef, useLayoutEffect, and useState as they are no longer needed
  // because the title font size is hardcoded by Tailwind classes.

  return (
    <section
      className="relative text-p3-white-smoke py-20 sm:py-24 md:py-32 overflow-hidden w-full"
      id="ourvalue"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.h2
          className={`${orbitron.className} text-center text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-16 text-p3-snow drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ValueContent />
          <ValueImage />
        </div>
      </div>
    </section>
  );
}