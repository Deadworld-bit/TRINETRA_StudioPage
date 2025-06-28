import profile from "@/public/Profile.jpg"; 
import { FaTwitter, FaLinkedin, FaInstagram, FaLightbulb, FaGraduationCap, FaGlobe } from "react-icons/fa";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface SocialLink {
  icon: IconType;
  url: string;
}

export interface TeamMember {
  name: string;
  title: string;
  photo: StaticImageData | string;
  social: SocialLink[];
}

export interface AboutUs {
  title: string;
  text_1: string[];
  text_2: string[];
}

export interface MissionPillar {
  icon: string;
  title: string;
  desc: string;
}

export interface Game {
  title: string;
  genre: string;
  shortDescription: string;
  fullDescription: string;
  platforms: string[];
  image: string;
  downloadLinks: { [platform: string]: string }; 
}

export const aboutus: AboutUs[] = [
  {
    title: "About Us",
    text_1: [
    "At TRINETRA, our mission is to revive and reshape the Indian gaming industry by championing original, meaningful game development. We avoid reliance on derivative or cloned content, focusing instead on unique concepts that push creative boundaries.",
    ],
    text_2: [
    "Through structured learning and collaborative experimentation, we develop interactive experiences that reflect creativity, authenticity, and technical evolution.",
    ],
  },
]

export const missionPillars: MissionPillar[] = [
  {
    icon: "FaLightbulb", 
    title: "Original Content",
    desc: "We prioritize original ideas in a market dominated by copycat titles, fostering new-concept development and early-stage experimentation.",
  },
  {
    icon: "FaGraduationCap", 
    title: "Continuous Learning",
    desc: "Our studio operates on principles of continuous learning, encouraging participation from individuals at all skill levels.",
  },
  {
    icon: "FaGlobe", 
    title: "Global Collaboration",
    desc: "We welcome international collaboration to share knowledge and align with global industry standards.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Alakh Pandey",
    title: "Creative Director",
    photo: profile, 
    social: [
      { icon: FaTwitter, url: "https://twitter.com/alakh" },
      { icon: FaLinkedin, url: "https://linkedin.com/in/alakh" },
    ],
  },
  {
    name: "Pushpa Raj",
    title: "Lead Developer",
    photo: profile,
    social: [{ icon: FaTwitter, url: "https://twitter.com/pushpa" }],
  },
  {
    name: "Sanni Dancer",
    title: "Art & Design",
    photo: profile,
    social: [{ icon: FaInstagram, url: "https://instagram.com/sanni" }],
  },
  {
    name: "Alakh Pandey",
    title: "Creative Director",
    photo: profile, 
    social: [
      { icon: FaTwitter, url: "https://twitter.com/alakh" },
      { icon: FaLinkedin, url: "https://linkedin.com/in/alakh" },
    ],
  },
  {
    name: "Pushpa Raj",
    title: "Lead Developer",
    photo: profile,
    social: [{ icon: FaTwitter, url: "https://twitter.com/pushpa" }],
  },
  {
    name: "Sanni Dancer",
    title: "Art & Design",
    photo: profile,
    social: [{ icon: FaInstagram, url: "https://instagram.com/sanni" }],
  },
];

export const Games: Game[] = [
  {
    title: "Echoes of the Void",
    genre: "Sci-Fi RPG",
    shortDescription: "A sci-fi adventure where every choice alters space-time.",
    fullDescription:
      "Echoes of the Void is an immersive sci-fi RPG featuring dynamic narrative branching, hand-painted celestial art, and a procedurally generated galaxy to explore. Pilot customizable starships, forge alliances with alien races, unravel cosmic mysteries, and master time-bending abilities to save your crew from the void.",
    platforms: ["PC", "Xbox", "PlayStation"],
    image: "/wallpaper_bg1.jpg",
    downloadLinks: {
      PC: "https://example.com/echoes-pc",
      Xbox: "https://example.com/echoes-xbox",
      PlayStation: "https://example.com/echoes-ps",
    },
  },
  {
    title: "Pixel Quest: Chronicles",
    genre: "Retro RPG",
    shortDescription: "Retro-inspired RPG with modern twists.",
    fullDescription:
      "Pixel Quest: Chronicles brings back the golden age of RPGs with deep character customization, open-world pixel art exploration, and engaging turn-based combat enhanced by modern quality-of-life improvements. Explore vibrant pixel kingdoms, recruit quirky companions, and craft legendary gear to conquer dungeons and unravel a pixel-perfect prophecy.",
    platforms: ["PC", "iOS", "Android"],
    image: "/wallpaper_bg2.jpg",
    downloadLinks: {
      PC: "https://example.com/pixelquest-pc",
      iOS: "https://example.com/pixelquest-ios",
      Android: "https://example.com/pixelquest-android",
    },
  },
  {
    title: "Mystic Arena",
    genre: "MOBA",
    shortDescription: "Fast-paced multiplayer battles in a mystical world.",
    fullDescription:
      "Mystic Arena is a competitive MOBA where players control unique heroes with magical abilities. Team up, strategize, and battle in vibrant arenas. Unlock skins, climb the leaderboards, and prove your skills in cross-platform play.",
    platforms: ["PC", "iOS", "Android"],
    image: "/wallpaper_bg3.jpg",
    downloadLinks: {
      PC: "https://example.com/mystic-pc",
      iOS: "https://example.com/mystic-ios",
      Android: "https://example.com/mystic-android",
    },
  },
  {
    title: "Skyline Racer",
    genre: "Racing",
    shortDescription: "High-speed racing above the clouds.",
    fullDescription:
      "Skyline Racer lets you race anti-gravity vehicles on tracks suspended in the sky. Customize your ride, master tricky courses, and challenge friends in online multiplayer. Available on console and mobile.",
    platforms: ["PC", "Xbox", "PlayStation", "iOS", "Android"],
    image: "/wallpaper_bg4.jpg",
    downloadLinks: {
      PC: "https://example.com/skyline-pc",
      Xbox: "https://example.com/skyline-xbox",
      PlayStation: "https://example.com/skyline-ps",
      iOS: "https://example.com/skyline-ios",
      Android: "https://example.com/skyline-android",
    },
  },
];