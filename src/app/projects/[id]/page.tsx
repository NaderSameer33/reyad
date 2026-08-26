import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CATEGORIES, ProjectItem } from "@/data/categories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import ProtectedImage from "@/components/ProtectedImage";
import { MapPin, CheckCircle2, ArrowLeft, Award, MessageCircle, AlertTriangle, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const allProjects: ProjectItem[] = Object.values(CATEGORIES).flatMap((cat) => cat.gallery);
  return allProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const allProjects: ProjectItem[] = Object.values(CATEGORIES).flatMap((cat) => cat.gallery);
  const proj = allProjects.find((p) => p.id === id);
  if (!proj) return { title: "المشروع غير موجود" };
  return {
    title: `${proj.title} | مشاريع شركة المعمورة الحديثة للعزل بالرياض`,
    description: `${proj.summary} - شركة المعمورة الحديثة للعزل والمقاولات بالرياض. ضمان ${proj.warranty}. اتصل الآن: 0501884483`,
    keywords: `${proj.categoryName}, ${proj.district}, عزل الرياض, شركة المعمورة الحديثة, ${proj.title}`,
    openGraph: {
      title: proj.title,
      description: proj.summary,
      images: [{ url: proj.image }],
      locale: "ar_SA",
      type: "article",
    },
    robots: { index: true, follow: true },
    alternates: { canonical: `https://reyad-iso.com/projects/${proj.id}` },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allProjects: ProjectItem[] = Object.values(CATEGORIES).flatMap((cat) => cat.gallery);
  const proj = allProjects.find((p) => p.id === id);

  if (!proj) {
    notFound();
  }

  const relatedProjects = (CATEGORIES[proj.categorySlug]?.gallery || [])
    .filter((p) => p.id !== proj.id)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `مرحباً شركة المعمورة الحديثة، أستفسر عن تنفيذ مشروع مشابه لـ "${proj.title}" في ${proj.district}.`
  );

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": proj.title,
    "description": proj.summary,
    "provider": {
      "@type": "LocalBusiness",
      "name": "شركة المعمورة الحديثة للعزل والمقاولات",
      "telephone": "+966501884483",
      "address": { "@type": "PostalAddress", "addressLocality": "الرياض", "addressCountry": "SA" }
    },
    "areaServed": proj.district,
    "serviceOutput": proj.result,
    "offers": { "@type": "Offer", "warranty": proj.warranty }
  };

  return (
    <>
    <Script
      id={`jsonld-${proj.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] font-tajawal antialiased overflow-x-hidden"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <ParallaxBackground />
      <Navbar />

      {/* Header */}
      <header className="pt-36 pb-14 px-4 relative z-10 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-5xl mx-auto space-y-4">
          
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <Link href="/" className="hover:text-[#2563A6] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-[#2563A6] transition-colors">المشاريع</Link>
            <span>/</span>
            <Link href={`/services/${proj.categorySlug}`} className="hover:text-[#2563A6] transition-colors">{proj.categoryName}</Link>
            <span>/</span>
            <span className="text-[#2563A6] font-bold truncate max-w-xs">{proj.title}</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] font-bold">
                {proj.categoryName}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E8EEF3] text-[#1E293B] font-medium flex items-center gap-1 border border-[#CBD5E1]">
                <MapPin className="w-3.5 h-3.5 text-[#2563A6]" />
                <span>{proj.district}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] font-bold">
                {proj.savings}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#1E293B] font-cairo leading-tight">
              {proj.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#475569] max-w-3xl leading-relaxed font-normal">
              {proj.summary}
            </p>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10 space-y-10">
        
        {/* Large Featured Project Image - Protected */}
        <div
          className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-sm"
        >
          <ProtectedImage
            src={proj.image}
            alt={proj.title}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent z-[5]" />
          
          <div className="absolute bottom-4 right-4 left-4 flex flex-wrap justify-between items-end gap-3">
            <div className="p-3 rounded-xl bg-[#F1F5F9]/95 backdrop-blur-sm border border-[#CBD5E1] text-xs">
              <span className="text-[#475569] block text-[10px]">نوع العميل</span>
              <span className="text-xs font-bold text-[#1E293B] font-cairo">{proj.clientType}</span>
            </div>

            <a
              href={`https://wa.me/966501884483?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#1D5D9B] hover:bg-[#164879] text-white font-bold text-xs flex items-center gap-2 font-cairo shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب تنفيذ مشابه عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Specs Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center shadow-sm">
            <span className="text-xs text-[#475569] block mb-1">المساحة المعزولة</span>
            <span className="text-lg font-black text-[#1E293B] font-cairo">{proj.area}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center shadow-sm">
            <span className="text-xs text-[#475569] block mb-1">مدة التنفيذ</span>
            <span className="text-lg font-black text-[#1E293B] font-cairo">{proj.duration}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center shadow-sm">
            <span className="text-xs text-[#475569] block mb-1">الضمان المعتمد</span>
            <span className="text-lg font-black text-[#2563A6] font-cairo">{proj.warranty}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center shadow-sm">
            <span className="text-xs text-[#475569] block mb-1">النتيجة المحققة</span>
            <span className="text-lg font-black text-[#1D5D9B] font-cairo">{proj.savings}</span>
          </div>
        </div>

        {/* Case Study 3 Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#2563A6] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1E293B] font-cairo">المشكلة والتحدي</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {proj.challenge}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#2563A6] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1E293B] font-cairo">الحل الهندسي المنفذ</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {proj.solution}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-2.5 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] text-[#2563A6] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1E293B] font-cairo">النتيجة والضمان</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {proj.result}
            </p>
          </div>

        </div>

        {/* Steps Taken */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#E8EEF3] border border-[#CBD5E1] space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] font-cairo flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2563A6]" />
            خطوات التنفيذ الهندسية لهذا المشروع
          </h3>

          <div className="space-y-2.5">
            {proj.stepsTaken.map((stepText, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1]">
                <span className="w-5 h-5 rounded-full bg-[#E8EEF3] text-[#2563A6] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                  {stepText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-[#CBD5E1]">
            <h3 className="text-lg font-bold text-[#1E293B] font-cairo">
              مشاريع أخرى مشابهة في {proj.categoryName}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.id}`}
                  className="bg-[#E8EEF3] border border-[#CBD5E1] hover:border-[#2563A6] rounded-xl overflow-hidden group transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ProtectedImage src={rel.image} alt={rel.title} />
                    <span className="absolute bottom-2 right-2 text-[10px] bg-[#F1F5F9]/90 px-2 py-0.5 rounded text-[#1E293B] border border-[#CBD5E1]">
                      {rel.district}
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-[#1E293B] group-hover:text-[#2563A6] transition-colors font-cairo line-clamp-2">
                      {rel.title}
                    </h4>
                    <div className="flex justify-between text-[11px] text-[#475569] pt-1.5 border-t border-[#CBD5E1]">
                      <span>{rel.area}</span>
                      <span className="text-[#2563A6] font-bold">{rel.warranty}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
    </>
  );
}