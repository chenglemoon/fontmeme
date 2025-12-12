/**
 * 字体加载工具
 * 用于动态加载TTF/OTF字体文件
 */

export interface FontInfo {
  name: string;
  file: string;
  displayName: string;
}

export const AVAILABLE_FONTS: FontInfo[] = [
  {
    name: "PlusJakartaTextRegular",
    file: "/plus-jakarta-sans/PlusJakartaText-Regular.otf",
    displayName: "Plus Jakarta Text Regular",
  },
  {
    name: "PlusJakartaTextLight",
    file: "/plus-jakarta-sans/PlusJakartaText-Light.otf",
    displayName: "Plus Jakarta Text Light",
  },
  {
    name: "PlusJakartaTextBold",
    file: "/plus-jakarta-sans/PlusJakartaText-Bold.otf",
    displayName: "Plus Jakarta Text Bold",
  },
  {
    name: "PlusJakartaTextItalic",
    file: "/plus-jakarta-sans/PlusJakartaText-Italic.otf",
    displayName: "Plus Jakarta Text Italic",
  },
  {
    name: "PlusJakartaTextLightItalic",
    file: "/plus-jakarta-sans/PlusJakartaText-LightItalic.otf",
    displayName: "Plus Jakarta Text Light Italic",
  },
  {
    name: "PlusJakartaTextBoldItalic",
    file: "/plus-jakarta-sans/PlusJakartaText-BoldItalic.otf",
    displayName: "Plus Jakarta Text Bold Italic",
  },
  {
    name: "PlusJakartaDisplayRegular",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-Regular.otf",
    displayName: "Plus Jakarta Display Regular",
  },
  {
    name: "PlusJakartaDisplayLight",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-Light.otf",
    displayName: "Plus Jakarta Display Light",
  },
  {
    name: "PlusJakartaDisplayMedium",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-Medium.otf",
    displayName: "Plus Jakarta Display Medium",
  },
  {
    name: "PlusJakartaDisplayBold",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-Bold.otf",
    displayName: "Plus Jakarta Display Bold",
  },
  {
    name: "PlusJakartaDisplayItalic",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-Italic.otf",
    displayName: "Plus Jakarta Display Italic",
  },
  {
    name: "PlusJakartaDisplayLightItalic",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-LightItalic.otf",
    displayName: "Plus Jakarta Display Light Italic",
  },
  {
    name: "PlusJakartaDisplayMediumItalic",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-MediumItalic.otf",
    displayName: "Plus Jakarta Display Medium Italic",
  },
  {
    name: "PlusJakartaDisplayBoldItalic",
    file: "/plus-jakarta-sans/PlusJakartaDisplay-BoldItalic.otf",
    displayName: "Plus Jakarta Display Bold Italic",
  },
];

const loadedFonts = new Set<string>();

/**
 * 加载字体文件
 */
export async function loadFont(fontInfo: FontInfo): Promise<boolean> {
  if (loadedFonts.has(fontInfo.name)) {
    return true;
  }

  try {
    // 对文件路径进行 URL 编码以处理空格，使用 encodeURIComponent 确保所有特殊字符都被编码
    // 但保留路径分隔符，所以只编码文件名部分
    const pathParts = fontInfo.file.split('/');
    const encodedParts = pathParts.map((part, index) => {
      // 最后一个部分是文件名，需要编码
      if (index === pathParts.length - 1) {
        return encodeURIComponent(part);
      }
      // 目录名也需要编码（因为包含空格）
      return encodeURIComponent(part);
    });
    const encodedFile = encodedParts.join('/');
    const font = new FontFace(fontInfo.name, `url("${encodedFile}")`);
    await font.load();
    document.fonts.add(font);
    loadedFonts.add(fontInfo.name);
    return true;
  } catch (error) {
    console.error(`Failed to load font ${fontInfo.name}:`, error);
    return false;
  }
}

/**
 * 预加载所有字体
 */
export async function preloadFonts(): Promise<void> {
  await Promise.all(AVAILABLE_FONTS.map(loadFont));
}

/**
 * 检查字体是否已加载
 */
export function isFontLoaded(fontName: string): boolean {
  return loadedFonts.has(fontName);
}



