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
    name: "MontserratThin",
    file: "/Montserrat/Montserrat-Thin-10.otf",
    displayName: "Montserrat Thin",
  },
  {
    name: "MontserratLight",
    file: "/Montserrat/Montserrat-Light-6.otf",
    displayName: "Montserrat Light",
  },
  {
    name: "MontserratRegular",
    file: "/Montserrat/Montserrat-Regular-8.otf",
    displayName: "Montserrat Regular",
  },
  {
    name: "MontserratMedium",
    file: "/Montserrat/Montserrat-Medium-7.otf",
    displayName: "Montserrat Medium",
  },
  {
    name: "MontserratSemiBold",
    file: "/Montserrat/Montserrat-SemiBold-9.otf",
    displayName: "Montserrat SemiBold",
  },
  {
    name: "MontserratBold",
    file: "/Montserrat/Montserrat-Bold-3.otf",
    displayName: "Montserrat Bold",
  },
  {
    name: "MontserratExtraBold",
    file: "/Montserrat/Montserrat-ExtraBold-4.otf",
    displayName: "Montserrat ExtraBold",
  },
  {
    name: "MontserratBlack",
    file: "/Montserrat/Montserrat-Black-2.otf",
    displayName: "Montserrat Black",
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


