"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Splash screen visible for 2.5s then opens the site smoothly
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen-nobalaa"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 2.8,
            filter: "blur(16px)",
            transition: { duration: 0.75, ease: [0.7, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden font-cairo select-none"
        >
          {/* Background Ambient Glows */}
          <div className="absolute w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-sky-500/15 rounded-full blur-[110px] pointer-events-none" />

          {/* Main Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
            
            {/* Animated Letter 'ن' with Bounce & Growing Effect */}
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Rings */}
              <motion.div
                animate={{
                  scale: [0.9, 1.3, 0.9],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-teal-500/40 shadow-[0_0_60px_rgba(20,184,166,0.35)]"
              />

              <motion.div
                animate={{
                  scale: [1, 1.45, 1],
                  opacity: [0.15, 0.5, 0.15],
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-sky-400/30"
              />

              {/* Main Card with Letter 'ن' - Bouncing & Growing */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0, y: 60 }}
                animate={{
                  scale: [0.3, 1.25, 0.92, 1.45, 1.15, 2.2],
                  opacity: [0, 1, 1, 1, 1, 1],
                  y: [50, -20, 8, -12, 0, -4],
                  rotate: [0, -4, 4, -2, 0, 0],
                }}
                transition={{
                  duration: 2.4,
                  times: [0, 0.25, 0.45, 0.65, 0.85, 1],
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-teal-500/70 shadow-[0_0_70px_rgba(20,184,166,0.5)] flex items-center justify-center"
              >
                {/* Internal Glow Gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-teal-500/20 via-transparent to-sky-400/20" />

                {/* Big Letter 'م' */}
                <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-teal-100 via-teal-300 to-teal-500 drop-shadow-[0_6px_25px_rgba(20,184,166,0.8)] font-cairo leading-none">
                  م
                </span>

                {/* Top Corner Sparkle */}
                <div className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/60">
                  <Sparkles className="w-4 h-4" />
                </div>
              </motion.div>
            </div>

            {/* Company Name Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <h1 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo tracking-wide">
                  شركة المعمورة الحديثة
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-teal-300/90 font-bold tracking-wider font-cairo">
                حلول العزل الشامل وكشف التسربات بالرياض
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "180px", opacity: 1 }}
              transition={{ delay: 0.2, duration: 2.1, ease: "easeInOut" }}
              className="h-1.5 bg-gradient-to-r from-teal-500 via-sky-400 to-teal-300 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.9)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
