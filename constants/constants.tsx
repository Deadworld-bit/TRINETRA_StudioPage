import profile from "@/public/Profile.jpg";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

// Sections data
export const sections = [
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

// Team Members data
export const teamMembers = [
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