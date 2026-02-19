"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const now = typeof performance !== "undefined" ? performance.now() : 0;
      const dt = (now - lastTime.current) / 1000;
      const rawVelocity = dt > 0 ? (scrollY - lastScrollY.current) / dt : 0;
      lastScrollY.current = scrollY;
      lastTime.current = now;
      velocityRef.current += (rawVelocity - velocityRef.current) * 0.15;
      setVelocity(velocityRef.current);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollY / docHeight));
      setProgress(value);
    };

    let rafId: number;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY.current) < 0.5) {
        velocityRef.current *= 0.92;
        setVelocity(velocityRef.current);
      }
    };
    rafId = requestAnimationFrame(tick);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { progress, velocity };
}
