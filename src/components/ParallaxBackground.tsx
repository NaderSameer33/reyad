"use client";
import React, { useEffect, useRef } from "react";

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });



    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouse = false;
    let idleTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      hasMouse = true;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 3D Rolling Wave Mesh Setup
    const COLS = 24;
    const ROWS = 16;
    const CELL_W = 70;
    const CELL_D = 70;
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

    let rafId: number;

    function render(ts: number) {
      const t = ts / 1000;

      if (hasMouse) {
        currentX += (targetX - currentX) * 0.035;
        currentY += (targetY - currentY) * 0.035;
      } else {
        idleTime += 0.0008;
        currentX += (Math.sin(idleTime) * 0.1 - currentX) * 0.02;
        currentY += (Math.cos(idleTime * 0.7) * 0.1 - currentY) * 0.02;
      }

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      // 1. Draw Slow-moving Abstract 3D Wireframe Wave
      const waveOffsetX = currentX * 60;
      const waveOffsetY = currentY * 40;

      // Generate 3D grid points with gentle sinusoidal wave heights
      const grid: { px: number; py: number; alpha: number }[][] = [];

      for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
          const x3 = (c - COLS / 2) * CELL_W + waveOffsetX;
          const z3 = r * CELL_D;
          
          // Double sine wave equation for soft organic ocean/fluid wave
          const waveHeight = 
            Math.sin(c * 0.35 + t * 0.6) * 22 + 
            Math.cos(r * 0.45 + t * 0.4) * 18 +
            Math.sin((c + r) * 0.25 + t * 0.5) * 12;

          const y3 = waveHeight + waveOffsetY;
          const proj = project(x3, y3, z3);
          
          // Soft alpha fade for distance depth
          const distFactor = (ROWS - r) / ROWS;
          const alpha = Math.max(0, Math.min(0.09, distFactor * 0.09 * proj.s));

          grid[r][c] = { px: proj.x, py: proj.y, alpha };
        }
      }

      // Draw Wave Grid Lines (Muted Teal & Powder Blue)
      ctx.lineWidth = 0.85;

      // Row lines
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          if (p1.alpha <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(94, 234, 212, ${p1.alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }

      // Column lines
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const p1 = grid[r][c];
          const p2 = grid[r + 1][c];
          if (p1.alpha <= 0) continue;

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(147, 197, 253, ${(p1.alpha * 0.75).toFixed(3)})`;
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