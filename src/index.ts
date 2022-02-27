import { Layers } from './pkg/layer';
import { imageFormatConfig, layerConfig } from './config';

const basePath = process.cwd();

const createImage = () => {
  const layers = new Layers(layerConfig, imageFormatConfig, basePath, true);
  layers.createRandomImages(2);
};

(() => {
  createImage();
})();
