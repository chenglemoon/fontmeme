"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("Home.hero");

  const handleScrollToGenerator = () => {
    const generatorSection = document.querySelector('[data-section="font-generator"]');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-black via-emerald-950/10 to-black py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent leading-tight">
              {t("title")}
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {t("subtitle")}
            </h2>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t("description")}
            </p>

            <button
              onClick={handleScrollToGenerator}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2 mx-auto"
            >
              {t("button")}
              <ArrowDown className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
