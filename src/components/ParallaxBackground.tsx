"use client";
import React, { useEffect, useRef } from "react";

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch / mobile devices — saves battery and eliminates lag
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    function resize() {
      canvas!.width = Math.round(window.innerWidth);
      canvas!.height = Math.round(window.innerHeight);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouse = false;
    let idleTime = 0;
    // Frame skipping: only draw every other frame to halve GPU load
    let frameCount = 0;

    // Throttle mousemove via a flag — only process on next rAF
    let pendingMouseX = 0;
    let pendingMouseY = 0;
    let mouseDirty = false;

    const onMouseMove = (e: MouseEvent) => {
      pendingMouseX = e.clientX;
      pendingMouseY = e.clientY;
      mouseDirty = true;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Reduced grid: 18×12 instead of 24×16 → 44% fewer point calculations
    const COLS = 18;
    const ROWS = 12;
    const CELL_W = 80;
    const CELL_D = 80;
    const FOV = 520;
    const CAM_Y = -180;
    const CAM_Z = -120;

    const project = (x: number, y: number, z: number) => {
      const cz = z - CAM_Z;
      const cy = y - CAM_Y;
      const s = FOV / (FOV + cz);
      return {
        x: canvas!.width / 2 + x * s,
        y: canvas!.height * 0.7 + cy * s,
        s,
      };
    };

    // Pre-allocate grid array to avoid GC pressure
    const grid: { px: number; py: number; alpha: number }[][] = Array.from(
      { length: ROWS },
      () => Array.from({ length: COLS }, () => ({ px: 0, py: 0, alpha: 0 }))
    );

    let rafId: number;

    function render(ts: number) {
      // Pause when tab is hidden — saves CPU/GPU
      if (document.hidden) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // Skip every other frame — halves draw calls while keeping animation smooth
      frameCount++;
      if (frameCount % 2 !== 0) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const t = ts / 1000;

      // Consume buffered mouse position
      if (mouseDirty) {
        hasMouse = true;
        targetX = (pendingMouseX / window.innerWidth - 0.5) * 2;
        targetY = (pendingMouseY / window.innerHeight - 0.5) * 2;
        mouseDirty = false;
      }

      if (hasMouse) {
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
      } else {
        idleTime += 0.001;
        currentX += (Math.sin(idleTime) * 0.1 - currentX) * 0.025;
        currentY += (Math.cos(idleTime * 0.7) * 0.1 - currentY) * 0.025;
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      const waveOffsetX = currentX * 60;
      const waveOffsetY = currentY * 40;

      // Build grid — reuse pre-allocated objects
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x3 = (c - COLS / 2) * CELL_W + waveOffsetX;
          const z3 = r * CELL_D;
          const waveHeight =
            Math.sin(c * 0.35 + t * 0.5) * 20 +
            Math.cos(r * 0.45 + t * 0.35) * 15 +
            Math.sin((c + r) * 0.25 + t * 0.45) * 10;
          const y3 = waveHeight + waveOffsetY;
          const proj = project(x3, y3, z3);
          const distFactor = (ROWS - r) / ROWS;
          const alpha = Math.max(0, Math.min(0.09, distFactor * 0.09 * proj.s));
          grid[r][c].px = proj.x;
          grid[r][c].py = proj.y;
          grid[r][c].alpha = alpha;
        }
      }

      ctx.lineWidth = 0.85;

      // Row lines — batch begin/stroke calls per row for better GPU utilization
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = grid[r][c];
          if (p1.alpha <= 0.002) continue;
          const p2 = grid[r][c + 1];
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(94,234,212,${p1.alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }

      // Column lines
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const p1 = grid[r][c];
          if (p1.alpha <= 0.002) continue;
          const p2 = grid[r + 1][c];
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(147,197,253,${(p1.alpha * 0.75).toFixed(3)})`;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="zen-3d-wave-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}