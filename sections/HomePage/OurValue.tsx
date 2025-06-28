"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"] });

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.5 } },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full"
        style={{ opacity: 0.15 }}
      >
        <h1
          className={`${orbitron.className} font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap`}
          style={{
            WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
            WebkitTextFillColor: "var(--p3-charcoal)",
            fontSize: `${titleFontSize * 1.75}px`,
            lineHeight: 1,
          }}
        >
          {watermark}
        </h1>
      </motion.div>
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

function ValueContent() {
  return (
    <motion.div
      className="flex flex-col justify-center text-left space-y-8 border-l-2 border-p3-mint-flash pl-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.p
        className={`${inter.className} text-lg md:text-xl`}
        variants={fadeInUp}
      >
        <span className="text-p3-snow font-medium">TRINETRA</span> operates on
        principles of{" "}
        <span className="text-p3-mint-flash font-semibold">
          open collaboration
        </span>{" "}
        and <span className="text-p3-mint-flash font-semibold">shared growth</span>.
        We encourage team cohesion through{" "}
        <span className="italic">Game Jams</span> and small-scale development
        projects.
      </motion.p>
      <motion.ul
        className={`${inter.className} list-disc list-inside space-y-2 text-lg md:text-xl`}
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
          <span className="text-p3-mint-flash font-semibold">Mutual respect</span>
        </li>
      </motion.ul>
      <motion.p
        className={`${inter.className} text-lg md:text-xl`}
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
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex justify-center items-center"
    >
      <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-p3-slate/80">
        <Image
          src="/collab_01.jpg"
          alt="Team collaborating to reflect TRINETRA's values of diversity and growth"
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
      <GridBackground />
      <SectionTitle
        titleRef={titleRef}
        titleFontSize={titleFontSize}
        watermark="Our Values"
        title="Our Values"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <ValueContent />
          <ValueImage />
        </div>
      </div>
    </section>
  );
}