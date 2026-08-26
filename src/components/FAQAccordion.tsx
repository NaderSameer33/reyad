"use client";
import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "كيف يتم كشف تسربات المياه بدون تكسير؟",
    a: "نستخدم أحدث الأجهزة الألمانية المعتمدة التي تعتمد على الذبذبات الصوتية والكاميرات الحرارية لتحديد موقع التسريب الدقيق تحت البلاط أو خلف الجدران بنسبة خطأ صفر وبدون أي تكسير عشوائي."
  },
  {
    q: "هل التقرير الفني الصادر منكم معتمد لدى شركة المياه الوطنية؟",
    a: "نعم، نصدر تقارير كشف تسربات رسمية ومعتمدة ومختومة برقم السجل التجاري لتقديمها لشركة المياه لحل مشكلة ارتفاع الفواتير وإثبات إصلاح التسريب."
  },
  {
    q: "ما هو أفضل نوع عزل لأسطح المنازل في الرياض؟",
    a: "عزل الفوم البولي يوريثان يُعد الخيار الأفضل لأنه يجمع بين العزل الحراري والعزل المائي في طبقة واحدة متجانسة بدون فواصل، ومطابق لكود البناء السعودي SBC."
  },
  {
    q: "كم مدة الضمان المقدمة على أعمال العزل؟",
    a: "نقدم وثيقة ضمان رسمية وموثقة تصل إلى 15 سنة على عزل الفوم، و 10 سنوات على العزل المائي وعزل الخزانات مع زيارات فحص دورية مجانية."
  },
  {
    q: "هل المعاينة والفحص الميداني مجانيان في الرياض؟",
    a: "نعم، نوفر خدمة المعاينة الميدانية وفحص السطح والخزان مجاناً 100% داخل جميع أحياء مدينة الرياض بدون أي التزام مالي."
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>الأسئلة الشائعة</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 font-cairo">
            إجابات واضحة <span className="text-teal-300">عن كل ما يخص الكشف والعزل</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1.5">
            كل ما تود معرفته عن خطوات العمل، الأسعار، الضمانات، وتقارير شركة المياه.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen ? "bg-slate-800/80 border-teal-500/40" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-slate-100 font-cairo text-xs sm:text-sm cursor-pointer"
                >
                  <span className="flex-1">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-teal-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}