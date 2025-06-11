"use client";

import { useState } from "react";
import Image from "next/image";
import { Orbitron, Montserrat } from "next/font/google";
import logoLight from "@/public/StudioLogo_4_white.png";
import GooeyNav from "@/components/GooeyNav/GooeyNav";
import "./navbar-effects.css";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const navLinks = [
  { label: "About Us", href: "#aboutus" },
  { label: "Our Mission", href: "#ourmission" },
  { label: "Pioneers", href: "#pioneers" },
  { label: "Values", href: "#values" },
  { label: "Our Games", href: "#games" },
  { label: "Contact", href: "#contact" },
];

const TRANSITION_COLOR = "transition-colors duration-300";
const TRANSITION_OPACITY = "transition-opacity duration-300";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const headerClasses = `
    fixed top-0 left-0 w-full z-50 bg-pure-black shadow-md
  `;

  const Logo = ({ size }: { size: "desktop" | "mobile" }) => {
    const dimension = size === "desktop" ? 60 : 40;
    return (
      <div
        style={{ width: dimension, height: dimension, position: "relative" }}
      >
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
            ${orbitron.className} text-pure-white
          `}
        >
          TRINETRA
        </span>
      </div>
      <GooeyNav
        items={navLinks}
        textClass={`
    ${orbitron.className}
    text-base
    font-bold
    tracking-widest
    uppercase
    text-pure-white
    transition-colors duration-300
  `}
      />
    </div>
  );

  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-50 bg-pure-black shadow-md">
      <span
        className={`
        ${orbitron.className} text-xl font-bold studio-name text-pure-white
      `}
      >
        TRINETRA
      </span>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={`${TRANSITION_COLOR} text-pure-white menu-button`}
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
      md:hidden fixed top-16 right-0 h-[calc(100%-4rem)] w-3/4 max-w-xs
      bg-pure-black flex flex-col items-center justify-center z-40 nav-drawer
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
              ${TRANSITION_COLOR} text-pure-white
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
