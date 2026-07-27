"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEngine";
import { ArrowUp, CheckCircle2, Send, Globe, Sparkles, ShieldCheck } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playScan();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-slate-950 border-t border-white/10">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#hero"
                onClick={() => soundEngine.playClick()}
                data-cursor-interactive
                className="group flex items-center space-x-3 text-white font-bold text-2xl tracking-wider mb-6 inline-flex"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950">
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      VRX
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                    VRX<span className="text-cyan-400">.</span>STUDIO
                  </span>
                  <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                    VIRTUAL REALITY LABORATORY
                  </span>
                </div>
              </a>

              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-md mb-8">
                Building Awwwards-grade spatial computing solutions, hardware-accelerated WebGL ray tracing, and 256-channel haptic bio-sensory environments for enterprise and gaming.
              </p>
            </div>

            {/* Network Status Indicator */}
            <div className="inline-flex items-center space-x-3 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-4 py-2 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>VRX SPATIAL NETWORKS ONLINE • 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4">
                NAVIGATION
              </h4>
              <ul className="space-y-3 text-sm text-slate-400 font-light">
                <li>
                  <a href="#hero" className="hover:text-cyan-300 transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-cyan-300 transition-colors">
                    Core Engine
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-cyan-300 transition-colors">
                    Pipeline
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="hover:text-cyan-300 transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#statistics" className="hover:text-cyan-300 transition-colors">
                    Telemetry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-4">
                LAB SPECS
              </h4>
              <ul className="space-y-3 text-sm text-slate-400 font-light">
                <li>
                  <span className="hover:text-purple-300 transition-colors cursor-pointer">
                    VisionOS 2.0
                  </span>
                </li>
                <li>
                  <span className="hover:text-purple-300 transition-colors cursor-pointer">
                    Meta Quest 3
                  </span>
                </li>
                <li>
                  <span className="hover:text-purple-300 transition-colors cursor-pointer">
                    WebGL / Vulkan
                  </span>
                </li>
                <li>
                  <span className="hover:text-purple-300 transition-colors cursor-pointer">
                    Haptic Grid
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-4">
              JOIN THE NEURAL DISPATCH
            </h4>
            <p className="text-xs text-slate-400 mb-6 font-light leading-relaxed">
              Receive early spatial SDK releases, 8K WebXR updates, and hardware benchmarks directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex flex-col space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter developer email..."
                  required
                  className="w-full rounded-2xl bg-white/5 px-5 py-3.5 text-xs font-mono text-white placeholder-slate-500 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 backdrop-blur-xl"
                />
                <button
                  type="submit"
                  data-cursor-interactive
                  className="absolute right-2 p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 animate-pulse">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>NEURAL DISPATCH VERIFIED. WELCOME ABOARD.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} VRX VIRTUAL REALITY STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              data-cursor-interactive
              className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
