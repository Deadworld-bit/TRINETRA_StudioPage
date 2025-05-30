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

export const sections: SectionContent[] = [
  {
    title: "Studio Mission & Philosophy",
    text: [
      "At Trinetra, our mission is to build immersive worlds that engage every sense. We believe in blending dynamic gameplay with rich storytelling, empowering players to shape their own unforgettable adventures.",
    ],
    image: "/wallpaper_bg1.jpg",
  },
  {
    title: "Studio Culture & Values",
    text: [
      "Our studio thrives on collaboration and community, creating experiences alongside the very players who enjoy them. We champion inclusivity by embracing diverse perspectives, and we hold ourselves to the highest standards of craft—where visual artistry and innovative mechanics meet.",
    ],
    image: "/wallpaper_bg1.jpg",
  },
  {
    title: "What Makes Us Different",
    text: [
      "What sets Trinetra apart is our focus on emergent storytelling, where no two journeys are ever the same. Every visual is carefully crafted, and every decision you make has a lasting impact, allowing you to shape a universe uniquely your own.",
    ],
    image: "/wallpaper_bg1.jpg",
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