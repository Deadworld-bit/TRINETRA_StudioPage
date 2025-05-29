"use client";
import Navbar from "@/sections/Navbar/Navbar";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import Game from "@/sections/Game";
import TeamMembers from "@/sections/TeamMember/TeamMember";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
        <Hero />
        <Introduction />
        <TeamMembers />
        <Game />
        <Contact />
        <Footer />
    </>
  );
}