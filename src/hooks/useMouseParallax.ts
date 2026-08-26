"use client";
import { useEffect, useRef } from "react";

export function useMouseParallax() {
  const rawX = useRef(0);
  const rawY = useRef(0);
  const hasMouse = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      hasMouse.current = true;
      rawX.current = (e.clientX / window.innerWidth  - 0.5) * 2;
      rawY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { rawX, rawY, hasMouse };
}
