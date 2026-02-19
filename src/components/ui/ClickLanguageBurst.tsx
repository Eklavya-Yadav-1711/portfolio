"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { label: "JS", color: "#F7DF1E" },
  { label: "React", color: "#61DAFB" },
  { label: "PY", color: "#3776AB" },
  { label: "TS", color: "#3178C6" },
  { label: "Node", color: "#8CC84B" },
  { label: "C++", color: "#00599C" },
  { label: "SQL", color: "#336791" },
  { label: "Docker", color: "#2496ED" },
  { label: "Next", color: "#000" },
  { label: "Git", color: "#F05032" },
];

function randomPick<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
}

export default function ClickLanguageBurst() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button") || target.closest("input")) return;
    const picks = randomPick(LANGUAGES, 1 + Math.floor(Math.random() * 2));
    const newBubbles: Bubble[] = picks.map((p, i) => ({
      id: nextId.current++,
      x: e.clientX + (i - 1) * 24,
      y: e.clientY,
      label: p.label,
      color: p.color,
    }));
    setBubbles((prev) => [...prev, ...newBubbles].slice(-15));
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none" aria-hidden>
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.span
            key={b.id}
            className="absolute font-mono text-xs font-bold px-2 py-1 rounded-md shadow-lg"
            style={{
              left: b.x,
              top: b.y,
              color: b.color,
              border: `1px solid ${b.color}`,
              background: "rgba(2, 2, 4, 0.9)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -80, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() =>
              setBubbles((prev) => prev.filter((x) => x.id !== b.id))
            }
          >
            {b.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
