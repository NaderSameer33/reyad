"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

interface ProtectedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProtectedImage({ src, alt, priority }: ProtectedImageProps) {
  return (
    <div
      className="absolute inset-0"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Anti-drag/select overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(30,41,59,0.04) 50%, transparent 100%)",
        }}
      />
      {/* Copyright watermark */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 pointer-events-none select-none">
        <Lock className="w-3 h-3 text-teal-400" />
        <span className="text-[9px] text-slate-300 font-bold">© النبلاء - محمي</span>
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover pointer-events-none select-none"
        priority={priority}
        draggable={false}
      />
    </div>
  );
}
