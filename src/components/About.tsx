"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { personalInfo, personalityTraits, passions } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <ScrollReveal>
            <p className="font-mono text-[var(--cyan)] text-[0.65rem] uppercase tracking-[0.4em] mb-4">
              // ABOUT ME
            </p>
            <h2
              className="text-white font-extrabold mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {personalInfo.name}
            </h2>
            <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-1">A DEVELOPER</h3>
            <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-8">BY CHOICE.</h3>
            <p className="text-white text-base leading-[1.9] mb-8">
              I&apos;m a 3rd year Computer Science student who builds things that matter. By day I&apos;m deep in code — full
              stack, real products, real clients. By night I&apos;m reading about black holes, dark matter, and the expanding
              universe. My dream? To one day stand at the intersection of technology and cosmology — and maybe, just maybe,
              use code to help us understand the cosmos.
            </p>
            <p className="text-white text-base leading-[1.9] mb-8">
              Until then — I build, I ship.
            </p>
            <div className="flex flex-wrap gap-2">
              {personalityTraits.map((trait, i) => {
                const icons: Record<string, string> = {
                  "Night Owl": "🦉",
                  "Dreamer + Doer": "⚡",
                  Hustler: "🔨",
                  Builder: "🔨",
                  "Cosmology Nerd": "🌌",
                  Entrepreneur: "🚀",
                  "Anime Fan": "🎬",
                  Bookworm: "📚",
                };
                return (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-2 rounded-lg glass-card font-mono text-[0.7rem] text-white hover:border-[var(--cyan)] hover:scale-105 transition-all cursor-default"
                  >
                    {icons[trait] || "•"} {trait}
                  </span>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <div className="rounded-xl glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
              </div>
              <pre className="p-4 font-mono text-sm overflow-x-auto">
                <code>
                  <span style={{ color: "#C084FC" }}>{"{"}</span>
                  {"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;name&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;Eklavya&quot;</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;role&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;Full Stack Developer&quot;</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;year&quot;</span>
                  <span style={{ color: "#FCD34D" }}>: 3</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;dream&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;Cosmologist&quot;</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;hustler&quot;</span>
                  <span style={{ color: "#FCD34D" }}>: true</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;status&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;building&quot;</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;startup&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;stealth_mode_2026&quot;</span>,{"\n  "}
                  <span style={{ color: "#C084FC" }}>&quot;quote&quot;</span>
                  <span style={{ color: "#67E8F9" }}>: &quot;Exhaust building dreams.&quot;</span>
                  {"\n"}
                  <span style={{ color: "#C084FC" }}>{"}"}</span>
                </code>
              </pre>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {passions.map((p, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-card hover:border-[var(--cyan)] transition-colors"
                >
                  <span className="text-2xl block mb-2">{p.icon}</span>
                  <h4 className="text-white font-bold text-sm mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {p.label}
                  </h4>
                  <p className="text-[#999] text-xs leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[var(--cyan)] font-extrabold text-3xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              6+
            </p>
            <p className="font-mono text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider">Projects</p>
          </div>
          <div>
            <p className="text-[var(--cyan)] font-extrabold text-3xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              ₹
            </p>
            <p className="font-mono text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider">Builder</p>
          </div>
          <div>
            <p className="text-[var(--cyan)] font-extrabold text-3xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              15+
            </p>
            <p className="font-mono text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider">Technologies</p>
          </div>
          <div>
            <p className="text-[var(--cyan)] font-extrabold text-3xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              ∞
            </p>
            <p className="font-mono text-[0.7rem] text-[var(--text-muted)] uppercase tracking-wider">Dreams</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
