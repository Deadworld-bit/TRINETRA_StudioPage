"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import profile from "@/public/Profile.jpg";

const teamMembers = [
  {
    name: "Alakh Pandey",
    title: "Creative Director",
    photo: profile,
    social: [
      { icon: FaTwitter, url: "https://twitter.com/alakh" },
      { icon: FaLinkedin, url: "https://linkedin.com/in/alakh" },
    ],
  },
  {
    name: "Pushpa Raj",
    title: "Lead Developer",
    photo: profile,
    social: [{ icon: FaTwitter, url: "https://twitter.com/pushpa" }],
  },
  {
    name: "Sanni Dancer",
    title: "Art & Design",
    photo: profile,
    social: [{ icon: FaInstagram, url: "https://instagram.com/sanni" }],
  },
];

const cardVariants = {
  hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" },
};

export default function TeamMembers() {
  return (
    <section className="relative bg-[#111214] text-gray-100 py-20 overflow-hidden">
      {/* Slanted top divider */}
      {/* <div className="w-full overflow-hidden leading-none rotate-180">
        <svg
          className="block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <polygon points="1200 0 0 0 0 120" className="fill-white" />
        </svg>
      </div> */}

      <div className="container mx-auto px-4">
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center text-center"
              whileHover="hover"
              variants={cardVariants}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden ring-2 ring-purple-500">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{member.title}</p>
              <div className="flex space-x-4">
                {member.social.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slanted bottom divider */}
      {/* <div className="w-full overflow-hidden leading-none">
        <svg
          className="block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <polygon points="0 0 1200 0 1200 120" className="fill-white" />
        </svg>
      </div> */}
    </section>
  );
}
