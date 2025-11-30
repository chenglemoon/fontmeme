"use client";

import HeroSection from "./HeroSection";
import FontGeneratorTabs from "./FontGeneratorTabs";
import HowToUse from "./HowToUse";
import Features from "./Features";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Tool Section - Font Generator Tabs */}
      <FontGeneratorTabs />
      
      <Features />
      <HowToUse />
      <FAQ />
      <Testimonials />
    </>
  );
}
