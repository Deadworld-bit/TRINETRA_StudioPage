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
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";

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

export default function Contact() {
  // Watermark logic
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleFontSize, setTitleFontSize] = useState<number>(48);

  useLayoutEffect(() => {
    if (titleRef.current) {
      const computed = window.getComputedStyle(titleRef.current);
      const size = parseFloat(computed.fontSize);
      setTitleFontSize(size);
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

      setMessage(" Message sent successfully");
      setForm({
        fullName: "",
        email: "",
        subject: "",
        content: "",
        honeypot: "",
      });
      setCooldown(COOLDOWN_SECONDS);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "text" in error) {
        setMessage(
          "❌ Failed to send message: " + (error as { text?: string }).text
        );
      } else if (error instanceof Error) {
        setMessage("❌ Failed to send message: " + error.message);
      } else {
        setMessage("❌ Failed to send message: An unknown error occurred.");
      }
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
      {/* Vertical Lines Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i * 100) / 6}%`,
              background:
                "linear-gradient(180deg,rgba(94,96,206,0.13),rgba(94,96,206,0.06) 60%,rgba(94,96,206,0.13))", // p2-electric-indigo accent
              filter: "blur(0.5px)",
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      
      {/* Watermark */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-start">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full">
          <h1
            className="font-extrabold uppercase leading-none tracking-tighter whitespace-nowrap"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.10)",
              WebkitTextFillColor: "var(--charcoal)",
              color: "var(--charcoal)",
              fontSize: `${titleFontSize * 1.75}px`,
              lineHeight: 1,
              transition: "font-size 0.2s",
            }}
          >
            Our Contacts
          </h1>
        </div>
        <h2
          ref={titleRef}
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-0 text-left text-pure-white drop-shadow-lg"
          style={{
            transition: "font-size 0.2s",
          }}
        >
          Get in Touch
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 mt-20">
        {/* Left: Form */}
        <div className="flex flex-col w-full bg-p2-charcoal border border-p2-electric-indigo rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-pure-white text-left">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="w-full" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="fullName"
                placeholder="Name"
                value={form.fullName}
                onChange={handleChange}
                className={INPUT_CLASSES}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={INPUT_CLASSES}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className={`${INPUT_CLASSES} mb-6`}
              required
            />
            <textarea
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
              placeholder="Leave this field empty"
              title="If you are a human, leave this field empty"
            />
            <button
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
            </button>
            {message && (
              <div
                className={`mt-4 flex items-center space-x-2 rounded-lg px-4 py-3 transition-opacity duration-300
                  ${
                    isSuccess
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                `}
                role="alert"
              >
                {isSuccess ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-600" />
                )}
                <span className="text-lg">{message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col w-full bg-p2-charcoal border border-p2-electric-indigo rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-pure-white text-left">
            Alternative
          </h2>
          <p className="text-p2-gray-whisper text-base md:text-lg mb-10 max-w-md text-left">
            Always available for freelance work if the right project comes
            along, Feel free to contact us!
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <FaBuilding className="text-p2-mint-flash text-2xl mt-1" />
              <div>
                <span className="font-semibold text-pure-white">Company</span>
                <div className="text-p2-gray-whisper">ThemeREC</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-p2-mint-flash text-2xl mt-1" />
              <div>
                <span className="font-semibold text-pure-white">Location</span>
                <div className="text-p2-gray-whisper">
                  Time Square, Manhattan, NYC, USA
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-p2-mint-flash text-2xl mt-1" />
              <div>
                <span className="font-semibold text-pure-white">Call Us</span>
                <div className="text-p2-gray-whisper">+1-200-300-4000</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPaperPlane className="text-p2-mint-flash text-2xl mt-1" />
              <div>
                <span className="font-semibold text-pure-white">Email Us</span>
                <div className="text-p2-gray-whisper">contact@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}