import { App } from './x/App';
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

const app: App = new App({
  configs: layerConfig,
  imageFormat: imageFormatConfig,
  basePath,
});

app.createRandomCollection({ username: 'RoboGhost', savePath: `${basePath}/images` });
