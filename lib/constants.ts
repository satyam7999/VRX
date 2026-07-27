export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  specs: string[];
  metrics: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface VrProject {
  id: string;
  title: string;
  category: "ENTERPRISE" | "ARCHITECTURE" | "AEROSPACE" | "SCI-FI GAMING";
  tagline: string;
  description: string;
  fullDetails: string;
  specs: {
    resolution: string;
    targetFps: string;
    latency: string;
    engine: string;
  };
  gradient: string;
  accent: string;
  imageAlt: string;
  featured: boolean;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  subtext: string;
  change: string;
}

export const NAV_LINKS = [
  { name: "EXPERIENCE", href: "#hero" },
  { name: "SERVICES", href: "#services" },
  { name: "PROCESS", href: "#process" },
  { name: "SHOWCASE", href: "#showcase" },
  { name: "METRICS", href: "#statistics" },
];

export const HERO_STATS = [
  { label: "Motion-to-Photon", value: "< 0.2ms" },
  { label: "Dual Eye Native", value: "8K Ultra" },
  { label: "Target Framerate", value: "120 FPS Locked" },
  { label: "Immersion Index", value: "99.9%" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "neural-tracking",
    title: "Neural Spatial Computing",
    subtitle: "Sub-Millimeter 6DoF Tracking",
    description: "Ultra-low latency predictive neural motion tracking for hyper-accurate spatial presence and zero motion-sickness immersion.",
    iconName: "BrainCircuit",
    accentColor: "from-blue-500 to-cyan-400",
    specs: ["Sub-0.2ms latency", "6 DoF Predictive AI", "Eye-Tracking Foveated Render"],
    metrics: "99.9% Spatial Precision",
  },
  {
    id: "haptic-biosensor",
    title: "Haptic Biosensor Matrix",
    subtitle: "Full-Body Tactile Feedback",
    description: "Integrating high-definition tactile frequency actuators and biometric sensing for thermal, force, and micro-vibration sensation.",
    iconName: "Activity",
    accentColor: "from-purple-500 to-pink-500",
    specs: ["256-Channel Haptic Grid", "Thermal Regulation", "Heart-rate Bio-adaptive"],
    metrics: "256 Tactile Zones",
  },
  {
    id: "environment-synthesis",
    title: "Photorealistic 3D Synthesis",
    subtitle: "NeRF & Photogrammetry Pipelines",
    description: "Transforming real-world physical environments into interactive 1:1 digital twins using neural radiance fields and spatial ray scanning.",
    iconName: "Layers",
    accentColor: "from-cyan-400 to-emerald-400",
    specs: ["100M+ Polygon Stream", "Sub-Millimeter Scan", "Procedural Geometry"],
    metrics: "1:1 Digital Twin",
  },
  {
    id: "enterprise-grid",
    title: "Enterprise VR Meta-Grid",
    subtitle: "Massive Multi-User Synchronicity",
    description: "Cloud-rendered collaborative meta-workspaces accommodating 10,000+ simultaneous spatial users with localized spatial audio.",
    iconName: "Globe",
    accentColor: "from-blue-600 to-indigo-500",
    specs: ["10,000+ Concurrent Nodes", "Spatial Binaural Audio", "Zero-Trust Encryption"],
    metrics: "10k+ Live Users",
  },
  {
    id: "raytrace-engine",
    title: "Real-Time Ray-Traced VR",
    subtitle: "Hardware-Accelerated Lighting",
    description: "Custom WebGL & Vulkan ray tracing shaders rendering dynamic GI, soft refraction glass, and volumetric light shafts at 120 FPS.",
    iconName: "Sparkles",
    accentColor: "from-amber-400 to-purple-600",
    specs: ["Hardware Ray Acceleration", "Global Illumination", "Volumetric Fog & Dust"],
    metrics: "120 FPS Native",
  },
  {
    id: "webxr-apps",
    title: "WebXR & Immersive Web",
    subtitle: "Instant Browser Access",
    description: "Cross-platform WebXR applications accessible directly via web browser on Apple Vision Pro, Meta Quest 3, and WebGL desktop.",
    iconName: "Zap",
    accentColor: "from-pink-500 to-cyan-400",
    specs: ["Zero-Install Web Access", "VisionOS / Quest Optimized", "Progressive Web XR"],
    metrics: "Universal Cross-Platform",
  },
];

export const PROCESS_DATA: ProcessStage[] = [
  {
    step: "01",
    title: "Neural Blueprinting",
    subtitle: "Spatial Architecture & UX Mapping",
    description: "We map physical ergonomic constraints, spatial interaction zones, and low-friction user journeys with predictive spatial flowcharts.",
    highlights: ["Spatial Wireframing", "Ergonomic Sightline Audits", "Interaction Mapping"],
    icon: "DraftingCompass",
  },
  {
    step: "02",
    title: "Spatial 3D Shader Design",
    subtitle: "High-Fidelity Assets & NeRF Scanning",
    description: "Custom shader creation, lighting baking, volumetric atmospheric fog creation, and high-frequency PBR textures optimized for mobile & PC VR.",
    highlights: ["Custom GLSL/HLSL Shaders", "NeRF 3D Reconstruction", "LOD Mesh Optimization"],
    icon: "Box",
  },
  {
    step: "03",
    title: "Haptic Engine Tuning",
    subtitle: "Sub-Millimeter Motion & Frame Locking",
    description: "Injecting neural motion prediction, tuning physics solver sub-steps, and locking rendering pipeline at rock-solid 120 FPS with 0.2ms latency.",
    highlights: ["120 FPS Lock Optimization", "Foveated Rendering", "Spatial Audio Synthesis"],
    icon: "Cpu",
  },
  {
    step: "04",
    title: "Global Grid Launch",
    subtitle: "Multi-Platform Spatial Deployment",
    description: "Deploying to cloud edge rendering nodes across North America, Europe, and Asia for instant multi-user spatial streaming.",
    highlights: ["Edge WebXR CDN", "Cross-Platform Build", "Live Telemetry Dashboard"],
    icon: "Rocket",
  },
];

export const SHOWCASE_DATA: VrProject[] = [
  {
    id: "cyber-nebula",
    title: "CYBER-NEBULA 2099",
    category: "SCI-FI GAMING",
    tagline: "Multi-Sensory Deep Space Exploration Simulator",
    description: "An immersive deep-space spatial experience featuring real-time volumetric black hole ray tracing, dynamic nebula plasma clouds, and spatial haptic suits.",
    fullDetails: "Built using custom Vulkan/WebGL ray tracing pipelines with real-time gravitational lensing shaders around supermassive black holes. Includes 6DoF fighter cockpit simulation with zero-gravity haptic feedback.",
    specs: {
      resolution: "8K Per Eye",
      targetFps: "120 FPS",
      latency: "0.18ms",
      engine: "VRX Custom Core",
    },
    gradient: "from-indigo-900 via-purple-900 to-black",
    accent: "#a855f7",
    imageAlt: "Futuristic space VR hologram",
    featured: true,
  },
  {
    id: "aero-sim-x",
    title: "AERO-SIM X",
    category: "AEROSPACE",
    tagline: "Next-Gen Jet Pilot Training System",
    description: "Military-grade flight simulator used by defense aeronautics teams to simulate supersonic atmospheric flight in extreme weather conditions.",
    fullDetails: "Features 1:1 physical cockpit calibration with eye-tracked foveated rendering, weather particle turbulence physics, and biometrically adaptive stress simulation.",
    specs: {
      resolution: "8K Ultra Native",
      targetFps: "120 FPS",
      latency: "0.15ms",
      engine: "Unreal 5 / VRX Plugin",
    },
    gradient: "from-blue-900 via-slate-900 to-black",
    accent: "#3b82f6",
    imageAlt: "Aerospace VR simulator headset",
    featured: true,
  },
  {
    id: "chronos-medical",
    title: "CHRONOS SURGICAL",
    category: "ENTERPRISE",
    tagline: "Sub-Millimeter Robotic Surgery VR Simulation",
    description: "Ultra-high precision surgical robotics VR platform allowing surgeons to practice complex neural and cardiovascular operations with haptic micro-feedback.",
    fullDetails: "Incorporates soft-body tissue deformation physics, real-time arterial blood flow fluid mechanics, and sub-millimeter haptic force feedback tools.",
    specs: {
      resolution: "4K Dual OLED",
      targetFps: "120 FPS",
      latency: "0.12ms",
      engine: "VRX Haptic Core",
    },
    gradient: "from-teal-900 via-slate-900 to-black",
    accent: "#06b6d4",
    imageAlt: "Surgical VR training interface",
    featured: true,
  },
  {
    id: "quantum-matrix",
    title: "QUANTUM META-GRID",
    category: "ARCHITECTURE",
    tagline: "Collaborative 1:1 Architectural VR World",
    description: "Architectural visualization engine streaming massive urban masterplans in real-time with dynamic sun simulation and multi-user spatial avatars.",
    fullDetails: "Allows urban planning teams to walk through multi-square-kilometer smart cities before ground is broken. Includes live daylight solar ray tracking and acoustical reflection simulation.",
    specs: {
      resolution: "8K Streamed",
      targetFps: "120 FPS",
      latency: "0.22ms",
      engine: "WebXR Cloud Engine",
    },
    gradient: "from-pink-900 via-purple-950 to-black",
    accent: "#ec4899",
    imageAlt: "Architectural 3D urban hologram",
    featured: true,
  },
];

export const METRICS_DATA: MetricItem[] = [
  {
    id: "latency",
    label: "Motion-to-Photon Latency",
    value: "< 0.2",
    numericValue: 0.2,
    suffix: "ms",
    subtext: "Industry standard is 15-20ms. VRX achieves sub-millimeter neural prediction.",
    change: "-98.9% Latency",
  },
  {
    id: "framerate",
    label: "Frame Lock Stability",
    value: "120",
    numericValue: 120,
    suffix: " FPS",
    subtext: "Zero frame drops guaranteed across complex 100M+ polygon scenes.",
    change: "100% Stability",
  },
  {
    id: "concurrent",
    label: "Global Active Nodes",
    value: "500",
    numericValue: 500,
    suffix: "K+",
    subtext: "Concurrent WebXR & spatial cloud instances served worldwide.",
    change: "+320% YoY",
  },
  {
    id: "immersion",
    label: "Biometric Immersion Index",
    value: "99.9",
    numericValue: 99.9,
    suffix: "%",
    subtext: "Measured via EEG brainwave alpha-coherence and zero motion-sickness reports.",
    change: "Awwwards Standard",
  },
];
