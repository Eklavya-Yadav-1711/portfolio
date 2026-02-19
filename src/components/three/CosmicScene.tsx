"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import FloatingSymbols from "./FloatingSymbols";

const STAR_COUNT = 3000;
const TUNNEL_Z_MIN = -220;
const TUNNEL_Z_MAX = -10;
const TUNNEL_XY_RADIUS = 28;
const DRIFT_SPEED = 0.12;
const WARP_STRETCH_FACTOR = 0.00015;
const VELOCITY_MOVE_FACTOR = 0.0008;
const TUNNEL_LENGTH = Math.abs(TUNNEL_Z_MAX - TUNNEL_Z_MIN);

function Starfield({
  scrollVelocity,
  scrollProgress,
}: {
  scrollVelocity: number;
  scrollProgress: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const col = new Float32Array(STAR_COUNT * 3);
    const sizeArr = new Float32Array(STAR_COUNT);
    const pink = new THREE.Color("#F02E65");
    const violet = new THREE.Color("#A855F7");
    const white = new THREE.Color("#FFFFFF");

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * TUNNEL_XY_RADIUS;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = TUNNEL_Z_MIN + Math.random() * (TUNNEL_Z_MAX - TUNNEL_Z_MIN);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const pick = Math.random();
      const c = pick < 0.6 ? white : pick < 0.8 ? pink : violet;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sizeArr[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions: pos, colors: col, sizes: sizeArr };
  }, []);

  const linePositions = useMemo(() => new Float32Array(STAR_COUNT * 2 * 3), []);
  const lineColors = useMemo(() => new Float32Array(STAR_COUNT * 2 * 3), []);
  const velocitySmoothed = useRef(0);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const starMaterialRef = useRef<THREE.ShaderMaterial>(null);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geom.setDrawRange(0, STAR_COUNT * 2);
    return geom;
  }, [linePositions, lineColors]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    velocitySmoothed.current += (scrollVelocity - velocitySmoothed.current) * 0.12;
    const v = velocitySmoothed.current;
    const streakLen = Math.min(28, 0.15 + Math.abs(v) * WARP_STRETCH_FACTOR);

    const posAttr = pointsRef.current?.geometry?.attributes?.position;
    if (!posAttr) return;

    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i++) {
      let z = arr[i * 3 + 2];
      z += DRIFT_SPEED * delta;
      z += v * VELOCITY_MOVE_FACTOR * delta;
      if (z > 10) z -= TUNNEL_LENGTH;
      if (z < TUNNEL_Z_MIN) z += TUNNEL_LENGTH;
      arr[i * 3 + 2] = z;
    }
    posAttr.needsUpdate = true;

    const starMat = starMaterialRef.current;
    if (starMat?.uniforms?.opacity) {
      const globalTwinkle = 0.55 + 0.2 * Math.sin(time * 1.8);
      starMat.uniforms.opacity.value = globalTwinkle;
    }

    const posArr = arr;
    const colAttr = pointsRef.current?.geometry?.attributes?.color;
    const colArr = colAttr?.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i++) {
      const i6 = i * 6;
      const i3 = i * 3;
      const x = posArr[i3];
      const y = posArr[i3 + 1];
      const z = posArr[i3 + 2];

      linePositions[i6] = x;
      linePositions[i6 + 1] = y;
      linePositions[i6 + 2] = z;
      linePositions[i6 + 3] = x;
      linePositions[i6 + 4] = y;
      linePositions[i6 + 5] = z + streakLen;

      if (colArr) {
        lineColors[i6] = colArr[i3];
        lineColors[i6 + 1] = colArr[i3 + 1];
        lineColors[i6 + 2] = colArr[i3 + 2];
        lineColors[i6 + 3] = colArr[i3];
        lineColors[i6 + 4] = colArr[i3 + 1];
        lineColors[i6 + 5] = colArr[i3 + 2];
      }
    }
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    const lineMat = lineMaterialRef.current;
    if (lineMat) {
      const absV = Math.abs(v);
      lineMat.opacity = 0.08 + Math.min(0.45, absV * 0.00008);
    }
  });

  const starPointVertex = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = length(mv.xyz);
    gl_PointSize = size * (80.0 / dist);
  }
`;
  const starPointFragment = `
  uniform float opacity;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = (1.0 - smoothstep(0.0, 1.0, d)) * opacity;
    gl_FragColor = vec4(vColor, a);
  }
`;

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STAR_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute attach="attributes-color" count={STAR_COUNT} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={STAR_COUNT} array={sizes} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          ref={starMaterialRef}
          vertexShader={starPointVertex}
          fragmentShader={starPointFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            opacity: { value: 0.7 },
          }}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          ref={lineMaterialRef}
          vertexColors
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

const CAMERA_Z_START = 8;
const CAMERA_Z_END = 95;
const CAMERA_DRIFT_PER_SEC = 0.028;

export default function CosmicScene({
  scrollProgress = 0,
  scrollVelocity = 0,
}: {
  scrollProgress?: number;
  scrollVelocity?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  const cameraZ = useRef(CAMERA_Z_START);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const targetZ = CAMERA_Z_START + scrollProgress * (CAMERA_Z_END - CAMERA_Z_START);
    cameraZ.current += (targetZ - cameraZ.current) * 0.08;
    camera.position.z = cameraZ.current + Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    camera.position.z -= CAMERA_DRIFT_PER_SEC * delta;
    camera.lookAt(0, 0, -20);
    camera.updateProjectionMatrix();

    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.x = mouseRef.current.y * 0.06 + Math.sin(t * 0.2) * 0.02;
      groupRef.current.rotation.y = mouseRef.current.x * 0.06 + Math.sin(t * 0.15) * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 20]} intensity={0.6} color="#ffffff" />
      <group ref={groupRef}>
        <Starfield scrollVelocity={scrollVelocity} scrollProgress={scrollProgress} />
        <FloatingSymbols />
      </group>
    </>
  );
}
