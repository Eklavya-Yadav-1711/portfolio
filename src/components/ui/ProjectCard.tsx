"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({ project, featured, index = 0 }: ProjectCardProps) {
  const previewHeight = featured ? 280 : 200;
  const imagePath = project.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group rounded-xl glass-card overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
      style={{
        borderTopWidth: "2px",
        borderTopColor: project.color,
      }}
    >
      {/* Clickable when project.link is set — add link in data.ts when project is live */}
        <Link
          href={project.link ?? "#"}
          className="block"
          aria-label={project.link ? `Open ${project.name}` : undefined}
        >
          <div
            className="relative overflow-hidden bg-[var(--bg2)]"
            style={{ height: previewHeight }}
          >
            {imagePath ? (
              <Image
                src={imagePath}
                fill
                className="object-contain"
                alt={project.name}
                sizes="(max-width: 768px) 100vw, 640px"
                quality={100}
                unoptimized
              />
            ) : (
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${project.color}30 0%, transparent 50%)`,
                }}
              />
            )}

        {featured && (
          <span className="absolute top-3 right-3 z-20 px-2 py-1 rounded font-mono text-[0.65rem] bg-[var(--red)] text-white">
            🚨 FEATURED
          </span>
        )}
          </div>
        </Link>

      <div className="p-5">
        <p className="font-mono text-[0.7rem] text-[var(--text-muted)] mb-1">#{project.number}</p>
        <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {project.name}
        </h3>
        <p className="text-[#CCCCDD] text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-[0.65rem] font-mono border"
              style={{ color: project.color, borderColor: `${project.color}40` }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.link ?? "#"}
          className="font-mono text-[0.75rem] text-[var(--text-muted)] hover:underline inline-flex items-center gap-1 group/link"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = project.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          Coming Soon
          <span>→</span>
        </Link>
      </div>
    </motion.article>
  );
}
