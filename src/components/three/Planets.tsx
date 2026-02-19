"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PLANETS = [
  { name: "Earth", radius: 1.4, z: 0, color: "#F02E65", emissive: "#8B1538", isNebula: true },
  { name: "Moon", radius: 0.35, z: -3.5, color: "#94a3b8", emissive: "#334155", isNebula: false },
  { name: "Mars", radius: 0.75, z: -14, color: "#ef4444", emissive: "#7f1d1d", isNebula: false },
  { name: "Jupiter", radius: 2.2, z: -28, color: "#f59e0b", emissive: "#78350f", isNebula: false },
  { name: "Saturn", radius: 1.9, z: -42, color: "#eab308", emissive: "#713f12", isNebula: false },
  { name: "Uranus", radius: 1.1, z: -58, color: "#22d3ee", emissive: "#0e7490", isNebula: false },
  { name: "Neptune", radius: 1.05, z: -72, color: "#6366f1", emissive: "#312e81", isNebula: false },
];

function Planet({ radius, z, color, emissive, isNebula }: (typeof PLANETS)[0]) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  if (isNebula) {
    return (
      <group position={[0, 0, z]}>
        {/* Outer soft glow (blur-like halo) */}
        <mesh>
          <sphereGeometry args={[radius * 1.6, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.06}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Inner soft glow */}
        <mesh ref={ref}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    );
  }

  return (
    <mesh ref={ref} position={[0, 0, z]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.2}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

function SaturnRing({ z }: { z: number }) {
  return (
    <mesh position={[0, 0, z]} rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[2.1, 3.2, 64]} />
      <meshBasicMaterial
        color="#c4a35a"
        transparent
        opacity={0.45}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Planets() {
  return (
    <group>
      {PLANETS.map((p) => (
        <Planet key={p.name} {...p} />
      ))}
      <SaturnRing z={-42} />
    </group>
  );
}
