import { Image } from 'canvas';

export type BuildConfig = {
  basePath: string;
  invocations: number;
  rarityDelimiter: string;
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
  }[];
  options?: {
    type?: string;
    iterations?: number;
    occuranceRate?: number;
    exclude?: any;
    combination?: any;
  };
};

export type GeneratorConfig = {
  format: ImageFormatConfig;
  build: BuildConfig;
};

export type LayerElement = {
  id: number;
  name: string;
  filename: string;
  path: string;
  weight: number;
};

export type GeneSequence = {
  layerIndex: number;
  elementIndex: number;
  element: any;
};

export type CanvasRenderObject = {
  image: Image;
};
