"use client";

import { Orbitron, Montserrat } from "next/font/google";
import Image from "next/image";
import {
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import logoImage from "@/public/StudioLogo_4_white.png";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

const infoLinks = [
  { href: "/legal-note", label: "Legal Note" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const socialLinks = [
  { href: "https://discord.com", Icon: FaDiscord, label: "Discord" },
  { href: "https://instagram.com", Icon: FaInstagram, label: "Instagram" },
  { href: "https://facebook.com", Icon: FaFacebook, label: "Facebook" },
  { href: "https://twitter.com", Icon: FaTwitter, label: "Twitter" },
  { href: "https://linkedin.com", Icon: FaLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const sectionHeadingClasses = `uppercase text-lg mb-4 font-bold text-p2-soft-white ${orbitron.className}`;
  const linkClasses =
    "text-p2-gray-whisper hover:text-p2-electric-indigo transition";
  const iconBaseClasses =
    "text-p2-gray-whisper hover:text-p2-coral-burst transition transform hover:scale-110";

  return (
    <footer
      className={`bg-p2-charcoal text-p2-soft-white py-8 mt-auto ${montserrat.className}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:grid md:grid-cols-3 gap-8">
        {/* Left: Info & Policies */}
        <div className="text-center md:text-left order-1">
          <h3 className={sectionHeadingClasses}>Info & Policies</h3>
          <ul className="space-y-2">
            {infoLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={linkClasses}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-col items-center order-3 md:order-2">
          <Image
            src={logoImage}
            alt="TRINETRA Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2
            className={`text-2xl font-bold text-p2-soft-white ${orbitron.className}`}
          >
            TRINETRA
          </h2>
        </div>

        {/* Right: Join & Social */}
        <div className="text-center md:text-right order-2 md:order-3">
          <h3 className={sectionHeadingClasses}>Join our community</h3>
          <p className="text-sm mb-4 text-p2-gray-whisper">
            Follow us &amp; stay updated
          </p>
          <div className="flex justify-center md:justify-end space-x-4">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={iconBaseClasses}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-4 text-center relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-3/4 h-[3px] rounded-full"
          style={{
            background: "var(--p2-gray-whisper)",
            opacity: 0.85,
          }}
        />
        <p className="text-sm text-p2-gray-whisper relative z-10">
          © {year} TRINETRA Game Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
