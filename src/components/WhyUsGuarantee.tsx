"use client";
import React from "react";
import { ShieldCheck, Award, Eye, Clock, FileCheck2, Cpu, CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    icon: Eye,
    title: "أجهزة كشف إلكترونية ألمانية",
    desc: "تحديد مصدر تسريب المياه بدقة متناهية بدون تكسير للأرضيات أو الجدران لتوفير الوقت والمال."
  },
  {
    icon: ShieldCheck,
    title: "ضمان رسمي معتمد 15 سنة",
    desc: "وثيقة ضمان رسمية موثقة برقم السجل التجاري تغطي أعمال العزل والمواد المستخدمة."
  },
  {
    icon: FileCheck2,
    title: "تقارير معتمدة لشركة المياه والكهرباء",
    desc: "إصدار تقارير كشف التسربات الرسمية لتقديمها لشركة المياه لحل مشكلة ارتفاع الفواتير وإطلاق التيار."
  },
  {
    icon: Award,
    title: "مطابقة كود البناء السعودي SBC",
    desc: "تطبيق أنظمة العزل وفق المواصفات القياسية السعودية المعتمدة للمباني السكنية والتجارية."
  },
  {
    icon: Clock,
    title: "سرعة استجابة ومواعيد دقيقة",
    desc: "فريق فني مجهز متواجد بجميع أحياء الرياض للوصول للموقع في الموعد المحدد وتنفيذ العمل باحترافية."
  },
  {
    icon: Cpu,
    title: "فحص حراري بكاميرات FLIR",
    desc: "معاينة السطح قبل وبعد العزل بالأشعة تحت الحمراء للتأكد من القضاء التام على الجسور الحرارية والتسربات."
  },
];

export default function WhyUsGuarantee() {
  return (
    <section className="py-20 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-3">
            <Award className="w-4 h-4" />
            <span>معايير الجودة والاعتمادات</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            لماذا المعمورة هي <span className="text-teal-300">افضل شركة عزل في الرياض؟</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            نلتزم بأعلى معايير الأمانة الهندسية والجودة لنمنحك حماية تدوم لسنوات طويلة.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-slate-800 hover:border-teal-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-teal-500/25 text-teal-300 flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-100 font-cairo text-base mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] font-bold text-teal-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد ومطابق للمواصفات</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}