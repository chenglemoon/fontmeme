"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export default function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(color);
  const [isValidHex, setIsValidHex] = useState(true);

  useEffect(() => {
    setHexInput(color);
  }, [color]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(value)) {
      setIsValidHex(true);
      onChange(value);
    } else {
      setIsValidHex(value === "" || value === "#");
    }
  };

  // 预设颜色
  const presetColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#008000", "#000080",
  ];

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* 主颜色选择器 */}
      <div className="relative">
        <HexColorPicker 
          color={color} 
          onChange={onChange}
          className="!w-full !h-48"
        />
      </div>

      {/* Hex 输入框 */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-white/70">Hex Color</label>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-md border-2 border-gray-600 shrink-0"
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            onBlur={() => {
              if (!isValidHex) {
                setHexInput(color);
                setIsValidHex(true);
              }
            }}
            className={cn(
              "flex-1 h-8 px-3 rounded-md bg-neutral-800 border text-white text-sm",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
              isValidHex ? "border-gray-600" : "border-red-500"
            )}
            placeholder="#000000"
          />
        </div>
      </div>

      {/* 预设颜色 */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-white/70">Preset Colors</label>
        <div className="grid grid-cols-8 gap-2">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              onClick={() => {
                onChange(presetColor);
                setHexInput(presetColor);
              }}
              className={cn(
                "w-8 h-8 rounded-md border-2 transition-all hover:scale-110",
                color.toLowerCase() === presetColor.toLowerCase()
                  ? "border-emerald-400 ring-2 ring-emerald-400/50"
                  : "border-gray-600 hover:border-gray-500"
              )}
              style={{ backgroundColor: presetColor }}
              aria-label={`Select color ${presetColor}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



