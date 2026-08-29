"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShieldCheck, Droplets, Sun, VolumeX, Search } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const SERVICES = [
  {
    slug: "leak-detection", title: "كشف تسربات المياه إلكترونياً",
    desc: "فحص وتحديد أماكن التسربات بدقة سنتيمترية بأجهزة الذبذبات الصوتية والكاميرات الحرارية بدون أي تكسير عشوائي مع تقرير معتمد لشركة المياه.",
    feats: ["بدون تكسير نهائياً بالأجهزة الألمانية", "تقرير رسمي معتمد لتخفيض فاتورة المياه", "معاينة فورية وضمان على الإصلاح"],
    warranty: "10 سنوات",
    badge: "الأكثر طلباً",
    icon: Search
  },
  {
    slug: "foam", title: "عزل فوم بولي يوريثان",
    desc: "عزل مائي وحراري مزدوج في طبقة واحدة متجانسة بدون فواصل، معتمد ومطابق لاشتراطات كود البناء السعودي وشركة الكهرباء.",
    feats: ["عزل مائي وحراري بنسبة 100%", "توفير يصل إلى 45% من فاتورة التكييف", "ضمان رسمي موثق لمدة 15 سنة"],
    warranty: "15 سنة",
    badge: "معتمد للكهرباء",
    icon: ShieldCheck
  },
  {
    slug: "waterproofing", title: "العزل المائي للأسطح",
    desc: "حماية تامة من مياه الأمطار والرطوبة باستخدام أغشية البيتومين والبولي يوريا للأسطح المبلطة والخرسانية مع اختبار غمر مائي 48 ساعة.",
    feats: ["أغشية بيتومين SBS وبولي يوريا متطورة", "عزل فوق البلاط القديم دون تكسير", "اختبار مائي معتمد قبل التسليم"],
    warranty: "10 سنوات",
    badge: "صفر تسربات",
    icon: Droplets
  },
  {
    slug: "tanks", title: "عزل وتنظيف خزانات المياه",
    desc: "عزل وتطهير خزانات مياه الشرب الأرضية والعلوية بمواد إيبوكسية صحية غير سامة ومعتمدة لمنع تلوث وتسرب المياه.",
    feats: ["مواد إيبوكسي صحية معتمدة 100%", "تنظيف وتعقيم شامل للخزان", "معالجة شروخ وتصدعات الخرسانة"],
    warranty: "10 سنوات",
    badge: "صحي وآمن",
    icon: Droplets
  },
  {
    slug: "thermal", title: "العزل الحراري وتوفير الطاقة",
    desc: "ألواح البوليسترين المبثوق (XPS) والصوف الصخري لحجب حرارة الصيف القاسية وخفض استهلاك المكيفات وفق كود SBC 601.",
    feats: ["مطابق لمواصفات شركة الكهرباء", "حجب 90% من الإشعاع الشمسي", "عمر افتراضي يتجاوز 25 سنة"],
    warranty: "15 سنة",
    badge: "توفير الطاقة",
    icon: Sun
  },
  {
    slug: "soundproofing", title: "العزل الصوتي للغرف والمباني",
    desc: "حلول امتصاص وتخفيض الضوضاء والاهتزازات للفلل والمكاتب وقاعات الاجتماعات لضمان هدوء تام وخصوصية مطلقة.",
    feats: ["تخفيض الضوضاء الخارجية بنسبة 85%", "ألواح صوف صخري ممتصة للصوت", "مناسب للأسقف والجدران والأبواب"],
    warranty: "10 سنوات",
    badge: "هدوء وخصوصية",
    icon: VolumeX
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-14 px-4 z-10 relative bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-2">
            خدمات متخصصة ومعتمدة
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 font-cairo">
            خدمات <span className="text-teal-300">عزل اسطح متكاملة في الرياض</span> (فوم، مائي، حراري)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2 font-normal">
            حلول هندسية متكاملة بأحدث الأجهزة والتقنيات لحماية المباني وضمان راحة البال.
          </p>
        </motion.div>

        {/* Animated Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <TiltCard key={svc.slug} maxTilt={6} scale={1.015} className="h-full">
                <div className="bg-slate-900/75 backdrop-blur-md border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-teal-500/25 text-teal-300 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors duration-200 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                        ضمان {svc.warranty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 font-cairo mb-1.5 group-hover:text-teal-300 transition-colors">
                      {svc.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-3 font-normal">
                      {svc.desc}
                    </p>

                    <ul className="space-y-1 mb-4 pt-2.5 border-t border-slate-800">
                      {svc.feats.map((f, i) => (
                        <li key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="w-full py-2 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-teal-300 font-bold text-xs flex items-center justify-between border border-slate-700 transition-colors font-cairo"
                    >
                      <span>تفاصيل الخدمة والمشاريع</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}