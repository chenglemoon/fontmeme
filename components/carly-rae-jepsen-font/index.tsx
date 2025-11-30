"use client";

import HeroSection from "./HeroSection";
import About from "./About";
import ExamplesSection from "./ExamplesSection";
import Features from "./Features";
import HowToUse from "./HowToUse";
import FAQ from "./FAQ";
import Breadcrumb from "@/components/shared/Breadcrumb";

export default function CarlyRaeJepsenFont() {
  return (
    <>
      <Breadcrumb />
      {/* Hero Section with Generator */}
      <HeroSection />
      
      {/* About Carly Rae Jepsen Font */}
      <About />
      
      <ExamplesSection />
      <Features />
      <HowToUse />
      <FAQ />
    </>
  );
}

