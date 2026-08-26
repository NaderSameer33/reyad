"use client";
import React, { useEffect, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import FloatingDock from "@/components/FloatingDock";
import SplashScreen from "@/components/SplashScreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Global Right-Click Protection
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only on text inputs if any
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    // Global Key Shortcut Protection (Disable Ctrl+S, Ctrl+U, Ctrl+P, PrintScreen)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "u" || e.key === "p" || e.key === "S" || e.key === "U" || e.key === "P")) ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <SplashScreen />
      <ScrollProgressBar />
      <CustomCursor />
      <FloatingDock />
      {children}
    </>
  );
}