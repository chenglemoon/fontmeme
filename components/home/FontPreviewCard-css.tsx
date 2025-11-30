"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextToImageFontConfig } from "./textToImageFonts";

interface FontPreviewCardProps {
  config: TextToImageFontConfig;
}

/**
 * 方案 A：CSS 直接渲染
 * 优点：性能最好，无需 Canvas，加载快
 * 缺点：样式效果有限（无法实现复杂渐变、阴影等）
 */
export default function FontPreviewCardCSS({ config }: FontPreviewCardProps) {
  const [fontLoaded, setFontLoaded] = useState(false);
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
        setFontLoaded(true); // 即使失败也显示，使用 fallback 字体
      }
    };

    loadFont();
  }, [config]);

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-neutral-800/50 backdrop-blur-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
      {/* Preview Area - CSS 渲染 */}
      <div 
        className="relative w-full aspect-video bg-black/50 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: config.defaultBgColor || '#000000'
        }}
      >
        <div
          className={`text-center transition-opacity duration-300 ${
            fontLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: `"${config.fontName}", sans-serif`,
            fontSize: '2.5rem',
            color: config.defaultColor,
            fontWeight: 'bold',
            padding: '1rem',
            wordBreak: 'break-word',
            maxWidth: '100%',
          }}
        >
          {config.previewText}
        </div>
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


