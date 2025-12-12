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
    name: "Minecraft",
    file: "/Minecraft/Minecraft-1.ttf",
    displayName: "Minecraft",
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
    const font = new FontFace(fontInfo.name, `url(${fontInfo.file})`);
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



