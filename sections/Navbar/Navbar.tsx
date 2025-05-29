"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, Montserrat } from "next/font/google";
import logoImage from "@/public/StudioLogo_4_white.png";
import { HiX, HiMenu } from "react-icons/hi";
import "./navbar-effects.css";

const orbitron = Orbitron({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#features" },
  { label: "Our Games", href: "#reviews" },
  { label: "Contact", href: "#membership" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
  return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-charcoal shadow-md" : "bg-transparent"
      }`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 h-20">
        <div className="flex items-center">
          <Image
            src={logoImage}
            alt="Trinetra Logo"
            width={70}
            height={70}
            className={`transition-all duration-300 ${
              isScrolled ? "logo-desktop-scrolled" : "logo-desktop"
            }`}
          />
          <span
            className={`${orbitron.className} text-3xl font-bold text-pure-white ml-4 studio-name`}
          >
            TRINETRA
          </span>
        </div>
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${montserrat.className} text-lg text-pure-white nav-link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 flex justify-between items-center px-4 z-50">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`menu-button text-3xl text-pure-white ${
            expanded ? "active" : ""
          }`}
          aria-label="Toggle navigation"
        >
          {expanded ? <HiX /> : <HiMenu />}
        </button>
        <div className="flex items-center">
          <Image
            src={logoImage}
            alt="Trinetra Logo"
            width={50}
            height={50}
            className={`transition-all duration-300 ${
              isScrolled ? "logo-mobile-scrolled" : "logo-mobile"
            }`}
          />
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <nav
        className={`md:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-charcoal flex flex-col items-center justify-center z-40 nav-drawer ${
          expanded ? "nav-drawer-active" : "nav-drawer-inactive"
        }`}
      >
        <ul className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`${montserrat.className} text-2xl font-semibold text-pure-white nav-link`}
                onClick={() => setExpanded(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}