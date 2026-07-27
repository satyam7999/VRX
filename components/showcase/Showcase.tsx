"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SHOWCASE_DATA, VrProject } from "@/lib/constants";
import { ProjectModal } from "./ProjectModal";
import { soundEngine } from "@/components/audio/SoundEngine";
import { Sparkles, Eye, ArrowUpRight, Shield, Layers } from "lucide-react";

const CATEGORIES = ["ALL", "ENTERPRISE", "ARCHITECTURE", "AEROSPACE", "SCI-FI GAMING"] as const;

export function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [inspectingProject, setInspectingProject] = useState<VrProject | null>(null);

  const filteredProjects = SHOWCASE_DATA.filter((p) =>
    selectedCategory === "ALL" ? true : p.category === selectedCategory
  );

  return (
    <section id="showcase" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase font-mono">
              FEATURED SPATIAL VR EXPERIENCES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6"
          >
            AWARD-WINNING SPATIAL PORTFOLIO
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-slate-300 leading-relaxed font-light"
          >
            Explore enterprise flight simulators, sub-millimeter surgical suites, and multi-user space exploration grids built by VRX.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  soundEngine.playClick();
                }}
                data-cursor-interactive
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105"
                    : "bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3D Floating Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => {
                  soundEngine.playClick();
                  setInspectingProject(project);
                }}
                data-cursor-interactive
                data-cursor-text="INSPECT"
                className="group relative glass-panel rounded-3xl p-8 overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400/60 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
              >
                {/* Background Gradient Texture */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 transition-opacity duration-500 group-hover:opacity-70`}
                />

                {/* Cyber Grid Lines Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[320px]">
                  {/* Top Badge & Action Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/40">
                      {project.category}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono font-medium text-cyan-400/90 mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Specs Pill Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 font-mono text-[11px] text-slate-300">
                      <div className="flex items-center space-x-1.5 bg-white/5 px-3 py-1 rounded-lg">
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span>{project.specs.resolution}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-white/5 px-3 py-1 rounded-lg">
                        <Eye className="h-3 w-3 text-purple-400" />
                        <span>{project.specs.targetFps}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-white/5 px-3 py-1 rounded-lg">
                        <Shield className="h-3 w-3 text-emerald-400" />
                        <span>{project.specs.latency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={inspectingProject} onClose={() => setInspectingProject(null)} />
    </section>
  );
}
