declare module 'colorthief' {
    class ColorThief {
        constructor();
        getPalette(image: HTMLImageElement, colorCount?: number): Promise<number[][]>;
        getColor(image: HTMLImageElement, quality?: number): Promise<number[]>;
    }
    export default ColorThief;
}

