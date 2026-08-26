"use client";
import React from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const COMPANY_LAT = 24.7946;
const COMPANY_LNG = 46.6372;

// Opens Google Maps directions — origin is blank so it auto-detects user location
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COMPANY_LAT},${COMPANY_LNG}&travelmode=driving`;

// Google Maps embed zoomed into Riyadh (King Fahd Rd / Sahafa) showing main roads & routes
const EMBED_URL = `https://maps.google.com/maps?q=${COMPANY_LAT},${COMPANY_LNG}&hl=ar&z=13&output=embed`;

export default function MapSection() {
  return (
    <section
      id="location"
      className="py-20 px-4 relative z-10 bg-slate-900 border-b border-slate-800"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-teal-500/25 text-teal-300 text-xs font-bold mb-3">
            <MapPin className="w-4 h-4" />
            <span>موقعنا على الخريطة</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            زورنا في <span className="text-teal-300">موقعنا بالرياض</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            يسعدنا استقبالكم في مقر الشركة — اضغط على الخريطة لعرض المسار من موقعك الحالي إلى مقر الشركة مباشرة.
          </p>
        </div>

        {/* Map Card */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl shadow-black/30 group">
          {/* Embedded Map */}
          <div className="relative w-full h-[350px] sm:h-[420px] lg:h-[460px]">
            <iframe
              title="موقع شركة المعمورة الحديثة على الخريطة"
              src={EMBED_URL}
              className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Subtle gradient overlay at bottom for the CTA area */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none" />
          </div>

          {/* Bottom Bar with CTA */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
            {/* Address */}
            <div className="flex items-center gap-2.5 text-slate-200">
              <div className="w-9 h-9 rounded-lg bg-slate-800/90 backdrop-blur border border-slate-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">مقر الشركة</span>
                <span className="text-sm font-bold font-cairo block">
                  طريق الملك فهد، حي الصحافة، الرياض
                </span>
              </div>
            </div>

            {/* Directions Button */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 backdrop-blur-md border border-teal-500/50 hover:border-teal-400/70 text-teal-200 font-bold text-xs sm:text-sm font-cairo transition-all duration-300 shadow-lg shadow-teal-900/30 hover:shadow-teal-800/40 group/btn"
            >
              <Navigation className="w-4 h-4 transition-transform duration-300 group-hover/btn:-rotate-45" />
              <span>احصل على الاتجاهات</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-teal-500/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-teal-500/30 rounded-tl-lg pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
