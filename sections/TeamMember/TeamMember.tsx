"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { teamMembers } from "@/constants/constants";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.07,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
};

type TeamMemberCardProps = {
  index: number;
  name: string;
  title: string;
  photo: string;
  social: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; url: string }[];
  isActive: boolean;
  onToggle: (idx: number | null) => void;
};

function TeamMemberCard({
  index,
  name,
  title,
  photo,
  social,
  isActive,
  onToggle,
}: TeamMemberCardProps) {
  return (
    <motion.div
      className="
        group 
        relative 
        bg-white 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        cursor-pointer
      "
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover="hover"
      onClick={() => onToggle(isActive ? null : index)}
    >
      <div className="relative w-full h-0 pb-[100%]">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
        />
        <div
          className={`
            absolute inset-0 
            bg-black/60 
            flex flex-col justify-end items-center 
            transition-opacity duration-300
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          <p className="text-white text-lg font-medium mb-2">{title}</p>
          <div className="flex space-x-4 mb-4">
            {social.map((socialLink, i) => (
              <a
                key={i}
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:-translate-y-1 transition-transform"
                aria-label={socialLink.url}
              >
                <socialLink.icon width={24} height={24} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Name Section */}
      <div className="py-6 px-5 text-center">
        <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
      </div>
    </motion.div>
  );
}

export default function TeamMembers() {
  // Tracks which card is “active” (showing its overlay)
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (idx: number | null) => {
    setActiveCard(idx);
  };

  return (
    <section
      className="
        relative 
        overflow-hidden 
        py-16 
        sm:py-24 
        lg:py-32 
        bg-cover 
        bg-center 
        bg-scroll
      "
      id="pioneers"
      style={{ backgroundImage: "url('/wallpaper_bg6.jpg')" }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-charcoal" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-charcoal" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-pure-white mb-6">
            Get to know the exceptional professionals who make our team shine
          </h2>
          <p className="text-xl text-light-gray">
            Discover the exceptional talent driving our team&apos;s success — our
            brilliant game developers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, idx) => (
            <TeamMemberCard
              key={idx}
              index={idx}
              name={member.name}
              title={member.title}
              photo={typeof member.photo === "string" ? member.photo : member.photo.src}
              social={member.social}
              isActive={activeCard === idx}
              onToggle={toggleCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
