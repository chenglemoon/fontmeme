"use client";

import { useState, useCallback } from 'react';

export interface CompressOption {
  preview: {
    maxSize: number;
  };
  resize: {
    method?: 'fitWidth' | 'fitHeight';
    width?: number;
    height?: number;
  };
  format: {
    target?: string;
    transparentFill: string;
  };
  jpeg: number; // quality 0-1
  png: {
    colors: number;
    dithering: number;
  };
  gif: {
    colors: number;
    dithering: boolean;
  };
  avif: {
    quality: number;
    speed: number;
  };
}

export interface ImageInfo {
  key: string;
  name: string;
  blob: File;
  width: number;
  height: number;
  src: string;
  preview?: {
    src: string;
    blob: Blob;
  };
  compress?: {
    src: string;
    blob: Blob;
    width?: number;
    height?: number;
  };
}

const DefaultCompressOption: CompressOption = {
  preview: {
    maxSize: 256,
  },
  resize: {
    method: undefined,
    width: undefined,
    height: undefined,
  },
  format: {
    target: undefined,
    transparentFill: '#FFFFFF',
  },
  jpeg: 0.7,
  png: {
    colors: 32,
    dithering: 0,
  },
  gif: {
    colors: 128,
    dithering: false,
  },
  avif: {
    quality: 50,
    speed: 8,
  },
};

export function useCompressorStore() {
  const [list, setList] = useState<Map<string, ImageInfo>>(new Map());
  const [option, setOption] = useState<CompressOption>(DefaultCompressOption);
  const [compareId, setCompareId] = useState<string | null>(null);

  const addImage = useCallback((info: ImageInfo) => {
    setList((prev) => {
      const newMap = new Map(prev);
      newMap.set(info.key, info);
      return newMap;
    });
  }, []);

  const updateImage = useCallback((key: string, updates: Partial<ImageInfo>) => {
    setList((prev) => {
      const newMap = new Map(prev);
      const existing = newMap.get(key);
      if (existing) {
        newMap.set(key, { ...existing, ...updates });
      }
      return newMap;
    });
  }, []);

  const removeImage = useCallback((key: string) => {
    setList((prev) => {
      const newMap = new Map(prev);
      const item = newMap.get(key);
      if (item?.compress?.src) {
        URL.revokeObjectURL(item.compress.src);
      }
      if (item?.preview?.src) {
        URL.revokeObjectURL(item.preview.src);
      }
      if (item?.src) {
        URL.revokeObjectURL(item.src);
      }
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clearAll = useCallback(() => {
    setList((prev) => {
      prev.forEach((item) => {
        if (item.compress?.src) URL.revokeObjectURL(item.compress.src);
        if (item.preview?.src) URL.revokeObjectURL(item.preview.src);
        if (item.src) URL.revokeObjectURL(item.src);
      });
      return new Map();
    });
  }, []);

  const resetOption = useCallback(() => {
    setOption(DefaultCompressOption);
  }, []);

  const setQuality = useCallback((value: number) => {
    const percent = value / 100;
    setOption((prev) => ({
      ...prev,
      jpeg: percent,
      png: {
        ...prev.png,
        colors: Math.max(2, Math.floor(256 * percent)),
      },
      gif: {
        ...prev.gif,
        colors: Math.max(2, Math.floor(256 * percent)),
      },
      avif: {
        ...prev.avif,
        quality: value,
      },
    }));
  }, []);

  const setFormat = useCallback((value: string, color?: string) => {
    setOption((prev) => ({
      ...prev,
      format: {
        target: value === 'auto' ? undefined : value,
        transparentFill: color || prev.format.transparentFill,
      },
    }));
  }, []);

  const setSizeType = useCallback((type: string, value?: number) => {
    setOption((prev) => ({
      ...prev,
      resize: {
        method: type === 'auto' ? undefined : (type as 'fitWidth' | 'fitHeight'),
        width: type === 'fitWidth' ? value : undefined,
        height: type === 'fitHeight' ? value : undefined,
      },
    }));
  }, []);

  const hasTaskRunning = useCallback(() => {
    for (const value of list.values()) {
      if (!value.preview || !value.compress) {
        return true;
      }
    }
    return false;
  }, [list]);

  const getProgressHintInfo = useCallback(() => {
    const totalNum = list.size;
    let loadedNum = 0;
    let originSize = 0;
    let outputSize = 0;
    
    for (const info of list.values()) {
      if (!info?.blob) continue;
      originSize += info.blob.size;
      if (info.compress) {
        loadedNum++;
        outputSize += info.compress.blob.size;
      }
    }
    
    const percent = totalNum > 0 ? Math.ceil((loadedNum * 100) / totalNum) : 0;
    const originRate = originSize > 0 ? ((outputSize - originSize) * 100) / originSize : 0;
    const rate = Number(Math.abs(originRate).toFixed(2));

    return {
      totalNum,
      loadedNum,
      originSize,
      outputSize,
      percent,
      rate
    };
  }, [list]);

  const reCompress = useCallback(() => {
    // This will be handled by the compression logic
    list.forEach((info) => {
      if (info.compress?.src) {
        URL.revokeObjectURL(info.compress.src);
      }
      updateImage(info.key, { compress: undefined });
    });
  }, [list, updateImage]);

  return {
    list,
    option,
    compareId,
    setCompareId,
    addImage,
    updateImage,
    removeImage,
    clearAll,
    resetOption,
    setQuality,
    setFormat,
    setSizeType,
    hasTaskRunning,
    getProgressHintInfo,
    reCompress,
  };
}


