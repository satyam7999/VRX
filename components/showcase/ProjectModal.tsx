"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VrProject } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import { X, Cpu, Zap, Eye, ShieldCheck, Sparkles } from "lucide-react";

interface ProjectModalProps {
  project: VrProject | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!project || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.02;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotating wireframe 3D sphere preview
      ctx.strokeStyle = project.accent || "#06b6d4";
      ctx.lineWidth = 1;

      for (let i = 0; i < 12; i++) {
        const r = 80 + Math.sin(angle + i) * 10;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, angle + (i * Math.PI) / 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.3)] z-10 my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            data-cursor-interactive
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Wireframe Viewport Preview */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center rounded-2xl bg-slate-950/80 p-6 border border-white/10 h-72">
              <canvas ref={canvasRef} width={300} height={240} className="w-full h-full" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-cyan-400">
                <span>VIEWPORT: 360° PREVIEW</span>
                <span className="animate-pulse">REAL-TIME</span>
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">
                {project.category} • FEATURED VR PROJECT
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
                {project.title}
              </h2>

              <p className="text-sm font-mono text-slate-300 mb-4">
                {project.tagline}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {project.fullDetails}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">RESOLUTION</span>
                  <span className="text-cyan-300 font-bold">{project.specs.resolution}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TARGET FPS</span>
                  <span className="text-cyan-300 font-bold">{project.specs.targetFps}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SPATIAL LATENCY</span>
                  <span className="text-cyan-300 font-bold">{project.specs.latency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ENGINE CORE</span>
                  <span className="text-cyan-300 font-bold">{project.specs.engine}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    soundEngine.playScan();
                    onClose();
                  }}
                  data-cursor-interactive
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold tracking-wider text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105"
                >
                  LAUNCH FULL DEMO
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
