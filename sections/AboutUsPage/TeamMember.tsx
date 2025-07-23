"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Rubik } from "next/font/google";
import Link from "next/link";
import { teamMembers, TeamMember } from "@/constants/constants";

// Font
const playfair = Rubik({ subsets: ["latin"], weight: ["400", "700"] });

// Animation Variants
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
  return (
    <motion.div
      custom={idx}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={typeof member.photo === "string" ? member.photo : member.photo.src}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 1024px) 350px, 100vw"
          priority={idx === 0}
        />
      </div>

      <div className="absolute bottom-0 w-full bg-[#262626]/80 bg-opacity-60 p-4 flex flex-col items-center">
        <h3 className={`${playfair.className} text-xl font-semibold text-white uppercase tracking-wide text-center`}>
          {member.name} - {member.title}
        </h3>
        <div className="mt-2 flex space-x-4">
          {member.social.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on social`}
              className="text-white text-2xl hover:text-teal-400 transition-colors duration-200"
            >
              <social.icon />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamMemberSection(): JSX.Element {
  return (
    <section
      id="pioneers"
      className={`relative py-16 px-8 md:px-16 lg:px-32 overflow-hidden ${playfair.className}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-extrabold text-pure-white mb-8 text-center mx-auto`}
        >
          Our Pioneers
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {teamMembers.map((member, idx) => (
            <MemberCard key={idx} member={member} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}