"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsDesktop(typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Show cursor when mouse is inside viewport (fixes case where mouse was already in window on load)
      if (cursorRef.current) {
        const inViewport =
          e.clientX >= 0 &&
          e.clientY >= 0 &&
          e.clientX <= window.innerWidth &&
          e.clientY <= window.innerHeight;
        cursorRef.current.style.opacity = inViewport ? "1" : "0";
      }
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      );
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop, cursorX, cursorY]);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = cursorRef.current?.querySelector("[data-cursor-dot]");
    const ring = cursorRef.current?.querySelector("[data-cursor-ring]");
    if (!dot || !ring) return;

    const updateSize = () => {
      const d = dot as HTMLElement;
      const r = ring as HTMLElement;
      if (isHovering.current) {
        d.style.width = "16px";
        d.style.height = "16px";
        d.style.marginLeft = "-8px";
        d.style.marginTop = "-8px";
        r.style.width = "60px";
        r.style.height = "60px";
        r.style.marginLeft = "-30px";
        r.style.marginTop = "-30px";
        r.style.borderColor = "var(--cyan)";
      } else {
        d.style.width = "8px";
        d.style.height = "8px";
        d.style.marginLeft = "-4px";
        d.style.marginTop = "-4px";
        r.style.width = "38px";
        r.style.height = "38px";
        r.style.marginLeft = "-19px";
        r.style.marginTop = "-19px";
        r.style.borderColor = "rgba(255,255,255,0.5)";
      }
    };

    const interval = setInterval(updateSize, 50);
    return () => clearInterval(interval);
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 z-[10000] pointer-events-none mix-blend-difference transition-opacity duration-200"
      style={{ opacity: 1 }}
      aria-hidden
    >
      <motion.div
        data-cursor-dot
        className="absolute rounded-full bg-white"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
      <motion.div
        data-cursor-ring
        className="absolute rounded-full border-2 border-white/50"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
    </div>
  );
}
