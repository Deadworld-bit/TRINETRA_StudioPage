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

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        width: clicked ? 20 : 12,
        height: clicked ? 20 : 12,
        borderRadius: "50%",
        background: "var(--p3-pure-white)",
        boxShadow: "0 0 8px #40e0d0",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.1s, height 0.1s",
      }}
    />
  );
}