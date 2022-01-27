import { Layers } from './old_index';
import { imageFormatConfig, layerConfig } from './generator_config';

const basePath = process.cwd();

const createImage = (token: any, savePath: string) => {
  const layers = new Layers(layerConfig, imageFormatConfig, basePath, true);
  layers.generate(token, 25000);
};

(() => {
  const token = {
    tokenId: 123,
    hash: 'some_hash',
  };
  createImage(token, basePath);
})();
