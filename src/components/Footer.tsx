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
        <div className="space-y-3">
          <h4 className="text-white font-bold font-cairo text-sm">الاتصال والتواصل</h4>
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

          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-400 block mb-2 font-cairo">تابعنا على منصات التواصل:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://x.com/detectleaks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-colors"
                title="حسابنا على منصة X (تويتر)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.snapchat.com/@embratwr2?share_id=9J31apJKld0&locle=ar-SA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-amber-300 border border-slate-700 hover:border-amber-500/40 flex items-center justify-center transition-colors"
                title="حسابنا على سناب شات"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-3.37 0-5.74 2.45-5.83 5.48-.03.95.27 1.87.5 2.76.12.45.2.9.06 1.34-.14.44-.54.76-.98.88-1.04.28-1.57.87-1.53 1.7.04.7.53 1.25 1.26 1.41.6.13.9.4.95.96.06.63-.3 1.13-.8 1.48-.7.49-1.46.91-2.02 1.58-.52.62-.64 1.33-.31 2.01.32.66 1.05.9 1.77.72.63-.16 1.27-.3 1.9-.45 1.08-.25 2.14.07 3.06.66 1.28.82 2.71 1.25 4.25 1.24 1.54-.01 2.97-.44 4.25-1.26.92-.59 1.98-.91 3.06-.66.63.15 1.27.29 1.9.45.72.18 1.45-.06 1.77-.72.33-.68.21-1.39-.31-2.01-.56-.67-1.32-1.09-2.02-1.58-.5-.35-.86-.85-.8-1.48.05-.56.35-.83.95-.96.73-.16 1.22-.71 1.26-1.41.04-.83-.49-1.42-1.53-1.7-.44-.12-.84-.44-.98-.88-.14-.44-.06-.89.06-1.34.23-.89.53-1.81.5-2.76C20.31 4.45 17.94 2 14.57 2h-2.53z" />
                </svg>
              </a>
              <a
                href="https://wa.me/966501884483"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-emerald-400 border border-slate-700 hover:border-emerald-500/40 flex items-center justify-center transition-colors"
                title="محادثة واتساب"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
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