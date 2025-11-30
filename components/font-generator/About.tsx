"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("FontGenerator.about");

  return (
    <section className="py-16 px-4 bg-black relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-neutral-900/90 via-neutral-900/80 to-neutral-800/90 rounded-2xl p-8 md:p-12 border border-emerald-500/20 shadow-2xl backdrop-blur-sm"
        >
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"></div>
              <p className="text-white text-base md:text-lg leading-relaxed pl-6">
                {t("description1")}
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"></div>
              <p className="text-white text-base md:text-lg leading-relaxed pl-6">
                {t("description2")}
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"></div>
              <p className="text-white text-base md:text-lg leading-relaxed pl-6">
                {t("description3")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


