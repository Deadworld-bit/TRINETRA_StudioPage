"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron } from 'next/font/google';
import logoImage from "@/public/StudioLogo_3.png"; 
import { HiX, HiMenu } from "react-icons/hi";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const orbitron = Orbitron({ subsets: ['latin'] });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#features" },
  { label: "Our Games", href: "#reviews" },
  { label: "Contact", href: "#membership" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 h-20">
        {/* Left: Studio icon, name, and nav links */}
        <div className="flex items-center">
          <Image
            src={logoImage}
            alt="Trinetra Logo"
            width={60}
            height={60}
            className="hover:scale-105 transition-transform"
          />
          <span className={`${orbitron.className} text-3xl font-bold text-black ml-4`}>TRINETRA</span>
          <nav className="ml-8 flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${orbitron.className} text-lg text-gray-800 hover:text-blue-600 transition`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://twitter.com" // Update with your URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://discord.com" // Update with your URL
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            <FaDiscord size={32} />
          </a>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 flex justify-between items-center px-4 z-50">
        {/* Menu button on left */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-3xl text-blue-600"
          aria-label="Toggle navigation"
        >
          {expanded ? <HiX /> : <HiMenu />}
        </button>
        {/* Studio icon on right */}
        <div className="flex items-center">
          <Image src={logoImage} alt="Trinetra Logo" width={40} height={40} />
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {expanded && (
        <nav className="md:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-white flex flex-col items-center justify-center z-40">
          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`${orbitron.className} text-2xl font-semibold text-gray-800 hover:text-blue-600 transition`}
                  onClick={() => setExpanded(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}