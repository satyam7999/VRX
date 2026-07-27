"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "@/components/audio/SoundEngine";
import { Cpu, ShieldCheck, Zap } from "lucide-react";

interface VrBootLoaderProps {
  onComplete: () => void;
}

export function VrBootLoader({ onComplete }: VrBootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SPATIAL NEURAL MATRIX...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    soundEngine.playScan();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText("VRX NEURAL ENGINE READY - BEYOND REALITY");
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 700);
          }, 400);
          return 100;
        }

        if (next > 75) setStatusText("SYNCING 8K EYE DISPLAY FOVEATED PIPELINE...");
        else if (next > 50) setStatusText("CALIBRATING 256-CHANNEL HAPTIC BIOMEMBRANE...");
        else if (next > 25) setStatusText("LOADING REAL-TIME RAY-TRACING SHADERS...");

        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />

      {/* Futuristic HUD Scanning Reticle */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="h-32 w-32 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        <div className="absolute h-24 w-24 rounded-full border-2 border-purple-500/30 border-b-purple-400 animate-[spin_2s_linear_infinite_reverse]" />

        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-2xl font-extrabold tracking-wider text-cyan-300">
            {progress}%
          </span>
          <span className="text-[9px] font-mono tracking-widest text-slate-400">BOOT</span>
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-2">
        VRX LABORATORY
      </h1>

      {/* Progress Bar */}
      <div className="w-80 h-1.5 bg-slate-900 rounded-full overflow-hidden mb-4 border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Diagnostics Telemetry Status */}
      <p className="font-mono text-xs text-cyan-400/90 tracking-widest animate-pulse h-6">
        {statusText}
      </p>

      {/* Status Badges */}
      <div className="mt-8 flex items-center space-x-6 text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span>GPU: 120 FPS LOCK</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Zap className="h-3.5 w-3.5 text-purple-400" />
          <span>LATENCY: 0.18MS</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>SECURITY: SECURE</span>
        </div>
      </div>
    </div>
  );
}
