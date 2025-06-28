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

function GridBackground(): JSX.Element {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/ConvertedPic/parrtern_02.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

function VerticalLines(): JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${((i + 1) * 100) / 6}%`,
            background: "rgba(255, 255, 255, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps): JSX.Element {
  return (
    <div className="w-full px-8 md:px-16 lg:px-32 mx-auto">
      <h2
        className={`${orbitron.className} text-left text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-lg`}
      >
        {title}
      </h2>
    </div>
  );
}

interface MemberCardProps {
  member: TeamMember; 
  idx: number;
}

function MemberCard({ member, idx }: MemberCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (): void => {
    if (isMobile) {
      setIsClicked(!isClicked);
    }
  };

  return (
    <motion.div
      custom={idx}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full group bg-p3-charcoal border border-p3-mint-flash rounded-2xl overflow-hidden shadow-lg relative cursor-pointer"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative w-full h-96 overflow-hidden">
        <Image
          src={
            typeof member.photo === "string" ? member.photo : member.photo.src
          }
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 300px, 100vw"
          priority={idx === 0}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ease-out 
                      ${
                        isMobile
                          ? isClicked
                            ? "h-full bg-black/80 flex items-center justify-center"
                            : "h-auto bg-gradient-to-t from-black/90 to-transparent"
                          : isHovered
                          ? "h-full bg-black/80 flex items-center justify-center"
                          : "h-auto bg-gradient-to-t from-black/90 to-transparent"
                      }`}
        >
          {!((isMobile && isClicked) || (!isMobile && isHovered)) && (
            <div
              className={`text-center transition-all duration-300 ease-out 
                          ${
                            isMobile
                              ? "opacity-100 translate-y-0"
                              : "group-hover:opacity-0 group-hover:-translate-y-4"
                          }`}
            >
              <h3
                className={`${orbitron.className} text-2xl md:text-3xl font-bold text-p3-snow mb-1`}
              >
                {member.name}
              </h3>
              <p className="text-lg text-p3-ghost-white opacity-80">
                {member.title}
              </p>
            </div>
          )}
          {((isMobile && isClicked) || (!isMobile && isHovered)) && (
            <div
              className={`flex gap-6 justify-center transition-all duration-300 ease-out 
                          ${
                            isMobile
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                          }`}
            >
              {member.social.map((social: SocialLink, i: number) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-p3-snow hover:text-p3-ghost-white text-3xl transition-colors"
                  aria-label={`Link to ${member.name}'s ${social.name || 'social' } profile`}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent card click from toggling when clicking social link
                >
                  <social.icon />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamMemberSection(): JSX.Element {
  const displayedTeamMembers: TeamMember[] = teamMembers.slice(0, 4);

  return (
    <section
      id="pioneers"
      className="relative bg-charcoal text-white py-24 w-full overflow-hidden"
    >
      <GridBackground />
      <VerticalLines />
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-0">
        <h2
          className={`${orbitron.className} text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-lg`}
        >
          Our Pioneers
        </h2>

        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {displayedTeamMembers.map((member: TeamMember, idx: number) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </motion.div>

        {/* “View All” button */}
        {teamMembers.length > 4 && (
          <div className="mt-12 flex justify-start">
            <Link
              href="/aboutus"
              className="inline-flex items-center px-10 py-4 bg-p3-pure-white text-black font-semibold rounded-lg shadow-xl hover:bg-gray-200 transition"
            >
              View All Team Members &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}