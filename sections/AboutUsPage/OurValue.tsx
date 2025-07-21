"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";

// Font configuration
const playfair = Rubik({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const values = [
  {
    title: "Diversity of thought",
    description: "We champion varied perspectives to spark innovation.",
  },
  {
    title: "Transparent communication",
    description: "We believe clarity and honesty build trust.",
  },
  {
    title: "Mutual respect",
    description: "We value respect as the foundation of every collaboration.",
  },
];

function ValueContent() {
  return (
    <motion.div
      className="flex flex-col space-y-8 h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.p
        className={`${manrope.className} text-xl md:text-2xl leading-relaxed text-p3-white-smoke max-w-prose`}
        variants={fadeInUp}
      >
        At <span className="text-p3-snow font-medium">TRINETRA</span>, we live by
        <span className="text-p3-mint-flash font-semibold mx-1">
          open collaboration
        </span>
        and
        <span className="text-p3-mint-flash font-semibold mx-1">
          shared growth
        </span>
        —fostering creativity through <em>Game Jams</em> and agile side projects.
      </motion.p>

      <motion.div className="space-y-6" variants={fadeInUp}>
        {values.map(({ title, description }) => (
          <div key={title} className="flex items-start space-x-4">
            <span className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center font-bold group-hover:bg-p3-mint-flash group-hover:text-p3-charcoal transition-colors duration-300">
                  ✓
            </span>
            <div>
              <h3 className={`${manrope.className} text-xl md:text-2xl font-semibold text-white`}>{title}</h3>
              <p className="mt-1 text-lg md:text-xl text-p3-white-smoke max-w-prose">{description}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        className={`${manrope.className} text-xl md:text-2xl leading-relaxed text-p3-white-smoke max-w-prose`}
        variants={fadeInUp}
      >
        We embrace adaptability, inviting passionate contributors from every
        background to join our journey—no matter where they are.
      </motion.p>
    </motion.div>
  );
}

function ValueImage() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full h-full mx-auto rounded-2xl overflow-hidden shadow-2xl flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-p3-mint-flash/20 to-transparent pointer-events-none" />
      <Image
        src="/collab_01.jpg"
        alt="Team collaborating to reflect TRINETRA's values"
        width={700}
        height={525}
        className="object-cover w-full h-full"
        priority
      />
    </motion.div>
  );
}

export default function OurValue() {
  return (
    <section
      id="ourvalue"
      className="relative py-16 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
        <motion.h2
          className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-pure-white mb-12 text-center`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          Our Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <ValueContent />
          <ValueImage />
        </div>
      </div>
    </section>
  );
}