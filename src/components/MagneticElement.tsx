"use client";
import React, { useRef, useState } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
}

export default function MagneticElement({
  children,
  className = "",
  strength = 18,
  as = "div",
  href,
  onClick,
}: MagneticProps) {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    setPosition({
      x: (x / (rect.width / 2)) * strength,
      y: (y / (rect.height / 2)) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  if (as === "a" && href) {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-block ${className}`}
        style={style}
      >
        {children}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-block ${className}`}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}