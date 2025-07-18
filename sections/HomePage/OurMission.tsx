"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, GraduationCap, Globe, ArrowRight } from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

// Load Google Fonts
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Animation Variants
const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const hoverTransition = { type: "spring", stiffness: 300 };

// Data
interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Lightbulb,
    title: "Original Content",
    description:
      "We prioritize original ideas in a market dominated by copycat titles, fostering new-concept development and early-stage experimentation.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description:
      "Our studio operates on principles of continuous learning, encouraging participation from individuals at all skill levels.",
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description:
      "We welcome international collaboration to share knowledge and align with global industry standards.",
  },
];

// Our Services Section
const OurMissions: React.FC = () => (
  <section
    id="ourservices"
    className={`relative text-white py-16 px-8 md:px-16 lg:px-32 w-full overflow-hidden ${playfair.className}`}
  >
    <motion.div
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {services.map((svc, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-start p-6 md:p-8 bg-p3-charcoal rounded-xl shadow-2xl group"
          variants={cardVariants}
          whileHover={{ y: -8 }}
          transition={hoverTransition}
        >
          <svc.icon className="w-14 h-14 mb-4 text-pure-white" />
          <h3
            className={`${playfair.className} text-2xl md:text-3xl font-bold text-white uppercase tracking-wide mb-3`}
          >
            {svc.title}
          </h3>
          <p
            className={`${manrope.className} text-lg md:text-xl text-gray-300 leading-relaxed mb-6`}
          >
            {svc.description}
          </p>
          <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default OurMissions;
