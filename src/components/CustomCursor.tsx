"use client";
import React, { useEffect, useRef } from "react";

/**
 * CustomCursor — fully imperative, zero React re-renders during animation.
 * All cursor state (position, hover, click, visibility) is managed via refs
 * and direct DOM style mutations, keeping React out of the hot path entirely.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices — cursor is irrelevant there
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    // Re-assign as non-null for TypeScript's flow analysis in inner functions
    const dotEl  = dot  as HTMLDivElement;
    const ringEl = ring as HTMLDivElement;
    const glowEl = glow as HTMLDivElement;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let glowX  = mouseX;
    let glowY  = mouseY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let isHovered = false;
    let isClicked = false;
    let isVisible = false;
    let rafId: number;

    // Show cursor on first mouse move
    const show = () => {
      if (!isVisible) {
        isVisible = true;
        dotEl.style.opacity  = "1";
        ringEl.style.opacity = "1";
        glowEl.style.opacity = "1";
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      show();
      // Dot follows instantly — no interpolation needed for inner dot
      dotEl.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      scrollVelocity = Math.max(-25, Math.min(25, diff));
      lastScrollY = currentScrollY;
      // No setState — just update the local variable used in RAF
    };

    const onMouseDown = () => {
      isClicked = true;
      applyRingSize();
    };
    const onMouseUp = () => {
      isClicked = false;
      applyRingSize();
    };
    const onMouseLeave = () => {
      isVisible = false;
      dotEl.style.opacity  = "0";
      ringEl.style.opacity = "0";
      glowEl.style.opacity = "0";
    };
    const onMouseEnter = () => { show(); };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovered = !!target.closest(
        "a, button, [role='button'], input, select, textarea, .glow-card, .tilt-card"
      );
      if (hovered !== isHovered) {
        isHovered = hovered;
        applyHoverStyles();
      }
    };

    function applyRingSize() {
      const size = isHovered ? "56px" : isClicked ? "24px" : "36px";
      ringEl.style.width  = size;
      ringEl.style.height = size;
    }

    function applyHoverStyles() {
      // Ring styles
      const ringSize = isHovered ? "56px" : isClicked ? "24px" : "36px";
      ringEl.style.width  = ringSize;
      ringEl.style.height = ringSize;
      ringEl.style.border = isHovered
        ? "1.5px solid rgba(45,212,191,0.95)"
        : "1px solid rgba(56,189,248,0.6)";
      ringEl.style.background = isHovered
        ? "rgba(45,212,191,0.1)"
        : "rgba(56,189,248,0.02)";
      ringEl.style.backdropFilter = isHovered ? "blur(3px)" : "none";
      ringEl.style.boxShadow = isHovered
        ? "0 0 24px 3px rgba(45,212,191,0.35),inset 0 0 10px rgba(45,212,191,0.2)"
        : "0 0 10px rgba(56,189,248,0.25)";

      // Dot styles
      dotEl.style.width           = isHovered ? "7px" : "5px";
      dotEl.style.height          = isHovered ? "7px" : "5px";
      dotEl.style.backgroundColor = isHovered ? "#5EEAD4" : "#38BDF8";
      dotEl.style.boxShadow       = isHovered
        ? "0 0 12px 3px #2DD4BF"
        : "0 0 8px 2px #38BDF8";

      // Glow size
      glowEl.style.width  = isHovered ? "150px" : "80px";
      glowEl.style.height = isHovered ? "150px" : "80px";
      glowEl.style.background = isHovered
        ? "radial-gradient(circle,rgba(45,212,191,0.25) 0%,rgba(56,189,248,0.1) 50%,transparent 70%)"
        : "radial-gradient(circle,rgba(45,212,191,0.14) 0%,transparent 65%)";
    }

    // RAF animation loop — only moves ring + glow (dot moves instantly in handler)
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      scrollVelocity *= 0.88;

      const scaleY = 1 + Math.abs(scrollVelocity) * 0.015;
      const scaleX = 1 - Math.abs(scrollVelocity) * 0.008;
      ringEl.style.transform = `translate3d(${ringX}px,${ringY}px,0) scale(${scaleX},${scaleY})`;
      glowEl.style.transform = `translate3d(${glowX}px,${glowY}px,0)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("scroll",     onScroll,     { passive: true });
    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover",  onMouseOver, { passive: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("scroll",     onScroll);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover",  onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Glowing Lens Aura */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          transform: "translate3d(0,0,0) translate(-50%,-50%)",
          background: "radial-gradient(circle,rgba(45,212,191,0.14) 0%,transparent 65%)",
          filter: "blur(14px)",
          opacity: 0,
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 99991,
          transition: "width 0.2s,height 0.2s,background 0.2s",
        }}
      />

      {/* Elastic Glass Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          transform: "translate3d(0,0,0) translate(-50%,-50%)",
          border: "1px solid rgba(56,189,248,0.6)",
          background: "rgba(56,189,248,0.02)",
          boxShadow: "0 0 10px rgba(56,189,248,0.25)",
          opacity: 0,
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 99995,
          transition: "width 0.15s ease-out,height 0.15s ease-out,border 0.2s,background 0.2s,box-shadow 0.2s",
        }}
      />

      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          transform: "translate3d(0,0,0) translate(-50%,-50%)",
          backgroundColor: "#38BDF8",
          boxShadow: "0 0 8px 2px #38BDF8",
          opacity: 0,
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.1s,height 0.1s,background-color 0.1s,box-shadow 0.1s",
        }}
      />
    </>
  );
}