"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HowToUse() {
  const t = useTranslations("FontGenerator.howToUse");

  const handleStartClick = () => {
    const textInput = document.querySelector('input[placeholder*="Type your text"], input[placeholder*="在此输入"]') as HTMLInputElement;
    if (textInput) {
      textInput.focus();
      textInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const steps = [
    { 
      number: 1, 
      titleKey: "step1.title", 
      descKey: "step1.description",
      icon: "1"
    },
    { 
      number: 2, 
      titleKey: "step2.title", 
      descKey: "step2.description",
      icon: "2"
    },
    { 
      number: 3, 
      titleKey: "step3.title", 
      descKey: "step3.description",
      icon: "3"
    },
  ];

  return (
    <section id="how-to-use-section" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-900/70 rounded-xl border border-neutral-700/60 p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleStartClick}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {t("startButton")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

