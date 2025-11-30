"use client";

import { useEffect } from "react";
import { Mimes } from './compressor-mimes';

const supportImg = [
  Mimes.jpeg,
  Mimes.jpg,
  Mimes.png,
  Mimes.webp,
  Mimes.gif,
  Mimes.svg,
  Mimes.avif,
];

export default function usePaste(toPaste: (file: File) => void, dependencies: any[] = []) {
  useEffect(() => {
    const getPaste = async (e: ClipboardEvent) => {
      const data = e.clipboardData;
      if (!data || !data.items) return;
      const items = Array.from(data.items).filter((e: DataTransferItem) => supportImg.includes(e.type as any));
      if (!items.length) return;
      const file = items[0].getAsFile();
      if (file) {
        toPaste && toPaste(file);
      }
    };
    document.addEventListener('paste', getPaste, false);
    return () => {
      document.removeEventListener('paste', getPaste);
    };
  }, [document, ...dependencies]);
}


