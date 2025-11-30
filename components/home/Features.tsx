"use client";

import { useTranslations } from "next-intl";
import { 
  Gift,
  Image,
  UserX,
  Lock,
  Sparkles,
  Smartphone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  const t = useTranslations("Home.features");

  const features = [
    {
      icon: Gift,
      titleKey: "free.title",
      descKey: "free.description",
      color: "emerald",
      isCoreFeature: true,
    },
    {
      icon: Image,
      titleKey: "highResolution.title",
      descKey: "highResolution.description",
      color: "blue",
      isCoreFeature: true,
    },
    {
      icon: UserX,
      titleKey: "noSignup.title",
      descKey: "noSignup.description",
      color: "green",
      isCoreFeature: true,
    },
    {
      icon: Lock,
      titleKey: "private.title",
      descKey: "private.description",
      color: "indigo",
      isCoreFeature: true,
    },
    {
      icon: Sparkles,
      titleKey: "easyToUse.title",
      descKey: "easyToUse.description",
      color: "orange",
      isCoreFeature: false,
    },
    {
      icon: Smartphone,
      titleKey: "allDevices.title",
      descKey: "allDevices.description",
      color: "pink",
      isCoreFeature: false,
    },
  ];

  return (
    <section id="features-section" className="py-12 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          {t("title")}
        </h2>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* 特性网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, titleKey, descKey, color, isCoreFeature }) => (
              <Card key={titleKey} className="relative overflow-hidden h-full bg-neutral-900 border-neutral-800">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${color}-950 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{t(titleKey)}</h3>
                  <p className="text-gray-400 leading-relaxed">{t(descKey)}</p>
                  {isCoreFeature && (
                    <Badge variant="outline" className="mt-4 border-emerald-500 text-emerald-400">
                      {t("coreFeature")}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
