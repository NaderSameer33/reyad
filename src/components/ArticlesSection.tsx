import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function ArticlesSection() {
  const featuredArticles = [
    CATEGORIES["leak-detection"]?.articles[0],
    CATEGORIES.foam?.articles[0],
    CATEGORIES.waterproofing?.articles[0],
  ].filter(Boolean);

  return (
    <section id="articles" className="py-20 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-3">
            <BookOpen className="w-4 h-4" />
            <span>مركز المعرفة والأدلة الفنية</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            أدلة وإرشادات <span className="text-teal-300">كشف التسربات والعزل</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            محتوى هندسي موثق لمساعدتك في اتخاذ القرار الصحيح وحماية عقارك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredArticles.map((art) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="bg-slate-900/75 backdrop-blur-md border border-slate-800 hover:border-teal-500/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-200 text-[10px] font-bold border border-slate-700 backdrop-blur-sm">
                  {art.category}
                </span>
                <span className="absolute bottom-2.5 left-2.5 text-[10px] bg-slate-950/90 px-2 py-0.5 rounded text-slate-300">
                  {art.readTime}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">{art.date}</span>
                  <h3 className="font-bold text-slate-100 font-cairo text-sm group-hover:text-teal-300 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 font-normal">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-800 flex justify-between items-center text-xs font-bold text-teal-400 font-cairo">
                  <span>قراءة المقال كاملاً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/articles" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors font-cairo"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>عرض مكتبة المقالات الكاملة (60+ مقالاً)</span>
          </Link>
        </div>

      </div>
    </section>
  );
}