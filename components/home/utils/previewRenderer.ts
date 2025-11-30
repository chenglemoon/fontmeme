/**
 * 预览渲染工具
 * 用于在首页字体卡片上生成预览图
 */

export interface PreviewRenderOptions {
  text: string;
  fontName: string;
  fontFile: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
}

/**
 * 验证字体是否真正可用于 Canvas 渲染
 * 通过测量文本宽度来检测字体是否真正被应用（优化版本，更快）
 */
async function verifyFontReady(fontName: string, fontSize: number): Promise<boolean> {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) return false;

  // 使用一个代表性的测试字符（通常 "M" 或 "W" 最能体现字体差异）
  const testChar = "M";
  let retries = 0;
  const maxRetries = 20; // 最多等待 1 秒 (20 * 50ms)

  while (retries < maxRetries) {
    // 设置自定义字体并测量
    tempCtx.font = `${fontSize}px "${fontName}", sans-serif`;
    const customMetrics = tempCtx.measureText(testChar);
    
    // 设置 fallback 字体并测量
    tempCtx.font = `${fontSize}px sans-serif`;
    const fallbackMetrics = tempCtx.measureText(testChar);
    
    // 如果宽度差异足够大，说明自定义字体已被应用
    const widthDiff = Math.abs(customMetrics.width - fallbackMetrics.width);
    if (widthDiff > 0.5) {
      return true;
    }
    
    // 等待后重试（第一次立即检查，后续等待）
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    retries++;
  }

  return false;
}

/**
 * 加载字体
 */
// 字体加载缓存，避免重复加载
const fontLoadCache = new Map<string, Promise<boolean>>();

async function loadFont(fontName: string, fontFile: string, fontSize: number): Promise<boolean> {
  // 检查是否正在加载
  const cacheKey = `${fontName}-${fontSize}`;
  if (fontLoadCache.has(cacheKey)) {
    return fontLoadCache.get(cacheKey)!;
  }
  
  // 检查字体是否已加载（使用实际渲染时的大小）
  const alreadyChecked = document.fonts.check(`${fontSize}px "${fontName}"`);
  
  if (alreadyChecked) {
    // 对于已加载的字体，快速验证（减少等待时间）
    const verifyPromise = (async () => {
      // 只等待 50ms，然后立即验证
      await new Promise(resolve => setTimeout(resolve, 50));
      const isReady = await verifyFontReady(fontName, fontSize);
      if (isReady) {
        return true;
      }
      // 如果验证失败，继续加载流程
      return false;
    })();
    
    fontLoadCache.set(cacheKey, verifyPromise);
    const result = await verifyPromise;
    if (result) {
      return true;
    }
    // 验证失败，清除缓存继续加载
    fontLoadCache.delete(cacheKey);
  }

  // 创建加载 Promise
  const loadPromise = (async () => {
    try {
      // 对文件路径进行 URL 编码以处理空格
      // 与详情页保持一致：编码文件名部分，目录名部分如果包含空格也编码
      const pathParts = fontFile.split('/');
      const encodedParts = pathParts.map((part, index) => {
        // 跳过空字符串（开头的 / 分割后产生的）
        if (!part) return part;
        const isLastPart = index === pathParts.length - 1;
        // 文件名部分总是编码（与 Coca-Cola 等字体加载器一致）
        if (isLastPart) {
          return encodeURIComponent(part);
        }
        // 目录名部分：如果包含空格则编码，否则保持原样
        if (part.includes(' ')) {
          return encodeURIComponent(part);
        }
        return part;
      });
      const encodedFile = encodedParts.join('/');
      
      const font = new FontFace(fontName, `url("${encodedFile}")`);
      await font.load();
      document.fonts.add(font);
      
      // 等待 document.fonts.ready（如果还没准备好）
      if (document.fonts.status !== 'loaded') {
        await document.fonts.ready;
      }
      
      // 快速检查字体是否在 document.fonts 中可用（最多等待500ms）
      const maxWaitTime = 500;
      const startTime = Date.now();
      while (!document.fonts.check(`${fontSize}px "${fontName}"`)) {
        if (Date.now() - startTime > maxWaitTime) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 25)); // 减少等待间隔
      }
      
      // 减少等待时间，快速验证
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // 验证字体在 Canvas 中是否真正可用
      const isReady = await verifyFontReady(fontName, fontSize);
      return isReady;
    } catch (error) {
      return false;
    }
  })();
  
  fontLoadCache.set(cacheKey, loadPromise);
  const result = await loadPromise;
  if (!result) {
    fontLoadCache.delete(cacheKey);
  }
  return result;
}

/**
 * 渲染预览图到 Canvas
 */
export async function renderPreview(
  canvas: HTMLCanvasElement,
  options: PreviewRenderOptions
): Promise<void> {
  const { text, fontName, fontFile, fontSize, color, backgroundColor } = options;

  // 加载字体并等待其真正可用（loadFont 会验证字体在 Canvas 中是否真正可用）
  const fontLoaded = await loadFont(fontName, fontFile, fontSize);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // 分割文本为多行
  const lines = text.split('\n').filter(line => line.trim() !== '' || text.includes('\n'));

  // 使用临时canvas测量文本尺寸
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) {
    throw new Error("Failed to create temporary canvas context");
  }

  // 设置临时canvas的字体来测量文本（字体应该已经准备好了）
  tempCtx.font = `${fontSize}px "${fontName}", sans-serif`;
  
  // 计算多行文本的宽度和高度
  let maxTextWidth = 0;
  lines.forEach(line => {
    const metrics = tempCtx.measureText(line);
    maxTextWidth = Math.max(maxTextWidth, metrics.width);
  });
  
  const lineHeight = fontSize * 1.5;
  const textHeight = lines.length * lineHeight;
  const textWidth = maxTextWidth;

  // 设置Canvas尺寸（固定预览尺寸）
  const padding = Math.max(20, fontSize * 0.3);
  canvas.width = Math.max(300, textWidth + padding * 2);
  canvas.height = Math.max(150, textHeight + padding * 2);

  // 重新获取context（因为canvas尺寸改变会重置context）
  const context = canvas.getContext("2d");
  if (!context) return;

  // 绘制背景色
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 设置字体
  context.font = `${fontSize}px "${fontName}", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "top";

  const centerX = canvas.width / 2;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (canvas.height - totalTextHeight) / 2;

  // 渲染文本
  context.fillStyle = color;
  lines.forEach((line, index) => {
    context.fillText(line, centerX, startY + index * lineHeight);
  });
}

