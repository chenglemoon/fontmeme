"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
    id: "red",
    name: "Squid Game Red",
    color: "#FF0000",
    gradient: "from-red-600 to-red-800",
  },
  {
    id: "gold",
    name: "Gold",
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    id: "white",
    name: "White",
    color: "#FFFFFF",
    gradient: "from-white to-gray-200",
  },
  {
    id: "black",
    name: "Black",
    color: "#000000",
    gradient: "from-gray-800 to-black",
  },
  {
    id: "pink",
    name: "Pink",
    color: "#FF69B4",
    gradient: "from-pink-500 to-pink-700",
  },
];

// 示例类型定义
type ExampleType = {
  title: string;
  description: string;
  badge: string;
  text: string;
  font: string;
};

// 单个示例卡片
function ExampleCard({ 
  example, 
  index 
}: { 
  example: ExampleType;
  index: number;
}) {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_PRESETS[0]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fontInfo = AVAILABLE_FONTS.find(f => f.name === example.font);

  useEffect(() => {
    // 加载字体
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

    // 设置画布尺寸
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 清空画布
    ctx.clearRect(0, 0, rect.width, rect.height);

    // 设置字体 - 根据文本长度和画布尺寸动态调整
    const textLength = example.text.length;
    const padding = 30;
    const maxTextWidth = rect.width - padding * 2;
    const maxTextHeight = rect.height - padding * 2;
    
    // 初始字体大小估算
    let fontSize = Math.min(rect.width * 0.12, 60);
    if (textLength > 10) {
      fontSize = Math.min(rect.width * 0.08, 45);
    } else if (textLength > 5) {
      fontSize = Math.min(rect.width * 0.1, 55);
    }
    
    ctx.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 测量文本
    let metrics = ctx.measureText(example.text);
    let textWidth = metrics.width;
    let textHeight = fontSize * 1.2;
    
    // 确保文本不会超出画布边界 - 同时考虑宽度和高度
    if (textWidth > maxTextWidth) {
      fontSize = Math.floor((maxTextWidth / textWidth) * fontSize);
      ctx.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
      metrics = ctx.measureText(example.text);
      textWidth = metrics.width;
      textHeight = fontSize * 1.2;
    }
    
    if (textHeight > maxTextHeight) {
      fontSize = Math.floor((maxTextHeight / textHeight) * fontSize);
      ctx.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
      metrics = ctx.measureText(example.text);
      textWidth = metrics.width;
      textHeight = fontSize * 1.2;
    }
    
    const x = rect.width / 2;
    const y = rect.height / 2;

    const material = MATERIAL_PRESETS.find(m => m.id === selectedMaterial.id) || MATERIAL_PRESETS[0];
    
    // 创建 3D 立体效果 - 多层阴影（深度效果）
    const depth = 8;
    const shadowLayers = 15;
    
    for (let i = shadowLayers; i > 0; i--) {
      const offsetX = (shadowLayers - i) * (depth / shadowLayers) * 0.8;
      const offsetY = (shadowLayers - i) * (depth / shadowLayers) * 0.6;
      const alpha = (1 - i / shadowLayers) * 0.4;
      
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillText(example.text, x + offsetX, y + offsetY);
      ctx.restore();
    }

    // 绘制主文本 - 使用径向渐变（模拟光照）
    const gradient = ctx.createRadialGradient(
      x - textWidth * 0.3,
      y - textHeight * 0.3,
      textWidth * 0.2,
      x,
      y,
      textWidth * 0.8
    );
    
    // 根据材质创建渐变
    const baseColor = material.color;
    const lightColor = adjustBrightness(baseColor, 30);
    const darkColor = adjustBrightness(baseColor, -20);
    
    gradient.addColorStop(0, lightColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, darkColor);

    // 绘制主文本
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.fillText(example.text, x, y);
    ctx.restore();

    // 添加顶部高光（模拟金属光泽效果）
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
    ctx.fillText(example.text, x, y);
    ctx.restore();
  }, [fontLoaded, fontInfo, example.text, selectedMaterial]);

  useEffect(() => {
    if (fontLoaded) {
      render3DText();
    }
  }, [fontLoaded, render3DText]);

  // 处理窗口大小变化
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center space-y-5"
    >
      {/* 3D 预览区域 */}
      <div className="flex-1 relative overflow-hidden rounded-xl aspect-[4/3] min-h-[280px] sm:min-h-[320px] md:min-h-[400px] w-full bg-black border border-neutral-800">
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
            } ${
              material.color === "#000000" || material.color === "#000"
                ? "border-2 border-gray-400"
                : "border border-gray-700"
            }`}
            style={{ backgroundColor: material.color }}
            aria-label={material.name}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ExamplesSection() {
  const t = useTranslations("SquidGameFont.examples");

  const examples = [
    {
      title: t("example1.title"),
      description: t("example1.description"),
      badge: t("example1.badge"),
      text: "SQUID GAME",
      font: "GameOfSquids",
    },
    {
      title: t("example2.title"),
      description: t("example2.description"),
      badge: t("example2.badge"),
      text: "456",
      font: "GameOfSquids",
    },
  ];

  return (
    <section id="feature-4-texture" className="relative px-4 py-20 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/10 to-transparent -z-10"></div>
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="uppercase tracking-wider font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            {t("badge")}
          </h2>
          <p className="text-balance text-2xl md:text-3xl font-semibold text-white">
            {t("title")}
          </p>
          <p className="text-balance text-lg text-white/70 max-w-4xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {examples.map((example, index) => (
            <ExampleCard key={index} example={example} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
