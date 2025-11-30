"use client";

import { useState } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FontCard from "./FontCard";
import { FONT_STYLES } from "./fonts";

const HOME_DISPLAY_LIMIT = 30; // 首页显示的数量

export default function FontGenerator() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("FontGenerator.generator");
  const tHome = useTranslations("Home.fontGeneratorTabs");
  const [text, setText] = useState("");
  const maxLength = 150;

  // 判断是否在首页
  const isHomePage = pathname === `/${locale}` || pathname === "/";
  
  // 如果在首页，只显示前60个；如果在 font-generator 页面，显示全部
  const displayedFonts = isHomePage 
    ? FONT_STYLES.slice(0, HOME_DISPLAY_LIMIT)
    : FONT_STYLES;
  
  const hasMore = isHomePage && FONT_STYLES.length > HOME_DISPLAY_LIMIT;

  const handleMore = () => {
    router.push(`/${locale}/font-generator`);
  };

  return (
    <section className="py-12 mb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Section */}
        <div className="relative">
          <Input
            type="text"
            className="flex h-24 w-full ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-emerald-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-lg p-6 pr-20 bg-neutral-800 border-2 border-emerald-500 rounded-xl text-emerald-400"
            placeholder={t("placeholder")}
            value={text}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setText(e.target.value);
              }
            }}
            maxLength={maxLength}
          />
          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-neutral-700 text-white text-sm">
            {text.length}/{maxLength}
          </div>
        </div>

        {/* More Button - 放在输入框下方 */}
        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={handleMore}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
            >
              {tHome("moreButton")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Font Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFonts.map((font) => (
            <FontCard
              key={font.name}
              fontName={font.name}
              displayName={font.displayName}
              text={text || t("defaultText")}
              unicodeStyle={font.unicodeStyle}
              fallback={font.fallback}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

