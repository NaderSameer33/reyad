"use client";
import React, { useState } from "react";
import { Flame, Snowflake, ShieldAlert, ShieldCheck, ThermometerSun } from "lucide-react";

export default function ThermalComparison() {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <section className="py-14 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-2">
            <ThermometerSun className="w-4 h-4" />
            <span>المقارنة والفحص الحراري</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 font-cairo">
            الفرق بين سطح غير معزول <span className="text-teal-300">وسطح معزول باحترافية</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1.5">
            اسحب المؤشر لترى كيف يخفض العزل المعتمد حرارة الأسقف بمقدار 20 درجة مئوية ويحمي خرسانة المبنى.
          </p>
        </div>

        <div 
          className="relative h-[340px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl select-none cursor-ew-resize group"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMove(e.clientX, rect);
          }}
          onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMove(e.touches[0].clientX, rect);
          }}
        >
          {/* AFTER (Left Side) */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 flex flex-col justify-between p-5 sm:p-6 text-white">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400 text-teal-200 font-bold text-xs flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                بعد العزل المعتمد (النبلاء)
              </span>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-teal-300 font-cairo flex items-center justify-end gap-1">
                  <Snowflake className="w-4 h-4 text-teal-300" />
                  24°C
                </div>
                <span className="text-[10px] text-teal-200">حرارة الغرف الداخلية</span>
              </div>
            </div>

            <div className="max-w-md bg-slate-950/85 backdrop-blur-md border border-teal-500/30 p-3.5 rounded-xl text-xs space-y-1">
              <h4 className="font-bold text-teal-300 font-cairo text-xs sm:text-sm">مميزات السطح المعزول:</h4>
              <p>✓ حماية كاملة لخرسانة وحديد التسليح من التمدد والشروخ</p>
              <p>✓ توفير يصل إلى 45% في استهلاك أجهزة التكييف</p>
              <p>✓ صفر تسربات لمياه الأمطار مع ضمان موثق 15 سنة</p>
            </div>
          </div>

          {/* BEFORE (Right Side / Clipped) */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 flex flex-col justify-between p-5 sm:p-6 border-l-2 border-amber-400 text-white"
            style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
          >
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-400 text-red-200 font-bold text-xs flex items-center gap-1.5 backdrop-blur-md">
                <ShieldAlert className="w-3.5 h-3.5 text-red-300" />
                قبل العزل (خرسانة مكشوفة)
              </span>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-cairo flex items-center justify-end gap-1">
                  <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                  48°C+
                </div>
                <span className="text-[10px] text-amber-200">حرارة السطح صيفاً</span>
              </div>
            </div>

            <div className="max-w-md bg-slate-950/85 backdrop-blur-md border border-red-500/30 p-3.5 rounded-xl text-xs space-y-1 mr-auto">
              <h4 className="font-bold text-red-300 font-cairo text-xs sm:text-sm">أضرار عدم العزل:</h4>
              <p>✕ تسرب الحرارة القاسية وارتفاع حاد في فاتورة الكهرباء</p>
              <p>✕ تصدع الخرسانة وتآكل حديد التسليح بسبب الرطوبة</p>
              <p>✕ تسرب مياه الأمطار وتلف الديكورات والدهانات الداخلية</p>
            </div>
          </div>

          {/* Slider Line Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 border-2 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-teal-400">
              ↔
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-2.5 font-medium">
          💡 اسحب المؤشر يميناً ويساراً لمقارنة تأثير العزل الحراري والمائي
        </p>

      </div>
    </section>
  );
}