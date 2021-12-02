import { Image } from 'canvas';
import { BuildConfig, ImageFormatConfig } from '../utils/types';

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
