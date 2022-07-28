import express, { Router } from 'express';
import { imageFormatConfig, layerConfig } from '../config';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig } from '../pkg/types';
import { App } from '../pkg/App';
import Collection from '../pkg/Collection';
import { Element } from '../pkg/Element';
import { Sequencer } from '../pkg/Sequencer';
const router: Router = express.Router();
const allowlist = ['roboghost']; // todo: move to db
const basePath = process.cwd(); // todo: move somewhere else?

const app: App = new App();

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
  '/:username/generate/token/:token_hash',
  collectionMiddleware,
  async (request: express.Request, response: express.Response) => {
    const username = request.params.username as string;
    const tokenHash = request.params.token_hash as string;
    app
      .createSequencer({ username, basePath: process.cwd() })
      .createElement(tokenHash)
      .then((element: Element) => {
        return response.setHeader('Content-Type', 'image/png').send(element.toBuffer());
      })
      .catch(() => {
        return response.status(400);
      });
  },
);

router.get(
  '/:username/generate/rarity/:type',
  collectionMiddleware,
  async (request: express.Request, response: express.Response) => {
    const type: CollectionAnalyticsType = request.params.type as CollectionAnalyticsType;
    const username: string = request.params.username as string;
    app
      .createSequencer({ username, basePath: process.cwd() })
      .createCollection({
        start: 0,
        end: 1111,
      })
      .then((collection: Collection) => {
        return response.status(200).send(collection.calculateRarityAttributes(type));
      })
      .catch(() => {
        return response.status(400);
      });
  },
);

router.get('/:username/save', collectionMiddleware, async (request: express.Request, response: express.Response) => {
  const type: CollectionAnalyticsType = request.params.type as CollectionAnalyticsType;
  const username: string = request.params.username as string;
  const start: number = request.query.start as unknown as number;
  const end: number = request.query.start as unknown as number;
  app
    .createSequencer({ username, basePath: process.cwd() })
    .createCollection({
      start,
      end,
    })
    .then((collection: Collection) => {
      if (collection.toCloud(start, end)) {
        return response.status(200).send(collection.calculateRarityAttributes(type)).end();
      }
      return response.status(400).end();
    })
    .catch(() => {
      return response.status(400).end();
    });
});

export default router;
