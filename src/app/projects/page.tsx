import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, ProjectItem } from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { Building, MapPin, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "معرض سابقة الأعمال والمشاريع المنفذة بالرياض | شركة المعمورة الحديثة",
  description: "استعراض أكثر من 60 مشروعاً موثقاً لأعمال كشف تسربات المياه وعزل الفوم والعزل المائي والحراري في مختلف أحياء مدينة الرياض.",
};

export default function ProjectsHubPage() {
  const allProjects: ProjectItem[] = Object.values(CATEGORIES).flatMap((cat) => cat.gallery);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] font-tajawal antialiased overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />

      {/* Header */}
      <header className="pt-36 pb-14 px-4 relative z-10 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] text-xs font-bold">
            <Building className="w-4 h-4" />
            <span>توثيق ميداني معتمد</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-cairo">
            سابقة الأعمال والمشاريع <span className="text-[#2563A6]">المنفذة في أحياء الرياض</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto font-normal">
            استعرض {allProjects.length} مشروعاً موثقاً يوضح المشكلة، الحل الهندسي، نتائج الفحص الحراري، ونسبة التوفير المحققة.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((proj, idx) => (
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
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#F1F5F9]/90 text-[#1E293B] text-[10px] font-bold border border-[#CBD5E1] backdrop-blur-sm">
                  {proj.categoryName}
                </span>
                <div className="absolute bottom-2.5 right-2.5 left-2.5 flex justify-between items-end">
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
                <h3 className="font-bold text-[#1E293B] font-cairo text-sm sm:text-base group-hover:text-[#2563A6] transition-colors line-clamp-2">
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
                  <span>عرض دراسة الحالة والتفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}