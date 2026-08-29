"use client";
import React, { useEffect, useRef } from "react";

/**
 * AnimatedCounter — zero React re-renders during animation.
 * Updates the DOM text node directly via a ref instead of calling setState
 * on every animation frame, which previously caused a React re-render per frame.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Write initial value directly to DOM — no state involved
    el.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    function runAnimation() {
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * target);

        // Direct DOM update — no setState, no React re-render
        if (el) {
          el.textContent = `${current.toLocaleString("ar-EG")}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (el) {
            el.textContent = `${target.toLocaleString("ar-EG")}${suffix}`;
          }
        }
      };

      requestAnimationFrame(update);
    }

    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums" suppressHydrationWarning />
  );
}