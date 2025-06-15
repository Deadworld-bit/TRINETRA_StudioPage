"use client";
import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  // Track mouse position
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Handle click effect
  useEffect(() => {
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Immediate follow: no animation, just set style directly
  return (
    <div
      style={{
        position: "fixed",
        left: pos.x - 16,
        top: pos.y - 16,
        width: clicked ? 20 : 32,
        height: clicked ? 20 : 32,
        borderRadius: "50%",
        border: "2px solid var(--p2-mint-flash, #60d394)",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.12s, height 0.12s, border-color 0.2s",
        mixBlendMode: "exclusion",
      }}
    />
  );
}