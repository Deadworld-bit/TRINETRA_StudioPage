"use client";

import Hero from "@/sections/HomePage/Hero";
import Introduction from "@/sections/HomePage/Introduction";
import Game from "@/sections/HomePage/Game";
import TeamMembers from "@/sections/HomePage/TeamMember";
import Contact from "@/sections/HomePage/Contact";
import OurMission from "@/sections/HomePage/OurMission";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <OurMission />
      <TeamMembers />
      <Game />
      <Contact />
    </>
  );
}
