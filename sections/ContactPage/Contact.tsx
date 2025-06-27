"use client";

import React, { useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Orbitron } from "next/font/google";

// --- Font ---
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

// --- Styles ---
const styles = {
  input: `w-full bg-transparent border border-p3-ghost-white rounded-xl px-5 py-4 text-lg text-p3-snow placeholder-p3-slate
           focus:outline-none focus:bg-p3-snow focus:text-p3-charcoal focus:border-p3-mint-flash
           transition duration-200 focus:scale-[1.02]`,
  textarea: `w-full bg-transparent border border-p3-ghost-white rounded-xl px-5 py-4 text-lg text-p3-snow placeholder-p3-slate
              focus:outline-none focus:bg-p3-snow focus:text-p3-charcoal focus:border-p3-mint-flash
              transition duration-200 focus:scale-[1.02] resize-none`,
  button: `w-full mt-6 px-8 py-4 bg-pure-white hover:bg-p3-coral-burst hover:text-p3-snow
            border-2 border-p3-mint-flash hover:border-p3-coral-burst rounded-xl text-p3-charcoal
            font-bold text-lg shadow-md transition duration-200`,
  hiddenField: "hidden",
};

// --- Constants ---
const COOLDOWN_SECONDS = 30;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardHover: Variants = {
  hover: { scale: 1.03, boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" },
  tap: { scale: 0.98 },
};

// --- Custom Hooks ---
function useCooldownTimer(initial = 0) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    if (count <= 0) return;
    const id = setInterval(() => setCount((c) => Math.max(c - 1, 0)), 1000);
    return () => clearInterval(id);
  }, [count]);
  return [count, setCount] as const;
}

function useAutoClear(
  delay = 5000
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(""), delay);
    return () => clearTimeout(id);
  }, [msg, delay]);
  return [msg, setMsg];
}

function GridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("/ConvertedPic/parttern_06.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.22,
      }}
    />
  );
}

// --- Contact Info Cards ---
const CONTACT_INFO = [
  {
    Icon: FaPhoneAlt,
    title: "Call Us",
    lines: ["024-6293-5559", "097-7345-712"],
  },
  {
    Icon: FaPaperPlane,
    title: "E-mail",
    lines: ["contact@gsmith.com", "info@gsmith.com"],
  },
  {
    Icon: FaMapMarkerAlt,
    title: "Location",
    lines: ["474 Central Road", "India"],
  },
];

function ContactInfoCards() {
  return (
    <motion.div className="grid gap-8" variants={fadeSlideUp}>
      {CONTACT_INFO.map(({ Icon, title, lines }, idx) => (
        <motion.div
          key={idx}
          variants={{ ...fadeSlideUp, ...cardHover }}
          whileHover="hover"
          whileTap="tap"
          className="flex flex-col items-start bg-p3-charcoal border border-p3-mint-flash
                     rounded-2xl p-6 shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-p3-mint-flash rounded-full p-3">
              <Icon className="text-pure-white text-2xl" />
            </div>
            <h4 className="font-bold text-p3-snow text-lg">{title}</h4>
          </div>
          <div className="ml-12 font-mono space-y-1 text-p3-snow">
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- Contact Form ---
type ContactFormProps = {
  form: {
    fullName: string;
    email: string;
    subject: string;
    content: string;
    honeypot: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  cooldown: number;
  message: string;
  isSuccess: boolean;
};

function ContactForm({
  form,
  onChange,
  onSubmit,
  isSubmitting,
  cooldown,
  message,
  isSuccess,
}: ContactFormProps) {
  const validEmail = EMAIL_REGEX.test(form.email);

  return (
    <motion.div
      variants={fadeSlideRight}
      className="relative bg-p3-charcoal border border-p3-mint-flash
                             rounded-2xl shadow-2xl p-10"
    >
      <h3
        className={`${orbitron.className} text-3xl md:text-4xl font-extrabold mb-6 text-pure-white`}
      >
        Get In Touch
      </h3>
      <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="fullName"
            placeholder="Name"
            value={form.fullName}
            onChange={onChange}
            className={styles.input}
            required
          />
          <div className="flex flex-col">
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className={`${styles.input} ${
                form.email && !validEmail ? "border-p3-coral-burst" : ""
              }`}
              required
            />
            {form.email && !validEmail && (
              <span className="mt-1 text-sm text-pure-white pl-2">
                Please enter a valid email.
              </span>
            )}
          </div>
        </div>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={onChange}
          className={styles.input}
          required
        />
        <textarea
          name="content"
          placeholder="Message"
          rows={6}
          value={form.content}
          onChange={onChange}
          className={styles.textarea}
          required
        />

        <input
          name="honeypot"
          value={form.honeypot}
          onChange={onChange}
          className={styles.hiddenField}
          autoComplete="off"
          tabIndex={-1}
          placeholder="Leave this field empty"
          title="Leave this field empty"
        />

        <button
          type="submit"
          disabled={isSubmitting || cooldown > 0 || !validEmail}
          className={`${styles.button} ${
            isSubmitting || cooldown > 0 || !validEmail
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isSubmitting
            ? "Sending..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Send Message"}
        </button>

        {message && (
          <div
            role="alert"
            className={`mt-4 flex items-center space-x-3 rounded-lg px-5 py-4 transition-opacity duration-300
                        ${
                          isSuccess
                            ? "bg-pure-white text-p3-charcoal"
                            : "bg-snow text-p3-coral-burst"
                        }`}
          >
            {isSuccess ? (
              <CheckCircleIcon className="w-6 h-6 text-p3-charcoal" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-p3-coral-burst" />
            )}
            <span className="text-base">{message}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
}

// --- Main Exported Component ---
export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    content: "",
    honeypot: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useCooldownTimer(0);
  const [message, setMsg] = useAutoClear(5000);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.honeypot) {
      setMsg("🚫 Spam detected. Submission blocked.");
      return;
    }
    if (cooldown > 0) {
      setMsg(`⏳ Please wait ${cooldown}s before sending another message.`);
      return;
    }

    setSubmitting(true);
    setMsg("");

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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setMsg("✅ Message sent successfully!");
      setForm({
        fullName: "",
        email: "",
        subject: "",
        content: "",
        honeypot: "",
      });
      setCooldown(COOLDOWN_SECONDS);
    } catch (err) {
      let errorMsg = "unknown error";
      if (typeof err === "object" && err !== null) {
        if ("text" in err && typeof (err as any).text === "string")
          errorMsg = (err as any).text;
        else if ("message" in err && typeof (err as any).message === "string")
          errorMsg = (err as any).message;
      }
      setMsg(`❌ Failed to send: ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-charcoal"
    >
      <GridBackground />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <ContactForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              cooldown={cooldown}
              message={message}
              isSuccess={message.includes("success")}
            />
          </div>
          <div className="md:w-1/3">
            <ContactInfoCards />
          </div>
        </div>
        {/* Add margin below the form/info section to prevent overlap */}
        <div className="h-4 md:h-4" />
      </div>
    </motion.section>
  );
}
