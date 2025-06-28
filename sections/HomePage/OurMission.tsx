"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, GraduationCap, Globe, ArrowRight } from "lucide-react";

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: {}, // keep section visible to avoid white flash
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const hoverTransition = { type: "spring", stiffness: 300 };

// --- Data ---
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

// --- Decorative Components ---
const GridBackground: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: 'url("/ConvertedPic/parttern_07.webp")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.22,
    }}
  />
);

// --- Service Card Component ---
interface ServiceCardProps extends Service {}
const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex flex-col items-start p-8 bg-p3-charcoal rounded-xl shadow-2xl group"
    variants={cardVariants}
    whileHover={{ y: -8 }}
    transition={hoverTransition}
  >
    <Icon className="w-12 h-12 mb-4 text-pure-white" />
    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4">
      {title}
    </h3>
    <p className="text-base text-gray-300 leading-relaxed mb-6">
      {description}
    </p>
    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
  </motion.div>
);

// --- Our Services Section ---
const OurServices: React.FC = () => (
  <section
    id="ourservices"
    className="relative text-white py-24 px-8 md:px-16 lg:px-32 w-full overflow-hidden"
  >

    <motion.div
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {services.map((svc, idx) => (
        <ServiceCard
          key={idx}
          icon={svc.icon}
          title={svc.title}
          description={svc.description}
        />
      ))}
    </motion.div>
  </section>
);

export default OurServices;
