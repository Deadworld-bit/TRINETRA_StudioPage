"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";
import { sections } from "@/constants/constants";
import backgroundImage2 from "@/public/wallpaper_bg9.jpg";

// Fade-in-up variant 
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const fadeInUpTransition = { duration: 0.7, ease: "easeOut" };

// Slide-in from left 
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};
const slideInLeftTransition = { delay: 0.2, duration: 0.6, ease: "easeOut" };

// Slide-in from right 
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};
const slideInRightTransition = { delay: 0.5, duration: 0.6, ease: "easeOut" };

// Fade-in for paragraphs with incremental delay
const paragraphFadeIn = (): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
});
const paragraphTransition = (index: number) => ({
  delay: 0.4 + index * 0.1,
  duration: 0.5,
});

// Hover scale effect on images
const imageHoverProps = {
  whileHover: {
    scale: 1.03,
    boxShadow: "0px 15px 25px -8px rgba(200,200,200,0.15)",
  },
  transition: { type: "spring", stiffness: 260, damping: 20 },
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
};

type SectionDividerProps = {
  color: string;
  type: "A" | "B";
  className?: string;
};

const SectionDivider = ({ color, type, className }: SectionDividerProps) => {
  const points = type === "A" ? "0,10 100,0 100,10" : "100,10 0,0 0,10";
  return (
    <div className={`relative ${className || ""}`} style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="block w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <polygon points={points} fill={color} />
      </svg>
    </div>
  );
};

type ContentSectionProps = {
  title: string;
  text: string[];
  image: StaticImageData | string;
  bgColor?: string;          
  textColor?: string;        
  titleColor?: string;       
  reverseOnDesktop?: boolean; 
};

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  text,
  image,
  bgColor = "bg-snow",
  textColor = "text-dark-gray",
  titleColor = "text-pure-black",
  reverseOnDesktop = false,
}) => {
  // Determine flex ordering based on reverseOnDesktop
  // On mobile, text always appears above image (so order-last on image only for mobile).
  const textOrderClass = reverseOnDesktop ? "order-last lg:order-first" : "";
  const imageOrderClass = reverseOnDesktop ? "order-first lg:order-last" : "";

  return (
    <motion.div
      className={`${bgColor} py-16 md:py-24 px-6 md:px-10 lg:px-20`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      transition={fadeInUpTransition}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <motion.div
          className={`flex-1 text-left ${textOrderClass}`}
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={slideInLeftTransition}
        >
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-10 leading-tight ${titleColor}`}
          >
            {title}
          </h2>
          {text.map((paragraph, idx) => (
            <motion.p
              key={idx}
              className={`text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 ${textColor} leading-relaxed`}
              variants={paragraphFadeIn()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={paragraphTransition(idx)}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className={`
            flex-1 
            w-full max-w-md lg:max-w-xl 
            h-[20rem] md:h-[28rem] lg:h-[32rem] 
            relative overflow-hidden rounded-xl md:rounded-2xl 
            shadow-xl md:shadow-2xl ring-2 md:ring-4 ring-light-gray/20
            ${imageOrderClass}
          `}
          {...imageHoverProps}
          transition={{ ...imageHoverProps.transition, delay: 0.3 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function IntroductionSection() {
  return (
    <section className="overflow-hidden" id="ourmission">
      <ContentSection
        title={sections[0].title}
        text={sections[0].text}
        image={sections[0].image}
        bgColor="bg-pure-white"
        textColor="text-dark-gray"
        titleColor="text-pure-black"
        reverseOnDesktop={false}
      />

      <SectionDivider color="var(--dark-gray)" type="A" className="bg-pure-white" />

      <motion.div className="relative px-6 md:px-10 lg:px-20 overflow-hidden pt-0 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage2}
            alt="Abstract background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>
        <motion.div
          className="absolute inset-0 bg-charcoal/70 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 z-30 py-16">
          <motion.div
            className="
              flex-1 w-full max-w-md lg:max-w-xl
              h-[20rem] md:h-[28rem] lg:h-[32rem]
              relative overflow-hidden rounded-xl md:rounded-2xl
              shadow-xl md:shadow-2xl ring-2 md:ring-4 ring-light-gray/20
              order-last lg:order-first
            "
            {...imageHoverProps}
            transition={{ ...imageHoverProps.transition, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src={sections[1].image}
              alt={sections[1].title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </motion.div>
          <motion.div
            className="flex-1 text-left lg:text-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
            transition={slideInRightTransition}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pure-white mb-6 md:mb-10 leading-tight">
              {sections[1].title}
            </h2>
            {sections[1].text.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className="text-lg md:text-xl lg:text-2xl text-snow mb-4 md:mb-6 leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideInRight}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.15 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <SectionDivider color="var(--dark-gray)" type="A" className="transform rotate-180 bg-snow"/>

      <ContentSection
        title={sections[2].title}
        text={sections[2].text}
        image={sections[2].image}
        bgColor="bg-snow"
        textColor="text-dark-gray"
        titleColor="text-pure-black"
        reverseOnDesktop={false}
      />
    </section>
  );
}
