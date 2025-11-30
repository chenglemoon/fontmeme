"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Palette, Download } from "lucide-react";

export default function Features() {
  const t = useTranslations("FontGenerator.features");

  const features = [
    {
      icon: Sparkles,
      title: t("feature1.title"),
      description: t("feature1.description"),
    },
    {
      icon: Palette,
      title: t("feature2.title"),
      description: t("feature2.description"),
    },
    {
      icon: Download,
      title: t("feature3.title"),
      description: t("feature3.description"),
    },
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-emerald-500/5 border border-emerald-500/10 shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-emerald-500/10 w-fit mb-4">
              <feature.icon className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


