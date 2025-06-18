"use client";

import React from "react";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { motion, Variants } from "framer-motion";
import { aboutus } from "@/constants/constants";

// Use Orbitron for consistency with Hero section
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const linePulse: Variants = {
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: { duration: 2, repeat: Infinity },
  },
};

// Social/contact info row
function ContactRow() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-6 border-t border-p3-slate/60 pt-6"
      variants={fadeInUp}
    >
      <div>
        <span className="font-semibold text-p3-snow">CEO:</span>
        <span className="ml-2 text-p3-mint-flash">David Smith</span>
      </div>
      <div>
        <span className="font-semibold text-p3-snow">Email:</span>
        <span className="ml-2 text-p3-electric-indigo">
          contact@example.com
        </span>
      </div>
    </motion.div>
  );
}

// Contact button
function ContactButton() {
  return (
    <motion.div className="mt-8" variants={fadeInUp}>
      <motion.a
        href="#contact"
        className="inline-block bg-p3-mint-flash text-p3-charcoal font-semibold px-8 py-3 rounded-md hover:bg-p3-coral-burst hover:text-p3-snow transition text-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us
      </motion.a>
    </motion.div>
  );
}

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

const Introduction: React.FC = () => {
  const about = aboutus[0];

  return (
    <motion.section
      className="relative w-full bg-charcoal text-p3-white-smoke py-20 px-4 md:px-12 lg:px-24 overflow-hidden"
      id="whoarewe"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <VerticalLines />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* Left: Image */}
        <motion.div
          className="relative w-full h-[350px] md:h-auto rounded-xl overflow-hidden shadow-2xl flex-1 bg-p3-slate"
          variants={fadeInUp}
        >
          <Image
            src="/office_01.jpg"
            alt="Studio Building"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="flex flex-col justify-center flex-1"
          variants={fadeInUp}
        >
          <motion.span
            className={`${orbitron.className} text-p3-coral-burst text-xl font-bold mb-2 tracking-wide`}
            variants={fadeInUp}
          >
            Who are we?
          </motion.span>
          <motion.h2
            className={`${orbitron.className} text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-p3-snow drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]`}
            variants={fadeInUp}
          >
            We are TRINETRA, a creative and dedicated group of individuals
          </motion.h2>
          <motion.div
            className="text-lg md:text-xl text-p3-white-smoke mb-8"
            style={{
              lineHeight: 1.6,
              maxWidth: "60ch",
            }}
            variants={fadeInUp}
          >
            {about.text_1.map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
            {about.text_2.map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
          <ContactRow />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Introduction;
