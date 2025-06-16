"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";
import { FaLightbulb, FaGraduationCap, FaGlobe } from "react-icons/fa";
import { missionPillars } from "@/constants/constants";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// Icon mapping for mission pillars
const iconMap: Record<string, React.ElementType> = {
  FaLightbulb,
  FaGraduationCap,
  FaGlobe,
};

// Animation variants
const lineVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 0.7,
    x: [0, 5, -5, 0],
    transition: {
      delay: i * 0.3,
      repeat: Infinity,
      duration: 8 + i * 2,
      ease: "easeInOut",
    },
  }),
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
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
        className={`${orbitron.className} relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-p3-snow drop-shadow-lg text-left`}
      >
        {title}
      </motion.h2>
    </div>
  );
}

// Mission Card
function MissionCard({
  icon,
  title,
  desc,
  i,
}: {
  icon: string;
  title: string;
  desc: string;
  i: number;
}) {
  const Icon = iconMap[icon] || FaLightbulb;
  // Assign color based on icon for demo
  const iconColor =
    icon === "FaLightbulb"
      ? "text-p3-coral-burst"
      : icon === "FaGraduationCap"
      ? "text-p3-electric-indigo"
      : "text-p3-mint-flash";
  const borderColor =
    icon === "FaLightbulb"
      ? "border-p3-coral-burst"
      : icon === "FaGraduationCap"
      ? "border-p3-electric-indigo"
      : "border-p3-mint-flash";

  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.04,
        rotateX: 3,
        rotateY: -3,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        background: "rgba(30,30,40,0.55)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        bg-p3-charcoal border ${borderColor} rounded-xl p-6 sm:p-8 md:p-10 space-y-6
        transition-all flex flex-col items-start min-h-[300px] glass-card
        `}
      style={{
        backdropFilter: "blur(0px) saturate(120%)",
        WebkitBackdropFilter: "blur(0px) saturate(120%)",
        transition: "backdrop-filter 0.3s, background 0.3s",
      }}
    >
      <div className={`${iconColor} text-4xl sm:text-5xl mb-4`}>
        <Icon />
      </div>
      <h3
        className={`${orbitron.className} text-xl sm:text-2xl font-bold text-p3-white-smoke`}
      >
        {title}
      </h3>
      <p className="text-base sm:text-lg leading-relaxed text-p3-snow">
        {desc}
      </p>
    </motion.div>
  );
}

export default function OurMission() {
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
      className="relative bg-p3-charcoal text-p3-white-smoke py-16 sm:py-20 md:py-24 overflow-hidden w-full"
      id="ourmission"
    >
      <VerticalLines />
      <SectionTitle
        titleRef={titleRef}
        titleFontSize={titleFontSize}
        watermark="OUR MISSION"
        title="Our Mission"
      />

      {/* Mission Pillars */}
      <div className="relative z-10 mt-12 sm:mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {missionPillars.map((item, i) => (
          <MissionCard key={i} {...item} i={i} />
        ))}
      </div>
    </section>
  );
}
