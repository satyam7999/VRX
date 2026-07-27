import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "VRX – Virtual Reality Studio | Ultra-Premium Spatial Computing",
  description: "Award-winning virtual reality studio engineering sub-millimeter neural spatial tracking, 120 FPS ray-traced rendering, and 256-channel haptic bio-sensation.",
  keywords: [
    "Virtual Reality Studio",
    "VRX Studio",
    "Spatial Computing",
    "WebXR",
    "Apple Vision Pro",
    "Meta Quest 3",
    "Real-Time Ray Tracing",
    "NeRF 3D Reconstruction",
  ],
  authors: [{ name: "VRX Creative Laboratory" }],
  openGraph: {
    title: "VRX – Virtual Reality Studio | Beyond Reality, Into the Next Dimension",
    description: "Ultra-premium spatial computing landing page featuring 3D WebGL VR headset models, neural tracking, and high-fidelity 120 FPS ray tracing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
