"use client";

import { useTranslations } from "next-intl";
import { 
  Palette,
  Download,
  Zap,
  Lock,
  Sparkles,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  const t = useTranslations("CocaColaFont.features");

  const features = [
    {
      icon: Palette,
      titleKey: "customizable.title",
      descKey: "customizable.description",
      color: "purple",
      isCoreFeature: true,
    },
    {
      icon: Sparkles,
      titleKey: "effects.title",
      descKey: "effects.description",
      color: "pink",
      isCoreFeature: true,
    },
    {
      icon: Download,
      titleKey: "download.title",
      descKey: "download.description",
      color: "blue",
      isCoreFeature: true,
    },
    {
      icon: Zap,
      titleKey: "instant.title",
      descKey: "instant.description",
      color: "yellow",
      isCoreFeature: true,
    },
    {
      icon: Lock,
      titleKey: "private.title",
      descKey: "private.description",
      color: "green",
      isCoreFeature: true,
    },
    {
      icon: Globe,
      titleKey: "free.title",
      descKey: "free.description",
      color: "indigo",
      isCoreFeature: true,
    },
  ];

  const colorClasses: Record<string, string> = {
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <section id="features" className="relative px-4 py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/10 to-transparent -z-10"></div>
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="uppercase tracking-wider font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            {t("badge")}
          </h2>
          <p className="text-balance text-2xl text-white">
            {t("title")}
          </p>
          <p className="text-balance text-lg text-white/80">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 border-neutral-700/60"
              >
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-900 via-black to-neutral-800"></div>
                  <div className="space-y-3">
                    <div className={`inline-flex p-3 rounded-lg ${colorClasses[feature.color]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans font-semibold text-balance text-white text-xl">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="font-sans text-sm/[1.125rem] text-white/80 md:text-base/[1.375rem]">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

