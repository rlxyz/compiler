import express, { Router } from 'express';
import { App } from '../pkg/App';
const router: Router = express.Router();
import { toChecksumAddress } from 'ethereumjs-util';

const app: App = new App();

router.post('/create', async (request: express.Request, response: express.Response) => {
  const name = request.query.name as string;
  const from = toChecksumAddress(request.query.from as string);
  app
    .createRepository(from, name)
    .then((success: boolean) => {
      if (success) {
        return response.status(200);
      }
      return response.status(400);
    })
    .catch(() => {
      return response.status(400);
    });
});
