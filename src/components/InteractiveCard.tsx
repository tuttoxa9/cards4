'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Product } from '@/types/product';

interface InteractiveCardProps {
  product: Product;
}

export default function InteractiveCard({ product }: InteractiveCardProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Card geometry and material
    const geometry = new THREE.PlaneGeometry(2.5, 3.5);

    // Create holographic material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(width, height) },
        colorA: { value: new THREE.Color(0x3b82f6) }, // Primary blue
        colorB: { value: new THREE.Color(0x8b5cf6) }, // Purple
        colorC: { value: new THREE.Color(0x06b6d4) }, // Cyan
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Base card color
          vec3 baseColor = vec3(0.95, 0.96, 1.0);

          // Holographic effect
          float wave1 = sin(uv.x * 10.0 + time * 2.0) * 0.5 + 0.5;
          float wave2 = sin(uv.y * 8.0 + time * 1.5) * 0.5 + 0.5;

          // Mouse interaction
          vec2 mouseInfluence = (mouse - 0.5) * 2.0;
          float mouseEffect = length(mouseInfluence - uv) * 2.0;
          mouseEffect = 1.0 - clamp(mouseEffect, 0.0, 1.0);

          // Combine effects
          vec3 hologram = mix(colorA, colorB, wave1);
          hologram = mix(hologram, colorC, wave2);

          // Final color mixing
          vec3 finalColor = mix(baseColor, hologram, 0.3 + mouseEffect * 0.4);

          // Add some metallic shimmer
          float shimmer = sin(uv.x * 20.0 + uv.y * 15.0 + time * 3.0) * 0.1 + 0.9;
          finalColor *= shimmer;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 3;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      mouseRef.current = { x, y };

      // Update shader uniform
      material.uniforms.mouse.value.set(x, y);

      // Rotate card based on mouse position
      const rotationX = (y - 0.5) * 0.3;
      const rotationY = (x - 0.5) * 0.3;

      card.rotation.x = rotationX;
      card.rotation.y = rotationY;
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      material.uniforms.time.value += 0.01;

      renderer.render(scene, camera);
    };

    // Event listeners
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      const currentMount = mountRef.current;
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full aspect-[5/7] max-w-sm mx-auto">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 rounded-xl overflow-hidden cursor-move"
        style={{ background: 'transparent' }}
      />

      {/* Card Content Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Section */}
        <div>
          <div className="text-xs font-medium opacity-80 mb-1">
            {product.category.toUpperCase()}
          </div>
          <div className="text-sm font-bold bg-white/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
            {product.rarity}
          </div>
        </div>

        {/* Center - Product Name */}
        <div className="text-center">
          <h3 className="text-2xl font-bold drop-shadow-lg">
            {product.name}
          </h3>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          <div className="text-xs opacity-80">
            HOLOGRAPHIC
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">
              {product.price}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Instruction Text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-sm text-muted-foreground">
          Наведите мышь для голографического эффекта
        </p>
      </motion.div>
    </div>
  );
}
