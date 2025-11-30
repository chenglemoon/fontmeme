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

export default function FontPreviewCard({ config }: FontPreviewCardProps) {
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
        console.error(`[FontPreviewCard] Failed to generate preview for ${config.name}:`, error);
      }
    };

    generatePreview();
  }, [config]);

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-neutral-800/50 backdrop-blur-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
      {/* Preview Canvas */}
      <div className="relative w-full aspect-video bg-black/50 flex items-center justify-center overflow-hidden">
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
      </div>

      {/* Card Footer */}
      <div className="p-4 backdrop-blur-sm bg-neutral-900/40 border-t border-neutral-800/50 flex items-center justify-between">
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
          className="ml-3 bg-emerald-500/80 hover:bg-emerald-500 text-white shrink-0 backdrop-blur-sm"
        >
          <PenTool className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  );
}

