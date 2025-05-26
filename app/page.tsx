"use client";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import Game from "@/sections/Game";
import TeamMembers from "@/sections/TeamMember";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Introduction />
        <TeamMembers />
        <Game />
        <Footer />
      </main>
    </>
  );
}