import express, { Router } from 'express';
import { imageFormatConfig, layerConfig } from '../config';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig } from '../types';
import { Generator } from '../x/Generator';

const router: Router = express.Router();
const allowlist = ['roboghost']; // todo: move to db
const basePath = process.cwd(); // todo: move somewhere else?

// features
// 1. generate image from hash; r.e rework of gene system
// 2. integrate w gcp
// 3. better error handling
// 4. rename some routes. too long.
// 5. cleaner naming conventions

const collectionMiddleware = (request: express.Request, response: express.Response, next: express.NextFunction) => {
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
  '/:username/generate/:token_hash',
  collectionMiddleware,
  async (request: express.Request, response: express.Response) => {},
);

router.get(
  '/:username/generate/random',
  collectionMiddleware,
  async (request: express.Request, response: express.Response) => {
    const app: Generator = new Generator({
      configs: layerConfig,
      imageFormat: imageFormatConfig,
      basePath,
    });
    const imageBuffer = (await app.createElementFromRandomness()).toBuffer();
    return response.status(200).setHeader('Content-Type', 'image/png').send(imageBuffer);
  },
);

router.get(
  '/:username/generate/rarity/:type',
  collectionMiddleware,
  async (request: express.Request, response: express.Response) => {
    const type: CollectionAnalyticsType = request.params.type as CollectionAnalyticsType;
    const app: Generator = new Generator({
      configs: layerConfig,
      imageFormat: imageFormatConfig,
      basePath,
    });
    const { tokens, data } = await app.createRandomCollection({ totalSupply: 5555, savePath: '' });
    return response.status(200).send(Generator.calculateRarityAttributes(tokens, data, type));
  },
);

export default router;
