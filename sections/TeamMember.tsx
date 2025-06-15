"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { teamMembers } from "@/constants/constants";

export default function TeamMember() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleFontSize(parseFloat(computed.fontSize));
    }
  }, []);

  // Background line animation
  const lineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 0.7,
      x: [0, 5, -5, 0],
      transition: {
        delay: i * 0.4,
        repeat: Infinity,
        duration: 10,
        ease: "easeInOut",
      },
    }),
  };

  // Title reveal
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (_: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    }),
  };

  // Card entrance
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
      id="pioneers"
    >
      {/* Vertical Lines Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-0.75"
            style={{
              left: `${(i * 100) / 6}%`,
              background: "rgba(96,211,148,0.13)",
              opacity: 0.7,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

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
            className="font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.10)",
              WebkitTextFillColor: "var(--charcoal)",
              fontSize: `${titleFontSize * 1.75}px`,
              lineHeight: 1,
            }}
          >
            Our Pioneers
          </h1>
        </motion.div>

        {/* Title */}
        <motion.h2
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-pure-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
        >
          Our Pioneers
        </motion.h2>
      </div>

      {/* Team Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-12 sm:mt-16 lg:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-p2-slate/80 border border-p2-electric-indigo rounded-xl overflow-hidden shadow-xl flex flex-col relative"
            >
              {/* Image with subtle zoom on hover */}
              <div className="relative w-full aspect-square overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={
                      typeof member.photo === "string"
                        ? member.photo
                        : member.photo.src
                    }
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 100vw"
                    priority={idx === 0}
                  />
                </motion.div>
              </div>

              {/* Info */}
              <div className="pl-8 sm:pl-10 pr-6 pb-6 pt-4 flex flex-col items-start bg-p2-charcoal rounded-b-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-pure-white mb-1">
                  {member.name}
                </h3>
                <p className="text-base sm:text-lg text-p2-gray-whisper mb-4">
                  {member.title}
                </p>
                <div className="flex gap-5 mt-2">
                  {member.social.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-p2-electric-indigo hover:text-p2-mint-flash transition"
                      aria-label={social.url}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
