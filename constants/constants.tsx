import profile from "@/public/Profile.jpg"; 
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
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

export interface SectionContent {
  title: string;
  text: string[];
  image: string; 
}

export interface Game {
  title: string;
  genre: string;
  shortDescription: string;
  fullDescription: string;
  platforms: string[];
  image: string; 
  link?: string; 
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

export const sections: SectionContent[] = [
  {
    title: "Studio Mission & Philosophy",
    text: [
      "At TRINETRA, our mission is to revive and reshape the Indian gaming industry by championing original, meaningful game development. The studio aims to support and produce games that are built from unique concepts, avoiding reliance on derivative or cloned content. Through a focus on long-term growth, structured learning, and collaborative experimentation, TRINETRA intends to develop interactive experiences that reflect creativity, authenticity, and technical evolution.",
    ],
    image: "/wallpaper_bg1.jpg",
  },
  {
    title: "Studio Culture & Values",
    text: [
      "TRINETRA operates on principles of continuous learning, open collaboration, and shared growth. The studio encourages participation from individuals at all skill levels, with a focus on fostering team cohesion through Game Jams and small-scale development projects. Diversity of thought, transparent communication, and mutual respect are foundational. The studio remains adaptable in structure, welcoming creative contributors regardless of geographic origin or professional background.",
    ],
    image: "/ConceptPic_2.jpg",
  },
  {
    title: "What Makes Us Different",
    text: [
      "TRINETRA stands out by prioritizing original content in a market dominated by copycat titles. We foster new-concept development and early-stage experimentation, giving emerging developers room to innovate free from commercial constraints. Supported by strategic partnerships and prospective investors—contingent on delivering playable prototypes. We also welcome international collaboration to share knowledge and align with global industry standards.",
    ],
    image: "/ConceptPic_3.jpg",
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
    link: "/games/echoes-of-the-void",
  },
  {
    title: "Pixel Quest: Chronicles",
    genre: "Retro RPG",
    shortDescription: "Retro-inspired RPG with modern twists.",
    fullDescription:
      "Pixel Quest: Chronicles brings back the golden age of RPGs with deep character customization, open-world pixel art exploration, and engaging turn-based combat enhanced by modern quality-of-life improvements. Explore vibrant pixel kingdoms, recruit quirky companions, and craft legendary gear to conquer dungeons and unravel a pixel-perfect prophecy.",
    platforms: ["Switch", "PC"],
    image: "/wallpaper_bg2.jpg",
    link: "/games/pixel-quest-chronicles",
  },
  {
    title: "Echoes of the Void", // Note: Duplicate title. Ensure map keys handle this.
    genre: "Sci-Fi RPG",
    shortDescription: "A sci-fi adventure where every choice alters space-time.",
    fullDescription:
      "Echoes of the Void is an immersive sci-fi RPG featuring dynamic narrative branching, hand-painted celestial art, and a procedurally generated galaxy to explore. Pilot customizable starships, forge alliances with alien races, unravel cosmic mysteries, and master time-bending abilities to save your crew from the void.",
    platforms: ["PC", "Xbox", "PlayStation"],
    image: "/wallpaper_bg1.jpg",
    link: "/games/echoes-of-the-void",
  },
  {
    title: "Pixel Quest: Chronicles", // Note: Duplicate title.
    genre: "Retro RPG",
    shortDescription: "Retro-inspired RPG with modern twists.",
    fullDescription:
      "Pixel Quest: Chronicles brings back the golden age of RPGs with deep character customization, open-world pixel art exploration, and engaging turn-based combat enhanced by modern quality-of-life improvements. Explore vibrant pixel kingdoms, recruit quirky companions, and craft legendary gear to conquer dungeons and unravel a pixel-perfect prophecy.",
    platforms: ["Switch", "PC"],
    image: "/wallpaper_bg2.jpg",
    link: "/games/pixel-quest-chronicles",
  },
];