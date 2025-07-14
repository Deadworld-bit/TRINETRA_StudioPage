import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRINETRA Games",
  description: "TRINETRA GAMES is an independent game development studio based in India, driven by creativity, passion, and bold ideas. We specialize in crafting unique, story-rich indie games that resonate with players around the world. At TRINETRA, we believe great games are made with heart—and we love to collaborate beyond borders to bring unforgettable gaming experiences to life.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased text-black`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
