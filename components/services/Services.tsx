"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SERVICES_DATA, ServiceItem } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import {
  BrainCircuit,
  Activity,
  Layers,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  BrainCircuit,
  Activity,
  Layers,
  Globe,
  Sparkles,
  Zap,
};

export function Services() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerNodeRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw energy flow connecting lines from central node to cards
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let offset = 0;

    const drawEnergyLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset += 0.8;

      const centerEl = centerNodeRef.current;
      if (centerEl) {
        const cRect = centerEl.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();

        const cx = cRect.left - parentRect.left + cRect.width / 2;
        const cy = cRect.top - parentRect.top + cRect.height / 2;

        // Pulse center node halo
        ctx.beginPath();
        ctx.arc(cx, cy, 50, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.08)";
        ctx.fill();

        // Connect lines to each service card
        cardRefs.current.forEach((cardEl, id) => {
          if (!cardEl) return;
          const cardRect = cardEl.getBoundingClientRect();
          const kx = cardRect.left - parentRect.left + cardRect.width / 2;
          const ky = cardRect.top - parentRect.top + cardRect.height / 2;

          const isHovered = activeCardId === id;

          // Energy beam line
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(kx, ky);
          ctx.strokeStyle = isHovered ? "rgba(6, 182, 212, 0.7)" : "rgba(59, 130, 246, 0.2)";
          ctx.lineWidth = isHovered ? 2.5 : 1;
          ctx.setLineDash([8, 8]);
          ctx.lineDashOffset = -offset;
          ctx.stroke();

          // Traveling energy pulse node
          const distance = Math.sqrt((kx - cx) ** 2 + (ky - cy) ** 2);
          const pulseProgress = ((offset * 25) % distance) / distance;
          const px = cx + (kx - cx) * pulseProgress;
          const py = cy + (ky - cy) * pulseProgress;

          ctx.beginPath();
          ctx.arc(px, py, isHovered ? 5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? "#06b6d4" : "#a855f7";
          ctx.shadowBlur = 10;
          ctx.shadowColor = isHovered ? "#06b6d4" : "#a855f7";
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(drawEnergyLines);
    };

    drawEnergyLines();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [activeCardId]);

  return (
    <section id="services" className="relative py-24 lg:py-36 overflow-hidden">
      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated Connecting Canvas Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          >
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              CORE VR ENGINE ARCHITECTURE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6"
          >
            ENGINEERED FOR TOTAL IMMERSION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-slate-300 leading-relaxed font-light"
          >
            Every module in the VRX stack is designed to break performance limits—combining neural hardware prediction with spatial ray tracing.
          </motion.p>
        </div>

        {/* Central Holographic Core Node */}
        <div className="flex justify-center mb-16 relative z-10">
          <div
            ref={centerNodeRef}
            className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_40px_rgba(6,182,212,0.5)] animate-energy-pulse"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-slate-950 p-2 text-center">
              <Sparkles className="h-7 w-7 text-cyan-400 animate-spin" />
              <span className="text-[10px] font-extrabold tracking-widest text-white uppercase mt-1">
                CORE NODE
              </span>
            </div>
          </div>
        </div>

        {/* 6 Interactive Glassmorphism Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = ICON_MAP[service.iconName] || BrainCircuit;
            const isHovered = activeCardId === service.id;

            return (
              <motion.div
                key={service.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(service.id, el);
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => {
                  setActiveCardId(service.id);
                  soundEngine.playHover();
                }}
                onMouseLeave={() => setActiveCardId(null)}
                data-cursor-interactive
                data-cursor-text="INSPECT"
                className={`glass-panel-hover glass-card-interactive p-8 flex flex-col justify-between h-full group ${
                  isHovered ? "border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.3)] scale-[1.02]" : ""
                }`}
              >
                <div>
                  {/* Top Badge & Animated Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accentColor} p-[1px] shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
                        <IconComponent className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                      {service.metrics}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-slate-400 mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {service.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
