"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { stealthStartup } from "@/lib/data";

const text = "SOMETHING IS COMING.";

export default function StealthStartup() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [progress, setProgress] = useState(0);
  const [typed, setTyped] = useState("");

  /* Replay typewriter every time section comes into view */
  useEffect(() => {
    if (!inView) {
      setTyped("");
      setProgress(0);
      return;
    }
    setTyped("");
    setProgress(0);
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i++;
      } else clearInterval(typeInterval);
    }, 80);
    return () => clearInterval(typeInterval);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const progressInterval = setInterval(() => {
      setProgress((p) => (p < 65 ? p + 2 : p));
    }, 80);
    return () => clearInterval(progressInterval);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 px-4 sm:px-6 md:px-16 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background: "radial-gradient(ellipse at center, var(--violet) 0%, var(--cyan) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="font-mono text-[var(--cyan)] text-[0.65rem] uppercase tracking-[0.5em] mb-6">
          // CLASSIFIED
        </p>
        <motion.span
          className="inline-block text-4xl mb-6"
          animate={{ opacity: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔒
        </motion.span>
        <h2
          className="text-white font-extrabold mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          SOMETHING IS
        </h2>
        <h2
          className="text-white font-extrabold mb-8"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            minHeight: "1.2em",
          }}
        >
          {typed}
          <span className="animate-pulse">|</span>
        </h2>
        <p className="text-[var(--cyan)] font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {stealthStartup.date}
        </p>
        <div className="w-24 h-0.5 bg-[var(--cyan)] mx-auto mb-6" />
        <p className="text-[#AAAACC] font-mono text-sm leading-relaxed mb-6">
          A product. A mission. A solution.
          <br />
          Built in the dark. Launching in the light.
          <br />
          Details? Classified. 🔒
        </p>
        <span
          className="inline-block px-4 py-2 rounded border border-dashed font-mono text-[0.75rem]"
          style={{ borderColor: "var(--violet)", color: "#C084FC", background: "rgba(168,85,247,0.08)" }}
        >
          STEALTH MODE ACTIVATED
        </span>
      </div>

      <div className="relative z-10 max-w-md mx-auto mt-12">
        <p className="font-mono text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider mb-2">
          BUILDING...
        </p>
        <div className="h-2 rounded-full bg-[var(--bg2)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, var(--cyan), var(--violet))",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-[float_6s_ease-in-out_infinite]"
            style={{
              left: `${10 + i * 18}%`,
              bottom: "-10%",
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
