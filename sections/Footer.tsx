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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`bg-[#1a1a1a] text-white py-8 mt-auto ${montserrat.className}`}
    >
      <div className="container mx-auto px-4 flex flex-col md:grid md:grid-cols-3 gap-8">
        {/* Left: Info & Policies */}
        <div
          className="text-center md:text-left order-1 md:order-1"
        >
          <h3
            className={`uppercase text-lg mb-4 font-bold ${orbitron.className}`}
          >
            Info &amp; Policies
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/contact" className="hover:text-[#60a5fa] transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/legal-note" className="hover:text-[#60a5fa] transition">
                Legal Note
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-[#60a5fa] transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Center: Logo */}
        <div
          className="flex flex-col items-center order-3 md:order-2"
        >
          <Image
            src={logoImage}
            alt="TRINETRA Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2
            className={`text-2xl font-bold ${orbitron.className}`}
          >
            TRINETRA
          </h2>
          <p className="text-sm mt-2">
            © {year} TRINETRA Game Studio. All rights reserved.
          </p>
        </div>

        {/* Right: Join & Social */}
        <div
          className="text-center md:text-right order-2 md:order-3"
        >
          <h3
            className={`uppercase text-lg mb-2 font-bold ${orbitron.className}`}
          >
            Join our community
          </h3>
          <p className="text-sm mb-4">Follow us &amp; stay updated</p>
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="hover:text-[#60a5fa] transition transform hover:scale-105"
            >
              <FaDiscord size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#60a5fa] transition transform hover:scale-105"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#60a5fa] transition transform hover:scale-105"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#60a5fa] transition transform hover:scale-105"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#60a5fa] transition transform hover:scale-105"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
