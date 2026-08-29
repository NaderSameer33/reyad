"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Video, ShieldCheck, MapPin, X, Lock, Volume2, VolumeX, Sparkles } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import Image from "next/image";

interface VideoItem {
  id: string;
  title: string;
  district: string;
  category: string;
  videoUrl: string;
  poster: string;
  duration: string;
  desc: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "رش عزل الفوم البولي يوريثان بأحدث أجهزة الضغط العالي",
    district: "حي الملقا، الرياض",
    category: "عزل الفوم",
    videoUrl: "/videos/video_real_01.mp4",
    poster: "/images/projects/project_real_01.jpg",
    duration: "ميداني مباشر",
    desc: "توثيق فيديو حي لعملية رش الفوم عالي الكثافة لسماكة 5 سم موحدة متجانسة بدون فواصل.",
  },
  {
    id: "vid-2",
    title: "اختبار الغمر المائي 48 ساعة لسطح عمارة استثمارية",
    district: "حي النرجس، الرياض",
    category: "العزل المائي",
    videoUrl: "/videos/video_real_02.mp4",
    poster: "/images/projects/project_real_06.jpg",
    duration: "ميداني مباشر",
    desc: "اختبار غمر مائي كامل للتأكد من صفر تسربات قبل تسليم وثيقة الضمان الرسمية 15 سنة.",
  },
  {
    id: "vid-3",
    title: "فحص حراري بكاميرا FLIR لرصد التسربات خفية الجدران",
    district: "حي حطين، الرياض",
    category: "كشف التسربات",
    videoUrl: "/videos/video_real_03.mp4",
    poster: "/images/projects/project_real_17.jpg",
    duration: "ميداني مباشر",
    desc: "تحديد مواقع تسربات المياه بدقة سنتيمترية دون هدم أو تكسير عشوائي بالجدران.",
  },
  {
    id: "vid-4",
    title: "عزل وتطهير خزان مياه أرضي بمادة الإيبوكسي الغذائي",
    district: "حي الصحافة، الرياض",
    category: "عزل الخزانات",
    videoUrl: "/videos/video_real_04.mp4",
    poster: "/images/projects/project_real_14.jpg",
    duration: "ميداني مباشر",
    desc: "تطبيق طبقات الإيبوكسي المعتمد صحياً لحماية مياه الشرب من التلوث والتسرب الأراضي.",
  },
  {
    id: "vid-5",
    title: "تطبيق أغشية البيتومين المطاطية SBS على السطح المبلط",
    district: "حي الياسمين، الرياض",
    category: "العزل المائي",
    videoUrl: "/videos/video_real_05.mp4",
    poster: "/images/projects/project_real_08.jpg",
    duration: "ميداني مباشر",
    desc: "عملية عزل شاملة فوق البلاط بالحرارة المباشرة لضمان عزل مائي متكامل يدوم لسنوات.",
  },
  {
    id: "vid-6",
    title: "معالجة الشروخ والزوايا الإسمنتية بمواد توسعية لا تتقلص",
    district: "حي العليا، الرياض",
    category: "العزل الحراري",
    videoUrl: "/videos/video_real_06.mp4",
    poster: "/images/projects/project_real_11.jpg",
    duration: "ميداني مباشر",
    desc: "ترميم كامل الزوايا وفواصل التمدد الإسمنتية بمواد معتمدة قبل رش طبقة العزل الرئيسية.",
  },
  {
    id: "vid-7",
    title: "كشف تسربات المياه إلكترونياً بأجهزة التتبع الصوتي الألماني",
    district: "حي الروضة، الرياض",
    category: "كشف التسربات",
    videoUrl: "/videos/video_real_07.mp4",
    poster: "/images/projects/project_real_18.jpg",
    duration: "ميداني مباشر",
    desc: "استخدام الذبذبات الصوتية للوصول لمكان التسرب بدقة متناهية خلف البلاط والخرسانة.",
  },
  {
    id: "vid-8",
    title: "رش طبقة الحماية المطاطية العاكسة للأشعة فوق البنفسجية UV",
    district: "حي العارض، الرياض",
    category: "عزل الفوم",
    videoUrl: "/videos/video_real_08.mp4",
    poster: "/images/projects/project_real_04.jpg",
    duration: "ميداني مباشر",
    desc: "دهان الطبقة الأخيرة لحماية الفوم من العوامل الجوية وتخفيض درجات الحرارة داخل المبنى.",
  },
  {
    id: "vid-9",
    title: "تسليم مشروع عزل فوم متكامل لفيلا سكنية مع شهادة الضمان",
    district: "حي الغدير، الرياض",
    category: "عزل الفوم",
    videoUrl: "/videos/video_real_09.mp4",
    poster: "/images/projects/project_real_02.jpg",
    duration: "ميداني مباشر",
    desc: "النتيجة النهائية للمشروع واختبار العزل الحراري بنجاح وتسليم المالك وثيقة الضمان.",
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="videos" className="py-20 px-4 relative z-10 bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3 shadow-sm">
            <Video className="w-4 h-4 text-teal-400" />
            <span>فيديوهات توثيقية حية من مواقع التنفيذ</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-cairo">
            شاهد عملنا <span className="text-teal-300">بالفيديو الميداني المباشر</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 font-normal">
            مقاطع فيديو حقيقية تم تصويرها في مواقع عملنا بمختلف أحياء الرياض لتوثيق جودة ودقة التنفيذ.
          </p>
        </motion.div>

        {/* Video Cards Grid (Reels Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <TiltCard maxTilt={5} scale={1.02} className="h-full">
                <div
                  onClick={() => {
                    setActiveVideo(vid);
                    setIsPlaying(true);
                    setIsMuted(false);
                  }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer group"
                >
                  {/* Video Thumbnail Box — only poster image, no video src loaded until modal opens */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <Image
                      src={vid.poster}
                      alt={vid.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      loading="lazy"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-teal-300 text-[10px] font-bold border border-teal-500/30 backdrop-blur-md">
                        {vid.category}
                      </span>
                    </div>

                    {/* Protection Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700/60">
                      <Lock className="w-3 h-3 text-teal-400" />
                      <span className="text-[9px] text-slate-300 font-bold">© المعمورة الحديثة</span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-teal-500/90 group-hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-slate-950 ml-1" />
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 text-[11px] text-slate-200 font-medium bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{vid.district}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-sm font-bold text-slate-100 font-cairo group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {vid.desc}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-teal-400 font-bold font-cairo border-t border-slate-800/80">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        مشاهدة الفيديو الميداني
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{vid.duration}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                    {activeVideo.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 font-cairo truncate max-w-md">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Protected Video Player */}
              <div
                className="relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* Protected Anti-Theft Watermark Overlay */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 pointer-events-none select-none">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span className="text-xs text-slate-200 font-bold">شركة المعمورة الحديثة - توثيق ميداني</span>
                </div>

                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.poster}
                  autoPlay
                  controlsList="nodownload"
                  className="w-full h-full object-contain pointer-events-auto"
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Custom Quick Play/Mute Overlay Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-2.5 px-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center justify-center transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-all cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-400" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{activeVideo.district}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-5 bg-slate-900/90 space-y-2 border-t border-slate-800">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {activeVideo.desc}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <a
                    href="https://wa.me/966501884483"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 font-cairo shadow-md transition-all"
                  >
                    <span>طلب معاينة وفحص موقع مماثل عبر واتساب</span>
                  </a>
                  <span className="text-[11px] text-slate-400">توثيق رسمي معتمد</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
