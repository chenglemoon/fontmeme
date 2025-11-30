"use client";

import { Mimes } from './compressor-mimes';
import { uniqId } from './compressor-utils';
import type { ImageInfo, CompressOption } from '@/stores/compressorStore';

// Simple compression using Canvas API (fallback when WebAssembly is not available)
export async function compressImage(
  info: ImageInfo,
  option: CompressOption
): Promise<{ blob: Blob; src: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Apply resize if needed
        if (option.resize.method === 'fitWidth' && option.resize.width) {
          height = (img.height * option.resize.width) / img.width;
          width = option.resize.width;
        } else if (option.resize.method === 'fitHeight' && option.resize.height) {
          width = (img.width * option.resize.height) / img.height;
          height = option.resize.height;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Fill background for JPEG conversion
        const targetFormat = option.format.target || info.blob.type.split('/')[1]?.split(';')[0];
        if (['jpg', 'jpeg'].includes(targetFormat?.toLowerCase() || '')) {
          ctx.fillStyle = option.format.transparentFill || '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Determine output format
        let mimeType = info.blob.type;
        let quality = 0.9;

        if (targetFormat) {
          const format = targetFormat.toLowerCase();
          if (format === 'jpg' || format === 'jpeg') {
            mimeType = Mimes.jpeg;
            quality = option.jpeg;
          } else if (format === 'png') {
            mimeType = Mimes.png;
          } else if (format === 'webp') {
            mimeType = Mimes.webp;
            quality = option.jpeg;
          }
        } else {
          // Use original format with quality adjustment
          if (info.blob.type === Mimes.jpeg || info.blob.type === Mimes.jpg) {
            quality = option.jpeg;
          } else if (info.blob.type === Mimes.webp) {
            quality = option.jpeg;
          }
        }

        // For PNG format, quality parameter is ignored (PNG is lossless)
        const blobQuality = (mimeType === Mimes.png) ? undefined : quality;
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            // Ensure blob has correct MIME type (some browsers may not set it correctly)
            const finalBlob = blob.type === mimeType 
              ? blob 
              : new Blob([blob], { type: mimeType });
            const src = URL.createObjectURL(finalBlob);
            resolve({ blob: finalBlob, src, width, height });
          },
          mimeType,
          blobQuality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = info.src;
  });
}

export async function createPreview(
  info: ImageInfo,
  option: CompressOption
): Promise<{ blob: Blob; src: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const maxSize = option.preview.maxSize || 256;
        let width = img.width;
        let height = img.height;

        // Scale down to preview size
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create preview'));
              return;
            }
            const src = URL.createObjectURL(blob);
            resolve({ blob, src });
          },
          'image/jpeg',
          0.8
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for preview'));
    };

    img.src = info.src;
  });
}

export async function createImage(
  file: File,
  dirName?: string
): Promise<ImageInfo> {
  let name = file.name;
  if (dirName) {
    name = dirName + name;
  }

  const info: ImageInfo = {
    key: uniqId().toString(),
    name,
    blob: file,
    width: 0,
    height: 0,
    src: URL.createObjectURL(file),
  };

  // Get image dimensions
  if (file.type === Mimes.svg) {
    const { width, height } = await new Promise<{ width: number; height: number }>((resolve) => {
      const img = new Image();
      img.src = info.src;
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
    });
    info.width = width;
    info.height = height;
  } else {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        info.width = img.width;
        info.height = img.height;
        resolve();
      };
      img.onerror = reject;
      img.src = info.src;
    });
  }

  return info;
}

