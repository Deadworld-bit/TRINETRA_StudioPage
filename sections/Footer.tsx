"use client";

import { Orbitron } from "next/font/google";
import {
  FaDiscord,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const socialLinks: { href: string; icon: React.ElementType; title: string }[] =
  [
    { href: "#", icon: FaFacebook, title: "Facebook" },
    { href: "https://x.com/Trinetragames?t=S9L7I0buit9NbbYziZykqQ&s=09", icon: FaTwitter, title: "Twitter" },
    { href: "https://www.instagram.com/trinetragames/#", icon: FaInstagram, title: "Instagram" },
    { href: "#", icon: FaLinkedin, title: "LinkedIn" },
    { href: "#", icon: FaDiscord, title: "Discord" },
  ];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${orbitron.className} bg-pure-black text-p2-soft-white`}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        {/* Only Bottom Bar: Copyright & Socials */}
        <div className="border-t border-p2-slate/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-xs text-p2-gray-whisper">
            &copy; {year} TRINETRA Game Studio. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, icon: Icon, title }) => (
              <a
                key={title}
                href={href}
                title={title}
                className="text-p2-gray-whisper hover:text-p2-mint-flash transition-colors duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
