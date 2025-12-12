"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextToImageFontConfig } from "./textToImageFonts";

interface FontPreviewCardProps {
  config: TextToImageFontConfig;
}

/**
 * 方案 B：预生成静态图片
 * 优点：加载最快，最稳定，无需加载字体
 * 缺点：需要预生成和维护图片文件
 * 
 * 使用方式：将预览图片放在 /public/font-previews/ 目录下
 * 文件名格式：{fontId}.png 或 {fontId}.jpg
 */
export default function FontPreviewCardImage({ config }: FontPreviewCardProps) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  // 图片路径：/public/font-previews/{fontId}.png
  const imagePath = `/font-previews/${config.id}.png`;

  return (
    <div className="group relative rounded-xl overflow-hidden border border-neutral-800/50 backdrop-blur-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
      {/* Preview Area - 静态图片 */}
      <div className="relative w-full aspect-video bg-black/50 flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`${config.name} preview`}
            fill
            className="object-contain"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          // Fallback: 如果图片不存在，显示文本
          <div
            className="text-center text-white"
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              padding: '1rem',
            }}
          >
            {config.previewText}
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



