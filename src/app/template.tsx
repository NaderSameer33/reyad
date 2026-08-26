"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Dynamic Route Wipe Wave */}
      <motion.div
        className="fixed inset-0 z-[99990] bg-slate-950 pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 via-transparent to-transparent flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-teal-500/40 flex items-center justify-center text-teal-300 font-black text-xl shadow-2xl shadow-teal-500/20 animate-pulse">
            ر
          </div>
        </div>
      </motion.div>

      {/* Main Page Content Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}