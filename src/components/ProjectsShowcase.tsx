"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, ProjectItem } from "@/data/categories";
import TiltCard from "@/components/TiltCard";

const ALL_PROJECTS: ProjectItem[] = Object.values(CATEGORIES).flatMap((cat) => cat.gallery);

const FILTERS = [
  { id: "all", label: "جميع المشاريع" },
  { id: "leak-detection", label: "كشف التسربات" },
  { id: "foam", label: "عزل الفوم" },
  { id: "waterproofing", label: "العزل المائي" },
  { id: "tanks", label: "عزل الخزانات" },
  { id: "thermal", label: "العزل الحراري" },
];

export default function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = (activeFilter === "all" 
    ? ALL_PROJECTS 
    : (CATEGORIES[activeFilter]?.gallery || [])
  ).slice(0, 9);

  return (
    <section id="projects" className="py-20 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-3">
            <Building className="w-4 h-4" />
            <span>سابقة أعمالنا الميدانية</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            مشاريع تم إنجازها <span className="text-teal-300">في مختلف أحياء الرياض</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 font-normal">
            اضغط على أي مشروع لمشاهدة التقرير الفني وصور التنفيذ ودراسة الحالة الكاملة.
          </p>
        </motion.div>

        {/* Filter Tabs - Swipeable on mobile */}
        <div className="flex items-center sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === f.id
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-sm"
                  : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
              >
                <TiltCard maxTilt={7} scale={1.02} className="h-full rounded-2xl">
                  <Link
                    href={`/projects/${proj.id}`}
                    className="bg-slate-900/75 backdrop-blur-md border border-slate-800 hover:border-teal-500/40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 flex flex-col h-full group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-200 text-[10px] font-bold border border-slate-700 backdrop-blur-sm">
                          {proj.categoryName}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 left-2.5 flex justify-between items-end">
                        <div className="flex items-center gap-1 text-[11px] text-slate-200 font-medium bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800">
                          <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                          <span>{proj.district}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold backdrop-blur-sm">
                          {proj.savings}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <h3 className="text-sm sm:text-base font-bold text-slate-100 font-cairo group-hover:text-teal-300 transition-colors line-clamp-2">
                        {proj.title}
                      </h3>

                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block">المساحة</span>
                          <span className="text-xs font-bold text-slate-200 font-cairo">{proj.area}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">المدة</span>
                          <span className="text-xs font-bold text-slate-200 font-cairo">{proj.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">الضمان</span>
                          <span className="text-xs font-bold text-teal-300 font-cairo">{proj.warranty}</span>
                        </div>
                      </div>

                      <div className="pt-1 flex justify-between items-center text-xs font-bold text-teal-400 font-cairo">
                        <span>عرض دراسة الحالة والتفاصيل</span>
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700/80 shadow-sm transition-all font-cairo"
          >
            <span>استعراض جميع مشاريعنا الميدانية بالرياض (78+ مشروع حقيقي)</span>
            <ArrowLeft className="w-4 h-4 text-teal-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}