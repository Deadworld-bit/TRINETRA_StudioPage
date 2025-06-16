import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Game } from "@/constants/constants";
import { Orbitron } from "next/font/google";

// Use Orbitron for consistency
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const platformColors: Record<string, string> = {
  PC: "bg-p3-slate text-p3-snow hover:bg-p3-coral-burst hover:text-p3-snow",
  Xbox: "bg-p3-slate text-p3-snow hover:bg-p3-mint-flash hover:text-p3-charcoal",
  PlayStation: "bg-p3-slate text-p3-snow hover:bg-p3-mint-flash hover:text-p3-charcoal",
  iOS: "bg-p3-slate text-p3-snow hover:bg-p3-coral-burst hover:text-p3-snow",
  Android: "bg-p3-slate text-p3-snow hover:bg-p3-mint-flash hover:text-p3-charcoal",
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 text-p3-slate hover:text-p3-mint-flash transition-colors z-10 p-2 bg-p3-slate/80 hover:bg-p3-slate rounded-full"
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function GameImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-60 sm:h-72 md:h-80 flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-t-2xl"
        sizes="(min-width: 768px) 600px, 100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-p3-charcoal via-transparent to-transparent opacity-80 rounded-t-2xl"></div>
    </div>
  );
}

function DownloadLinks({ game }: { game: Game }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-p3-coral-burst">Download Links:</h4>
      <div className="flex flex-wrap gap-3">
        {game.platforms.map((platform) =>
          game.downloadLinks && game.downloadLinks[platform] ? (
            <a
              key={platform}
              href={game.downloadLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition shadow ${
                platformColors[platform] ||
                "bg-p3-mint-flash text-p3-charcoal hover:bg-p3-coral-burst hover:text-p3-snow"
              }`}
            >
              Download for {platform}
            </a>
          ) : (
            <span
              key={platform}
              className="px-5 py-2 rounded-lg font-semibold text-sm bg-p3-slate/60 text-p3-slate cursor-not-allowed"
            >
              {platform} Unavailable
            </span>
          )
        )}
      </div>
    </div>
  );
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-p3-charcoal bg-opacity-90 flex items-center justify-center z-[999] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`${orbitron.className} bg-p3-charcoal text-p3-snow rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col border border-p3-mint-flash/30`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose} />
          <GameImage src={game.image} alt={game.title} />
          <div className="p-6 sm:p-8 space-y-5 flex-grow flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-p3-mint-flash mb-2">
              {game.title}
            </h2>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="text-xs bg-p3-mint-flash/20 text-p3-mint-flash px-3 py-1 rounded-full font-semibold uppercase tracking-widest">
                {game.genre}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1 text-p3-coral-burst">
                About the Game:
              </h4>
              <p className="text-p3-snow leading-relaxed text-base">
                {game.fullDescription}
              </p>
            </div>
            <DownloadLinks game={game} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;