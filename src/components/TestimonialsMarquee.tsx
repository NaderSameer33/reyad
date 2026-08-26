"use client";
import React from "react";
import { Star, MessageSquareQuote, BadgeCheck, MapPin } from "lucide-react";

const REVIEWS = [
  {
    name: "م. فهد القحطاني",
    role: "مالك فيلا سكنية",
    district: "حي النرجس، الرياض",
    rating: 5,
    text: "فريق محترف ومواعيد دقيقة. تم كشف تسريب مياه الخزان بالأجهزة الإلكترونية بدون أي تكسير، وعزل السطح بالفوم خفض فاتورة الكهرباء بشكل ملموس.",
    service: "كشف تسربات وعزل فوم"
  },
  {
    name: "أ. عبدالعزيز الشمري",
    role: "مطور عقاري",
    district: "حي الملقا، الرياض",
    rating: 5,
    text: "تعاملت مع شركة النبلاء في عزل 4 مباني سكنية. جودة المواد ومطابقة كود البناء السعودي واستلام شهادة الضمان فوراً أعطانا ثقة كاملة في الاستمرار معهم.",
    service: "عزل مائي وحراري"
  },
  {
    name: "د. خالد السبيعي",
    role: "مالك عمارة تجارية",
    district: "حي الصحافة، الرياض",
    rating: 5,
    text: "كانت لدينا مشكلة تسريب مياه مزمنة مع الأمطار أتلفت جبس المحلات، بعد تدخل مهندسي النبلاء تم معالجة السطح بالعزل المائي وانتهت المشكلة نهائياً.",
    service: "معالجة تسربات الأسطح"
  },
  {
    name: "أ. تركي الدوسري",
    role: "مالك منزل",
    district: "حي الياسمين، الرياض",
    rating: 5,
    text: "عزل الخزان الأرضي والسطح تم بمواد إيبوكسية ممتازة وبدون أي روائح، وتعامل المهندسين كان قمة في الأمانة والاحترام.",
    service: "عزل وتنظيف خزانات"
  },
];

export default function TestimonialsMarquee() {
  return (
    <section className="py-14 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-2">
            <MessageSquareQuote className="w-4 h-4" />
            <span>آراء العملاء في الرياض</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 font-cairo">
            ثقة أكثر من <span className="text-teal-300">3,000 عميل في الرياض</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1.5">
            تقييم 4.9/5 وتجارب موثقة من أصحاب الفلل والمطورين العقاريين.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-slate-900/75 backdrop-blur-md border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm space-y-3"
            >
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <div className="flex gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                    ))}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 font-bold border border-slate-700">
                    {rev.service}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-100 font-cairo text-xs">
                    <span>{rev.name}</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <span className="text-slate-400 text-[10px]">{rev.role}</span>
                </div>

                <div className="flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-[10px]">
                  <MapPin className="w-3 h-3 text-teal-400" />
                  <span>{rev.district}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}