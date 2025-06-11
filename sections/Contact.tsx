"use client";

import React, { useState, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const INPUT_CLASSES = `
  w-full bg-charcoal bg-opacity-60
  border-2 border-light-gray rounded-lg
  px-6 py-4 text-lg lg:text-xl
  focus:outline-none focus:ring-4 focus:ring-orange-500
`;
const TEXTAREA_CLASSES = `
  ${INPUT_CLASSES}
  resize-none
`;
const BUTTON_BASE_CLASSES = `
  mt-4 w-full py-4 lg:py-5
  bg-orange-500 hover:bg-orange-600
  rounded-lg text-pure-white font-semibold
  text-lg lg:text-xl
  transition-colors duration-200
`;
const COOLDOWN_SECONDS = 30;

function ContactInfoCard() {
  return (
    <div
      className="
        bg-dark-gray
        border-2 border-orange-500
        p-12 lg:p-16
        w-full max-w-lg
        text-pure-white
      "
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 1.5rem) 0, 100% 1.5rem, 100% 100%, 1.5rem 100%, 0 calc(100% - 1.5rem))",
      }}
    >
      <h3 className="text-4xl lg:text-5xl font-bold mb-4">
        TRINETRA GAME STUDIO
      </h3>
      <p className="mb-8 text-lg lg:text-xl">
        We are the best partner to take your game global
      </p>

      <div className="space-y-6 mb-10">
        {/* Email row */}
        <div className="flex items-center text-lg lg:text-xl">
          <svg
            className="w-6 h-6 mr-3 text-orange-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2 4.5A2.5 2.5 0 014.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15zM4.5 4a.5.5 0 00-.5.5V7l8 5 8-5V4.5a.5.5 0 00-.5-.5h-15zM20 9.07l-7.555 4.722a.5.5 0 01-.444 0L4 9.07V19.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V9.07z" />
          </svg>
          <span>trinetra.info@trinetragames.com</span>
        </div>

        {/* Phone row */}
        <div className="flex items-center text-lg lg:text-xl">
          <svg
            className="w-6 h-6 mr-3 text-orange-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 5.25A2.25 2.25 0 015.25 3h1.5A2.25 2.25 0 019 5.25v1.5A2.25 2.25 0 016.75 9H6a.75.75 0 00-.75.75C5.25 17.25 12 21 12 21a.75.75 0 00.75-.75v-.75a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0119 16.75v1.5A2.25 2.25 0 0116.75 20h-1.5a12.75 12.75 0 01-12.75-12.75V5.25z" />
          </svg>
          <span>024 6293 5559</span>
        </div>
      </div>
    </div>
  );
}

type FormState = {
  fullName: string;
  email: string;
  content: string;
  honeypot: string; 
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
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
          content: form.content,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );

      setMessage(" Message sent successfully");
      setForm({ fullName: "", email: "", content: "", honeypot: "" });
      setCooldown(COOLDOWN_SECONDS);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "text" in error) {
        setMessage("❌ Failed to send message: " + (error as { text?: string }).text);
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
    form.content.trim() !== "" &&
    form.honeypot === "";
  const isSuccess = message.includes("successfully");

  return (
    <section
      className="
        relative w-full min-h-screen
        bg-charcoal bg-[url('/wallpaper_bg7.jpg')] bg-cover bg-center
        flex flex-col lg:flex-row items-stretch
      "
      id="contact"
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        <ContactInfoCard />
      </div>

      {/* Right form */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-8"
        >
          {/* Section title */}
          <div className="flex items-center mb-2">
            <span className="text-orange-500 uppercase tracking-wide text-base lg:text-lg">
              Send us your message
            </span>
            <div className="flex-1 h-px bg-light-gray ml-4" />
          </div>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-pure-white">
            We are here because of you!
          </h3>
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
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block mb-2 text-lg lg:text-xl text-pure-white">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className={INPUT_CLASSES}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-lg lg:text-xl text-pure-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className={INPUT_CLASSES}
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block mb-2 text-lg lg:text-xl text-pure-white">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                value={form.content}
                onChange={handleChange}
                required
                className={TEXTAREA_CLASSES}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`
              ${BUTTON_BASE_CLASSES}
              ${isSubmitting || !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : ""
              }
            `}
          >
            {isSubmitting
              ? "Sending..."
              : cooldown > 0
              ? `Wait ${cooldown}s`
              : "Send Message"}
          </button>
          
          {message && (
            <div
              className={`
                mt-4 flex items-center space-x-2 rounded-lg px-4 py-3
                transition-opacity duration-300
                ${isSuccess
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
    </section>
  );
}
