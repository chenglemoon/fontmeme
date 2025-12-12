"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextToImageFontConfig } from "./textToImageFonts";
import { renderPreview } from "./utils/previewRenderer";

interface FontPreviewCardProps {
  config: TextToImageFontConfig;
}

/**
 * 方案 2：渐变卡片设计
 * 特点：深色渐变背景，优雅专业
 */
export default function FontPreviewCardVariant2({ config }: FontPreviewCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewReady, setPreviewReady] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const generatePreview = async () => {
      if (!canvasRef.current) return;

      try {
        await renderPreview(canvasRef.current, {
          text: config.previewText,
          fontName: config.fontName,
          fontFile: config.fontFile,
          fontSize: 40,
          color: config.defaultColor,
          backgroundColor: config.defaultBgColor,
        });
        setPreviewReady(true);
      } catch (error) {
        console.error(`Failed to generate preview for ${config.name}:`, error);
      }
    };

    generatePreview();
  }, [config]);

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  return (
    <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700/50 hover:border-emerald-500/60 hover:from-neutral-800 hover:via-emerald-950/20 hover:to-neutral-800 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2">
      {/* Preview Canvas */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            previewReady ? "opacity-100" : "opacity-0"
          }`}
        />
        {!previewReady && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-gradient-to-r from-neutral-900 to-neutral-800 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
            {config.name}
          </h3>
          {config.category && (
            <p className="text-xs text-gray-400 mt-1">
              {config.category}
            </p>
          )}
        </div>
        <Button
          onClick={handleClick}
          size="sm"
          className="ml-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shrink-0 shadow-lg shadow-emerald-500/30"
        >
          <PenTool className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}



