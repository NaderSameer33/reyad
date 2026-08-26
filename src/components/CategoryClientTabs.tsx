"use client";
import React, { useState } from "react";
import { CategoryData } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { 
  Layers, FileText, CheckCircle2, MapPin, 
  ShieldCheck, Sparkles, ArrowLeft, ArrowUpRight, Award, Send
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CategoryClientTabs({ category }: { category: CategoryData }) {
  const [activeTab, setActiveTab] = useState<"gallery" | "articles" | "specs" | "steps" | "faq">("gallery");
  const [areaInput, setAreaInput] = useState(300);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const estimatedCost = Math.round(areaInput * category.basePricePerM2);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const tabs = [
    { id: "gallery",  label: `معرض المشاريع (${category.gallery.length})`, icon: Layers },
    { id: "articles", label: `المقالات والأدلة (${category.articles.length})`, icon: FileText },
    { id: "specs",    label: "المواصفات وكود SBC", icon: ShieldCheck },
    { id: "steps",    label: "خطوات التنفيذ", icon: CheckCircle2 },
    { id: "faq",      label: "الأسئلة الشائعة", icon: Sparkles },
  ] as const;

  return (
    <div className="space-y-10">
      
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#2563A6] text-white font-bold shadow-sm"
                  : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Gallery */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#CBD5E1]">
            <div>
              <h2 className="text-xl font-bold text-[#1E293B] font-cairo">
                أعمال ومشاريع {category.name} المنفذة في الرياض ({category.gallery.length} مشاريع)
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                اضغط على أي مشروع لعرض تقرير المعاينة وصور التنفيذ ودراسة الحالة الكاملة.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] font-bold">
              تغطية كامل أحياء الرياض
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.gallery.map((proj, idx) => (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className="bg-[#E8EEF3] border border-[#CBD5E1] hover:border-[#2563A6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9]/90 text-[#1E293B] text-[10px] font-bold border border-[#CBD5E1] backdrop-blur-sm">
                      مشروع #{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 left-2.5 flex justify-between items-end text-xs">
                    <span className="flex items-center gap-1 bg-[#F1F5F9]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-[#1E293B] border border-[#CBD5E1]">
                      <MapPin className="w-3 h-3 text-[#2563A6]" />
                      <span>{proj.district}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#2563A6] border border-[#CBD5E1] text-[10px] font-bold backdrop-blur-sm">
                      {proj.savings}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="font-bold text-[#1E293B] font-cairo text-sm group-hover:text-[#2563A6] transition-colors">
                    {proj.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#CBD5E1] text-center text-xs">
                    <div>
                      <span className="text-[#475569] block text-[10px]">المساحة</span>
                      <span className="font-bold text-[#1E293B] font-cairo">{proj.area}</span>
                    </div>
                    <div>
                      <span className="text-[#475569] block text-[10px]">المدة</span>
                      <span className="font-bold text-[#1E293B] font-cairo">{proj.duration}</span>
                    </div>
                    <div>
                      <span className="text-[#475569] block text-[10px]">الضمان</span>
                      <span className="font-bold text-[#2563A6] font-cairo">{proj.warranty}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-between items-center text-xs font-bold text-[#2563A6] font-cairo">
                    <span>عرض تفاصيل المشروع</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Articles */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-[#CBD5E1]">
            <h2 className="text-xl font-bold text-[#1E293B] font-cairo">
              الأدلة الفنية والمقالات المتخصصة في {category.name} ({category.articles.length} مقالات)
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              اضغط على أي مقال لقراءته في صفحة مستقلة مع الشرح الهندسي المفصل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.articles.map((art, idx) => (
              <Link
                key={art.id}
                href={`/articles/${art.slug}`}
                className="bg-[#E8EEF3] border border-[#CBD5E1] hover:border-[#2563A6] rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] text-[#475569]">
                    <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#1E293B] font-bold border border-[#CBD5E1]">
                      دليل #{idx + 1}
                    </span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-bold text-[#1E293B] font-cairo text-sm sm:text-base group-hover:text-[#2563A6] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 font-normal">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#CBD5E1] flex justify-between items-center text-xs font-bold text-[#2563A6] font-cairo">
                  <span>قراءة المقال كاملاً</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Specs */}
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#E8EEF3] border border-[#CBD5E1] rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-[#1E293B] font-cairo flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2563A6]" />
              المواصفات الفنية لـ {category.name}
            </h3>
            <div className="space-y-2.5">
              {category.specs.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#475569] font-medium">{s.label}</span>
                  <span className="font-bold text-[#1E293B] font-cairo">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E8EEF3] border border-[#CBD5E1] rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#1E293B] font-cairo flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563A6]" />
                الاعتمادات وكود البناء السعودي
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                جميع أعمال {category.name} المقدمة من شركة المعمورة الحديثة معتمدة ومطابقة لمتطلبات كود البناء السعودي (SBC 601 للعزل الحراري و SBC 602). نُصدر تقارير العزل الرسمية المعتمدة لتقديمها لشركة الكهرباء والمياه لإطلاق التيار وحل مشكلات الفواتير.
              </p>
              <ul className="space-y-1.5 text-xs text-[#1E293B]">
                <li className="flex items-center gap-2">✓ فحص إلكتروني حراري بكاميرات FLIR</li>
                <li className="flex items-center gap-2">✓ وثيقة ضمان رسمي موثق لمدة {category.warrantyYears} سنة</li>
                <li className="flex items-center gap-2">✓ شهادة مطابقة المواد للمواصفات القياسية السعودية SASO</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] text-xs text-[#2563A6]">
              💡 المعاينة وإصدار تقرير الفحص الميداني مجانيان لجميع مناطق الرياض.
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Steps */}
      {activeTab === "steps" && (
        <div className="bg-[#E8EEF3] border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-[#1E293B] font-cairo">
              مراحل وخطوات تنفيذ {category.name}
            </h3>
            <p className="text-xs text-[#475569] mt-1">
              منهجية هندسية صارمة تضمن أعلى درجات الدقة والعزل المتكامل دون أي أخطاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.steps.map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8EEF3] text-[#2563A6] border border-[#CBD5E1] flex items-center justify-center font-bold text-sm font-cairo">
                  {st.step}
                </div>
                <h4 className="font-bold text-[#1E293B] font-cairo text-sm">
                  {st.title}
                </h4>
                <p className="text-xs text-[#475569] leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: FAQs */}
      {activeTab === "faq" && (
        <div className="space-y-3 max-w-3xl mx-auto">
          {category.faqs.map((f, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-1.5 shadow-sm">
              <h4 className="font-bold text-[#1E293B] font-cairo text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2563A6] shrink-0" />
                <span>{f.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pr-6">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Instant Quote & Calculator */}
      <section id="quote-section" className="p-6 sm:p-8 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#2563A6] border border-[#CBD5E1] font-bold">
              حاسبة تكلفة {category.name}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] font-cairo">
              احسب تكلفة سطحك واحصل على فحص مجاني
            </h3>
            
            <div>
              <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                <span>المساحة التقريبية:</span>
                <span className="text-[#2563A6] font-cairo text-sm">{areaInput} م²</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={areaInput}
                onChange={(e) => setAreaInput(Number(e.target.value))}
                className="w-full h-2 bg-[#CBD5E1] rounded-lg appearance-none cursor-pointer accent-[#2563A6]"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] flex justify-between items-center">
              <div>
                <span className="text-xs text-[#475569] block">التكلفة المبدئية التقديرية</span>
                <span className="text-2xl font-black text-[#1E293B] font-cairo">
                  {estimatedCost.toLocaleString("ar-EG")} <span className="text-xs text-[#475569] font-normal">ريال</span>
                </span>
              </div>
              <div className="text-xs text-[#2563A6] font-bold bg-[#E8EEF3] border border-[#CBD5E1] px-2.5 py-1 rounded-lg">
                ضمان {category.warrantyYears} سنة
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F1F5F9] p-5 sm:p-6 rounded-2xl border border-[#CBD5E1]">
            {formSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#2563A6] mx-auto" />
                <h4 className="text-base font-bold text-[#1E293B] font-cairo">تم استلام طلبك بنجاح!</h4>
                <p className="text-xs text-[#475569]">سيتواصل معك مهندس {category.name} لتحديد موعد المعاينة المجانية فوراً.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <h4 className="font-bold text-[#1E293B] font-cairo text-sm">حجز موعد معاينة مجانية لـ {category.name}</h4>
                
                <input
                  type="text"
                  required
                  placeholder="الاسم الكريم *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-[#1E293B] text-xs sm:text-sm focus:border-[#2563A6] outline-none"
                />

                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="رقم الجوال (05XXXXXXXX) *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-[#1E293B] text-xs sm:text-sm text-right focus:border-[#2563A6] outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1D5D9B] hover:bg-[#164879] text-white font-bold text-xs sm:text-sm font-cairo shadow-sm transition-colors cursor-pointer"
                >
                  تأكيد حجز المعاينة المجانية
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}