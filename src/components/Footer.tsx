import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] border-t border-[#334155] text-[#94A3B8] text-xs pt-14 pb-10 px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#2563A6] text-white flex items-center justify-center font-black text-sm">
              م
            </span>
            <span className="text-base font-black text-white font-cairo">شركة المعمورة الحديثة</span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            الشركة المعتمدة لكشف تسربات المياه بدون تكسير والعزل الشامل للأسطح والخزانات في مدينة الرياض بخبرة تتجاوز 15 عاماً وضمان رسمي موثق.
          </p>
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <span>سجل تجاري وترخيص معتمد</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold font-cairo text-sm">أقسام الخدمات</h4>
          <ul className="space-y-1.5 text-[#94A3B8]">
            <li><Link href="/services/leak-detection" className="hover:text-[#38BDF8] transition-colors">كشف تسربات المياه بالرياض</Link></li>
            <li><Link href="/services/foam" className="hover:text-[#38BDF8] transition-colors">عزل فوم بولي يوريثان معتمد</Link></li>
            <li><Link href="/services/waterproofing" className="hover:text-[#38BDF8] transition-colors">العزل المائي للأسطح والخزانات</Link></li>
            <li><Link href="/services/tanks" className="hover:text-[#38BDF8] transition-colors">عزل وتنظيف خزانات المياه</Link></li>
            <li><Link href="/services/thermal" className="hover:text-[#38BDF8] transition-colors">العزل الحراري وتوفير الطاقة</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold font-cairo text-sm">أحياء التغطية بالرياض</h4>
          <p className="text-[11px] text-[#94A3B8]">
            نصلك أينما كنت في كافة أحياء ومحافظات الرياض:
          </p>
          <div className="flex flex-wrap gap-1 text-[10px]">
            {["الملقا", "النرجس", "الياسمين", "الصحافة", "حطين", "العقيق", "الغدير", "الربيع", "قرطبة", "اليرموك", "المونسية"].map((d) => (
              <span key={d} className="px-2 py-0.5 rounded bg-[#334155] text-slate-200 border border-[#475569]">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Col 4 */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold font-cairo text-sm">الاتصال المباشر</h4>
          <div className="space-y-2 text-slate-300 text-xs">
            <a href="tel:0501884483" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span dir="ltr" className="font-bold">0501884483</span>
            </a>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>info@reyad-sa.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>طريق الملك فهد، حي الصحافة، الرياض</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#64748B] text-[11px]">
        <p>© {new Date().getFullYear()} شركة المعمورة الحديثة لحلول العزل وكشف التسربات. جميع الحقوق محفوظة.</p>
        <p className="flex items-center gap-1.5">
          <span>متوافق مع كود البناء السعودي SBC</span>
          <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
        </p>
      </div>
    </footer>
  );
}