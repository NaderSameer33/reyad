import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import CategoryClientTabs from "@/components/CategoryClientTabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";
import { ShieldCheck, Award, Phone, ArrowLeft } from "lucide-react";

import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return { title: "الخدمة غير موجودة" };
  return {
    title: `${cat.name} بالرياض - شركة المعمورة الحديثة | معتمد 15 سنة`,
    description: `${cat.heroDesc} - شركة المعمورة الحديثة بالرياض. اتصل الآن: 0501884483`,
    keywords: `${cat.name}, ${cat.title}, عزل بالرياض, شركة المعمورة الحديثة, كشف تسربات بالرياض`,
    openGraph: {
      title: `${cat.name} بالرياض - شركة المعمورة الحديثة`,
      description: cat.heroDesc,
      images: [{ url: cat.heroImage }],
      locale: "ar_SA",
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/services/${cat.slug}`,
    },
  };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES[slug];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] font-tajawal antialiased overflow-x-hidden">
      <ParallaxBackground />
      <Navbar />

      {/* Hero Header */}
      <header className="relative pt-36 pb-16 px-4 z-10 bg-[#F1F5F9] border-b border-[#CBD5E1]">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
            <Link href="/" className="hover:text-[#2563A6] transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-[#2563A6] transition-colors">الخدمات</Link>
            <span>/</span>
            <span className="text-[#2563A6] font-bold">{category.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EEF3] border border-[#CBD5E1] text-[#2563A6] text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>{category.badge}</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-black text-[#1E293B] font-cairo leading-tight">
                {category.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl font-normal">
                {category.heroDesc}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center">
                  <span className="text-[11px] text-[#475569] block">الضمان المعتمد</span>
                  <span className="text-sm sm:text-base font-black text-[#2563A6] font-cairo">
                    {category.warrantyYears} سنة
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center">
                  <span className="text-[11px] text-[#475569] block">السعر التقديري</span>
                  <span className="text-sm sm:text-base font-black text-[#1E293B] font-cairo">
                    من {category.basePricePerM2} ر.س / م²
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#E8EEF3] border border-[#CBD5E1] text-center">
                  <span className="text-[11px] text-[#475569] block">المعاينة بالرياض</span>
                  <span className="text-sm sm:text-base font-black text-[#1D5D9B] font-cairo">
                    مجانية 100%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#quote-section"
                  className="px-6 py-3 rounded-xl bg-[#1D5D9B] hover:bg-[#164879] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors font-cairo"
                >
                  <span>طلب معاينة وعرض سعر</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>

                <a
                  href="tel:0501884483"
                  className="px-5 py-3 rounded-xl bg-[#E8EEF3] hover:bg-[#DCE5ED] text-[#1E293B] font-bold text-xs sm:text-sm border border-[#CBD5E1] shadow-sm transition-colors font-cairo"
                >
                  <Phone className="w-4 h-4 text-[#2563A6] inline ml-1.5" />
                  <span>اتصال: 0501884483</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-sm">
                <Image
                  src={category.heroImage}
                  alt={category.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Client Tabs */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <CategoryClientTabs category={category} />
      </main>

      <Footer />
    </div>
  );
}