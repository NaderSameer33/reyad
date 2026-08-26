"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[999999] h-[3px] bg-slate-900/60 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.8)] origin-right"
        style={{ scaleX }}
      />
    </div>
  );
}