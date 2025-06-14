"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { aboutus } from "@/constants/constants";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const Introduction: React.FC = () => {
  const about = aboutus[0];

  return (
    <section className="relative w-full bg-charcoal text-p2-soft-white py-20 px-4 md:px-12 lg:px-24 overflow-hidden">
      {/* Vertical Lines Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i * 100) / 6}%`,
              background:
                "linear-gradient(180deg,rgba(94,96,206,0.13),rgba(94,96,206,0.06) 60%,rgba(94,96,206,0.13))", // p2-electric-indigo for a subtle accent
              filter: "blur(0.5px)",
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* Left: Image */}
        <div className="relative w-full h-[350px] md:h-auto rounded-xl overflow-hidden shadow-2xl flex-1 bg-p2-slate">
          <Image
            src="/ConceptPic_2.jpg"
            alt="Studio Building"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right: Content */}
        <div className="w-full flex flex-col justify-center flex-1">
          <span className="text-p2-coral-burst text-xl font-bold mb-2 tracking-wide">
            Who are we?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-pure-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            We are TRINETRA, a creative and dedicated group of individuals
          </h2>
          <div className="text-lg md:text-xl text-p2-gray-whisper mb-8">
            {about.text_1.map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
            {about.text_2.map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          {/* Contact row */}
          <div className="flex flex-col sm:flex-row gap-6 border-t border-p2-slate/60 pt-6">
            <div>
              <span className="font-semibold text-pure-white">CEO:</span>
              <span className="ml-2 text-p2-mint-flash">David Smith</span>
            </div>
            <div>
              <span className="font-semibold text-pure-white">Email:</span>
              <span className="ml-2 text-p2-electric-indigo">
                contact@example.com
              </span>
            </div>
          </div>
          {/* Contact Us Button */}
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block bg-p2-mint-flash text-p2-charcoal font-semibold px-8 py-3 rounded-md hover:bg-p2-coral-burst hover:text-pure-white transition text-lg shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;