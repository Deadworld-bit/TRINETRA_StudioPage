import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Game } from "@/constants/constants"; // Assuming this path is correct

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Replaced bg-black/80 with a combination of bg-pure-black with opacity or a new custom class if preferred
        className="fixed inset-0 bg-pure-black bg-opacity-80 flex items-center justify-center z-[999] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          // Replaced bg-gray-900 with bg-charcoal, text-white with text-pure-white
          className="bg-charcoal text-pure-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            // Replaced text-gray-400 with text-light-gray, hover:text-white with hover:text-pure-white, bg-gray-800 with bg-dark-gray
            className="absolute top-3 left-3 text-light-gray hover:text-pure-white transition-colors z-10 p-2 bg-dark-gray rounded-full"
            aria-label="Close game details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative w-full h-60 sm:h-72 md:h-80 flex-shrink-0">
            <Image
              src={game.image}
              alt={game.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
            {/* Replaced bg-gradient-to-t from-gray-900 with from-charcoal */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 rounded-t-xl"></div>
          </div>

          <div className="p-5 sm:p-6 md:p-8 space-y-4 flex-grow">
            {/* Kept text-sky-400 as it's not in your custom palette but you could define it if needed */}
            <h2 className="text-3xl sm:text-4xl font-bold text-sky-400">
              {game.title}
            </h2>

            <div className="flex flex-wrap gap-2 items-center">
              {/* Kept bg-sky-600 as it's not in your custom palette */}
              <span className="text-sm bg-sky-600 px-3 py-1 rounded-full font-medium">
                {game.genre}
              </span>
            </div>

            <div>
              {/* Replaced text-gray-300 with text-light-gray */}
              <h4 className="text-xl font-semibold mb-1 text-light-gray">
                About the Game:
              </h4>
              {/* Replaced text-gray-400 with text-mid-gray */}
              <p className="text-mid-gray leading-relaxed text-sm sm:text-base">
                {game.fullDescription}
              </p>
            </div>

            <div>
              {/* Replaced text-gray-300 with text-light-gray */}
              <h4 className="text-xl font-semibold mb-2 text-light-gray">
                Platforms:
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform}
                    // Replaced bg-gray-700 with bg-dark-gray, text-gray-200 with text-snow
                    className="bg-dark-gray text-snow px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {game.link && (
              <div className="pt-4">
                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Kept bg-sky-500 and hover:bg-sky-600 as they are not in your custom palette
                  className="inline-block bg-sky-500 hover:bg-sky-600 text-pure-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-base w-full sm:w-auto text-center"
                >
                  Visit Game Page
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;