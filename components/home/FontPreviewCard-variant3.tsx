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
 * 方案 3：极简边框设计
 * 特点：细边框 + 更多留白，悬停时边框发光
 */
export default function FontPreviewCardVariant3({ config }: FontPreviewCardProps) {
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
    <div className="group relative bg-black rounded-lg overflow-hidden border border-neutral-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
      {/* Preview Canvas */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden p-2">
        <div className="w-full h-full border border-neutral-800 rounded">
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-contain transition-opacity duration-300 rounded ${
              previewReady ? "opacity-100" : "opacity-0"
            }`}
          />
          {!previewReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-black flex items-center justify-between border-t border-neutral-800">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
            {config.name}
          </h3>
          {config.category && (
            <p className="text-xs text-gray-500 mt-1.5">
              {config.category}
            </p>
          )}
        </div>
        <Button
          onClick={handleClick}
          size="sm"
          variant="outline"
          className="ml-3 border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 shrink-0"
        >
          <PenTool className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}



