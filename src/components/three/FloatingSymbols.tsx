"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group } from "three";

const symbols: { label: string; color: string; position: [number, number, number] }[] = [
  { label: "JS", color: "#F7DF1E", position: [-4, 2, -3] },
  { label: "⚛ React", color: "#61DAFB", position: [5, 3, -4] },
  { label: "PY", color: "#3776AB", position: [-6, -2, -5] },
  { label: "TS", color: "#3178C6", position: [4, -3, -3] },
  { label: "NODE", color: "#8CC84B", position: [-3, 4, -4] },
  { label: "PSQL", color: "#336791", position: [6, -1, -6] },
  { label: "DOCKER", color: "#2496ED", position: [-5, -4, -5] },
  { label: "C++", color: "#00599C", position: [3, 5, -5] },
  { label: "SUPABASE", color: "#3ECF8E", position: [-7, 1, -6] },
  { label: "FIREBASE", color: "#FFCA28", position: [2, -5, -4] },
];

function Symbol({ label, color, position }: (typeof symbols)[0]) {
  const ref = useRef<Group>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(time.current * 0.8) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Html
        center
        distanceFactor={8}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "9999px",
            fontSize: "10px",
            fontWeight: 600,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            color: color,
            border: `1px solid ${color}`,
            boxShadow: `0 0 12px ${color}40`,
            background: "rgba(4,4,10,0.7)",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

export default function FloatingSymbols() {
  return (
    <>
      {symbols.map((s, i) => (
        <Symbol key={i} label={s.label} color={s.color} position={s.position} />
      ))}
    </>
  );
}
