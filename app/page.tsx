"use client";

import React, { useState } from "react";
import Hero from "@/sections/HomePage/Hero";
import Introduction from "@/sections/HomePage/Introduction";
import Game from "@/sections/HomePage/Game";
import TeamMembers from "@/sections/HomePage/TeamMember";
import Contact from "@/sections/HomePage/Contact";
import OurMission from "@/sections/HomePage/OurMission";

// Decorative Components
const GridBackground: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/wallpaper_bg14.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.22,
    }}
  />
);

function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${((i + 1) * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [showDevOverlay, setShowDevOverlay] = useState(true);
  const handleReturn = () => {
    window.history.back();
  };

  if (showDevOverlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="bg-white rounded-2xl p-6 max-w-sm text-center shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Studio Page Under Development</h2>
          <p className="mb-6">Most content is currently for testing purposes.</p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowDevOverlay(false)}
            >
              Continue to View Page
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              onClick={handleReturn}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <div className="relative w-full bg-charcoal">
        <GridBackground />
        <VerticalLines />
        <Introduction />
        <OurMission />
        <TeamMembers />
        <Game />
      </div>
      <Contact />
    </div>
  );
}