"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const CosmicScene = dynamic(() => import("./CosmicScene"), { ssr: false });

interface SceneWrapperProps {
  scrollProgress?: number;
  scrollVelocity?: number;
}

export default function SceneWrapper({ scrollProgress = 0, scrollVelocity = 0 }: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} id="canvas-container" className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#020204"]} />
        <Suspense fallback={null}>
          <CosmicScene scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
