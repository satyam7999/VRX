"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/components/audio/SoundEngine";
import { X, Eye, Compass, Activity, Volume2, ShieldCheck } from "lucide-react";

interface VrSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VrSimulatorModal({ isOpen, onClose }: VrSimulatorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [fps, setFps] = useState(120);

  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2 + yaw * 2;
      const cy = h / 2 + pitch * 2;

      // 360 VR Environment Grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
      ctx.lineWidth = 1;

      for (let x = -200; x < w + 200; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x + yaw * 1.5, 0);
        ctx.lineTo(x + yaw * 0.5, h);
        ctx.stroke();
      }

      for (let y = -200; y < h + 200; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y + pitch * 1.5);
        ctx.lineTo(w, y + pitch * 0.5);
        ctx.stroke();
      }

      // Central Futuristic VR Holographic Sphere
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Floating Hotspots
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * 160, cy + Math.sin(angle) * 80, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#06b6d4";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Dual Eye VR Visor Border Vignette Overlay
      const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.6);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(3,7,18,0.95)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isOpen, yaw, pitch]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    setYaw((prev) => prev + dx * 0.5);
    setPitch((prev) => Math.max(-100, Math.min(100, prev + dy * 0.5)));

    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl h-[80vh] glass-panel rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.4)] z-10 flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/80">
            <div className="flex items-center space-x-3">
              <div className="flex h-3 w-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs font-extrabold tracking-widest text-cyan-300">
                VRX 360° SPATIAL VIEWPORT SIMULATOR
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              data-cursor-interactive
              className="p-2 rounded-full bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Interactive VR Viewport Canvas */}
          <div
            className="relative flex-1 cursor-grab active:cursor-grabbing bg-black select-none overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} width={1000} height={600} className="w-full h-full object-cover" />

            {/* VR HUD Telemetry Overlay */}
            <div className="absolute top-6 left-6 font-mono text-[11px] text-cyan-300 space-y-1 bg-slate-950/70 p-3 rounded-xl border border-cyan-500/30">
              <div>TRACKING YAW: {yaw.toFixed(1)}°</div>
              <div>TRACKING PITCH: {pitch.toFixed(1)}°</div>
              <div>FOVEATED RENDER: ACTIVE</div>
            </div>

            <div className="absolute top-6 right-6 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/70 px-4 py-2 rounded-xl border border-emerald-500/30 flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>{fps} FPS LOCKED</span>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none font-mono text-xs text-slate-300 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              DRAG MOUSE TO ROTATE 360° VR CAMERA
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
