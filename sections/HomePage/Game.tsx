"use client";

import React from "react";
import Image from "next/image";
import { Games as AllGames } from "@/constants/constants";
import { motion, Variants } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const playfair = Rubik({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const baseImageOverlay = "absolute inset-0 bg-black/40";

export default function GameShowcase() {
  const gamesToDisplay = AllGames.slice(0, 3);

  return (
    <>
      <section
        id="games"
        className={
          `relative w-full text-white py-20 px-8 md:px-16 lg:px-32 overflow-hidden ${playfair.className}`
        }
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className={
              `${playfair.className} text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] mb-10`
            }
          >
            Our Games
          </h2>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:grid-rows-2 md:gap-10 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <Link
              href={`/game/${gamesToDisplay[0].slug}`}
              key={gamesToDisplay[0].slug}
              className="group block md:col-span-2"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 border border-p3-mint-flash/30 h-[350px] sm:h-[400px] md:h-[450px]"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${gamesToDisplay[0].title}`}
              >
                <Image
                  src={gamesToDisplay[0].image}
                  alt={gamesToDisplay[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 70vw"
                  priority
                />
                <div className={baseImageOverlay} />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <span
                    className={`${manrope.className} uppercase text-base md:text-sm text-p3-snow opacity-75 mb-2`}
                  >
                    {gamesToDisplay[0].genre}
                  </span>
                  <h3
                    className={`${playfair.className} text-3xl md:text-4xl font-bold mb-3`}
                  >
                    {gamesToDisplay[0].title}
                  </h3>
                  <p
                    className={`${manrope.className} text-base md:text-lg text-p3-white-smoke leading-relaxed line-clamp-3 max-w-2xl mb-6`}
                  >
                    {gamesToDisplay[0].shortDescription}
                  </p>
                  <div className="relative flex flex-col items-center">
                    <div className="w-[80%] h-px bg-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                    <div className="text-xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-1">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Bottom left card */}
            <Link
              href={`/game/${gamesToDisplay[1].slug}`}
              key={gamesToDisplay[1].slug}
              className="group block"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 border border-p3-mint-flash/30 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${gamesToDisplay[1].title}`}
              >
                <Image
                  src={gamesToDisplay[1].image}
                  alt={gamesToDisplay[1].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className={baseImageOverlay} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                  <span
                    className={`${manrope.className} uppercase text-base md:text-sm text-p3-snow opacity-75 mb-2`}
                  >
                    {gamesToDisplay[1].genre}
                  </span>
                  <h3
                    className={`${playfair.className} text-2xl md:text-3xl font-bold tracking-wide mb-2`}
                  >
                    {gamesToDisplay[1].title}
                  </h3>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-[80%] h-px bg-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                    <div className="text-xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-1">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Bottom right card */}
            <Link
              href={`/game/${gamesToDisplay[2].slug}`}
              key={gamesToDisplay[2].slug}
              className="group block"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-shadow duration-300 border border-p3-mint-flash/30 min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${gamesToDisplay[2].title}`}
              >
                <Image
                  src={gamesToDisplay[2].image}
                  alt={gamesToDisplay[2].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className={baseImageOverlay} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                  <span
                    className={`${manrope.className} uppercase text-base md:text-sm text-p3-snow opacity-75 mb-2`}
                  >
                    {gamesToDisplay[2].genre}
                  </span>
                  <h3
                    className={`${playfair.className} text-2xl md:text-3xl font-bold tracking-wide mb-2`}
                  >
                    {gamesToDisplay[2].title}
                  </h3>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-[80%] h-px bg-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
                    <div className="text-xl text-p3-pure-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-1">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {AllGames.length > 3 && (
            <div className="mt-8 md:mt-6 lg:mt-0 flex justify-start">
              <Link
                href="/game"
                className={`${playfair.className} inline-flex items-center px-8 py-3 bg-p3-pure-white text-p3-pure-black font-semibold rounded-lg hover:bg-gray-200 transition`}
              >
                View All Games <ArrowRight className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
