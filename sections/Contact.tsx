"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";

// Font for consistency
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

const INPUT_CLASSES = `
  w-full bg-p2-slate border border-p2-mint-flash/30 rounded-md
  px-6 py-4 text-base md:text-lg text-pure-white
  focus:outline-none focus:border-p2-mint-flash transition
`;
const TEXTAREA_CLASSES = `
  ${INPUT_CLASSES}
  resize-none
`;
const BUTTON_BASE_CLASSES = `
  mt-4 w-full md:w-fit px-8 py-3
  bg-p2-mint-flash hover:bg-p2-coral-burst hover:text-pure-white
  rounded-md text-pure-black font-semibold
  text-base md:text-lg
  transition
`;
const COOLDOWN_SECONDS = 30;

type FormState = {
  fullName: string;
  email: string;
  subject: string;
  content: string;
  honeypot: string;
};

// Animation variants
const backgroundVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 0.6,
    x: [0, 8, -8, 0],
    transition: {
      delay: i * 0.5,
      repeat: Infinity,
      duration: 12,
      ease: "easeInOut",
    },
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Vertical lines background
function VerticalLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-0.75"
          style={{
            left: `${(i * 100) / 6}%`,
            background: "rgba(20, 106, 163, 0.13)",
            opacity: 1,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

// Watermark and Title
function SectionTitle({
  titleRef,
  titleFontSize,
  watermark,
  title,
}: {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  titleFontSize: number;
  watermark: string;
  title: string;
}) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
      {/* Watermark */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full"
        style={{ opacity: 0.1 }}
      >
        <motion.h1
          variants={itemVariants}
          className={`${orbitron.className} font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap`}
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.10)",
            WebkitTextFillColor: "var(--charcoal)",
            fontSize: `${titleFontSize * 1.75}px`,
            lineHeight: 1,
          }}
        >
          {watermark}
        </motion.h1>
      </motion.div>
      {/* Title */}
      <motion.h2
        ref={titleRef}
        variants={itemVariants}
        className={`${orbitron.className} relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-pure-white drop-shadow-lg`}
      >
        {title}
      </motion.h2>
    </div>
  );
}

// Contact Form
function ContactForm({
  form,
  handleChange,
  handleSubmit,
  isSubmitting,
  isFormValid,
  cooldown,
  message,
  isSuccess,
}: {
  form: FormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isFormValid: boolean;
  cooldown: number;
  message: string;
  isSuccess: boolean;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col w-full bg-p2-charcoal border border-p2-electric-indigo rounded-2xl shadow-lg p-8 md:p-12"
    >
      <motion.h3
        variants={itemVariants}
        className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-pure-white text-left`}
      >
        Contact Us
      </motion.h3>
      <form onSubmit={handleSubmit} className="w-full" autoComplete="off">
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <motion.input
            variants={itemVariants}
            type="text"
            name="fullName"
            placeholder="Name"
            value={form.fullName}
            onChange={handleChange}
            className={INPUT_CLASSES}
            required
          />
          <motion.input
            variants={itemVariants}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={INPUT_CLASSES}
            required
          />
        </motion.div>
        <motion.input
          variants={itemVariants}
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className={`${INPUT_CLASSES} mb-6`}
          required
        />
        <motion.textarea
          variants={itemVariants}
          name="content"
          placeholder="Message"
          rows={6}
          value={form.content}
          onChange={handleChange}
          className={TEXTAREA_CLASSES}
          required
        />
        <input
          type="text"
          name="honeypot"
          value={form.honeypot}
          onChange={handleChange}
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
          title="Leave this field empty"
          placeholder="Leave this field empty"
        />
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={
            BUTTON_BASE_CLASSES +
            (isSubmitting || !isFormValid
              ? " opacity-50 cursor-not-allowed"
              : "")
          }
        >
          {isSubmitting
            ? "Sending..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Send Message"}
        </motion.button>
        {message && (
          <motion.div
            variants={itemVariants}
            className={`mt-4 flex items-center space-x-2 rounded-lg px-4 py-3 transition-opacity duration-300
              ${
                isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            role="alert"
          >
            {isSuccess ? (
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-red-600" />
            )}
            <span className="text-lg">{message}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

// Contact Info Panel
function ContactInfoPanel() {
  const infoList = [
    { icon: FaPhoneAlt, label: "Call Us", value: "024 6293 5559" },
    { icon: FaPaperPlane, label: "Email Us", value: "contact@example.com" },
  ];
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col w-full bg-p2-charcoal border border-p2-electric-indigo rounded-2xl shadow-lg p-8 md:p-12"
    >
      <motion.h3
        variants={itemVariants}
        className={`${orbitron.className} text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-pure-white text-left`}
      >
        Alternative
      </motion.h3>
      <motion.p
        variants={itemVariants}
        className="text-p2-gray-whisper text-base md:text-lg mb-10 max-w-md text-left"
      >
        Always available for freelance opportunities—let’s make something great
        together!
      </motion.p>
      <div className="flex flex-col gap-8">
        {infoList.map((info, idx) => (
          <motion.div
            variants={itemVariants}
            key={idx}
            className="flex items-start gap-4"
          >
            <info.icon className="text-p2-mint-flash text-2xl mt-1" />
            <div>
              <span className="font-semibold text-pure-white">
                {info.label}
              </span>
              <div className="text-p2-gray-whisper">{info.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  // Watermark logic
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      setTitleFontSize(parseFloat(computed.fontSize));
    }
  }, []);

  // Form logic
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    content: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) {
      setMessage("🚫 Spam detected. Submission blocked.");
      return;
    }
    if (cooldown > 0) {
      setMessage(`⏳ Please wait ${cooldown}s before sending another message.`);
      return;
    }
    setIsSubmitting(true);
    setMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          fullName: form.fullName,
          email: form.email,
          subject: form.subject,
          content: form.content,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );

      setMessage("✅ Message sent successfully!");
      setForm({
        fullName: "",
        email: "",
        subject: "",
        content: "",
        honeypot: "",
      });
      setCooldown(COOLDOWN_SECONDS);
    } catch (error: any) {
      setMessage(
        "❌ Failed to send: " + (error.text || error.message || "unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    form.fullName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.subject.trim() !== "" &&
    form.content.trim() !== "" &&
    form.honeypot === "";
  const isSuccess = message.includes("successfully");

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
      id="contact"
    >
      <VerticalLines />
      <SectionTitle
        titleRef={titleRef}
        titleFontSize={titleFontSize}
        watermark="Our Contacts"
        title="Get in Touch"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 mt-20"
      >
        <ContactForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          cooldown={cooldown}
          message={message}
          isSuccess={isSuccess}
        />
        <ContactInfoPanel />
      </motion.div>
    </section>
  );
}
