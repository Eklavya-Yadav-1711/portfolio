"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function QuoteSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const words = personalInfo.quote.split(" ");

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 md:px-16 py-16 sm:py-24"
      style={{
        background: "linear-gradient(90deg, var(--bg) 0%, rgba(168,85,247,0.05) 50%, var(--bg) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="relative max-w-4xl text-center">
        <span
          className="absolute -top-4 left-0 md:left-8 text-[var(--cyan)] opacity-30 font-extrabold"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "8rem" }}
        >
          ❝
        </span>

        <motion.div
          className="relative flex flex-wrap justify-center gap-x-2 gap-y-1"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
            hidden: {},
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 12 },
              }}
              transition={{ duration: 0.4 }}
              className="text-white font-bold"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="w-20 h-0.5 bg-[var(--cyan)]" />
          <p className="font-mono text-sm italic text-[var(--text-muted)]">— Eklavya</p>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30 animate-[float_8s_ease-in-out_infinite]"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
