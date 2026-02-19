"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-6xl mx-auto">
      <ScrollReveal>
        <p className="font-mono text-[var(--cyan)] text-[0.65rem] uppercase tracking-[0.4em] mb-2">
          // SELECTED WORK
        </p>
        <h2
          className="text-white font-extrabold mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          PROJECTS
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={project.isFeatured ? "md:col-span-2" : ""}
          >
            <ProjectCard
              project={project}
              featured={project.isFeatured}
              index={i}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
