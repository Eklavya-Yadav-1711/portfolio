"use client";

import { ReactNode } from "react";

interface SkillChipProps {
  icon: string;
  name: string;
  accentColor: string;
}

export default function SkillChip({ icon, name, accentColor }: SkillChipProps) {
  return (
    <div
      className="flex items-center gap-2 px-3 sm:px-4 py-3 rounded-xl glass-card transition-all duration-300 hover:-translate-y-1 min-h-[44px] min-w-[44px]"
      style={{
        borderColor: "var(--glass-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}30`;
        e.currentTarget.style.background = `${accentColor}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.background = "";
      }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="font-mono text-[0.78rem] text-white">{name}</span>
    </div>
  );
}
