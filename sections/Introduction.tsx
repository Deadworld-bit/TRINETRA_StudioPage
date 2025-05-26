"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import missionImage from "@/public/wallpaper_bg1.jpg";
import storyImage from "@/public/wallpaper_bg1.jpg";
import cultureImage from "@/public/wallpaper_bg1.jpg";
import differenceImage from "@/public/wallpaper_bg1.jpg";

const sections = [
  {
    title: "Studio Mission & Philosophy",
    text: [
      "At Trinetra, we engineer transformative worlds that captivate all five senses.",
      "Our philosophy is to merge emergent gameplay with deep narrative, inviting players to craft their own legends.",
    ],
    image: missionImage,
  },
  {
    title: "Our Story & Timeline",
    text: [
      "Founded in 2021 at a grassroots game jam, three dreamers—Alex, Maya, and Sam—fused pixel art with bold storytelling.",
      "2022: First demo released. 2023: IndieFest award. 2024: Expansion pack in development.",
    ],
    image: storyImage,
  },
  {
    title: "Studio Culture & Values",
    text: [
      "🤝 Community-driven: We co-create with our players. ",
      "🌐 Inclusive: Diverse voices power every world. ",
      "🎨 Craftsmanship: Pixel perfection meets modern mechanics.",
    ],
    image: cultureImage,
  },
  {
    title: "What Makes Us Different",
    text: [
      "✨ Emergent Narratives: Every playthrough tells a new story.",
      "⚙️ Hand-Crafted Art: Unique visuals in every frame.",
      "🔮 Player Agency: Your choices shape the cosmos.",
    ],
    image: differenceImage,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function Introduction() {
  return (
    <section className="relative bg-[#111214] text-gray-100 overflow-hidden">
      {/* Decorative top stripe */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400" />

      <div className="container mx-auto px-4 py-20 space-y-32">
        {sections.map((sec, idx) => {
          const even = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`flex flex-col-reverse lg:flex-row items-center gap-10 ${
                even ? '' : 'lg:flex-row-reverse'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              {/* Text block */}
              <div className="lg:w-1/2 space-y-4">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {sec.title}
                </h2>
                {sec.text.map((p, i) => (
                  <p key={i} className="text-base md:text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Image block */}
              <div className="lg:w-1/2 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
                <div className="relative h-64 sm:h-80 md:h-96">
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative bottom stripe */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" />
    </section>
  );
}
