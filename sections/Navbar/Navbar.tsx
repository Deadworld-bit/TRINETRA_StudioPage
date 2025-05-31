"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, Montserrat } from "next/font/google";
import logoDark from "@/public/StudioLogo_3.png";   
import logoLight from "@/public/StudioLogo_4_white.png"; 
import { HiX, HiMenu } from "react-icons/hi";
import "./navbar-effects.css";

const orbitron = Orbitron({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#aboutus" },
  { label: "Our Games", href: "#games" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // common transition classes
  const transitionColor = "transition-colors duration-300";
  const transitionOpacity = "transition-opacity duration-300";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent ${isScrolled ? "bg-charcoal shadow-md" : ""}`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 h-20">
        <div className="flex items-center">
          {/* Logo container with crossfade */}
          <div className="relative w-[60px] h-[60px]">
            <Image
              src={logoDark}
              alt="Trinetra Logo Dark"
              fill
              className={`${transitionOpacity} absolute inset-0 object-contain ${isScrolled ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src={logoLight}
              alt="Trinetra Logo Light"
              fill
              className={`${transitionOpacity} absolute inset-0 object-contain ${isScrolled ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <span
            className={`${orbitron.className} text-3xl font-bold ml-4 studio-name ${transitionColor} ${isScrolled ? "text-pure-white" : "text-pure-black"}`}
          >
            TRINETRA
          </span>
        </div>
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${montserrat.className} text-lg nav-link ${transitionColor} ${isScrolled ? "text-pure-white" : "text-pure-black"}`}
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
          className={`menu-button ${transitionColor} ${isScrolled ? "text-pure-black" : "text-pure-black"}`}
          aria-label="Toggle navigation"
        >
          {expanded ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
        </button>
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={logoDark}
            alt="Trinetra Logo Dark Mobile"
            fill
            className={`${transitionOpacity} absolute inset-0 object-contain ${isScrolled ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={logoDark}
            alt="Trinetra Logo Light Mobile"
            fill
            className={`${transitionOpacity} absolute inset-0 object-contain ${isScrolled ? "opacity-100" : "opacity-0"}`}
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
                className={`${montserrat.className} text-2xl font-semibold nav-link ${transitionColor} text-pure-white`}
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