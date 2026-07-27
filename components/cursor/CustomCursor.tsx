"use client";

import React, { useEffect, useState, useRef } from "react";
import { soundEngine } from "@/components/audio/SoundEngine";

interface CursorTrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [particles, setParticles] = useState<CursorTrailParticle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const prevPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide cursor on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      // Spawn velocity particle trails
      const dx = x - prevPosRef.current.x;
      const dy = y - prevPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 12) {
        setParticles((prev) => [
          ...prev.slice(-12),
          {
            id: Date.now() + Math.random(),
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2,
            opacity: 0.8,
          },
        ]);
      }

      prevPosRef.current = { x, y };

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest("button, a, input, select, textarea, [data-cursor-interactive]");
        const textAttrEl = target.closest("[data-cursor-text]");

        if (interactiveEl) {
          if (!isHovered) {
            setIsHovered(true);
            soundEngine.playHover();
          }
        } else {
          setIsHovered(false);
        }

        if (textAttrEl) {
          const text = textAttrEl.getAttribute("data-cursor-text") || "";
          setCursorText(text);
        } else {
          setCursorText("");
        }
      }
    };

    const onMouseDown = () => {
      soundEngine.playClick();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isHovered]);

  // Smooth lerp trailing ring
  useEffect(() => {
    if (!isVisible) return;
    let animFrame: number;

    const render = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));

      // Fade out trail particles
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.04 }))
          .filter((p) => p.opacity > 0)
      );

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Particle Trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none fixed z-[9998] rounded-full bg-cyan-400 blur-[1px] transition-transform"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Main Sharp Dot Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})`,
        }}
      />

      {/* Trailing Ring with Magnetic Expansion & Label */}
      <div
        className={`pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full border transition-all duration-200 ${
          isHovered
            ? "h-16 w-16 border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(6,182,212,0.4)]"
            : "h-9 w-9 border-white/30 bg-transparent"
        }`}
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-bold tracking-widest text-cyan-300 uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
