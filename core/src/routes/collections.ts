import express, { Router } from 'express';
import { imageFormatConfig, layerConfig } from '../config';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig } from '../types';
import { ImageCompiler } from '../x/compiler';

const router: Router = express.Router();
const allowlist = ['roboghost']; // todo: move to db
const basePath = process.cwd(); // todo: move somewhere else?

// features
// 1. generate image from hash; r.e rework of gene system
// 2. integrate w gcp
// 3. better error handling
// 4. rename some routes. too long.
// 5. cleaner naming conventions

const collectionAllowlistValidation = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  const username = request.params.username as string;
  if (!allowlist.includes(username)) {
    return response.status(400).send({
      error: 'AllowlistValidationError',
      message: 'Collection not in allowlist',
    });
  }
  next();
};

router.get(
  '/:username/generate/random',
  collectionAllowlistValidation,
  async (request: express.Request, response: express.Response) => {
    const layer: ImageCompiler = new ImageCompiler(layerConfig, imageFormatConfig, basePath, false, false);
    const imageBuffer = await layer.createRandomImageBuffer();
    return response.status(200).setHeader('Content-Type', 'image/png').send(imageBuffer);
  },
);

router.get(
  '/:username/generate/rarity/:type',
  collectionAllowlistValidation,
  async (request: express.Request, response: express.Response) => {
    const type: CollectionAnalyticsType = request.params.type as CollectionAnalyticsType;
    const layers: ImageCompiler = new ImageCompiler(layerConfig, imageFormatConfig, basePath, false, false);
    const { tokens, data } = await layers.createRandomImages(5555);
    return response.status(200).send(layers.calculateRarityAttributes(tokens, data, type));
  },
);

export default router;
