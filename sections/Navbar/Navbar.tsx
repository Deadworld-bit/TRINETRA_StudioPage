"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import logoLight from "@/public/StudioLogo_4_white.png";
import "./navbar-effects.css";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"] });

const navLinks = [
  { label: "About Us", href: "#aboutus" },
  { label: "Our Mission", href: "#ourmission" },
  { label: "Pioneers", href: "#pioneers" },
  { label: "Our Games", href: "#games" },
  { label: "Our Value", href: "#ourvalue" },
  { label: "Contact", href: "#contact" },
];

const TRANSITION_COLOR = "transition-colors duration-300";
const TRANSITION_OPACITY = "transition-opacity duration-300";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = `
    fixed top-0 left-0 w-full z-50
    ${scrolled ? "nav-glass" : "bg-pure-black"}
    shadow-md
    transition-all
  `;

  const Logo = ({ size }: { size: "desktop" | "mobile" }) => {
    const dimension = size === "desktop" ? 60 : 40;
    return (
      <div style={{ width: dimension, height: dimension, position: "relative" }}>
        <Image
          src={logoLight}
          alt="Trinetra Logo White"
          fill
          className={`${TRANSITION_OPACITY} absolute inset-0 object-contain opacity-100`}
        />
      </div>
    );
  };

  const DesktopNav = () => (
    <div className="hidden md:flex justify-between items-center px-8 h-20">
      <div className="flex items-center">
        <Logo size="desktop" />
        <span
          className={`
            ${orbitron.className} text-3xl font-bold ml-4 studio-name
            text-p2-soft-white
          `}
        >
          TRINETRA
        </span>
      </div>
      <nav>
        <ul className="flex gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`
                  ${orbitron.className} text-base font-bold tracking-widest uppercase nav-link
                  ${TRANSITION_COLOR} text-p2-soft-white
                `}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-50 bg-pure-black shadow-md">
      <span
        className={`
          ${orbitron.className} text-xl font-bold studio-name text-p2-soft-white
        `}
      >
        TRINETRA
      </span>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={`${TRANSITION_COLOR} text-p2-soft-white menu-button`}
        aria-label="Toggle navigation"
      >
        {expanded ? (
          <HiX className="text-3xl" />
        ) : (
          <HiMenu className="text-3xl" />
        )}
      </button>
    </div>
  );

  const MobileDrawer = () => (
    <nav
      className={`
        md:hidden fixed top-16 left-0 h-[calc(100%-4rem)] w-full
        bg-p2-charcoal flex flex-col items-center justify-center z-40 nav-drawer
        transition-transform duration-300
        ${expanded ? "translate-x-0" : "translate-x-full"}
      `}
      style={{ boxShadow: expanded ? "-2px 0 16px rgba(0,0,0,0.2)" : "none" }}
    >
      <ul className="flex flex-col items-center space-y-8 mt-8">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`
                ${orbitron.className} text-base font-bold tracking-widest uppercase nav-link
                ${TRANSITION_COLOR} text-p2-soft-white
              `}
              onClick={() => setExpanded(false)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header className={headerClasses}>
      <DesktopNav />
      <MobileHeader />
      <MobileDrawer />
    </header>
  );
}