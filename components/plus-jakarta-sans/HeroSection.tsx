"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Download, WandSparkles, Copy, Check } from "lucide-react";
import { AVAILABLE_FONTS, loadFont, preloadFonts } from "./utils/fontLoader";
import { renderText, downloadCanvas, canvasToBlob } from "./utils/canvasRenderer";
import ColorPicker from "./ColorPicker";

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

export default function HeroSection() {
  const t = useTranslations("PlusJakartaSans.hero");
  const tGen = useTranslations("PlusJakartaSans.generator");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("PLUS JAKARTA SANS");
  const [selectedFont, setSelectedFont] = useState(AVAILABLE_FONTS[0].name); // PlusJakartaTextRegular
  const [fontSize, setFontSize] = useState([65]);
  const [color, setColor] = useState("#10b981"); // Default emerald
  const [secondColor, setSecondColor] = useState("#14b8a6"); // teal-500
  const [backgroundColor, setBackgroundColor] = useState("#000000"); // black
  const [effect, setEffect] = useState("None");
  const [isGenerating, setIsGenerating] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState<number | undefined>(800);
  const [canvasHeight, setCanvasHeight] = useState<number | undefined>(600);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [copied, setCopied] = useState(false);

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
        backgroundColor,
        // 预览时始终使用自动尺寸
        canvasWidth: undefined,
        canvasHeight: undefined,
      });

      // 更新默认尺寸为当前canvas的实际尺寸
      if (canvasRef.current) {
        setCanvasWidth(canvasRef.current.width);
        setCanvasHeight(canvasRef.current.height);
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [text, selectedFont, fontSize, color, effect, secondColor, backgroundColor, fontsLoaded]);

  // 当参数改变时自动生成
  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        generateImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [text, selectedFont, fontSize, color, effect, secondColor, backgroundColor, fontsLoaded, generateImage]);

  const handleDownload = async () => {
    if (canvasRef.current) {
      await downloadCanvas(
        canvasRef.current, 
        `plus-jakarta-sans-${Date.now()}.png`,
        canvasWidth,
        canvasHeight
      );
    }
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current || !text) return;

    try {
      const blob = await canvasToBlob(canvasRef.current);
      if (!blob) {
        throw new Error("Failed to convert canvas to blob for copy.");
      }

      // 使用 Clipboard API 复制图片
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy image:", error);
      // 降级方案：复制纯文本
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (textError) {
        console.error("Failed to copy text:", textError);
        alert("无法复制到剪贴板，请使用下载功能");
      }
    }
  };

  return (
    <main id="hero" className="relative overflow-hidden bg-black">
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"></div>
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]"></div>
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]"></div>
      </div>

      <section className="relative pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl px-6">
          {/* Title Section */}
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
            <div className="relative mt-4 sm:mt-6 lg:mt-8">
              <h1 className="text-4xl font-bricolage-grotesque lg:text-5xl xl:text-6xl 2xl:text-[4rem] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent whitespace-nowrap lg:whitespace-normal">
                {t("title")}
              </h1>
            </div>
            <div className="relative mx-auto mt-4 max-w-4xl sm:mt-6">
              <p className="text-balance text-lg text-white/80">
                <span>{t("description")}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="mx-auto mt-4 max-w-5xl px-6 sm:mt-6 md:mt-8">
          <div className="relative mx-auto overflow-hidden rounded-3xl bg-transparent backdrop-blur-xl p-4 sm:p-6 shadow-xl shadow-gray-200/5 dark:shadow-black/5">
            <div className="space-y-6">
              {/* Text Input */}
              <div className="relative">
                <Textarea
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={tGen("textPlaceholder")}
                  maxLength={200}
                  className="border-input aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content w-full shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-36 resize-none bg-[#1a1a1a]/40 border-0 p-6 pr-12 text-base rounded-2xl focus-visible:ring-2 focus-visible:ring-[var(--brand-success)]/50 focus-visible:border-transparent transition-all placeholder:text-gray-500 text-white"
                />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm transition-colors text-gray-400 bg-[#1a1a1a]/70">
                      {text.length}/200
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls Grid - Desktop */}
              <div className="hidden lg:block relative">
                <div className="flex flex-col gap-4 bg-[#1a1a1a]/40 rounded-xl p-4">
                  {/* First Row - Font, Effect, Colors */}
                  <div className="flex items-center gap-4">
                    {/* Font Selection */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Label className="font-medium text-sm cursor-pointer select-none text-white/90">
                        {tGen("fontLabel")}
                      </Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger className="w-[200px] bg-[#1a1a1a]/70 border-0 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-gray-700 text-white shadow-xl">
                          {AVAILABLE_FONTS.map((font) => (
                            <SelectItem
                              key={font.name}
                              value={font.name}
                              className="text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white data-[highlighted]:bg-gray-800 data-[highlighted]:text-white cursor-pointer"
                            >
                              {font.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-6 w-px bg-gray-700 shrink-0"></div>

                    {/* Effect Selection */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Label className="font-medium text-sm cursor-pointer select-none text-white/90">
                        {tGen("effectLabel")}
                      </Label>
                      <Select value={effect} onValueChange={setEffect}>
                        <SelectTrigger className="w-[150px] bg-[#1a1a1a]/70 border-0 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-gray-700 text-white shadow-xl">
                          {BASIC_EFFECTS.map((eff) => (
                            <SelectItem
                              key={eff.value}
                              value={eff.value}
                              className="text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white data-[highlighted]:bg-gray-800 data-[highlighted]:text-white cursor-pointer"
                            >
                              {eff.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-6 w-px bg-gray-700 shrink-0"></div>

                    {/* Color Pickers */}
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                        {tGen("colorLabel")}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <div
                              className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                              style={{ backgroundColor: color }}
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                          <ColorPicker color={color} onChange={setColor} />
                        </PopoverContent>
                      </Popover>

                      {effect.startsWith("Gradient") && (
                        <>
                          <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                            {tGen("secondColorLabel")}
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <div
                                  className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                                  style={{ backgroundColor: secondColor }}
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                              <ColorPicker color={secondColor} onChange={setSecondColor} />
                            </PopoverContent>
                          </Popover>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Background Color & Custom Size Row */}
                  <div className="flex items-center gap-4">
                    <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                      {tGen("backgroundColorLabel")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                            style={{ backgroundColor: backgroundColor }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                        <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                      </PopoverContent>
                    </Popover>

                    <div className="h-6 w-px bg-gray-700 shrink-0"></div>

                    {/* Custom Size Toggle */}
                    <div className="flex items-center gap-3">
                      <Label htmlFor="custom-size-switch" className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                        {tGen("customSizeLabel")}
                      </Label>
                      <Switch
                        id="custom-size-switch"
                        checked={useCustomSize}
                        onCheckedChange={setUseCustomSize}
                        className="data-[state=checked]:bg-[var(--brand-success)] data-[state=unchecked]:bg-gray-700"
                      />
                    </div>

                    {useCustomSize && (
                      <>
                        <div className="h-6 w-px bg-gray-700 shrink-0"></div>
                        <div className="flex items-center gap-3 flex-1">
                          <Label htmlFor="canvas-width" className="font-medium text-sm text-white/90 shrink-0">
                            {tGen("widthLabel")}
                          </Label>
                          <Input
                            id="canvas-width"
                            type="number"
                            value={canvasWidth}
                            onChange={(e) => setCanvasWidth(Math.max(100, Math.min(5000, parseInt(e.target.value) || 0)))}
                            min={100}
                            max={5000}
                            className="w-24 bg-[#1a1a1a]/70 border-0 text-white text-center"
                          />
                          <Label htmlFor="canvas-height" className="font-medium text-sm text-white/90 shrink-0">
                            {tGen("heightLabel")}
                          </Label>
                          <Input
                            id="canvas-height"
                            type="number"
                            value={canvasHeight}
                            onChange={(e) => setCanvasHeight(Math.max(100, Math.min(5000, parseInt(e.target.value) || 0)))}
                            min={100}
                            max={5000}
                            className="w-24 bg-[#1a1a1a]/70 border-0 text-white text-center"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Third Row - Font Size with full width slider and Generate Button */}
                  <div className="flex items-center gap-4">
                    <Label className="font-medium text-sm whitespace-nowrap text-white/90 shrink-0 min-w-[100px]">
                      {tGen("sizeLabel")}: {fontSize[0]}px
                    </Label>
                    <div className="flex-1 min-w-[150px]">
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        min={5}
                        max={300}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={generateImage}
                      disabled={isGenerating}
                      className="bg-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] text-white font-semibold h-12 px-8 text-base rounded-2xl transition-all shadow-lg hover:shadow-xl border-0 shrink-0"
                    >
                      <div className="flex items-center gap-2">
                        <WandSparkles className="h-5 w-5" />
                        <span>{isGenerating ? tGen("generating") : tGen("generate")}</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Controls */}
              <div className="flex lg:hidden flex-col gap-4">
                <div className="relative">
                  <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a]/40 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Label className="font-medium text-sm cursor-pointer select-none text-white/90">
                        {tGen("fontLabel")}
                      </Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger className="flex-1 bg-[#1a1a1a]/70 border-0 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-gray-700 text-white shadow-xl">
                          {AVAILABLE_FONTS.map((font) => (
                            <SelectItem
                              key={font.name}
                              value={font.name}
                              className="text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white data-[highlighted]:bg-gray-800 data-[highlighted]:text-white cursor-pointer"
                            >
                              {font.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-[#1a1a1a]/40 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Label className="font-medium text-sm text-white/90 whitespace-nowrap shrink-0">
                      {tGen("sizeLabel")}
                    </Label>
                    <div className="flex-1 min-w-[150px]">
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        min={5}
                        max={300}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm text-white/90 min-w-[50px] text-right shrink-0">
                      {fontSize[0]}px
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                      {tGen("effectLabel")}
                    </Label>
                    <Select value={effect} onValueChange={setEffect}>
                      <SelectTrigger className="flex-1 bg-[#1a1a1a]/70 border-0 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-900 border-gray-700 text-white shadow-xl">
                        {BASIC_EFFECTS.map((eff) => (
                          <SelectItem
                            key={eff.value}
                            value={eff.value}
                            className="text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white data-[highlighted]:bg-gray-800 data-[highlighted]:text-white cursor-pointer"
                          >
                            {eff.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                      {tGen("colorLabel")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                        <ColorPicker color={color} onChange={setColor} />
                      </PopoverContent>
                    </Popover>

                    {effect.startsWith("Gradient") && (
                      <>
                        <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                          {tGen("secondColorLabel")}
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <div
                                className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                                style={{ backgroundColor: secondColor }}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                            <ColorPicker color={secondColor} onChange={setSecondColor} />
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                      {tGen("backgroundColorLabel")}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <div
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-emerald-500 transition-all"
                            style={{ backgroundColor: backgroundColor }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 bg-neutral-900 border-gray-700 shadow-xl">
                        <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Custom Size Toggle (Mobile) */}
                  <div className="flex items-center gap-3">
                    <Label htmlFor="custom-size-switch-mobile" className="font-medium text-sm cursor-pointer select-none text-white/90 shrink-0">
                      {tGen("customSizeLabel")}
                    </Label>
                    <Switch
                      id="custom-size-switch-mobile"
                      checked={useCustomSize}
                      onCheckedChange={setUseCustomSize}
                      className="data-[state=checked]:bg-[var(--brand-success)] data-[state=unchecked]:bg-gray-700"
                    />
                  </div>

                  {useCustomSize && (
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Label htmlFor="canvas-width-mobile" className="font-medium text-sm text-white/90 shrink-0">
                        {tGen("widthLabel")}
                      </Label>
                      <Input
                        id="canvas-width-mobile"
                        type="number"
                        value={canvasWidth}
                        onChange={(e) => setCanvasWidth(Math.max(100, Math.min(5000, parseInt(e.target.value) || 0)))}
                        min={100}
                        max={5000}
                        className="flex-1 bg-[#1a1a1a]/70 border-0 text-white text-center"
                      />
                      <Label htmlFor="canvas-height-mobile" className="font-medium text-sm text-white/90 shrink-0">
                        {tGen("heightLabel")}
                      </Label>
                      <Input
                        id="canvas-height-mobile"
                        type="number"
                        value={canvasHeight}
                        onChange={(e) => setCanvasHeight(Math.max(100, Math.min(5000, parseInt(e.target.value) || 0)))}
                        min={100}
                        max={5000}
                        className="flex-1 bg-[#1a1a1a]/70 border-0 text-white text-center"
                      />
                    </div>
                  )}

                  <Button
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="w-full bg-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] text-white font-semibold h-12 text-base rounded-2xl transition-all shadow-lg hover:shadow-xl border-0"
                  >
                    <div className="flex items-center gap-3">
                      <WandSparkles className="h-5 w-5" />
                      <span>{isGenerating ? tGen("generating") : tGen("generate")}</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="relative px-4 py-8 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 space-y-6">
          <div className="bg-neutral-900/70 p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-700/60">
            <div className="flex-1 flex items-center justify-center bg-black rounded-2xl p-8 min-h-[300px]">
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
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={handleDownload}
                variant="outline"
                disabled={!fontsLoaded}
                className="bg-white/10 dark:bg-card/70 border-gray-700/60 hover:bg-white/20 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {tGen("download")}
              </Button>
              <Button
                onClick={handleCopyImage}
                variant="outline"
                disabled={!fontsLoaded || !text}
                className="bg-white/10 dark:bg-card/70 border-gray-700/60 hover:bg-white/20 text-white"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? tGen("copied") : tGen("copy")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

