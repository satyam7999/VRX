"use client";

import React from "react";
import { motion } from "framer-motion";
import { VrHeadset3D } from "./VrHeadset3D";
import { HERO_STATS } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import { Play, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenVrSimulator: () => void;
}

export function Hero({ onOpenVrSimulator }: HeroProps) {
  const titleChars = "BEYOND REALITY.".split("");

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase font-mono">
                VRX NEURAL SPATIAL ENGINE 3.0
              </span>
            </motion.div>

            {/* Split Character Animated Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6">
              <span className="block text-white">
                {titleChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: index * 0.04 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 font-extrabold"
              >
                INTO THE NEXT DIMENSION.
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light"
            >
              Step into ultra-immersive virtual reality engineered by world-class creators. Sub-millimeter neural tracking, 120 FPS photorealistic rendering, and 256-channel haptic bio-sensation.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              {/* Primary Magnetic CTA */}
              <a
                href="#showcase"
                data-cursor-interactive
                data-cursor-text="EXPLORE"
                onClick={() => soundEngine.playClick()}
                className="group relative inline-flex items-center space-x-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-4 text-sm font-bold tracking-wider text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-105"
              >
                <span>EXPLORE EXPERIENCES</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* VR Simulator Trigger Button */}
              <button
                onClick={() => {
                  soundEngine.playScan();
                  onOpenVrSimulator();
                }}
                data-cursor-interactive
                data-cursor-text="SIMULATE"
                className="group relative inline-flex items-center space-x-3 rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 transition-transform group-hover:scale-110">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </div>
                <span>360° VR SIMULATOR</span>
              </button>
            </motion.div>

            {/* Telemetry Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col border-r border-white/10 last:border-0 pr-2">
                  <span className="text-xl font-extrabold text-cyan-300 font-mono tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D VR Headset Model Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <VrHeadset3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
