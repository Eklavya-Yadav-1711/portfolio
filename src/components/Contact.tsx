"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { contactLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-4xl mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[var(--cyan)] text-[0.65rem] uppercase tracking-[0.4em] mb-4">
          // LET&apos;S CONNECT
        </p>
        <p className="text-[#CCCCDD] text-base leading-relaxed mb-12 max-w-xl">
          Whether it&apos;s a collaboration, a startup idea, or just a conversation about black holes — I&apos;m here.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { ...contactLinks.github, href: contactLinks.github.href },
          { ...contactLinks.linkedin, href: contactLinks.linkedin.href },
          { ...contactLinks.email, href: contactLinks.email.href },
        ].map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.1}>
            <Link
              href={item.href}
              className="block p-6 sm:p-8 rounded-xl glass-card hover:border-[var(--cyan)] hover:-translate-y-1 transition-all duration-300"
              data-cursor-hover
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h4 className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {item.label}
              </h4>
              <p className="font-mono text-sm text-[var(--text-muted)] mb-4">{item.handle}</p>
              <span className="text-[var(--cyan)] text-sm font-mono hover:underline">
                {item.label === "Email" ? "Mail me" : "Visit →"}
              </span>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <p className="text-center font-mono text-[var(--text-muted)] mb-6">OR</p>
        <a
          href={contactLinks.email.href}
          className="block text-center font-mono text-white hover:text-[var(--cyan)] transition-colors"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)" }}
          data-cursor-hover
        >
          Mail me
        </a>
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[#CCFFCC] font-medium" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Building something? Let&apos;s talk.
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
