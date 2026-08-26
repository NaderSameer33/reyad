"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, ArrowLeft, CheckCircle2, Droplets, Zap, Activity } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import MagneticElement from "@/components/MagneticElement";
import TiltCard from "@/components/TiltCard";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-12 px-4 z-10 overflow-hidden bg-gradient-to-b from-slate-900/40 via-slate-900/70 to-slate-900 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Text Column (RTL) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            
            {/* Trust Badge with Live Pulse */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/30 text-teal-300 text-xs font-bold shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>شركة معتمدة لكشف التسربات والعزل الشامل بالرياض</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 font-cairo leading-tight"
            >
              كشف تسربات المياه <span className="text-teal-300 font-black">بدون تكسير</span> وعزل شامل معتمد بالرياض
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              نحمي منزلك وخزانات المياه والأسطح بأحدث أجهزة الفحص الإلكترونية والكاميرات الحرارية مع ضمان رسمي معتمد يصل إلى <strong>15 سنة</strong> ومعتمد لدى شركة المياه والكهرباء.
            </motion.p>

            {/* Value Props Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>كشف إلكتروني دقيق</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>تقرير معتمد للمياه</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>معاينة فورية مجانية</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <MagneticElement strength={14} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all font-cairo"
                >
                  <span>طلب فحص ومعاينة مجانية</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </MagneticElement>

              <MagneticElement strength={10} className="w-full sm:w-auto">
                <a
                  href="https://wa.me/966501884483"
                  className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 shadow-sm transition-all font-cairo"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>اتصال مباشر: 0501884483</span>
                </a>
              </MagneticElement>
            </motion.div>

            {/* Animated Numbers Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-slate-300"
            >
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-100 font-cairo">
                  <AnimatedCounter target={3000} suffix="+" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">موقع تم فحصه وعزله</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-teal-300 font-cairo">
                  <AnimatedCounter target={15} suffix=" سنة" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">ضمان رسمي معتمد</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-sky-300 font-cairo">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">بدون تكسير عشوائي</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Left Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <TiltCard maxTilt={6} scale={1.015}>
              <div className="bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 relative">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-cairo">خدمة الطوارئ والمعاينة</h3>
                      <span className="text-[11px] text-slate-400">فريق فني متاح بجميع أحياء الرياض</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px] font-bold">
                    متاح الآن
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                    <span className="font-medium text-slate-300">سرعة الاستجابة الميدانية:</span>
                    <span className="font-bold text-slate-100 font-cairo">خلال 30 إلى 60 دقيقة</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                    <span className="font-medium text-slate-300">تقنية الفحص المستخدمة:</span>
                    <span className="font-bold text-teal-300 font-cairo">أجهزة ألمانية & FLIR</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                    <span className="font-medium text-slate-300">التقرير الفني للمياه:</span>
                    <span className="font-bold text-sky-300 font-cairo">معتمد لحل ارتفاع الفاتورة</span>
                  </div>
                </div>

                <div className="pt-1">
                  <a
                    href="#calculator"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-teal-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors font-cairo border border-teal-500/30"
                  >
                    <span>احسب تكلفة العزل التقريبية لسطحك</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}