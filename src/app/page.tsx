import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import ThermalComparison from "@/components/ThermalComparison";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import WhyUsGuarantee from "@/components/WhyUsGuarantee";
import ArticlesSection from "@/components/ArticlesSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import FAQAccordion from "@/components/FAQAccordion";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-tajawal antialiased selection:bg-teal-400 selection:text-slate-950">
      <ParallaxBackground />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <ServicesGrid />
        <InteractiveCalculator />
        <ThermalComparison />
        <ProjectsShowcase />
        <VideoShowcase />
        <WhyUsGuarantee />
        <ArticlesSection />
        <TestimonialsMarquee />
        <FAQAccordion />
        <ContactSection />
        <MapSection />
      </main>

      <Footer />
    </div>
  );
}