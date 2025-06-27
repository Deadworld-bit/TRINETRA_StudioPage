"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, GraduationCap, Globe, ArrowRight } from "lucide-react";

const services = [
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

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ServiceCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -10 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="flex flex-col items-start p-12 bg-p3-charcoal rounded-xl shadow-2xl group"
  >
    <Icon className="w-16 h-16 mb-8 text-pure-white" />
    <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">
      {title}
    </h3>
    <p className="text-lg text-gray-300 leading-relaxed mb-8">{description}</p>
    <ArrowRight className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
  </motion.div>
);

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

export default function OurServices() {
  return (
    <motion.section
      id="ourservices"
      className="relative bg-charcoal text-white py-24 px-8 md:px-16 lg:px-32 w-full overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <GridBackground />
      <VerticalLines />

      {/* Content container matching other sections' width */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
