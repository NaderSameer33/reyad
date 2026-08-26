"use client";
import { useEffect, useRef } from "react";

export function useIntersectionReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry], o) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          o.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
