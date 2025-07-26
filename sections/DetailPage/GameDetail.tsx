"use client";

import React from "react";
import Image from "next/image";
import { Game } from "@/constants/constants";
import { motion } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";
import { Laptop, Smartphone, Gamepad2 } from "lucide-react";

const playfair = Rubik({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

const sectionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "pc": return <Laptop className="w-6 h-6 mr-3" />;
    case "ios":
    case "android": return <Smartphone className="w-6 h-6 mr-3" />;
    case "xbox":
    case "playstation": return <Gamepad2 className="w-6 h-6 mr-3" />;
    default: return null;
  }
};

interface GameDetailProps { game: Game; }

const GameDetail: React.FC<GameDetailProps> = ({ game }) => (
  <motion.section
    className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 items-start">
      {/* Left Column: Details, Video, Screenshots */}
      <motion.div className="lg:col-span-2 space-y-16" variants={itemVariants}>
        <section>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-4`}>Overview</h2>
          <p className={`${manrope.className} leading-relaxed text-lg`}>{game.fullDescription}</p>
        </section>

        <section>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-4`}>Gameplay</h2>
          <p className={`${manrope.className} leading-relaxed text-lg`}>{game.gameplayDescription}</p>
        </section>

        <section>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-6`}>Gameplay Video</h2>
          {/* 16:9 ratio hack without plugins */}
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={game.gameplayVideoUrl}
              title={`${game.title} Gameplay Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </section>

        <section>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold mb-6`}>Screenshots</h2>
          <div className="grid grid-cols-1 gap-8">
            {game.screenshots.map((src) => (
              <div key={src} className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={src}
                  alt={`Screenshot of ${game.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Right Column (Sidebar) */}
      <motion.div
        className="lg:col-span-1 mt-16 lg:mt-0 space-y-8 lg:sticky lg:top-24"
        variants={itemVariants}
      >
        <section className="bg-[#262626]/50 backdrop-blur-sm p-6 rounded-xl border border-white">
          <h3 className={`${playfair.className} text-2xl md:text-3xl text-p3-pure-white font-bold mb-5`}>Available On</h3>
          <ul className="space-y-4">
            {game.platforms.map((platform) => (
              <li key={platform} className={`${manrope.className} flex items-center text-xl text-p3-snow`}>
                {getPlatformIcon(platform)}{platform}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#262626]/50 backdrop-blur-sm p-6 rounded-xl border border-white">
          <h3 className={`${playfair.className} text-2xl md:text-3xl text-p3-pure-white font-bold mb-5`}>System Requirements</h3>
          {game.platforms.map((platform) => {
            const req = game.requirements[platform];
            return req ? (
              <div key={platform} className="mb-4 last:mb-0">
                <h4 className={`${manrope.className} text-xl font-semibold mb-1 text-p3-snow`}>{platform}</h4>
                <p className={`${manrope.className} text-base text-p3-snow`}><strong>Min:</strong> {req.min}</p>
                <p className={`${manrope.className} text-base text-p3-snow`}><strong>Recommended:</strong> {req.recommended}</p>
              </div>
            ) : null;
          })}
        </section>

        <section>
          <h3 className={`${playfair.className} text-2xl md:text-3xl text-p3-pure-white font-bold mb-5`}>Get The Game</h3>
          <div className="flex flex-col space-y-4">
            {Object.entries(game.downloadLinks).map(([platform, link]) => (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-p3-slate text-p3-ghost-white font-bold rounded-lg hover:bg-p3-slate hover:scale-105 transition-transform duration-300 text-lg"
              >
                {getPlatformIcon(platform)}Download for {platform}
              </a>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  </motion.section>
);

export default GameDetail;
