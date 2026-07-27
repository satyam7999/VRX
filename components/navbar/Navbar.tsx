"use client";

import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { soundEngine } from "@/components/audio/SoundEngine";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenVrSimulator: () => void;
}

export function Navbar({ onOpenVrSimulator }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isDroneActive, setIsDroneActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 10) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
    soundEngine.playClick();
  };

  const handleDroneToggle = () => {
    const active = soundEngine.toggleAmbientDrone();
    setIsDroneActive(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* Top Scroll Progress Indicator */}
      <div className="h-[2px] w-full bg-slate-900/80 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_10px_#06b6d4] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass-panel flex items-center justify-between rounded-2xl px-6 py-3.5 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Logo Mark */}
          <a
            href="#hero"
            className="group flex items-center space-x-3 text-white font-bold text-xl tracking-wider"
            data-cursor-interactive
            onClick={() => soundEngine.playClick()}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm">
                  VRX
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                VRX<span className="text-cyan-400">.</span>STUDIO
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono">
                LABORATORY
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 rounded-xl bg-white/5 p-1.5 border border-white/5">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor-interactive
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className={`relative px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 rounded-lg ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center space-x-3">
            {/* Audio Synth Equalizer & Mute Toggle */}
            <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={handleAudioToggle}
                data-cursor-interactive
                data-cursor-text={isAudioMuted ? "UNMUTE" : "MUTE"}
                className="p-2 text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
                title="Toggle UI Sound Effects"
              >
                {isAudioMuted ? <VolumeX className="h-4 w-4 text-slate-500" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
              </button>

              <button
                onClick={handleDroneToggle}
                data-cursor-interactive
                className={`p-2 text-xs font-mono transition-colors rounded-lg flex items-center space-x-1 ${
                  isDroneActive ? "text-purple-400 bg-purple-500/20" : "text-slate-400 hover:text-white"
                }`}
                title="Toggle Ambient Drone Synth"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] hidden sm:inline">{isDroneActive ? "DRONE ON" : "DRONE"}</span>
              </button>
            </div>

            {/* Launch VR Experience CTA Button */}
            <button
              onClick={() => {
                soundEngine.playScan();
                onOpenVrSimulator();
              }}
              data-cursor-interactive
              data-cursor-text="SIMULATE"
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-2.5 text-xs font-bold tracking-widest text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>LAUNCH VR LAB</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
