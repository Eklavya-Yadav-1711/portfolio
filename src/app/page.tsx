"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuoteSection from "@/components/QuoteSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import StealthStartup from "@/components/StealthStartup";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClickLanguageBurst from "@/components/ui/ClickLanguageBurst";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SceneWrapper = dynamic(() => import("@/components/three/SceneWrapper"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const { progress: scrollProgress, velocity: scrollVelocity } = useScrollProgress();

  return (
    <main className="relative z-10 min-h-screen overflow-x-hidden">
      <SceneWrapper scrollProgress={scrollProgress} scrollVelocity={scrollVelocity} />
      <ClickLanguageBurst />
      <Nav />
      <Hero />
      <QuoteSection />
      <About />
      <Skills />
      <Projects />
      <StealthStartup />
      <Contact />
      <Footer />
    </main>
  );
}
