"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { teamMembers } from "@/constants/constants";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function GridBackground() {
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

function VerticalLines() {
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

function SectionHeader({ title }: { title: string }) {
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

function MemberCard({ member, idx }: { member: any; idx: number }) {
  return (
    <motion.div
      custom={idx}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full group bg-p3-charcoal border border-p3-mint-flash/30 rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
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
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex gap-6">
            {member.social.map((social: any, i: number) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-p3-snow hover:text-p3-ghost-white text-3xl transition-colors"
                aria-label={`Link to ${member.name}'s profile`}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <h3
          className={`${orbitron.className} text-2xl md:text-3xl font-bold text-p3-snow mb-1`}
        >
          {member.name}
        </h3>
        <p className="text-lg text-p3-ghost-white opacity-80">{member.title}</p>
      </div>
    </motion.div>
  );
}

export default function TeamMemberSection() {
  const displayedTeamMembers = teamMembers.slice(0, 4);

  return (
    <section
      id="pioneers"
      className="relative bg-charcoal text-white py-24 w-full overflow-hidden"
    >
      <GridBackground />
      <VerticalLines />

      {/* center everything in a 7xl container, same as OurServices */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-0">
        {/* Section title — no extra px */}
        <h2
          className={`${orbitron.className} text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-p3-snow drop-shadow-lg`}
        >
          Our Pioneers
        </h2>

        {/* Cards Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {displayedTeamMembers.map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </motion.div>

        {/* “View All” button */}
        {teamMembers.length > 4 && (
          <div className="mt-12 flex justify-start">
            <Link
              href="/aboutus"
              className="inline-flex items-center px-10 py-4 bg-white text-black font-semibold rounded-lg shadow-xl hover:bg-gray-200 transition"
            >
              View All Team Members &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
