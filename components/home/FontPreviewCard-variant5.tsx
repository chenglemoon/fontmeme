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
 * 方案 5：霓虹灯效果
 * 特点：发光边框效果，赛博朋克风格
 */
export default function FontPreviewCardVariant5({ config }: FontPreviewCardProps) {
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
    <div className="group relative bg-black rounded-xl overflow-hidden border-2 border-neutral-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-emerald-500/50">
      {/* 发光边框效果 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/20 group-hover:via-emerald-500/10 group-hover:to-emerald-500/20 transition-all duration-300 blur-xl -z-10" />
      
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
        {/* 扫描线效果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-black border-t-2 border-neutral-800 group-hover:border-emerald-500/50 transition-colors flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
            {config.name}
          </h3>
          {config.category && (
            <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
              {config.category}
            </p>
          )}
        </div>
        <Button
          onClick={handleClick}
          size="sm"
          className="ml-3 bg-emerald-500 hover:bg-emerald-400 text-white shrink-0 border-2 border-emerald-400/50 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all"
        >
          <PenTool className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}



