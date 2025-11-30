"use client";

import React from "react";
import FontPreviewCard from "./FontPreviewCard";
import { TEXT_TO_IMAGE_FONTS } from "./textToImageFonts";

export default function FontPreviewGrid() {
  // 首页显示所有 Text to Image Fonts
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
      {TEXT_TO_IMAGE_FONTS.map((font) => (
        <FontPreviewCard key={font.id} config={font} />
      ))}
    </div>
  );
}
