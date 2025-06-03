"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers } from "@/constants/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.07,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
};

export default function TeamMembers() {
  // activeCard will hold the index of the card that’s been tapped/clicked,
  // or null if none is open.
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-cover bg-center bg-scroll"
      style={{
        backgroundImage: `url('/wallpaper_bg6.jpg')`,
      }}
    >
      {/* Top and bottom lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-charcoal" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-charcoal" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-pure-white mb-6">
            Get to know the exceptional professionals who make our team shine
          </h2>
          <p className="text-xl text-light-gray">
            Discover the exceptional talent driving our team&apos;s success — our
            brilliant game developers.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, idx) => {
            // is this card currently “active” (i.e. tapped/open)? 
            const isActive = activeCard === idx;

            return (
              <motion.div
                key={idx}
                // group for hover effects + cursor-pointer to show it’s tappable
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover="hover"
                onClick={() => {
                  // Toggle this card’s “active” state
                  setActiveCard(isActive ? null : idx);
                }}
              >
                {/* Photo wrapper */}
                <div className="relative w-full h-0 pb-[100%]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay: visible on hover OR if isActive is true */}
                  <div
                    className={`
                      absolute inset-0 bg-black/60 flex flex-col justify-end items-center 
                      transition-opacity duration-300
                      ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    <p className="text-white text-lg font-medium mb-2">
                      {member.title}
                    </p>
                    <div className="flex space-x-4 mb-4">
                      {member.social.map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transform hover:-translate-y-1 transition-transform"
                        >
                          <social.icon size={24} className="text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Name section */}
                <div className="py-6 px-5 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
