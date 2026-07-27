"use client";

import React, { useEffect, useRef } from "react";

export function VrHeadset3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let THREE: typeof import("three");
    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let renderer: import("three").WebGLRenderer;
    let animFrameId: number;

    let headsetGroup: import("three").Group;
    let cityGroup: import("three").Group;
    let projectionBeam: import("three").Mesh;
    let particleSystem: import("three").Points;

    const initThree = async () => {
      THREE = await import("three");

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 600;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 8.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const spotLight1 = new THREE.SpotLight(0x06b6d4, 8);
      spotLight1.position.set(5, 8, 5);
      spotLight1.castShadow = true;
      scene.add(spotLight1);

      const spotLight2 = new THREE.SpotLight(0xa855f7, 6);
      spotLight2.position.set(-5, -4, 4);
      scene.add(spotLight2);

      const bluePoint = new THREE.PointLight(0x3b82f6, 4, 10);
      bluePoint.position.set(0, 0, 2);
      scene.add(bluePoint);

      // 3D VR Headset Parent Group
      headsetGroup = new THREE.Group();

      // Main Curved Visor Shell
      const visorGeo = new THREE.BoxGeometry(3.2, 1.6, 1.4, 16, 16, 16);
      const visorMat = new THREE.MeshPhysicalMaterial({
        color: 0x070d1e,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.2,
        transparent: true,
        opacity: 0.95,
        reflectivity: 0.9,
      });
      const visorMesh = new THREE.Mesh(visorGeo, visorMat);
      headsetGroup.add(visorMesh);

      // Front Optical Glass Lens Plate
      const lensGeo = new THREE.PlaneGeometry(2.9, 1.3);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.85,
      });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.z = 0.71;
      headsetGroup.add(lensMesh);

      // Metallic Accent Trim Ring
      const rimGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        metalness: 0.9,
        roughness: 0.2,
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.z = 0.72;
      rimMesh.scale.set(1.05, 0.55, 1);
      headsetGroup.add(rimMesh);

      // Glowing LED Status Band
      const ledGeo = new THREE.BoxGeometry(2.8, 0.08, 0.1);
      const ledMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 2.5,
      });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(0, 0.65, 0.72);
      headsetGroup.add(ledMesh);

      // Headset Ergonomic Straps (Left & Right)
      const strapGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 16);
      const strapMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });

      const leftStrap = new THREE.Mesh(strapGeo, strapMat);
      leftStrap.rotation.z = Math.PI / 2;
      leftStrap.position.set(-2.2, 0, -0.4);
      headsetGroup.add(leftStrap);

      const rightStrap = new THREE.Mesh(strapGeo, strapMat);
      rightStrap.rotation.z = Math.PI / 2;
      rightStrap.position.set(2.2, 0, -0.4);
      headsetGroup.add(rightStrap);

      // Inside Visor Holographic City Skyline
      cityGroup = new THREE.Group();
      const buildingMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true });
      for (let i = 0; i < 18; i++) {
        const bHeight = Math.random() * 0.6 + 0.2;
        const bGeo = new THREE.BoxGeometry(0.12, bHeight, 0.12);
        const bMesh = new THREE.Mesh(bGeo, buildingMat);
        bMesh.position.set((Math.random() - 0.5) * 2.4, -0.4 + bHeight / 2, 0.65);
        cityGroup.add(bMesh);
      }
      headsetGroup.add(cityGroup);

      // Volumetric Downward Projection Beam Cone
      const coneGeo = new THREE.ConeGeometry(2.8, 4.5, 32, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      projectionBeam = new THREE.Mesh(coneGeo, coneMat);
      projectionBeam.rotation.x = Math.PI;
      projectionBeam.position.set(0, -2.8, 0);
      headsetGroup.add(projectionBeam);

      // Volumetric Energy Particle Dust
      const pCount = 180;
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pPositions[i] = (Math.random() - 0.5) * 3;
        pPositions[i + 1] = -Math.random() * 4;
        pPositions[i + 2] = (Math.random() - 0.5) * 3;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      });
      particleSystem = new THREE.Points(pGeo, pMat);
      headsetGroup.add(particleSystem);

      scene.add(headsetGroup);

      // Handle Mouse Rotation
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current = { x, y };
      };

      const onResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Idle floating motion
        headsetGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

        // Smooth target mouse rotation lerp
        const targetRotY = mouseRef.current.x * 0.45 + Math.sin(elapsedTime * 0.5) * 0.1;
        const targetRotX = mouseRef.current.y * 0.3;

        headsetGroup.rotation.y += (targetRotY - headsetGroup.rotation.y) * 0.05;
        headsetGroup.rotation.x += (targetRotX - headsetGroup.rotation.x) * 0.05;

        // Rotate holographic city skyline inside visor
        if (cityGroup) {
          cityGroup.rotation.y = elapsedTime * 0.3;
        }

        // Pulse projection beam opacity
        if (projectionBeam) {
          (projectionBeam.material as import("three").MeshBasicMaterial).opacity =
            0.15 + Math.sin(elapsedTime * 3) * 0.05;
        }

        // Animate particles falling down beam
        if (particleSystem) {
          const positions = particleSystem.geometry.attributes.position.array as Float32Array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.015;
            if (positions[i] < -4) positions[i] = 0;
          }
          particleSystem.geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    initThree();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (renderer && renderer.domElement) {
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] lg:h-[600px] flex items-center justify-center">
      {/* Background Holographic Halo */}
      <div className="absolute h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 blur-[90px] animate-pulse" />
      <div className="absolute h-64 w-64 rounded-full border border-cyan-400/20 animate-spin" />
      <div className="absolute h-72 w-72 rounded-full border border-dashed border-purple-500/30 animate-[spin_10s_linear_infinite_reverse]" />

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
    </div>
  );
}
