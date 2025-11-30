"use client";

import { useEffect, useState } from "react"
import { getImgColor } from './beautifier-utils';

export interface ImageSize {
    width?: number;
    height?: number;
}

export default function useImageColor(imgUrl: string) {
    const [imgColors, setImgColors] = useState<number[][]>([]);
    const [imgSize, setImageSize] = useState<ImageSize>({});
    useEffect(() => {
        getImgColor(imgUrl).then(({colors, width, height}) => {
            setImgColors(colors);
            setImageSize({width, height})
        })
        return (() => {
            setImgColors([]);
            setImageSize({});
        });
    }, [imgUrl]);
    return {imgColors, imgSize};
}