"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGamepad, FaPaintBrush, FaUsers } from "react-icons/fa";

export default function OurMission() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      const size = parseFloat(computed.fontSize);
      setTitleFontSize(size);
    }
  }, []);

  return (
    <section
      className="relative bg-charcoal text-p2-soft-white py-16 sm:py-20 md:py-24 overflow-hidden w-full"
      id="ourmission"
    >
      {/* Vertical Lines Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i * 100) / 6}%`,
              background:
                "linear-gradient(180deg,rgba(96,211,148,0.13),rgba(96,211,148,0.06) 60%,rgba(96,211,148,0.13))", // p2-mint-flash
              filter: "blur(0.5px)",
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
        {/* Watermark */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full">
          <h1
            className="font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.10)",
              WebkitTextFillColor: "var(--charcoal)",
              color: "var(--charcoal)",
              fontSize: `${titleFontSize * 1.75}px`,
              lineHeight: 1,
              transition: "font-size 0.2s",
              opacity: 1,
            }}
          >
            OUR MISSION
          </h1>
        </div>
        {/* Title */}
        <h2
          ref={titleRef}
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-pure-white drop-shadow-lg"
          style={{
            transition: "font-size 0.2s",
          }}
        >
          Our Mission
        </h2>
      </div>

      {/* Mission Pillars */}
      <div className="relative z-10 mt-12 sm:mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {[
          {
            icon: FaGamepad,
            title: "Original Content",
            desc: "We prioritize original ideas in a market dominated by copycat titles, fostering new-concept development and early-stage experimentation.",
            iconColor: "text-p2-coral-burst",
            borderColor: "border-p2-coral-burst",
          },
          {
            icon: FaPaintBrush,
            title: "Continuous Learning",
            desc: "Our studio operates on principles of continuous learning, encouraging participation from individuals at all skill levels.",
            iconColor: "text-p2-electric-indigo",
            borderColor: "border-p2-electric-indigo",
          },
          {
            icon: FaUsers,
            title: "Global Collaboration",
            desc: "We welcome international collaboration to share knowledge and align with global industry standards.",
            iconColor: "text-p2-mint-flash",
            borderColor: "border-p2-mint-flash",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.2 + i * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              className={`bg-p2-slate/80 border bg-p2-charcoal ${item.borderColor} rounded-xl p-6 sm:p-8 md:p-10 space-y-6 hover:bg-p2-slate transition flex flex-col items-start min-h-[300px]`}
            >
              <div className={`${item.iconColor} text-4xl sm:text-5xl mb-4`}>
                <Icon />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-p2-soft-white">
                {item.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-p2-gray-whisper">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}