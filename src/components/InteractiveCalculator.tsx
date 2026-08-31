"use client";
import React, { useState } from "react";
import { Calculator, CheckCircle2, ArrowLeft } from "lucide-react";

const INSULATION_TYPES = [
  { id: "leak", name: "كشف ومعالجة تسربات المياه", basePrice: 20, savingRate: 0.50, warranty: "10 سنوات", badge: "تقرير معتمد" },
  { id: "foam", name: "عزل فوم (مائي + حراري)", basePrice: 38, savingRate: 0.45, warranty: "15 سنة", badge: "معتمد للكهرباء" },
  { id: "water", name: "عزل مائي متطور للأسطح", basePrice: 28, savingRate: 0.15, warranty: "10 سنوات", badge: "حماية من الأمطار" },
  { id: "tank", name: "عزل خزانات مياه إيبوكسي", basePrice: 45, savingRate: 0.10, warranty: "10 سنوات", badge: "صحي 100%" },
];

export default function InteractiveCalculator() {
  const [area, setArea] = useState(250);
  const [selectedType, setSelectedType] = useState(INSULATION_TYPES[0]);

  const estimatedCost = Math.round(area * selectedType.basePrice);
  const annualElectricityBill = area * 18;
  const annualSaving = Math.round(annualElectricityBill * selectedType.savingRate);

  return (
    <section id="calculator" className="py-14 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-2">
            <Calculator className="w-4 h-4" />
            <span>حاسبة التكلفة التقديرية</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 font-cairo">
            احسب تكلفة عزل السطح <span className="text-teal-300">وقيمة التوفير المتوقعة</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1.5">
            تقدير فوري ومبدئي لتكلفة أعمال العزل والكشف مع حساب التوفير السنوي المتوقع.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Controls Side */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
            
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2">
                1. اختر نوع الخدمة المطلوبة:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INSULATION_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-800 border-teal-400 ring-1 ring-teal-400 text-slate-100"
                          : "bg-slate-800/50 border-slate-700/80 hover:border-slate-600 text-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 font-bold border border-slate-700">
                          {type.badge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                      </div>
                      <div className="font-bold text-slate-100 text-xs font-cairo">{type.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">ضمان: {type.warranty}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="area-range" className="text-xs font-bold text-slate-200">
                  2. المساحة التقريبية للسطح / الخزان:
                </label>
                <span className="text-base font-black text-teal-300 font-cairo">
                  {area} <span className="text-xs text-slate-400 font-normal">م²</span>
                </span>
              </div>
              <input
                id="area-range"
                type="range"
                min="50"
                max="1500"
                step="25"
                value={area}
                aria-label="تحديد المساحة التقريبية للسطح"
                aria-valuemin={50}
                aria-valuemax={1500}
                aria-valuenow={area}
                aria-valuetext={`${area} متر مربع`}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>50 م² (فيلا صغيرة)</span>
                <span>500 م² (مبنى متوسط)</span>
                <span>1500 م²+ (مجمع/مستودع)</span>
              </div>
            </div>

            {/* Quick Area Shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800">
              <span className="text-xs text-slate-400">مساحات شائعة:</span>
              {[150, 250, 400, 600, 1000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setArea(val)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    area === val ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {val} م²
                </button>
              ))}
            </div>

          </div>

          {/* Results Side */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm space-y-4">
            <div>
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-100 font-cairo text-sm sm:text-base">التقدير المالي المبدئي</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 font-bold">
                  شامل المواد والتنفيذ
                </span>
              </div>

              {/* Price */}
              <div className="my-4 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-center">
                <span className="text-[11px] text-slate-400 block mb-0.5">التكلفة التقديرية المبدئية</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-100 font-cairo">
                  {estimatedCost.toLocaleString("ar-EG")} <span className="text-xs font-normal text-slate-400">ريال</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">السعر النهائي يحدد بدقة بعد المعاينة الميدانية المجانية</span>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block">التوفير السنوي</span>
                  <span className="text-xs font-bold text-teal-300 font-cairo">
                    ~{annualSaving.toLocaleString("ar-EG")} ر.س/سنة
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block">الضمان المعتمد</span>
                  <span className="text-xs font-bold text-sky-300 font-cairo">
                    {selectedType.warranty}
                  </span>
                </div>
              </div>

              <ul className="space-y-1 text-[11px] text-slate-300">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                  <span>معاينة وفحص إلكتروني مجاني 100% داخل الرياض</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                  <span>شهادة ضمان معتمدة ومطابقة لكود البناء السعودي</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all font-cairo"
            >
              <span>احجز موعد المعاينة المجانية لسطحك</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}