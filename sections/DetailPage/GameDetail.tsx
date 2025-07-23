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
    case "pc": return <Laptop className="w-8 h-8 mr-3" />;
    case "ios":
    case "android": return <Smartphone className="w-8 h-8 mr-3" />;
    case "xbox":
    case "playstation": return <Gamepad2 className="w-8 h-8 mr-3" />;
    default: return null;
  }
};

interface GameDetailProps { game: Game; }

const GameDetail: React.FC<GameDetailProps> = ({ game }) => (
  <motion.section
    className="container mx-auto px-6 py-20 md:py-32 text-xl"
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20">
      {/* Left: Full & Gameplay */}
      <motion.div className="lg:col-span-2 space-y-12" variants={itemVariants}>
        <section>
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Overview</h2>
          <p className={`${manrope.className} leading-relaxed text-2xl`}>{game.fullDescription}</p>
        </section>

        <section>
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Gameplay</h2>
          <p className={`${manrope.className} leading-relaxed text-2xl`}>{game.gameplayDescription}</p>
        </section>

        <section>
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Screenshots</h2>
          <div className="grid grid-cols-1 gap-8">
            {game.screenshots.map((src) => (
              <div key={src} className="w-full h-96 relative rounded-lg overflow-hidden">
                <Image src={src} alt={`Screenshot of ${game.title}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Right: Platforms, Requirements & Downloads */}
      <motion.div className="mt-16 lg:mt-0 space-y-16" variants={itemVariants}>
        <section className="bg-gray-800 p-8 rounded-2xl">
          <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Available On</h3>
          <ul className="space-y-4">
            {game.platforms.map((platform) => (
              <li key={platform} className={`${manrope.className} flex items-center text-2xl`}>{getPlatformIcon(platform)}{platform}</li>
            ))}
          </ul>
        </section>

        <section className="bg-gray-800 p-8 rounded-2xl">
          <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>System Requirements</h3>
          {game.platforms.map((platform) => {
            const req = game.requirements[platform];
            return req ? (
              <div key={platform} className="mb-6">
                <h4 className={`${manrope.className} text-2xl font-semibold mb-2`}>{platform}</h4>
                <p className={`${manrope.className} text-xl mb-1`}><strong>Min:</strong> {req.min}</p>
                <p className={`${manrope.className} text-xl`}><strong>Recommended:</strong> {req.recommended}</p>
              </div>
            ) : null;
          })}
        </section>

        <section>
          <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>Get The Game</h3>
          <div className="flex flex-col space-y-6">
            {Object.entries(game.downloadLinks).map(([platform, link]) => (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-yellow-500 text-gray-900 font-bold rounded-full hover:scale-105 transition-transform text-2xl"
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
