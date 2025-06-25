"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/sections/Navbar/Navbar";
import Footer from "@/sections/Footer";
import CursorEffect from "@/components/CursorEffect";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <CursorEffect />
      <LoadingScreen show={loading} />
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s" }}>
        {children}
      </div>
      <Footer />
    </>
  );
}