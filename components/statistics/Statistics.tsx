"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { METRICS_DATA } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import { Activity, Cpu, ShieldCheck, Zap, TrendingUp, Sparkles } from "lucide-react";

export function Statistics() {
  const [selectedMetric, setSelectedMetric] = useState<string>("latency");

  // Sample data points for live animated line chart
  const fpsChartPoints = [118, 120, 119, 120, 120, 120, 119.8, 120, 120, 120, 120, 120];

  return (
    <section id="statistics" className="relative py-24 lg:py-36 overflow-hidden bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          >
            <span className="text-xs font-bold tracking-widest text-purple-300 uppercase font-mono">
              REAL-TIME TELEMETRY & BENCHMARKS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6"
          >
            VERIFIED PERFORMANCE METRICS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-slate-300 leading-relaxed font-light"
          >
            Live hardware benchmarks recorded across 500,000+ active spatial nodes worldwide.
          </motion.p>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {METRICS_DATA.map((metric, idx) => {
            const isSelected = selectedMetric === metric.id;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => {
                  setSelectedMetric(metric.id);
                  soundEngine.playClick();
                }}
                data-cursor-interactive
                className={`glass-panel p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? "border-cyan-400/80 bg-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-[1.03]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    {metric.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {metric.change}
                  </span>
                </div>

                <div className="flex items-baseline space-x-1 mb-2">
                  <span className="text-4xl font-black font-mono text-cyan-300 tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-xl font-bold font-mono text-cyan-400">
                    {metric.suffix}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {metric.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Animated SVG Telemetry Chart Container */}
        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                <span>120 FPS STABILITY & LATENCY BENCHMARK MONITOR</span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                SAMPLING FREQUENCY: 1000HZ • FOVEATED HARDWARE RAY PIPELINE
              </p>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs text-cyan-300 bg-cyan-950/80 px-4 py-2 rounded-xl border border-cyan-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>LIVE FEED: 120.0 FPS LOCKED</span>
            </div>
          </div>

          {/* SVG Line Graph */}
          <div className="relative h-64 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="800" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

              {/* Area Fill */}
              <path
                d="M 0 160 Q 150 40, 300 45 T 600 40 T 800 42 L 800 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />

              {/* Glowing Line */}
              <path
                d="M 0 160 Q 150 40, 300 45 T 600 40 T 800 42"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                className="shadow-[0_0_15px_#06b6d4]"
              />

              {/* Data Nodes */}
              <circle cx="150" cy="40" r="5" fill="#a855f7" className="animate-pulse" />
              <circle cx="300" cy="45" r="5" fill="#06b6d4" className="animate-pulse" />
              <circle cx="600" cy="40" r="5" fill="#3b82f6" className="animate-pulse" />
              <circle cx="800" cy="42" r="5" fill="#ec4899" className="animate-pulse" />
            </svg>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-slate-400">
            <span>T-00:00 (START)</span>
            <span>T-00:30</span>
            <span>T-01:00</span>
            <span>T-01:30</span>
            <span>REAL-TIME (NOW)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
