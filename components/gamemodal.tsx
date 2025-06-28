import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Orbitron } from "next/font/google";
import { Game } from "@/constants/constants";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  // close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={e => e.stopPropagation()}
          className={`
            ${orbitron.className}
            bg-white rounded-3xl overflow-hidden shadow-2xl
            max-w-xl w-full max-h-[90vh] flex flex-col
          `}
        >
          {/* Hero image */}
          <div className="relative h-56 sm:h-64 md:h-72 w-full flex-shrink-0">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 600px, 100vw"
              priority
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="
                absolute top-4 right-4 z-10 p-2 rounded-full
                bg-white/80 hover:bg-white text-gray-800
                transition
              "
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col overflow-y-auto space-y-6">
            {/* Title & Genre */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {game.title}
              </h2>
              <span className="
                inline-block text-xs uppercase tracking-widest
                bg-p3-mint-flash/20 text-p3-mint-flash px-3 py-1
                rounded-full
              ">
                {game.genre}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                About
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {game.fullDescription}
              </p>
            </div>

            {/* Download Links */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Download
              </h3>
              <div className="flex flex-wrap gap-3">
                {game.platforms.map((platform) => {
                  const url = game.downloadLinks?.[platform];
                  return url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className="
                        flex-1 text-center px-4 py-2
                        bg-p3-mint-flash text-p3-charcoal
                        font-semibold uppercase text-xs
                        rounded-xl shadow hover:brightness-110
                        transition
                      "
                    >
                      {platform}
                    </a>
                  ) : (
                    <span
                      key={platform}
                      className="
                        flex-1 text-center px-4 py-2
                        bg-gray-200 text-gray-400
                        font-semibold uppercase text-xs
                        rounded-xl
                      "
                    >
                      {platform} N/A
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;
