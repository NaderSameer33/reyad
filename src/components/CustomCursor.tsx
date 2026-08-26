"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDelta, setScrollDelta] = useState(0);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Movement velocity
      lastX = mouseX;
      lastY = mouseY;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      scrollVelocity = Math.max(-25, Math.min(25, diff));
      setScrollDelta(scrollVelocity);
      lastScrollY = currentScrollY;
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, select, textarea, .glow-card, .tilt-card")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Smooth Lerp loop
    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      // Scroll inertia decay
      scrollVelocity *= 0.88;

      if (ringRef.current) {
        const scaleY = 1 + Math.abs(scrollVelocity) * 0.015;
        const scaleX = 1 - Math.abs(scrollVelocity) * 0.008;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scaleX}, ${scaleY})`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>


      {/* Glowing Lens Aura */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99991] transition-all duration-300"
        style={{
          width: isHovered ? "150px" : "80px",
          height: isHovered ? "150px" : "80px",
          borderRadius: "50%",
          background: isHovered
            ? "radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(45, 212, 191, 0.14) 0%, transparent 65%)",
          filter: "blur(14px)",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Interactive Elastic Glass Ring Follower (with scroll inertia deformation) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99995] transition-all duration-150 ease-out"
        style={{
          width: isHovered ? "56px" : isClicked ? "24px" : "36px",
          height: isHovered ? "56px" : isClicked ? "24px" : "36px",
          borderRadius: "50%",
          border: isHovered
            ? "1.5px solid rgba(45, 212, 191, 0.95)"
            : "1px solid rgba(56, 189, 248, 0.6)",
          background: isHovered
            ? "rgba(45, 212, 191, 0.1)"
            : "rgba(56, 189, 248, 0.02)",
          backdropFilter: isHovered ? "blur(3px)" : "none",
          boxShadow: isHovered
            ? "0 0 24px 3px rgba(45, 212, 191, 0.35), inset 0 0 10px rgba(45, 212, 191, 0.2)"
            : "0 0 10px rgba(56, 189, 248, 0.25)",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />

      {/* Precision Glowing Droplet Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999] transition-transform duration-75"
        style={{
          width: isHovered ? "7px" : "5px",
          height: isHovered ? "7px" : "5px",
          borderRadius: "50%",
          backgroundColor: isHovered ? "#5EEAD4" : "#38BDF8",
          boxShadow: isHovered
            ? "0 0 12px 3px #2DD4BF"
            : "0 0 8px 2px #38BDF8",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />
    </>
  );
}