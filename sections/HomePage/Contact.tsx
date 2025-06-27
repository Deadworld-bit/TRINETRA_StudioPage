"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane, FaBriefcase } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";
import Link from "next/link";

// Font for consistency
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/ConvertedPic/parttern_07.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

export default function Contact() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
      id="contact"
    >  
      <div className="h-90 md:h-20" />

      {/* Divider CTA Section - flush to bottom */}
      <div
        className="relative px-4 py-16 flex flex-col items-center justify-center w-full"
        style={{
          background: "var(--p3-pure-black)",
          borderRadius: "2rem 2rem 0 0",
          overflow: "hidden",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          marginBottom: 0,
        }}
      >
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-16 bg-white/40" />
            <span
              className={`${orbitron.className} uppercase tracking-widest text-white font-semibold text-sm`}
            >
              Share your project
            </span>
            <span className="h-px w-16 bg-white/40" />
          </div>
          <h2
            className={`${orbitron.className} text-white text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 drop-shadow-lg`}
          >
            READY TO WORK TOGETHER?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-p3-coral-burst text-white font-bold text-lg rounded-lg shadow hover:bg-p3-mint-flash hover:text-p3-charcoal transition border-2 border-p3-coral-burst"
            >
              <FaBriefcase className="text-xl" />
              Hire Us
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold text-lg rounded-lg border-2 border-white hover:bg-white hover:text-p3-coral-burst transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}