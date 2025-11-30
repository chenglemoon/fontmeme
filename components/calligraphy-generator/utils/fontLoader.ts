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
    name: "ArizoniaRegular",
    file: "/Arizonia-Regular/Arizonia-Regular-OTF.otf",
    displayName: "Arizonia Regular",
  },
  {
    name: "BillionStars",
    file: "/Billion-Stars/BillionStars-PersonalUse-1.ttf",
    displayName: "Billion Stars",
  },
  {
    name: "KenCalligraphic",
    file: "/Ken__039_s_Calligraphic/kencall.ttf",
    displayName: "Ken's Calligraphic",
  },
  {
    name: "AdineKirnbergAlternate",
    file: "/Adine_Kirnberg_Alternate/Adksa___.ttf",
    displayName: "AdineKirnberg Alternate",
  },
  {
    name: "ChanceryCursive",
    file: "/Chancery-Cursive/chancur-1.ttf",
    displayName: "Chancery Cursive",
  },
  {
    name: "ArtBrewery",
    file: "/Art-Brewery/Art-Brewery-1.ttf",
    displayName: "Art Brewery",
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

