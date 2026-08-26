"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = "https://wa.me/966501884483?text=" + encodeURIComponent("مرحباً شركة المعمورة الحديثة، أستفسر عن خدمات كشف تسربات المياه والعزل المعتمد بالرياض.");

  const socialLinks = [
    {
      id: "whatsapp",
      label: "واتساب",
      href: whatsappUrl,
      target: "_blank",
      colorClass: "text-emerald-400 hover:text-emerald-300",
      bgHover: "hover:bg-emerald-500/15",
      borderHover: "hover:border-emerald-500/40",
      isPulse: true,
      pulseColor: "#34D399",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    },
    {
      id: "phone",
      label: "اتصل بنا",
      href: "tel:0501884483",
      target: "_self",
      colorClass: "text-sky-400 hover:text-sky-300",
      bgHover: "hover:bg-sky-500/15",
      borderHover: "hover:border-sky-500/40",
      isPulse: false,
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
    {
      id: "facebook",
      label: "فيسبوك",
      href: "https://facebook.com",
      target: "_blank",
      colorClass: "text-blue-400 hover:text-blue-300",
      bgHover: "hover:bg-blue-500/15",
      borderHover: "hover:border-blue-500/40",
      isPulse: false,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
  ];

  if (!mounted) return null;

  const content = (
    <aside
      aria-label="شريط التواصل العائم"
      className="fixed bottom-5 right-4 sm:right-6 z-[2147483647] pointer-events-none flex flex-col items-center gap-2.5"
    >
      {/* Scroll to Top */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-teal-500/50 text-slate-400 hover:text-teal-300 flex items-center justify-center shadow-xl transition-colors cursor-pointer"
        title="الصعود لأعلى الصفحة"
      >
        <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </motion.button>

      {/* Glassmorphic Contact Dock */}
      <div className="pointer-events-auto p-1.5 rounded-2xl bg-slate-900/70 backdrop-blur-2xl border border-slate-700/60 shadow-[0_12px_40px_rgba(0,0,0,0.55)] flex flex-col items-center gap-1.5">
        {socialLinks.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredIcon(item.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {/* Sliding Text Label on Hover */}
            <AnimatePresence>
              {hoveredIcon === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 text-slate-100 text-xs font-bold shadow-2xl whitespace-nowrap pointer-events-none font-cairo flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>{item.label}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Button Icon */}
            <motion.a
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={item.pulseColor ? ({ "--radar-color": item.pulseColor } as React.CSSProperties) : undefined}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 border border-transparent ${item.colorClass} ${item.bgHover} ${item.borderHover} relative cursor-pointer ${item.isPulse ? "radar-dot" : ""}`}
              title={item.label}
            >
              <span className="relative z-10">{item.icon}</span>
            </motion.a>
          </div>
        ))}
      </div>
    </aside>
  );

  return createPortal(content, document.body);
}
