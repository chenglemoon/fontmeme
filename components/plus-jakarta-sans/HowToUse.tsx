"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_FONTS, loadFont } from "./utils/fontLoader";

// 调整颜色亮度
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  
  const newR = Math.min(255, Math.max(0, r + percent));
  const newG = Math.min(255, Math.max(0, g + percent));
  const newB = Math.min(255, Math.max(0, b + percent));
  
  return `#${[newR, newG, newB].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

// 材质预设
const MATERIAL_PRESETS = [
  {
    id: "emerald",
    name: "Emerald",
    color: "#10b981",
  },
  {
    id: "purple",
    name: "Purple",
    color: "#8b5cf6",
  },
  {
    id: "blue",
    name: "Blue",
    color: "#3b82f6",
  },
  {
    id: "pink",
    name: "Pink",
    color: "#ec4899",
  },
  {
    id: "gold",
    name: "Gold",
    color: "#f59e0b",
  },
];

// 预览组件
function PreviewCard() {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_PRESETS[0]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
    const text = "PLUS JAKARTA SANS";
  const fontInfo = AVAILABLE_FONTS[0]; // 使用第一个字体

  useEffect(() => {
    if (fontInfo) {
      loadFont(fontInfo)
        .then(() => setFontLoaded(true))
        .catch(() => setFontLoaded(false));
    }
  }, [fontInfo]);

  const render3DText = useCallback(() => {
    if (!canvasRef.current || !fontLoaded || !fontInfo) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const fontSize = Math.min(rect.width * 0.12, 60);
    ctx.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.2;
    const x = rect.width / 2;
    const y = rect.height / 2;

    const material = MATERIAL_PRESETS.find(m => m.id === selectedMaterial.id) || MATERIAL_PRESETS[0];
    
    // 创建 3D 立体效果
    const depth = 8;
    const shadowLayers = 15;
    
    for (let i = shadowLayers; i > 0; i--) {
      const offsetX = (shadowLayers - i) * (depth / shadowLayers) * 0.8;
      const offsetY = (shadowLayers - i) * (depth / shadowLayers) * 0.6;
      const alpha = (1 - i / shadowLayers) * 0.4;
      
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillText(text, x + offsetX, y + offsetY);
      ctx.restore();
    }

    // 绘制主文本
    const gradient = ctx.createRadialGradient(
      x - textWidth * 0.3,
      y - textHeight * 0.3,
      textWidth * 0.2,
      x,
      y,
      textWidth * 0.8
    );
    
    const baseColor = material.color;
    const lightColor = adjustBrightness(baseColor, 30);
    const darkColor = adjustBrightness(baseColor, -20);
    
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, darkColor);

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.fillText(text, x, y);
    ctx.restore();

    // 添加高光
    ctx.save();
    const highlightGradient = ctx.createLinearGradient(
      x - textWidth / 2,
      y - textHeight / 2,
      x - textWidth / 2,
      y
    );
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.globalCompositeOperation = "overlay";
    ctx.fillText(text, x, y);
    ctx.restore();
  }, [fontLoaded, fontInfo, text, selectedMaterial]);

  useEffect(() => {
    if (fontLoaded) {
      render3DText();
    }
  }, [fontLoaded, render3DText]);

  useEffect(() => {
    const handleResize = () => {
      if (fontLoaded) {
        render3DText();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fontLoaded, render3DText]);

  return (
    <div className="flex flex-col items-center space-y-5">
      {/* 3D 预览区域 */}
      <div className="flex-1 relative overflow-hidden rounded-xl aspect-[4/3] w-full h-[280px] sm:h-[320px] md:h-[400px] bg-black border border-neutral-800">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
        {!fontLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50">Loading...</div>
          </div>
        )}
      </div>

      {/* 材质选择器 */}
      <div className="flex items-center justify-center gap-4">
        {MATERIAL_PRESETS.map((material) => (
          <button
            key={material.id}
            onClick={() => setSelectedMaterial(material)}
            className={`relative w-10 h-10 rounded-full cursor-pointer transition-all overflow-hidden ${
              selectedMaterial.id === material.id
                ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-black"
                : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: material.color }}
            aria-label={material.name}
          />
        ))}
      </div>
    </div>
  );
}

export default function HowToUse() {
  const t = useTranslations("PlusJakartaSans.howToUse");
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSteps(newExpanded);
  };

  const handleStartClick = () => {
    const textInput = document.querySelector('textarea[name="text"]') as HTMLTextAreaElement;
    if (textInput) {
      textInput.focus();
      textInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const steps = [
    { titleKey: "step1.title", descKey: "step1.description" },
    { titleKey: "step2.title", descKey: "step2.description" },
    { titleKey: "step3.title", descKey: "step3.description" },
    { titleKey: "step4.title", descKey: "step4.description" },
    { titleKey: "step5.title", descKey: "step5.description" },
  ];

  return (
    <section id="how-to-use-section" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* 左侧：步骤说明 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-400">
                {t("subtitle")}
              </p>
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-neutral-900/70 rounded-lg border-2 border-neutral-700/60 overflow-hidden"
              >
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {t(step.titleKey)}
                    </h3>
                  </div>
                  {expandedSteps.has(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSteps.has(index) && (
                  <div className="px-4 pb-4 pl-16">
                    <p className="text-white/80">
                      {t(step.descKey)}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Button
                onClick={handleStartClick}
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {t("startButton")}
              </Button>
            </div>
          </motion.div>

          {/* 右侧：预览图 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <PreviewCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

