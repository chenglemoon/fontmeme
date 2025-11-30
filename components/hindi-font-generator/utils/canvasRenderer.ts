/**
 * Canvas渲染引擎
 * 用于在Canvas上渲染文本和效果
 */

import { AVAILABLE_FONTS, type FontInfo } from "./fontLoader";

export interface RenderOptions {
  text: string;
  fontName: string;
  fontSize: number;
  color: string;
  effect: string;
  secondColor?: string;
  backgroundColor?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

/**
 * 在Canvas上渲染文本
 */
export async function renderText(
  canvas: HTMLCanvasElement,
  options: RenderOptions
): Promise<void> {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  const { text, fontName, fontSize, color, effect, secondColor, backgroundColor, canvasWidth, canvasHeight } = options;

  // 查找字体信息
  const fontInfo = AVAILABLE_FONTS.find((f) => f.name === fontName);
  if (!fontInfo) {
    throw new Error(`Font ${fontName} not found`);
  }

  // 分割文本为多行
  const lines = text.split('\n').filter(line => line.trim() !== '' || text.includes('\n'));

  // 使用临时canvas测量文本尺寸
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  if (!tempCtx) {
    throw new Error("Failed to create temporary canvas context");
  }

  // 设置临时canvas的字体来测量文本
  tempCtx.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
  
  // 计算多行文本的宽度和高度
  let maxTextWidth = 0;
  lines.forEach(line => {
    const metrics = tempCtx.measureText(line);
    maxTextWidth = Math.max(maxTextWidth, metrics.width);
  });
  
  const lineHeight = fontSize * 1.5;
  const textHeight = lines.length * lineHeight;
  const textWidth = maxTextWidth;

  // 设置Canvas尺寸
  if (canvasWidth && canvasHeight) {
    // 使用自定义尺寸
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  } else {
    // 自动计算尺寸（添加padding）
    const padding = Math.max(50, fontSize * 0.5);
    canvas.width = Math.max(400, textWidth + padding * 2);
    canvas.height = Math.max(200, textHeight + padding * 2);
  }

  // 重新获取context（因为canvas尺寸改变会重置context）
  const context = canvas.getContext("2d");
  if (!context) return;

  // 绘制背景色
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 设置字体
  context.font = `${fontSize}px "${fontInfo.name}", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "top";

  const centerX = canvas.width / 2;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (canvas.height - totalTextHeight) / 2;

  // 根据效果渲染文本
  switch (effect) {
    case "None":
      renderSimpleText(context, lines, centerX, startY, lineHeight, color);
      break;
    case "Gradient-H":
      renderGradientText(context, lines, centerX, startY, lineHeight, color, secondColor || "#000000", "horizontal");
      break;
    case "Gradient-V":
      renderGradientText(context, lines, centerX, startY, lineHeight, color, secondColor || "#000000", "vertical");
      break;
    case "Gradient-R":
      renderGradientText(context, lines, centerX, startY, lineHeight, color, secondColor || "#000000", "radial");
      break;
    case "Shadow-S":
      renderShadowText(context, lines, centerX, startY, lineHeight, color, "small");
      break;
    case "Shadow-L":
      renderShadowText(context, lines, centerX, startY, lineHeight, color, "large");
      break;
    case "Outline-A":
      renderOutlineText(context, lines, centerX, startY, lineHeight, color, "thin");
      break;
    case "Outline-B":
      renderOutlineText(context, lines, centerX, startY, lineHeight, color, "medium");
      break;
    case "Outline-D":
      renderOutlineText(context, lines, centerX, startY, lineHeight, color, "thick");
      break;
    default:
      renderSimpleText(context, lines, centerX, startY, lineHeight, color);
  }
}

/**
 * 渲染简单文本（支持多行）
 */
function renderSimpleText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  color: string
): void {
  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

/**
 * 渲染渐变文本（支持多行）
 */
function renderGradientText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  color1: string,
  color2: string,
  direction: "horizontal" | "vertical" | "radial"
): void {
  const totalHeight = lines.length * lineHeight;
  const centerY = y + totalHeight / 2;

  lines.forEach((line, index) => {
    const lineY = y + index * lineHeight;
    let gradient: CanvasGradient;

    if (direction === "horizontal") {
      const metrics = ctx.measureText(line);
      const lineWidth = metrics.width;
      gradient = ctx.createLinearGradient(x - lineWidth / 2, lineY, x + lineWidth / 2, lineY);
    } else if (direction === "vertical") {
      gradient = ctx.createLinearGradient(x, y, x, y + totalHeight);
    } else {
      const maxRadius = Math.max(200, totalHeight / 2);
      gradient = ctx.createRadialGradient(x, centerY, 0, x, centerY, maxRadius);
    }

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillText(line, x, lineY);
  });
}

/**
 * 渲染阴影文本（支持多行）
 */
function renderShadowText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  color: string,
  size: "small" | "large"
): void {
  const blur = size === "small" ? 5 : 15;
  const offset = size === "small" ? 3 : 8;

  // 绘制阴影
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = offset;
  ctx.shadowOffsetY = offset;

  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  // 重置阴影
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

/**
 * 渲染轮廓文本（支持多行）
 */
function renderOutlineText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  color: string,
  width: "thin" | "medium" | "thick"
): void {
  const lineWidth = width === "thin" ? 2 : width === "medium" ? 4 : 6;

  // 绘制轮廓
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;
  lines.forEach((line, index) => {
    ctx.strokeText(line, x, y + index * lineHeight);
  });

  // 绘制填充
  ctx.fillStyle = color;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

/**
 * 将Canvas转换为Blob
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      },
      "image/png",
      1.0
    );
  });
}

/**
 * 下载Canvas图像（支持自定义尺寸）
 */
export async function downloadCanvas(
  canvas: HTMLCanvasElement, 
  filename: string = "hindi-font.png",
  customWidth?: number,
  customHeight?: number
): Promise<void> {
  let finalCanvas = canvas;

  // 如果需要自定义尺寸，创建新canvas并缩放内容
  if (customWidth && customHeight) {
    const downloadCanvas = document.createElement("canvas");
    downloadCanvas.width = customWidth;
    downloadCanvas.height = customHeight;
    const ctx = downloadCanvas.getContext("2d");
    
    if (ctx) {
      // 获取原canvas的背景色（通过检查第一个像素）
      const originalCtx = canvas.getContext("2d");
      if (originalCtx) {
        const imageData = originalCtx.getImageData(0, 0, 1, 1);
        const [r, g, b, a] = imageData.data;
        
        // 如果第一个像素是背景色，使用它；否则使用黑色
        if (a > 0) {
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        } else {
          ctx.fillStyle = "#000000";
        }
        ctx.fillRect(0, 0, customWidth, customHeight);
      }
      
      // 缩放并绘制原canvas内容到中心（保持宽高比）
      const scaleX = customWidth / canvas.width;
      const scaleY = customHeight / canvas.height;
      const scale = Math.min(scaleX, scaleY); // 保持宽高比
      
      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;
      const offsetX = (customWidth - scaledWidth) / 2;
      const offsetY = (customHeight - scaledHeight) / 2;
      
      ctx.drawImage(
        canvas,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      );
      
      finalCanvas = downloadCanvas;
    }
  }

  finalCanvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, "image/png");
}
