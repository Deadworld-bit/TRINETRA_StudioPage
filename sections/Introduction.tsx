"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { aboutus } from "@/constants/constants"; // your data

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });

const Introduction: React.FC = () => {
  const about = aboutus[0];

  // Motion variants
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, skewY: 5 },
    visible: { opacity: 1, y: 0, scale: 1, skewY: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="aboutus"
      className="relative bg-charcoal text-p2-soft-white py-24 px-6 lg:px-20 overflow-hidden"
    >
      {/* Soft glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top center, var(--p2-soft-white) 20%, transparent 80%)`,
          opacity: 0.05,
        }}
      />

      <AnimatePresence>
        <motion.div
          className="max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          exit="exit"
        >
          <motion.h2
            className={`${montserrat.className} text-5xl lg:text-6xl font-extrabold text-center`}
            variants={headingVariants}
          >
            {about.title}
          </motion.h2>

          <div className="mt-8 space-y-6">
            {about.text_1.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className={`${montserrat.className} text-xl lg:text-2xl leading-relaxed`}
                variants={paragraphVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div className="mt-8 space-y-6">
            {about.text_2.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className={`${montserrat.className} text-xl lg:text-2xl leading-relaxed`}
                variants={paragraphVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Introduction;
