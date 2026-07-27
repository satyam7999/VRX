"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROCESS_DATA } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import { DraftingCompass, Box, Cpu, Rocket, CheckCircle, ArrowRight } from "lucide-react";

const PROCESS_ICONS: Record<string, React.FC<{ className?: string }>> = {
  DraftingCompass,
  Box,
  Cpu,
  Rocket,
};

export function ProcessPipeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-24 lg:py-36 overflow-hidden bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase font-mono">
              THE VRX CREATIVE & TECHNICAL PIPELINE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6"
          >
            FROM NEURAL CONCEPT TO 8K VR REALITY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-slate-300 leading-relaxed font-light"
          >
            Our 4-stage pipeline guarantees zero frame drops, sub-0.2ms spatial latency, and photorealistic 120 FPS immersion.
          </motion.p>
        </div>

        {/* Energy Pulse Travel Bar (01 -> 02 -> 03 -> 04) */}
        <div className="hidden lg:block relative mb-16 px-12">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_#06b6d4]"
              animate={{ width: `${(activeStep + 1) * 25}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* 4 Hexagonal Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_DATA.map((stage, idx) => {
            const IconComp = PROCESS_ICONS[stage.icon] || Cpu;
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => {
                  setActiveStep(idx);
                  soundEngine.playHover();
                }}
                data-cursor-interactive
                data-cursor-text={`STAGE ${stage.step}`}
                className={`glass-panel p-8 rounded-3xl relative overflow-hidden transition-all duration-500 flex flex-col justify-between border ${
                  isActive
                    ? "border-cyan-400/80 bg-slate-900/80 shadow-[0_0_40px_rgba(6,182,212,0.35)] -translate-y-2"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Background Ambient Glow */}
                {isActive && (
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
                )}

                <div>
                  {/* Hexagon Step Badge */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br transition-all duration-300 ${
                        isActive
                          ? "from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.6)] rotate-6"
                          : "from-slate-800 to-slate-900 border border-white/10"
                      }`}
                    >
                      <span className="font-mono text-2xl font-black text-white">
                        {stage.step}
                      </span>
                    </div>

                    <div className="text-cyan-400">
                      <IconComp className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300">
                    {stage.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-slate-400 mb-4">
                    {stage.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {stage.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {stage.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                      <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
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
