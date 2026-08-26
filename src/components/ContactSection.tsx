"use client";
import React, { useState } from "react";
import { Phone, MapPin, Send, MessageCircle, Clock, Loader2 } from "lucide-react";

const RIYADH_DISTRICTS = [
  "الملقا", "النرجس", "الياسمين", "الصحافة", "حطين", "العقيق", "الغدير", "الربيع",
  "قرطبة", "اليرموك", "المونسية", "الرمال", "الشفا", "السويدي", "حي آخر بالرياض"
];

const SERVICE_OPTIONS = [
  "كشف تسربات المياه إلكترونياً",
  "عزل فوم (مائي + حراري)",
  "عزل مائي للأسطح",
  "عزل وتنظيف خزانات",
  "عزل حراري للأسطح",
  "خدمات أخرى"
];

const WHATSAPP_NUMBER = "966501884483";
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz1Q-NFzfMPjBqNfnGUjCnDfztdTb6gZgQq_BEThp1A07DG0I838ps2miAN3rdOCbUd/exec";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: RIYADH_DISTRICTS[0],
    service: SERVICE_OPTIONS[0],
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Send to Google Sheet in background
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        district: formData.district,
        service: formData.service,
        notes: formData.notes,
        timestamp: new Date().toISOString()
      })
    }).catch((err) => console.error("Sheet error:", err));

    // 2. Redirect to WhatsApp with the data
    const msg = [
      `🔔 طلب معاينة جديد`,
      `━━━━━━━━━━━━━━`,
      `👤 الاسم: ${formData.name}`,
      `📱 الجوال: ${formData.phone}`,
      `📍 الحي: ${formData.district}`,
      `🔧 الخدمة: ${formData.service}`,
      formData.notes ? `📝 ملاحظات: ${formData.notes}` : null,
      `━━━━━━━━━━━━━━`
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );

    // Reset
    setFormData({
      name: "",
      phone: "",
      district: RIYADH_DISTRICTS[0],
      service: SERVICE_OPTIONS[0],
      notes: ""
    });
    setIsSubmitting(false);
  };

  const whatsappMsg = encodeURIComponent(
    `مرحباً شركة المعمورة الحديثة، أرغب في حجز موعد معاينة مجانية.\nالاسم: ${formData.name || "عميل"}\nالحي: ${formData.district}\nالخدمة: ${formData.service}`
  );

  return (
    <section id="contact" className="py-20 px-4 relative z-10 bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-3">
            <Phone className="w-4 h-4" />
            <span>طلب معاينة وكشف مجاني</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            تواصل معنا واحصل على <span className="text-teal-300">فحص ومعاينة مجانية</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            فريقنا الهندسي متاح لزيارة موقعك في الرياض خلال ساعات وتقديم تقرير فني شامل ومجاني.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Info Side */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="font-bold text-slate-100 font-cairo text-base">قنوات التواصل المباشرة</h3>

            <div className="space-y-3">
              <a
                href="tel:0501884483"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-teal-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-teal-300 border border-slate-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">الاتصال المباشر (24/7)</span>
                  <span className="text-base font-bold text-slate-100 font-cairo dir-ltr block text-right">0501884483</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-teal-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-teal-300 border border-slate-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-teal-300 font-bold block">مراسلة فورية عبر واتساب</span>
                  <span className="text-xs font-bold text-slate-200 font-cairo block">محادثة سريعة مع المهندس المختص</span>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="https://x.com/detectleaks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-500/60 hover:bg-slate-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 block font-cairo">منصة X (تويتر)</span>
                    <span className="text-xs font-bold text-slate-200 block truncate font-cairo">@detectleaks</span>
                  </div>
                </a>

                <a
                  href="https://www.snapchat.com/@embratwr2?share_id=9J31apJKld0&locle=ar-SA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/40 hover:bg-slate-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-3.37 0-5.74 2.45-5.83 5.48-.03.95.27 1.87.5 2.76.12.45.2.9.06 1.34-.14.44-.54.76-.98.88-1.04.28-1.57.87-1.53 1.7.04.7.53 1.25 1.26 1.41.6.13.9.4.95.96.06.63-.3 1.13-.8 1.48-.7.49-1.46.91-2.02 1.58-.52.62-.64 1.33-.31 2.01.32.66 1.05.9 1.77.72.63-.16 1.27-.3 1.9-.45 1.08-.25 2.14.07 3.06.66 1.28.82 2.71 1.25 4.25 1.24 1.54-.01 2.97-.44 4.25-1.26.92-.59 1.98-.91 3.06-.66.63.15 1.27.29 1.9.45.72.18 1.45-.06 1.77-.72.33-.68.21-1.39-.31-2.01-.56-.67-1.32-1.09-2.02-1.58-.5-.35-.86-.85-.8-1.48.05-.56.35-.83.95-.96.73-.16 1.22-.71 1.26-1.41.04-.83-.49-1.42-1.53-1.7-.44-.12-.84-.44-.98-.88-.14-.44-.06-.89.06-1.34.23-.89.53-1.81.5-2.76C20.31 4.45 17.94 2 14.57 2h-2.53z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 block font-cairo">سناب شات</span>
                    <span className="text-xs font-bold text-slate-200 block truncate font-cairo">embratwr2</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-bold">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>أوقات العمل:</span>
              </div>
              <p>السبت - الخميس: من 8:00 صباحاً حتى 9:00 مساءً</p>
              <p>فريق الطوارئ متاح 24 ساعة للتعامل مع تسربات المياه المفاجئة</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">الاسم الكريم *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: فهد القحطاني"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-teal-400 text-slate-100 text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="05XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-teal-400 text-slate-100 text-xs sm:text-sm text-right outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">الحي بالرياض *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-teal-400 text-slate-100 text-xs sm:text-sm outline-none transition-colors cursor-pointer"
                  >
                    {RIYADH_DISTRICTS.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-slate-100">{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">نوع الخدمة المطلوبة</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-teal-400 text-slate-100 text-xs sm:text-sm outline-none transition-colors cursor-pointer"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-slate-900 text-slate-100">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">المساحة أو وصف المشكلة</label>
                <textarea
                  rows={2}
                  placeholder="هل يوجد تسريب حالي أو ارتفاع في فاتورة المياه؟ المساحة التقريبية؟"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-teal-400 text-slate-100 text-xs sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 hover:border-teal-500/70 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all font-cairo cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span>إرسال طلب المعاينة المجانية</span>
                    <Send className="w-4 h-4 rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}