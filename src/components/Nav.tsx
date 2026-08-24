"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SECTION_IDS } from "@/lib/constants";

const links = [
  { label: "About", href: `#${SECTION_IDS.about}` },
  { label: "Skills", href: `#${SECTION_IDS.skills}` },
  { label: "Projects", href: `#${SECTION_IDS.projects}` },
  { label: "Contact", href: `#${SECTION_IDS.contact}` },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = Object.values(SECTION_IDS);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-6 md:px-16 flex items-center justify-between glass border-b border-[var(--glass-border)]"
    >
      <Link href="#" className="flex items-center gap-2" data-cursor-hover>
        <span className="font-extrabold text-xl md:text-2xl text-[var(--cyan)]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          EKU
        </span>
        <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" style={{ animationDuration: "2s" }} />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="group relative text-[var(--text-muted)] hover:text-white transition-colors font-mono text-[0.7rem] uppercase tracking-[0.2em] py-2"
            data-cursor-hover
          >
            {label}
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-[var(--cyan)] transition-all duration-300 w-0 group-hover:w-full"
              style={{ width: activeSection === href.slice(1) ? "100%" : undefined }}
            />
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-white" />
        <span className="block w-6 h-0.5 bg-white" />
        <span className="block w-6 h-0.5 bg-white" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 glass border-l border-[var(--glass-border)] z-50 p-6 sm:p-8 flex flex-col gap-6"
            >
              <button
                type="button"
                className="self-end min-w-[44px] min-h-[44px] flex items-center justify-center text-white touch-manipulation"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="font-mono text-sm border border-[var(--cyan)] text-[var(--cyan)] px-4 py-2 w-fit"
                onClick={() => setOpen(false)}
              >
                CONNECT ⚡
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
