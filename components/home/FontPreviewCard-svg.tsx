"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextToImageFontConfig } from "./textToImageFonts";

interface FontPreviewCardProps {
  config: TextToImageFontConfig;
}

/**
 * 方案 C：SVG 渲染
 * 优点：灵活，可以添加渐变、阴影等效果，矢量图清晰
 * 缺点：需要加载字体，实现稍复杂
 */
export default function FontPreviewCardSVG({ config }: FontPreviewCardProps) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const loadFont = async () => {
      if (document.fonts.check(`16px "${config.fontName}"`)) {
        setFontLoaded(true);
        return;
      }

      try {
        const pathParts = config.fontFile.split('/');
        const encodedParts = pathParts.map((part) => encodeURIComponent(part));
        const encodedFile = encodedParts.join('/');
        
        const font = new FontFace(config.fontName, `url("${encodedFile}")`);
        await font.load();
        document.fonts.add(font);
        setFontLoaded(true);
      } catch (error) {
        console.error(`Failed to load font ${config.fontName}:`, error);
        setFontLoaded(true);
      }
    };

    loadFont();
  }, [config]);

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-neutral-800/50 backdrop-blur-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
      {/* Preview Area - SVG 渲染 */}
      <div 
        className="relative w-full aspect-video bg-black/50 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: config.defaultBgColor || '#000000'
        }}
      >
        <svg
          ref={svgRef}
          className={`w-full h-full transition-opacity duration-300 ${
            fontLoaded ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 400 150"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={`gradient-${config.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.defaultColor} />
              <stop offset="100%" stopColor={config.defaultColor} />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={config.defaultColor}
            fontFamily={`"${config.fontName}", sans-serif`}
            fontSize="40"
            fontWeight="bold"
          >
            {config.previewText}
          </text>
        </svg>
        {!fontLoaded && (
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



