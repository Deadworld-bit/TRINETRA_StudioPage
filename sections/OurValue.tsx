"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";

// Use Orbitron for consistency with other sections
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const linePulse: Variants = {
  animate: {
    scaleY: [1, 1.15, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Vertical lines background
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

// Watermark and Title
function SectionTitle({
  titleRef,
  titleFontSize,
  watermark,
  title,
}: {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  titleFontSize: number;
  watermark: string;
  title: string;
}) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
      {/* Watermark */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full"
        style={{ opacity: 0.1 }}
      >
        <h1
          className={`${orbitron.className} font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap`}
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.10)",
            WebkitTextFillColor: "var(--p3-charcoal)",
            fontSize: `${titleFontSize * 1.75}px`,
            lineHeight: 1,
          }}
        >
          {watermark}
        </h1>
      </motion.div>
      {/* Title */}
      <motion.h2
        ref={titleRef}
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className={`${orbitron.className} relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-p3-snow drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]`}
      >
        {title}
      </motion.h2>
    </div>
  );
}

// Value Content
function ValueContent() {
  return (
    <motion.div
      className="flex flex-col justify-center text-left space-y-8 border-l-2 border-p3-mint-flash pl-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.p className="text-lg md:text-xl" variants={fadeInUp}>
        <span className="text-p3-snow font-medium">TRINETRA</span> operates on
        principles of{" "}
        <span className="text-p3-mint-flash font-semibold">
          open collaboration
        </span>{" "}
        and shared growth. We encourage team cohesion through{" "}
        <span className="italic">Game Jams</span> and small-scale development
        projects. Diversity of thought, transparent communication, and mutual
        respect are foundational to everything we do.
      </motion.p>
      <motion.p className="text-lg md:text-xl" variants={fadeInUp}>
        We remain adaptable in structure, welcoming creative contributors
        regardless of geographic origin or professional background.
      </motion.p>
    </motion.div>
  );
}

// Value Image
function ValueImage() {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-p3-slate/80">
        <Image
          src="/collab_01.jpg"
          alt="Our Values"
          fill={false}
          width={480}
          height={360}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </motion.div>
  );
}

export default function OurValue() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleFontSize(parseFloat(computed.fontSize));
    }
  }, []);

  return (
    <section
      className="relative bg-charcoal text-p3-white-smoke py-16 sm:py-20 md:py-24 overflow-hidden w-full"
      id="ourvalue"
    >
      <VerticalLines />
      <SectionTitle
        titleRef={titleRef}
        titleFontSize={titleFontSize}
        watermark="Our Values"
        title="Our Values"
      />

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ValueContent />
          <ValueImage />
        </div>
      </div>
    </section>
  );
}
