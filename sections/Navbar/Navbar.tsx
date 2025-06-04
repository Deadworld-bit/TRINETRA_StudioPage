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

const TRANSITION_COLOR = "transition-colors duration-300";
const TRANSITION_OPACITY = "transition-opacity duration-300";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to toggle background/logo styles
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header background changes when scrolled
  const headerClasses = `
    fixed top-0 left-0 w-full z-50 bg-transparent
    ${isScrolled ? "bg-charcoal shadow-md" : ""}
  `;

  // Logo crossfade: dark → light when scrolled
  const Logo = ({ size }: { size: "desktop" | "mobile" }) => {
    const dimension = size === "desktop" ? 60 : 40;
    return (
      <div className={`relative w-[${dimension}px] h-[${dimension}px]`}>
        <Image
          src={logoDark}
          alt="Trinetra Logo Dark"
          fill
          className={`${TRANSITION_OPACITY} absolute inset-0 object-contain ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={size === "desktop" ? logoLight : logoDark}
          alt={`Trinetra Logo ${isScrolled ? "Light" : "Dark"}`}
          fill
          className={`${TRANSITION_OPACITY} absolute inset-0 object-contain ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  };

  // Desktop navigation (hidden on small screens)
  const DesktopNav = () => (
    <div className="hidden md:flex justify-between items-center px-8 h-20">
      <div className="flex items-center">
        <Logo size="desktop" />
        <span
          className={`
            ${orbitron.className} text-3xl font-bold ml-4 studio-name
            ${TRANSITION_COLOR} ${isScrolled ? "text-pure-white" : "text-pure-black"}
          `}
        >
          TRINETRA
        </span>
      </div>
      <nav className="flex space-x-6">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`
              ${montserrat.className} text-lg nav-link
              ${TRANSITION_COLOR} ${
              isScrolled ? "text-pure-white" : "text-pure-black"
            }
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );

  // Mobile header with menu button (hidden on medium+ screens)
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 w-full h-16 flex justify-between items-center px-4 z-50">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={`
          menu-button ${TRANSITION_COLOR}
          text-pure-black
        `}
        aria-label="Toggle navigation"
      >
        {expanded ? (
          <HiX className="text-3xl" />
        ) : (
          <HiMenu className="text-3xl" />
        )}
      </button>
      <Logo size="mobile" />
    </div>
  );

  // Mobile drawer (slides in/out when expanded)
  const MobileDrawer = () => (
    <nav
      className={`
        md:hidden fixed top-16 left-0 w-full h-[calc(100%-4rem)]
        bg-charcoal flex flex-col items-center justify-center z-40 nav-drawer
        ${expanded ? "nav-drawer-active" : "nav-drawer-inactive"}
      `}
    >
      <ul className="flex flex-col items-center space-y-8">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`
                ${montserrat.className} text-2xl font-semibold nav-link
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
