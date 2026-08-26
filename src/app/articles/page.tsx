import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, Article } from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { BookOpen, Clock, Calendar, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "مكتبة المقالات والأدلة الفنية لكشف التسربات والعزل | شركة النبلاء",
  description: "أكبر مكتبة معرفية متخصصة في كشف تسربات المياه، أسعار عزل الأسطح، اشتراطات كود البناء السعودي، وطرق توفير الطاقة في الرياض.",
};

export default function ArticlesHubPage() {
  const allArticles: Article[] = Object.values(CATEGORIES).flatMap((cat) => cat.articles);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] font-tajawal antialiased overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />

      {/* Header */}
      <header className="pt-36 pb-14 px-4 relative z-10 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>مركز المعرفة الهندسية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-cairo">
            مكتبة المقالات <span className="text-[#2563A6]">والأدلة الفنية المتخصصة</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto font-normal">
            تصفح {allArticles.length} دليلاً هندسياً شاملاً حول كشف التسربات، أسعار العزل، واشتراطات كود البناء السعودي SBC.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((art, idx) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="bg-[#E8EEF3] border border-[#CBD5E1] hover:border-[#2563A6] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#F1F5F9]/90 text-[#1E293B] text-[10px] font-bold border border-[#CBD5E1] backdrop-blur-sm">
                  {art.category}
                </span>
                <span className="absolute bottom-2.5 left-2.5 text-[10px] bg-[#1E293B]/90 px-2 py-0.5 rounded text-white">
                  {art.readTime}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-[#475569] block mb-1">{art.date}</span>
                  <h3 className="font-bold text-[#1E293B] font-cairo text-sm sm:text-base group-hover:text-[#2563A6] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#475569] line-clamp-2 mt-1.5 font-normal">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#CBD5E1] flex justify-between items-center text-xs font-bold text-[#2563A6] font-cairo">
                  <span>قراءة المقال كاملاً</span>
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