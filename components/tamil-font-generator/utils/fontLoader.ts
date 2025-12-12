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
    name: "BaminiTamil",
    file: "/Tamil/Bamini_Tamil.ttf",
    displayName: "Bamini Tamil",
  },
  {
    name: "BaminiTamil01",
    file: "/Tamil/Bamini_Tamil_01.ttf",
    displayName: "Bamini Tamil 01",
  },
  {
    name: "BaminiTamil02",
    file: "/Tamil/Bamini_Tamil_02.ttf",
    displayName: "Bamini Tamil 02",
  },
  {
    name: "BaminiTamil03",
    file: "/Tamil/Bamini_Tamil_03.ttf",
    displayName: "Bamini Tamil 03",
  },
  {
    name: "BaminiTamil04",
    file: "/Tamil/Bamini_Tamil_04.ttf",
    displayName: "Bamini Tamil 04",
  },
  {
    name: "BaminiTamil05",
    file: "/Tamil/Bamini_Tamil_05.ttf",
    displayName: "Bamini Tamil 05",
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
      return part;
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



