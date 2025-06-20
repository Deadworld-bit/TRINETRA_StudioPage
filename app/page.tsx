"use client";
import Navbar from "@/sections/Navbar/Navbar";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import Game from "@/sections/Game";
import TeamMembers from "@/sections/TeamMember";
import Contact from "@/sections/Contact";
import OurMission from "@/sections/OurMission";
import OurValue from "@/sections/OurValue";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Introduction />
      <OurMission />
      <Game />
      <TeamMembers />
      <OurValue />
      <Contact />
      <Footer />
    </>
  );
}
