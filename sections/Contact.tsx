"use client";

import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending message:", form);
    // submit logic…
  };

  return (
    <section
      className="
        relative w-full min-h-screen
        bg-charcoal bg-[url('/wallpaper_bg8.jpg')] bg-cover bg-center
        flex flex-col lg:flex-row items-stretch
      "
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        {/* left info card */}
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
          <h3 className="text-4xl lg:text-5xl font-bold mb-4">TRINETRA GAME STUDIO</h3>
          <p className="mb-8 text-lg lg:text-xl">
            We are the best partner to take your game global
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center text-lg lg:text-xl">
              <svg
                className="w-6 h-6 mr-3 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 4.5A2.5 2.5 0 014.5 2h15A2.5 2.5 0 0122 4.5v15a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 19.5v-15zM4.5 4a.5.5 0 00-.5.5V7l8 5 8-5V4.5a.5.5 0 00-.5-.5h-15zM20 9.07l-7.555 4.722a.5.5 0 01-.444 0L4 9.07V19.5a.5.5 0 00.5.5h15a.5.5 0 00.5-.5V9.07z"/>
              </svg>
              <span>trinetra.info@trinetragames.com</span>
            </div>
            <div className="flex items-center text-lg lg:text-xl">
              <svg
                className="w-6 h-6 mr-3 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 5.25A2.25 2.25 0 015.25 3h1.5A2.25 2.25 0 019 5.25v1.5A2.25 2.25 0 016.75 9H6a.75.75 0 00-.75.75 8.25 8.25 0 008.25 8.25.75.75 0 00.75-.75v-.75a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0119 13.75v1.5A2.25 2.25 0 0116.75 17h-1.5a12.75 12.75 0 01-12.75-12.75V5.25z"/>
              </svg>
              <span>024 6293 5559</span>
            </div>
          </div>
        </div>
      </div>

      {/* right form */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 lg:p-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-8 text-pure-white"
        >
          <div className="flex items-center mb-2">
            <span className="text-orange-500 uppercase tracking-wide text-base lg:text-lg">
              Send us your message
            </span>
            <div className="flex-1 h-px bg-light-gray ml-4" />
          </div>

          <h3 className="text-4xl lg:text-5xl font-bold mb-6">
            We are here because of you!
          </h3>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-lg lg:text-xl"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="
                  w-full bg-charcoal bg-opacity-60
                  border-2 border-light-gray rounded-lg px-6 py-4
                  text-lg lg:text-xl
                  focus:outline-none focus:ring-4 focus:ring-orange-500
                "
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg lg:text-xl"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="
                  w-full bg-charcoal bg-opacity-60
                  border-2 border-light-gray rounded-lg px-6 py-4
                  text-lg lg:text-xl
                  focus:outline-none focus:ring-4 focus:ring-orange-500
                "
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-lg lg:text-xl"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                value={form.content}
                onChange={handleChange}
                required
                className="
                  w-full bg-charcoal bg-opacity-60
                  border-2 border-light-gray rounded-lg px-6 py-4
                  text-lg lg:text-xl
                  focus:outline-none focus:ring-4 focus:ring-orange-500
                  resize-none
                "
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              mt-4 w-full py-4 lg:py-5
              bg-orange-500 hover:bg-orange-600
              rounded-lg text-pure-white font-semibold text-lg lg:text-xl
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
