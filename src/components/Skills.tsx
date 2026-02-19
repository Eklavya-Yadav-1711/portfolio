"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillChip from "@/components/ui/SkillChip";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-5xl mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[var(--cyan)] text-[0.65rem] uppercase tracking-[0.4em] mb-2">
          // ARSENAL
        </p>
        <h2
          className="text-white font-extrabold mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          TECH STACK
        </h2>
      </ScrollReveal>

      <div className="space-y-10">
        {skillGroups.map((group, gi) => (
          <ScrollReveal key={group.name} delay={gi * 0.05}>
            <p
              className="font-mono text-xs uppercase tracking-wider mb-3"
              style={{ color: group.accentColor }}
            >
              {group.name}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, si) => (
                <ScrollReveal key={skill.name} delay={gi * 0.05 + si * 0.05} direction="up">
                  <SkillChip
                    icon={skill.icon}
                    name={skill.name}
                    accentColor={group.accentColor}
                  />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3} className="mt-16">
        <p className="font-mono text-[var(--text-muted)] text-[0.65rem] uppercase tracking-[0.4em] mb-4">
          // ALWAYS LEARNING
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-3 rounded-lg border border-dashed border-[var(--border)] font-mono text-[0.78rem] text-[var(--text-muted)]">
            Rust
          </div>
          <div className="px-4 py-3 rounded-lg border border-dashed border-[var(--border)] font-mono text-[0.78rem] text-[var(--text-muted)]">
            Go
          </div>
          <div className="px-4 py-3 rounded-lg border border-dashed border-[var(--border)] font-mono text-[0.78rem] text-[var(--text-muted)]">
            Kubernetes
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
