"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { convertToUnicode } from "./utils/unicodeConverter";

interface FontCardProps {
  fontName: string;
  displayName: string;
  text: string;
  unicodeStyle: string;
  fallback?: string;
}

export default function FontCard({
  fontName,
  displayName,
  text,
  unicodeStyle,
  fallback = "sans-serif",
}: FontCardProps) {
  const [copied, setCopied] = useState(false);

  // 转换为 Unicode 样式文本
  const unicodeText = convertToUnicode(text || "Type your text here...", unicodeStyle);

  const handleCopy = async () => {
    try {
      // 直接复制 Unicode 文本，这样粘贴到任何地方都能保持样式
      await navigator.clipboard.writeText(unicodeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg shadow-sm p-6 bg-white dark:bg-neutral-800 border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">{displayName}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-800 dark:text-gray-200 hover:text-emerald-500"
          onClick={handleCopy}
          aria-label="Copy text"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p
        className="text-xl break-words min-h-[60px] text-gray-900 dark:text-gray-100"
        style={{ fontFamily: fallback }}
      >
        {unicodeText}
      </p>
    </motion.div>
  );
}

