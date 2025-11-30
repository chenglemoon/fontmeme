"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { AVAILABLE_FONTS, loadFont } from "./utils/fontLoader";

export default function About() {
  const t = useTranslations("PlusJakartaSans.about");
  const [fontLoaded, setFontLoaded] = useState(false);
  const titleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFont] = useState("PlusJakartaTextRegular"); // 使用 Plus Jakarta Text Regular 字体

  useEffect(() => {
    const fontInfo = AVAILABLE_FONTS.find(f => f.name === selectedFont);
    if (fontInfo) {
      loadFont(fontInfo)
        .then(() => setFontLoaded(true))
        .catch(() => setFontLoaded(false));
    }
  }, [selectedFont]);

  useEffect(() => {
    if (!titleCanvasRef.current || !fontLoaded) return;

    const canvas = titleCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const title = t("title");
    const fontSize = 64;
    const padding = 40;
    
    // 设置字体
    ctx.font = `${fontSize}px "${selectedFont}", sans-serif`;
    
    // 测量文本
    const metrics = ctx.measureText(title);
    const textWidth = metrics.width;
    const textHeight = fontSize;
    
    // 设置画布尺寸
    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;
    
    // 重新设置字体（因为画布尺寸改变会重置上下文）
    ctx.font = `${fontSize}px "${selectedFont}", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // 创建绿色渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#10b981");
    gradient.addColorStop(0.5, "#14b8a6");
    gradient.addColorStop(1, "#10b981");
    
    ctx.fillStyle = gradient;
    ctx.fillText(title, canvas.width / 2, canvas.height / 2);
  }, [fontLoaded, t, selectedFont]);

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
          {fontLoaded ? (
            <canvas
              ref={titleCanvasRef}
              className="mx-auto mb-6"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {t("title")}
            </h2>
          )}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

