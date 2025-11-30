"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Image, Copy } from "lucide-react";
import HeroSection from "./HeroSection";
import FontGenerator from "./FontGenerator";
import HowToUse from "./HowToUse";
import About from "./About";
import FAQ from "./FAQ";
import Breadcrumb from "@/components/shared/Breadcrumb";
import FontPreviewGrid from "@/components/home/FontPreviewGrid";

export default function FontGeneratorPage() {
  const t = useTranslations("Home.fontGeneratorTabs");
  const [activeTab, setActiveTab] = useState("copy-paste");

  return (
    <>
      <Breadcrumb />
      <div className="min-h-screen bg-gradient-to-br from-black via-emerald-950/10 to-black">
        <div className="container mx-auto px-4">
          <HeroSection />
          
          {/* Tabs for Text to Image and Copy Paste Fonts */}
          <section className="py-12">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-neutral-900 border border-neutral-800 mb-8">
                <TabsTrigger
                  value="copy-paste"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=inactive]:text-gray-400"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t("copyPaste")}
                </TabsTrigger>
                <TabsTrigger
                  value="text-to-image"
                  className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=inactive]:text-gray-400"
                >
                  <Image className="h-4 w-4 mr-2" />
                  {t("textToImage")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="copy-paste">
                <FontGenerator />
              </TabsContent>

              <TabsContent value="text-to-image">
                <FontPreviewGrid />
              </TabsContent>
            </Tabs>
          </section>

          <About />
          <HowToUse />
          <FAQ />
        </div>
      </div>
    </>
  );
}

