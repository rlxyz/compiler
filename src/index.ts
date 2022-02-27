import { Layers } from './pkg/layer';
import { imageFormatConfig, layerConfig } from './generator_config';

const basePath = process.cwd();

const createImage = (token: any, savePath: string) => {
  const layers = new Layers(layerConfig, imageFormatConfig, basePath, true);
  layers.generate(token, 1111);
};

(() => {
  const token = {
    tokenId: 123,
    hash: 'some_hash',
  };
  createImage(token, basePath);
})();
