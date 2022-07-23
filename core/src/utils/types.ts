import { Image } from 'canvas';

export type Token = {
  tokenId: number;
  hash: string;
};

export type CollectionAnalyticsType = 'light' | 'full' | 'rankings-trait' | 'rankings-token';

export type BuildConfig = {
  basePath: string;
  invocations: number;
  rarityDelimiter: string;
  saveImage: boolean;
  geneDelimiter: string;
};

export type ImageFormatConfig = {
  width: number;
  height: number;
  smoothing: boolean;
};

export type LayerConfig = {
  name: string;
  traits: {
    name: string;
    weight: number;
    link?: {
      name: string;
      weight: number;
    }[];
  }[];
  options?: {
    type?: string;
    iterations?: number;
    occuranceRate?: number;
    exclude?: any;
    combination?: any;
  };
  linkName?: string;
  link?: {
    name: string;
    weight: number;
  }[];
  metadata?: boolean;
};

export type LayerElement = {
  id: number;
  name: string;
  filename: string;
  path: string;
  weight: number;
};

// in string: "LI:EI:ENAME"
// in array: ["LI", "EI", "ENAME"]
// LI has a mapping
// EI has a mapping
// ENAME has a constant
export type ElementSource = {
  layerIndex: number;
  elementIndex: number;
  element: LayerElement;
};

export type CanvasRenderObject = {
  image: Image;
  opacity?: number;
};
