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
 * 方案 4：卡片阴影设计
 * 特点：强调阴影和深度，3D 效果
 */
export default function FontPreviewCardVariant4({ config }: FontPreviewCardProps) {
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
    <div className="group relative bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      {/* 顶部高光效果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Preview Canvas */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
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
        {/* 底部阴影渐变 */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-neutral-900 relative">
        {/* 内部阴影 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        <div className="relative flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors drop-shadow-lg">
              {config.name}
            </h3>
            {config.category && (
              <p className="text-xs text-gray-400 mt-1.5">
                {config.category}
              </p>
            )}
          </div>
          <Button
            onClick={handleClick}
            size="sm"
            className="ml-3 bg-emerald-500 hover:bg-emerald-400 text-white shrink-0 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all"
          >
            <PenTool className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}



