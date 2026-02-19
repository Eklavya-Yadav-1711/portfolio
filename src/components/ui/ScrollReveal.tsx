"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  className?: string;
}

const directionMap = {
  up: { y: 40, x: 0 },
  left: { y: 0, x: -40 },
  right: { y: 0, x: 40 },
  none: { y: 0, x: 0 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const reduceMotion = useReducedMotion();
  const { x, y } = directionMap[direction];

  const setRefs = (el: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof inViewRef === "function") inViewRef(el);
    else if (inViewRef && typeof inViewRef === "object") (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const initial = reduceMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x, y };
  const animate = inView
    ? { opacity: 1, x: 0, y: 0 }
    : reduceMotion
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, x, y };

  return (
    <motion.div
      ref={setRefs}
      initial={initial}
      animate={animate}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
