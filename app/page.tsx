"use client";

import React, { useState } from "react";
import { VrBootLoader } from "@/components/loader/VrBootLoader";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { LivingBackground } from "@/components/background/LivingBackground";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import { ProcessPipeline } from "@/components/process/ProcessPipeline";
import { Showcase } from "@/components/showcase/Showcase";
import { Statistics } from "@/components/statistics/Statistics";
import { Footer } from "@/components/footer/Footer";
import { VrSimulatorModal } from "@/components/vr-demo/VrSimulatorModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 font-sans overflow-x-hidden">
      {/* VR Booting HUD Loader */}
      {isLoading && <VrBootLoader onComplete={() => setIsLoading(false)} />}

      {/* Custom Magnetic Snapping Cursor */}
      <CustomCursor />

      {/* Living Background (Constellation Nodes, Aurora & Parallax) */}
      <LivingBackground />

      {/* Floating Glassmorphism Navbar */}
      <Navbar onOpenVrSimulator={() => setIsSimulatorOpen(true)} />

      {/* Hero Section with 3D Headset & Visor City Projection */}
      <Hero onOpenVrSimulator={() => setIsSimulatorOpen(true)} />

      {/* Core VR Engine Services with Canvas Energy Lines */}
      <Services />

      {/* 4-Stage Hexagonal Process Pipeline */}
      <ProcessPipeline />

      {/* Featured 3D Showcase Portfolio */}
      <Showcase />

      {/* Verified Performance Telemetry & Live SVG Chart */}
      <Statistics />

      {/* Award-Winning Cybernetic Footer */}
      <Footer />

      {/* 360° VR Viewport Simulator Easter Egg Modal */}
      <VrSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </main>
  );
}
