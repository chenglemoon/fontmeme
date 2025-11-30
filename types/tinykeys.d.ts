declare module 'tinykeys' {
  export interface TinyKeysOptions {
    [key: string]: (event: KeyboardEvent) => void;
  }

  export function tinykeys(
    target: Window | HTMLElement,
    handlers: TinyKeysOptions
  ): () => void;
}

