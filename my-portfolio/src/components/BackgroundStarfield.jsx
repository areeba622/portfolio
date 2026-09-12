import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function BackgroundStarfield() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // Cap DPR per §7.5
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x0a0d12, 1);
    container.appendChild(renderer.domElement);

    // 2. Star count scaling per §7.5 (desktop ~900, mobile ~350)
    const isMobile = window.innerWidth < 640;
    const starCount = isMobile ? 350 : 900;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorCyan = new THREE.Color(0x5fc9f0);
    const colorWhite = new THREE.Color(0xd4dde3);
    const colorDim = new THREE.Color(0x2a5a72);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = Math.random() * 800 - 400;

      // Subtle cockpit telemetry star palette
      const rand = Math.random();
      const col = rand > 0.85 ? colorCyan : (rand > 0.3 ? colorWhite : colorDim);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture / circle
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(212,221,227,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 3.2,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // 3. Animation state & reverse thrust handling (§5.3)
    let currentSpeed = 0.8;
    let targetSpeed = 0.8;
    let animationFrameId;

    const handleThrustChange = (e) => {
      const isReverse = e.detail?.reverse;
      targetSpeed = isReverse ? -2.2 : 0.8;
    };

    window.addEventListener('starfield:thrust', handleThrustChange);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!reducedMotion) {
        // Smoothly ease current speed to target speed
        currentSpeed += (targetSpeed - currentSpeed) * 0.08;

        const pos = geometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
          pos[i * 3 + 2] += currentSpeed;

          // Wrap forward transit
          if (currentSpeed > 0 && pos[i * 3 + 2] > 400) {
            pos[i * 3 + 2] = -400;
            pos[i * 3] = (Math.random() - 0.5) * 1200;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
          }
          // Wrap reverse transit
          else if (currentSpeed < 0 && pos[i * 3 + 2] < -400) {
            pos[i * 3 + 2] = 400;
            pos[i * 3] = (Math.random() - 0.5) * 1200;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('starfield:thrust', handleThrustChange);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
