import { Generator } from './x/Generator';
import {
  LayerElement,
  ElementSource,
  CanvasRenderObject,
  LayerConfig,
  ImageFormatConfig,
  BuildConfig,
} from './utils/types';
import { layerConfig } from './config';

const basePath = process.cwd();

const imageFormatConfig: ImageFormatConfig = { width: 1500, height: 1500, smoothing: false };

const app: Generator = new Generator({
  configs: layerConfig,
  imageFormat: imageFormatConfig,
  basePath,
});

app.createRandomCollection({ totalSupply: 100, savePath: `${basePath}/images` });
// app.createElementFromHash('0xhihihihihihihihihihihihihihi');
