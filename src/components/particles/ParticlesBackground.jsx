import React, { useEffect, useRef } from "react";

const PARTICLE_DENSITY = 1 / 22000; // partículas por px² de pantalla
const MAX_PARTICLES = 80;
const LINK_DISTANCE = 130;
const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    let particles = [];
    let animationId = 0;
    let width = 0;
    let height = 0;

    let dotColor = "";
    let linkBase = "";
    let alpha = 0.5;

    const refreshTheme = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-alpha")
        .trim();
      alpha = parseFloat(value) || 0.5;
      dotColor = `rgba(200, 160, 45, ${alpha})`;
      linkBase = alpha * 0.45;
    };

    refreshTheme();

    const themeObserver = new MutationObserver(refreshTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
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
      particles.length = target;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue;
          const dy = a.y - b.y;
          if (dy > LINK_DISTANCE || dy < -LINK_DISTANCE) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq >= LINK_DISTANCE_SQ) continue;

          const lineAlpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * linkBase;
          ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = dotColor;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      draw();
      animationId = requestAnimationFrame(step);
    };

    const start = () => {
      if (!animationId && !prefersReducedMotion) {
        animationId = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      cancelAnimationFrame(animationId);
      animationId = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReducedMotion) {
      draw();
    } else {
      start();
    }

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
};

export default ParticlesBackground;
