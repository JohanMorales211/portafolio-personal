import React, { useEffect, useRef } from "react";

const PARTICLE_DENSITY = 1 / 22000; // partículas por px² de pantalla
const MAX_PARTICLES = 90;
const LINK_DISTANCE = 130;

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId = 0;
    let width = 0;
    let height = 0;

    const getAlpha = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-alpha")
        .trim();
      return parseFloat(value) || 0.5;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(
        Math.round(width * height * PARTICLE_DENSITY),
        MAX_PARTICLES
      );
      while (particles.length < target) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.2 + Math.random() * 1.8,
        });
      }
      particles = particles.slice(0, target);
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const alpha = getAlpha();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const lineAlpha = (1 - dist / LINK_DISTANCE) * alpha * 0.45;
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // puntos
      for (const p of particles) {
        ctx.fillStyle = `rgba(200, 160, 45, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      step();
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
};

export default ParticlesBackground;
