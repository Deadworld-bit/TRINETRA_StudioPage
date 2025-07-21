"use client";

import React, { useState, useEffect, useCallback, JSX } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { FaPhoneAlt, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { Rubik, Merriweather } from "next/font/google";

// Load Google Fonts
const playfair = Rubik({subsets: ["latin"], weight: ["400", "700"],});
const manrope = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

// Type Definitions

type FormState = {
  fullName: string;
  email: string;
  subject: string;
  content: string;
  honeypot: string;
};

type SubmissionStatus = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  formState: FormState;
  status: SubmissionStatus;
  message: string;
  cooldown: number;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

// Constants & Configuration

const COOLDOWN_SECONDS = 30;
const EMAIL_VALIDATION_REGEX = /^\S+@\S+\.\S+$/;
const FORM_RESET_DELAY_MS = 5000;

// Animation Variants

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

const cardHoverEffect: Variants = {
  hover: { scale: 1.03, boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" },
  tap: { scale: 0.98 },
};

// Custom Hooks
function useCooldownTimer(initialCount = 0) {
  const [count, setCount] = useState(initialCount);
  useEffect(() => {
    if (count <= 0) return;
    const timerId = setInterval(() => setCount((c) => c - 1), 1000);
    return () => clearInterval(timerId);
  }, [count]);
  return [count, setCount] as const;
}

function useAutoClearState<T>(
  initialState: T,
  delay: number
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (!state) return;
    const timerId = setTimeout(() => setState(initialState), delay);
    return () => clearTimeout(timerId);
  }, [state, delay, initialState]);
  return [state, setState];
}

// Child Components

function GridBackground() {
  return (
    <div
      aria-hidden="true"
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

function ContactInfoCards() {
  const CONTACT_INFO = [
    {
      Icon: FaPhoneAlt,
      title: "Call Us",
      lines: ["024-6293-5559", "097-7345-712"],
    },
    {
      Icon: FaPaperPlane,
      title: "E-mail",
      lines: ["trinetragames@gmail.com", "contact@trinetragames.in"],
    },
    {
      Icon: FaMapMarkerAlt,
      title: "Location",
      lines: ["474 Central Road", "India"],
    },
  ];

  return (
    <motion.div className="grid gap-8" variants={fadeSlideUp}>
      {CONTACT_INFO.map(({ Icon, title, lines }, idx) => (
        <motion.div
          key={idx}
          variants={{ ...fadeSlideUp, ...cardHoverEffect }}
          whileHover="hover"
          whileTap="tap"
          className="flex flex-col items-start bg-p3-charcoal border border-p3-mint-flash rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-p3-mint-flash rounded-full p-3">
              <Icon className="text-pure-white text-2xl" />
            </div>
            <h4 className={`${playfair.className} font-bold text-p3-snow text-lg`}>{title}</h4>
          </div>
          <div className={`${manrope.className} ml-12 space-y-1 text-p3-snow`}>  
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ContactForm({
  formState,
  status,
  message,
  cooldown,
  onFormChange,
  onFormSubmit,
}: ContactFormProps) {
  const styles = {
    input:
      `${manrope.className} w-full bg-transparent border border-p3-ghost-white rounded-xl px-5 py-4 text-lg text-p3-snow placeholder-p3-slate focus:outline-none focus:bg-p3-snow focus:text-p3-charcoal focus:border-p3-mint-flash transition duration-200 focus:scale-[1.02]`,
    textarea:
      `${manrope.className} w-full bg-transparent border border-p3-ghost-white rounded-xl px-5 py-4 text-lg text-p3-snow placeholder-p3-slate focus:outline-none focus:bg-p3-snow focus:text-p3-charcoal focus:border-p3-mint-flash transition duration-200 focus:scale-[1.02] resize-none`,
    button:
      `${manrope.className} w-full mt-6 px-8 py-4 bg-pure-white hover:bg-p3-coral-burst hover:text-p3-snow border-2 border-p3-mint-flash hover:border-p3-coral-burst rounded-xl text-p3-charcoal font-bold text-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
    honeypot: "hidden",
  };

  const isEmailInvalid =
    formState.email.length > 0 && !EMAIL_VALIDATION_REGEX.test(formState.email);
  const isSubmitDisabled =
    status === "sending" ||
    cooldown > 0 ||
    !EMAIL_VALIDATION_REGEX.test(formState.email);

  const getButtonText = () => {
    if (status === "sending") return "Sending...";
    if (cooldown > 0) return `Wait ${cooldown}s`;
    return "Send Message";
  };

  return (
    <motion.div
      variants={fadeSlideRight}
      className="relative bg-p3-charcoal border border-p3-mint-flash rounded-2xl shadow-2xl p-10"
    >
      <h3
        className={`${playfair.className} text-3xl md:text-4xl font-extrabold mb-6 text-pure-white`}
      >
        Get In Touch
      </h3>
      <form onSubmit={onFormSubmit} className="space-y-5" autoComplete="off">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="fullName"
            placeholder="Name"
            value={formState.fullName}
            onChange={onFormChange}
            className={styles.input}
            required
          />
          <div className="flex flex-col">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={onFormChange}
              className={`${styles.input} ${
                isEmailInvalid ? "border-p3-coral-burst" : ""
              }`}
              required
            />
            {isEmailInvalid && (
              <span className={`${manrope.className} mt-1 text-sm text-pure-white pl-2`}>
                Please enter a valid email.
              </span>
            )}
          </div>
        </div>
        <input
          name="subject"
          placeholder="Subject"
          value={formState.subject}
          onChange={onFormChange}
          className={styles.input}
          required
        />
        <textarea
          name="content"
          placeholder="Message"
          rows={6}
          value={formState.content}
          onChange={onFormChange}
          className={styles.textarea}
          required
        />
        <input
          name="honeypot"
          value={formState.honeypot}
          onChange={onFormChange}
          className={styles.honeypot}
          autoComplete="off"
          tabIndex={-1}
          placeholder="Leave this field empty"
          aria-label="Do not fill this field"
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={styles.button}
        >
          {getButtonText()}
        </button>
        {message && (
          <div
            role="alert"
            className={`mt-4 flex items-center space-x-3 rounded-lg px-5 py-4 transition-opacity duration-300 ${
              status === "success"
                ? "bg-pure-white text-p3-charcoal"
                : "bg-snow text-p3-coral-burst"
            }`}
          >
            {status === "success" ? (
              <CheckCircleIcon className="w-6 h-6 text-p3-charcoal" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-p3-coral-burst" />
            )}
            <span className={`${manrope.className} text-base`}>{message}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
}

export default function Contact() {
  const initialFormState: FormState = {
    fullName: "",
    email: "",
    subject: "",
    content: "",
    honeypot: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [cooldown, setCooldown] = useCooldownTimer(0);
  const [message, setMessage] = useAutoClearState("", FORM_RESET_DELAY_MS);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.honeypot) {
      setMessage("🚫 Spam detected. Submission blocked.");
      setStatus("error");
      return;
    }
    if (cooldown > 0) {
      setMessage(`⏳ Please wait before sending another message.`);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        serviceId,
        templateId,
        {
          fullName: formState.fullName,
          email: formState.email,
          subject: formState.subject,
          content: formState.content,
        },
        publicKey
      );

      setMessage("✅ Message sent successfully!");
      setStatus("success");
      setFormState(initialFormState);
      setCooldown(COOLDOWN_SECONDS);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setMessage(`❌ Failed to send: ${errorMsg}`);
      setStatus("error");
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
        <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-8">
          <div className="md:w-1/3">
            <ContactInfoCards />
          </div>
          <div className="md:w-2/3">
            <ContactForm
              formState={formState}
              status={status}
              message={message}
              cooldown={cooldown}
              onFormChange={handleFormChange}
              onFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
