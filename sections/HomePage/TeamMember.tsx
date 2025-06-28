"use client";

import React, { useState, useEffect, JSX } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";
import Link from "next/link";
import { teamMembers, TeamMember } from "@/constants/constants";

interface SocialLink {
  icon: React.ElementType;
  url: string;
  name?: string;
}

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

interface MemberCardProps {
  member: TeamMember;
  idx: number;
}

function MemberCard({ member, idx }: MemberCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = () => {
    if (isMobile) setIsClicked(!isClicked);
  };

  const isActive = isMobile ? isClicked : isHovered;

  return (
    <motion.div
      custom={idx}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={
            typeof member.photo === "string" ? member.photo : member.photo.src
          }
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 1024px) 350px, 100vw"
          priority={idx === 0}
        />
      </div>

      <div className="p-8 bg-p3-charcoal text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={false}
          animate={{ y: isActive ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3
            className={`${orbitron.className} text-2xl font-bold text-white tracking-wide mb-2`}
          >
            {member.name.toUpperCase()}
          </h3>
          <p className="text-sm text-gray-300 font-light">{member.title}</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
          initial={false}
          animate={{ y: isActive ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex space-x-6">
            {member.social.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${social.icon}`}
                className="text-white text-2xl hover:text-teal-400 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TeamMemberSection(): JSX.Element {
  const displayedTeamMembers: TeamMember[] = teamMembers.slice(0, 3);

  return (
    <section
      id="pioneers"
      className="relative py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-0">
        <h2
          className={`${orbitron.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-pure-white mb-12`}
        >
          Our Pioneers
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {displayedTeamMembers.map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </motion.div>

        {teamMembers.length > 3 && (
          <div className="mt-12 flex justify-start">
            <Link
              href="/aboutus"
              className="inline-flex items-center px-10 py-4 bg-p3-pure-white text-p3-pure-black font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              View All Team Members →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
