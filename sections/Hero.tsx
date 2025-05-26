import React from "react";
import backgroundImage from "@/public/wallpaper_bg1.jpg";

const Hero = () => {
  return (
    <section
      className="relative w-full flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      {/* Particle “sparkle” overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/particles.svg')] animate-fade-in opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative text-center px-4">
        {/* Headline with gradient text */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight
                     bg-clip-text text-transparent
                     bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200
                     drop-shadow-lg"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Welcome to TRINETRA
        </h1>

        {/* Sub-heading with a light drop shadow */}
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md max-w-2xl mx-auto">
          Indie Games. Bold Ideas. Made by Passion.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
        <span className="block w-1.5 h-1.5 bg-white rounded-full mb-2"></span>
        <span className="text-sm text-white">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
