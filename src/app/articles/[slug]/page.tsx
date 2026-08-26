import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, Article } from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { Clock, Calendar, CheckCircle2, Phone, MessageCircle, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const allArticles: Article[] = Object.values(CATEGORIES).flatMap((cat) => cat.articles);
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allArticles: Article[] = Object.values(CATEGORIES).flatMap((cat) => cat.articles);
  const article = allArticles.find((a) => a.slug === slug);
  if (!article) return { title: "المقال غير موجود" };
  return {
    title: `${article.title} | شركة المعمورة الحديثة للعزل وكشف التسربات`,
    description: article.excerpt,
  };
}

export default async function ArticleReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allArticles: Article[] = Object.values(CATEGORIES).flatMap((cat) => cat.articles);
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.slug !== article.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `مرحباً شركة المعمورة الحديثة، قرأت مقال "${article.title}" وأرغب في استشارة هندسية حول عزل منزلي.`
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] font-tajawal antialiased overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />

      {/* Header */}
      <header className="pt-36 pb-14 px-4 relative z-10 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-4xl mx-auto space-y-4">
          
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <Link href="/" className="hover:text-[#2563A6] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-[#2563A6] transition-colors">المقالات</Link>
            <span>/</span>
            <Link href={`/services/${article.categorySlug}`} className="hover:text-[#2563A6] transition-colors">{article.category}</Link>
            <span>/</span>
            <span className="text-[#2563A6] font-bold truncate max-w-xs">{article.title}</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] font-bold">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[#475569]">
                <Calendar className="w-3.5 h-3.5 text-[#2563A6]" />
                <span>{article.date}</span>
              </span>
              <span className="flex items-center gap-1 text-[#475569]">
                <Clock className="w-3.5 h-3.5 text-[#2563A6]" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#1E293B] font-cairo leading-tight">
              {article.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl font-normal">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <div className="w-8 h-8 rounded-full bg-[#2563A6] text-white flex items-center justify-center font-bold text-xs">
                م
              </div>
              <div className="text-xs">
                <span className="font-bold text-[#1E293B] block">إشراف: الفريق الهندسي لشركة المعمورة الحديثة</span>
                <span className="text-[#475569]">مهندسو كشف التسربات والعزل المعتمدون بالرياض</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10 space-y-8">
        
        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-sm">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Key Takeaways */}
        <div className="p-6 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-2">
          <h3 className="text-sm font-bold text-[#1E293B] font-cairo flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#2563A6]" />
            أبرز النقاط المستفادة من هذا الدليل:
          </h3>
          <ul className="space-y-1 text-xs text-[#475569]">
            <li className="flex items-center gap-2">✓ أهمية اختيار المواد المعتمدة والمطابقة لكود البناء السعودي SBC.</li>
            <li className="flex items-center gap-2">✓ كيف يضمن العزل الصحيح حماية خرسانة المبنى وتوفير 40%+ من فواتير الكهرباء.</li>
            <li className="flex items-center gap-2">✓ ضرورة الفحص بكاميرات FLIR الحرارية واختبار الغمر المائي لمدة 48 ساعة.</li>
          </ul>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx} className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] leading-loose text-[#1E293B]">
              {p}
            </p>
          ))}

          {article.subheadings && article.subheadings.map((sub, idx) => (
            <div key={idx} className="space-y-2 pt-2">
              <h2 className="text-base sm:text-lg font-bold text-[#1E293B] font-cairo flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#2563A6] inline-block" />
                {sub.title}
              </h2>
              <p className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-[#475569] leading-loose">
                {sub.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Consultation Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-base font-bold text-[#1E293B] font-cairo">
              هل تحتاج معاينة وفحصاً إلكترونياً لسطحك؟
            </h3>
            <p className="text-xs text-[#475569]">
              مهندسونا متاحون لزيارة موقعك في الرياض وتقديم تقرير هندسي مجاني.
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="tel:0501884483"
              className="px-5 py-2.5 rounded-xl bg-[#1D5D9B] hover:bg-[#164879] text-white font-bold text-xs flex items-center gap-1.5 font-cairo transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>طلب معاينة مجانية</span>
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-[#CBD5E1]">
            <h3 className="text-base font-bold text-[#1E293B] font-cairo">
              أدلة ومقالات أخرى في {article.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="bg-[#E8EEF3] border border-[#CBD5E1] hover:border-[#2563A6] rounded-xl overflow-hidden group transition-all flex flex-col justify-between shadow-sm p-4 space-y-2"
                >
                  <span className="text-[10px] text-[#475569] block">{rel.readTime}</span>
                  <h4 className="font-bold text-xs text-[#1E293B] group-hover:text-[#2563A6] transition-colors font-cairo line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-[#2563A6] font-bold block pt-2 border-t border-[#CBD5E1]">
                    قراءة المقال ←
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}