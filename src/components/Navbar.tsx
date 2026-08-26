"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ChevronDown, Droplets, ShieldCheck, Sun, Search, VolumeX, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceLinks = [
    { href: "/services/leak-detection", label: "كشف تسربات المياه إلكترونياً", icon: Search },
    { href: "/services/foam", label: "عزل فوم بولي يوريثان", icon: ShieldCheck },
    { href: "/services/waterproofing", label: "العزل المائي للأسطح", icon: Droplets },
    { href: "/services/tanks", label: "عزل وتنظيف الخزانات", icon: Droplets },
    { href: "/services/thermal", label: "العزل الحراري وتوفير الطاقة", icon: Sun },
    { href: "/services/soundproofing", label: "العزل الصوتي للمباني", icon: VolumeX },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20" 
        : "bg-slate-900/70 backdrop-blur-sm border-b border-slate-800/60"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-teal-500/30 text-teal-300 flex items-center justify-center font-black text-lg shadow-sm">
              م
            </div>
            <div>
              <span className="text-xl font-black text-slate-100 font-cairo block leading-tight">شركة المعمورة الحديثة</span>
              <span className="text-[10px] text-teal-300 font-bold block">كشف التسربات والعزل الشامل بالرياض</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-300 font-cairo">
            <Link href="/" className="hover:text-teal-300 transition-colors">الرئيسية</Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 hover:text-teal-300 transition-colors py-2 cursor-pointer font-bold"
              >
                <span>خدمات العزل والكشف</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {servicesOpen && (
                <div className="absolute top-full right-0 w-64 p-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-800 space-y-1">
                  {serviceLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-teal-300 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{s.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link href="/projects" className="hover:text-teal-300 transition-colors">سابقة الأعمال</Link>
            <Link href="/#videos" className="hover:text-teal-300 transition-colors flex items-center gap-1.5 text-teal-300 font-black">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
              <span>فيديوهات التنفيذ</span>
            </Link>
            <Link href="/articles" className="hover:text-teal-300 transition-colors">مكتبة المقالات</Link>
            <Link href="/#calculator" className="hover:text-teal-300 transition-colors">حاسبة التكلفة</Link>
            <Link href="/#faq" className="hover:text-teal-300 transition-colors">الأسئلة الشائعة</Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:0501884483"
              className="flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-700/80 transition-colors font-cairo"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span dir="ltr">0501884483</span>
            </a>

            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:border-teal-500/60 font-bold text-xs font-cairo shadow-sm transition-all"
            >
              طلب معاينة مجانية
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 px-4 py-4 space-y-3">
          <Link 
            href="/" 
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-slate-200 py-1.5 border-b border-slate-800"
          >
            الرئيسية
          </Link>
          
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-teal-300 block">أقسام الخدمات:</span>
            {serviceLinks.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-medium text-slate-300 py-1 pr-2 hover:text-teal-300"
              >
                • {s.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5">
            <Link 
              href="/#videos" 
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-xs font-black text-teal-300 py-1"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              <span>فيديوهات التنفيذ الميدانية</span>
            </Link>
            <Link 
              href="/projects" 
              onClick={() => setMobileOpen(false)}
              className="block text-xs font-bold text-slate-200"
            >
              سابقة الأعمال (78+ مشروع)
            </Link>
            <Link 
              href="/articles" 
              onClick={() => setMobileOpen(false)}
              className="block text-xs font-bold text-slate-200"
            >
              مكتبة المقالات الهندسية
            </Link>
            <a
              href="tel:0501884483"
              className="w-full text-center py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-md transition-all font-cairo mt-1"
            >
              اتصال مباشر: 0501884483
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}