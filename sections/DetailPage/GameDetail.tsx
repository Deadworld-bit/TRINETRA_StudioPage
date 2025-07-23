"use client";
import React from "react";
import { Game } from "@/constants/constants";
import { motion } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";
import { Laptop, Smartphone, Gamepad2 } from "lucide-react";

// Fonts
const playfair = Rubik({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Helper to get platform icons
const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "pc":
      return <Laptop className="w-5 h-5 mr-2" />;
    case "ios":
    case "android":
      return <Smartphone className="w-5 h-5 mr-2" />;
    case "xbox":
    case "playstation":
      return <Gamepad2 className="w-5 h-5 mr-2" />;
    default:
      return null;
  }
};

interface GameDetailProps {
  game: Game;
}

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
  return (
    <motion.section
      className="container mx-auto px-4 py-16 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
        {/* Left Column: Full Description */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <h2 className={`${playfair.className} text-3xl font-bold text-p3-white-smoke mb-6`}>
            Story & Gameplay
          </h2>
          <div
            className={`${manrope.className} text-p3-gilded-gold/80 leading-relaxed space-y-4`}
          >
            {game.fullDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Platforms & Downloads */}
        <motion.div className="mt-12 lg:mt-0" variants={itemVariants}>
          {/* Platforms Section */}
          <div className="bg-p3-charcoal-secondary border border-p3-white-smoke/10 rounded-xl p-6">
            <h3 className={`${playfair.className} text-2xl font-bold text-p3-white-smoke mb-4`}>
              Available On
            </h3>
            <ul className="space-y-3">
              {game.platforms.map((platform) => (
                <li
                  key={platform}
                  className={`${manrope.className} flex items-center text-p3-gilded-gold`}
                >
                  {getPlatformIcon(platform)}
                  <span>{platform}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Links Section */}
          <div className="mt-8">
            <h3 className={`${playfair.className} text-2xl font-bold text-p3-white-smoke mb-4`}>
              Get The Game
            </h3>
            <div className="flex flex-col space-y-4">
              {Object.entries(game.downloadLinks).map(([platform, link]) => (
                <a
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 py-3 bg-p3-gilded-gold text-p3-charcoal font-bold rounded-full transition-transform transform hover:scale-105"
                >
                  {getPlatformIcon(platform)}
                  <span>Download for {platform}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GameDetail;
