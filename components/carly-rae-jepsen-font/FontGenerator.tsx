"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download, RefreshCw } from "lucide-react";
import { AVAILABLE_FONTS, loadFont, preloadFonts } from "./utils/fontLoader";
import { renderText, downloadCanvas, type RenderOptions } from "./utils/canvasRenderer";
import { HexColorPicker } from "react-colorful";

// 基础效果列表
const BASIC_EFFECTS = [
  { value: "None", label: "None" },
  { value: "Gradient-H", label: "Gradient-H" },
  { value: "Gradient-V", label: "Gradient-V" },
  { value: "Gradient-R", label: "Gradient-R" },
  { value: "Shadow-S", label: "Shadow-S" },
  { value: "Shadow-L", label: "Shadow-L" },
  { value: "Outline-A", label: "Outline-A" },
  { value: "Outline-B", label: "Outline-B" },
  { value: "Outline-D", label: "Outline-D" },
];

export default function FontGenerator() {
  const t = useTranslations("CarlyRaeJepsenFont.generator");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("E•MO•TION");
  const [selectedFont, setSelectedFont] = useState(AVAILABLE_FONTS[0].name);
  const [fontSize, setFontSize] = useState([65]);
  const [color, setColor] = useState("#5584AC");
  const [secondColor, setSecondColor] = useState("#19CACA");
  const [effect, setEffect] = useState("None");
  const [isGenerating, setIsGenerating] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 预加载字体
  useEffect(() => {
    preloadFonts().then(() => {
      setFontsLoaded(true);
      generateImage();
    });
  }, []);

  // 生成图像
  const generateImage = useCallback(async () => {
    if (!canvasRef.current || !fontsLoaded) return;

    setIsGenerating(true);
    try {
      // 确保字体已加载
      const fontInfo = AVAILABLE_FONTS.find((f) => f.name === selectedFont);
      if (fontInfo) {
        await loadFont(fontInfo);
      }

      await renderText(canvasRef.current, {
        text: text || "Your Text Here",
        fontName: selectedFont,
        fontSize: fontSize[0],
        color,
        effect,
        secondColor: effect.startsWith("Gradient") ? secondColor : undefined,
      });
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [text, selectedFont, fontSize, color, effect, secondColor, fontsLoaded]);

  // 当参数改变时自动生成
  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        generateImage();
      }, 300); // 防抖
      return () => clearTimeout(timer);
    }
  }, [text, selectedFont, fontSize, color, effect, secondColor, fontsLoaded, generateImage]);

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current, `carly-rae-jepsen-font-${Date.now()}.png`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：控制面板 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {t("title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t("description")}
            </p>
          </div>

          {/* 文本输入 */}
          <div className="space-y-2">
            <Label htmlFor="text-input">{t("textLabel")}</Label>
            <Textarea
              id="text-input"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("textPlaceholder")}
              maxLength={200}
              className="min-h-[100px]"
            />
            <p className="text-sm text-gray-500">{text.length}/200</p>
          </div>

          {/* 字体选择 */}
          <div className="space-y-2">
            <Label>{t("fontLabel")}</Label>
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_FONTS.map((font) => (
                  <SelectItem key={font.name} value={font.name}>
                    {font.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 字体大小 */}
          <div className="space-y-2">
            <Label>{t("sizeLabel")} ({fontSize[0]}px)</Label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={5}
              max={300}
              step={1}
              className="w-full"
            />
          </div>

          {/* 效果选择 */}
          <div className="space-y-2">
            <Label>{t("effectLabel")}</Label>
            <Select value={effect} onValueChange={setEffect}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BASIC_EFFECTS.map((eff) => (
                  <SelectItem key={eff.value} value={eff.value}>
                    {eff.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 颜色选择 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("colorLabel")}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {color}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker color={color} onChange={setColor} />
                </PopoverContent>
              </Popover>
            </div>

            {/* 第二颜色（仅渐变效果显示） */}
            {effect.startsWith("Gradient") && (
              <div className="space-y-2">
                <Label>{t("secondColorLabel")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                        style={{ backgroundColor: secondColor }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {secondColor}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <HexColorPicker color={secondColor} onChange={setSecondColor} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <Button
              onClick={generateImage}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {t("generating")}
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("generate")}
                </>
              )}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              disabled={!fontsLoaded}
            >
              <Download className="w-4 h-4 mr-2" />
              {t("download")}
            </Button>
          </div>
        </div>

        {/* 右侧：预览区域 */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("preview")}
            </h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
            {fontsLoaded ? (
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ display: "block" }}
              />
            ) : (
              <div className="text-gray-500">Loading fonts...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

