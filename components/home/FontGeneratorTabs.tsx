"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Image, Copy } from "lucide-react";
import FontPreviewGrid from "./FontPreviewGrid";
import dynamic from "next/dynamic";

// 动态导入 FontGenerator 组件（避免 SSR 问题）
const FontGenerator = dynamic(
  () => import("@/components/font-generator/FontGenerator"),
  { ssr: false }
);

export default function FontGeneratorTabs() {
  const t = useTranslations("Home.fontGeneratorTabs");
  const [activeTab, setActiveTab] = useState("copy-paste");

  return (
    <section 
      data-section="font-generator"
      className="relative overflow-hidden bg-black py-12 md:py-16"
    >
      <div className="container relative z-10 mx-auto px-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-neutral-900 border border-neutral-800">
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

          <TabsContent value="copy-paste" className="mt-8">
            <FontGenerator />
          </TabsContent>

          <TabsContent value="text-to-image" className="mt-8">
            <FontPreviewGrid />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

