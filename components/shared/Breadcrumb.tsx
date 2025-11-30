"use client";

import { useState, useEffect } from "react";
import { Link as I18nLink, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// 路径到翻译命名空间的映射
const pathToNamespace: Record<string, string> = {
  "/": "Home",
  "/font-generator": "FontGenerator",
  "/carly-rae-jepsen-font": "CarlyRaeJepsenFont",
  "/calligraphy-generator": "CalligraphyGenerator",
  "/pokemon-font": "PokemonFont",
  "/minecraft-font": "MinecraftFont",
  "/the-life-of-a-showgirl-font": "TheLifeOfAShowgirlFont",
  "/disney-font": "DisneyFont",
  "/brat-font": "BratFont",
  "/graffiti-generator": "GraffitiGenerator",
  "/hindi-font-generator": "HindiFontGenerator",
  "/tamil-font-generator": "TamilFontGenerator",
  "/undertale-font": "UndertaleFont",
  "/coca-cola-font": "CocaColaFont",
  "/demon-slayer-font": "DemonSlayerFont",
  "/gta-font": "GtaFont",
  "/squid-game-font": "SquidGameFont",
  "/montserrat-font": "MontserratFont",
  "/malayalam-font-generator": "MalayalamFontGenerator",
  "/sonic-font": "SonicFont",
  "/plus-jakarta-sans": "PlusJakartaSans",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const tHeader = useTranslations("Header");
  const [isScrolled, setIsScrolled] = useState(false);

  // 检测滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 规范化路径（移除语言前缀）
  let normalizedPathname = pathname;
  if (normalizedPathname.match(/^\/[a-z]{2}(-[A-Z]{2})?\//)) {
    normalizedPathname = normalizedPathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?\//, "/");
  }
  normalizedPathname = normalizedPathname.replace(/\/$/, "") || "/";

  // 如果是首页，不显示面包屑
  if (normalizedPathname === "/") {
    return null;
  }

  // 获取首页链接
  const links = tHeader.raw("links") as Array<{ href: string; name: string }>;
  const homeLink = links[0] || { href: "/", name: "Home" };

  // 获取当前页面名称
  const namespace = pathToNamespace[normalizedPathname];
  let currentPageName = normalizedPathname;

  if (namespace) {
    // 使用 useTranslations 获取翻译，如果失败则使用后备方案
    const tPageHero = useTranslations(`${namespace}.hero`);
    const tPageMeta = useTranslations(`${namespace}.metadata`);
    
    // 尝试获取 hero.title，如果不存在则使用 metadata.title
    const heroTitle = tPageHero.raw("title");
    const metaTitle = tPageMeta.raw("title");
    
    if (heroTitle && typeof heroTitle === "string") {
      currentPageName = heroTitle;
    } else if (metaTitle && typeof metaTitle === "string") {
      currentPageName = metaTitle;
    } else {
      // 如果翻译不存在，使用路径作为后备
      currentPageName = normalizedPathname
        .split("/")
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()) || normalizedPathname;
    }
  } else {
    // 如果没有映射，从路径生成名称
    currentPageName = normalizedPathname
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()) || normalizedPathname;
  }

  return (
    <>
      {/* 初始位置的面包屑 */}
      <div className="mb-6">
        <nav 
          className="w-full flex items-center gap-2 text-sm py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm" 
          aria-label="Breadcrumb"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2">
              <I18nLink
                href={homeLink.href}
                className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors"
              >
                {homeLink.name}
              </I18nLink>
              <span className="text-gray-300 dark:text-gray-400">{" > "}</span>
              <span className="text-white dark:text-gray-100 font-medium">
                {currentPageName}
              </span>
            </div>
          </div>
        </nav>
      </div>

      {/* 滚动时固定的面包屑 */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isScrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav 
          className="w-full flex items-center gap-2 text-sm py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-md" 
          aria-label="Breadcrumb"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2">
              <I18nLink
                href={homeLink.href}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                {homeLink.name}
              </I18nLink>
              <span className="text-gray-600 dark:text-gray-300">{" > "}</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {currentPageName}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

