"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-16 pt-20 pb-24">
      <div className="relative z-10 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-[var(--cyan)] text-[0.7rem] uppercase tracking-[0.35em] mb-4"
        >
          // FULL STACK DEVELOPER · CS FINAL YEAR
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-extrabold text-white leading-[0.88] mb-6 relative"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(2.75rem, 14vw, 14rem)",
          }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white text-lg md:text-xl mb-10 max-w-xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          I don&apos;t work hard. I just can&apos;t leave things unfinished.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          <Link
            href="#projects"
            className="min-h-[44px] inline-flex items-center px-6 py-3 bg-[var(--cyan)] text-black font-semibold font-mono text-sm"
            style={{
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
            data-cursor-hover
          >
            View Projects →
          </Link>
          <Link
            href="#contact"
            className="min-h-[44px] inline-flex items-center px-6 py-3 border border-white text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
            data-cursor-hover
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-6 flex items-center gap-3">
        <div className="w-px h-12 bg-[var(--border)] animate-[scrollLine_2s_ease-in-out_infinite]" />
        <span className="font-mono text-[0.65rem] text-[var(--text-muted)] uppercase tracking-widest -rotate-90 origin-left">
          Scroll
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3">
        <span className="px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] font-mono text-[0.65rem] text-[var(--text-muted)]">
          🌌 Future Cosmologist
        </span>
        <span className="px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] font-mono text-[0.65rem] text-[var(--text-muted)]">
          ⚡ Builder
        </span>
        <span className="px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] font-mono text-[0.65rem] text-[var(--text-muted)]">
          🚀 Startup Founder
        </span>
      </div>
    </section>
  );
}
