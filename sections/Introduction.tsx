"use client";

import React from "react";
import Image from "next/image";
import { motion} from "framer-motion";
import { sections } from "@/constants/constants";
import backgroundImage from "@/public/wallpaper_bg3.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type SectionDividerProps = {
  color: string;
  type: "A" | "B";
  className?: string;
};

const SectionDivider = ({ color, type, className }: SectionDividerProps) => {
  const points = type === "A" ? "0,10 100,0 100,10" : "0,10 100,0 100,10";
  return (
    <div className={`relative ${className || ""}`} style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="block w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <polygon points={points} fill={color} />
      </svg>
    </div>
  );
};

export default function IntroductionSection() {
  return (
    <section className="overflow-hidden">
      {/* First Section */}
      <motion.div
        className="bg-pure-white py-16 md:py-24 px-6 md:px-10 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pure-black mb-6 md:mb-10 leading-tight">
              {sections[0]?.title}
            </h2>
            {sections[0]?.text.map((p, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl lg:text-2xl text-dark-gray mb-4 md:mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-xl h-[20rem] md:h-[28rem] lg:h-[32rem] relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 20px 30px -10px rgba(0,0,0,0.2)",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
              duration: 0.6,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Image
              src={sections[0].image}
              alt={sections[0].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Divider 1*/}
      <SectionDivider
        color="var(--dark-gray)"
        type="A"
        className="bg-pure-white"
      />

      {/* Second Section */}
      <motion.div className="relative px-6 md:px-10 lg:px-20 overflow-hidden pt-0 pb-16">
        <motion.div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Abstract background"
            fill
            className="object-cover"
            quality={90}
          />
        </motion.div>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-charcoal/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 z-30 py-16">
          <motion.div
            className="flex-1 w-full order-last lg:order-first max-w-md lg:max-w-xl h-[20rem] md:h-[28rem] lg:h-[32rem] relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 15px 25px -8px rgba(255,255,255,0.1)",
            }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={sections[1].image}
              alt={sections[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </motion.div>
          <div className="flex-1 text-left lg:text-right">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pure-white mb-6 md:mb-10 leading-tight"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {sections[1].title}
            </motion.h2>
            {sections[1].text.map((p, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl lg:text-2xl text-snow mb-4 md:mb-6 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Divider 2*/}
      <SectionDivider
        color="var(--dark-gray)"
        type="B"
        className="transform rotate-180 bg-snow"
      />

      {/* Third Section */}
      <motion.div
        className="bg-snow py-16 md:py-24 px-6 md:px-10 lg:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            className="flex-1 text-left border-l-4 md:border-l-8 border-pure-black pl-6 md:pl-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pure-black mb-6 md:mb-10 leading-tight">
              {sections[2]?.title}
            </h2>
            {sections[2]?.text.map((p, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl lg:text-2xl text-dark-gray mb-4 md:mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-xl h-[20rem] md:h-[28rem] lg:h-[32rem] relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl ring-2 md:ring-4 ring-light-gray/20"
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 15px 25px -8px rgba(200,200,200,0.15)",
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={sections[2].image}
              alt={sections[2].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
