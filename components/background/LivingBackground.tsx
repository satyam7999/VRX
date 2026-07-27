"use client";

import React, { useEffect, useRef } from "react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    // Generate constellation nodes
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
    const colors = ["#3b82f6", "#a855f7", "#06b6d4", "#ec4899", "#ffffff"];
    const nodes: NodeParticle[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep radial aurora background mesh
      const gradient = ctx.createRadialGradient(
        width * 0.5 + (mouseRef.current.x - width * 0.5) * 0.05,
        height * 0.4 + (mouseRef.current.y - height * 0.4) * 0.05,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      gradient.addColorStop(0, "rgba(13, 20, 48, 0.9)");
      gradient.addColorStop(0.4, "rgba(10, 12, 30, 0.95)");
      gradient.addColorStop(1, "rgba(3, 7, 18, 1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw constellation connections & node movement
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse attraction force
        const dxMouse = mouseRef.current.x - node.x;
        const dyMouse = mouseRef.current.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 180) {
          const angle = Math.atan2(dyMouse, dxMouse);
          const force = (180 - distMouse) / 180;
          node.x += Math.cos(angle) * force * 0.8;
          node.y += Math.sin(angle) * force * 0.8;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.baseAlpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = node.color;
        ctx.fill();

        // Connect nearby nodes with glowing energy lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Living HTML5 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cybernetic Parallax Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Ambient Glow Spotlights */}
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px] animate-energy-pulse" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-purple-600/20 blur-[140px] animate-energy-pulse" />
      <div className="absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-cyan-500/20 blur-[130px] animate-energy-pulse" />

      {/* CRT Scanline Grain Overlay */}
      <div className="absolute inset-0 scanline-effect opacity-30" />
    </div>
  );
}
