"use client";

import React, { useState, useEffect } from "react";
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
 * 方案 D：懒加载 + 图片缓存
 * 优点：结合静态图片和懒加载，性能好
 * 缺点：需要预生成图片，首次加载需要时间
 * 
 * 使用 Intersection Observer 实现懒加载
 */
export default function FontPreviewCardLazy({ config }: FontPreviewCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    router.push(`/${locale}${config.path}`);
  };

  const imagePath = `/font-previews/${config.id}.png`;

  return (
    <div 
      ref={cardRef}
      className="group relative rounded-xl overflow-hidden border border-neutral-800/50 backdrop-blur-xl bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20"
    >
      {/* Preview Area - 懒加载图片 */}
      <div className="relative w-full aspect-video bg-black/50 flex items-center justify-center overflow-hidden">
        {isVisible ? (
          !imageError ? (
            <Image
              src={imagePath}
              alt={`${config.name} preview`}
              fill
              className="object-contain"
              onError={() => setImageError(true)}
              loading="lazy"
              unoptimized
            />
          ) : (
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
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
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


