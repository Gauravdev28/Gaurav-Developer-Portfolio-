import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background } from "@/components/layout/Background";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { useIsMobile, useReducedMotion } from "@/hooks/useReducedMotion";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  return (
    <div className="relative min-h-screen text-foreground">
      <Background />

      {/* 3D Global Visual Backdrop (Fixed and Interactive) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-auto">
        {!reduced && !mobile ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/5 to-[var(--neon-purple)]/5" />
        )}
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
