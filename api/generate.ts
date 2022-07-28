import { App } from './pkg/App';
import fs from 'fs';
import path from 'path';
import Collection from 'pkg/Collection';

// for mac: sometimes ds_store can cause issues with Number(files[0].file.slice(0, -4))
const savePath = `${process.cwd()}/images`;
const files = fs
  .readdirSync(`${savePath}`)
  .filter((file) => fs.lstatSync(path.join(`${savePath}`, file)).isFile())
  .map((file) => ({ file, mtime: fs.lstatSync(path.join(`${savePath}`, file)).mtime }))
  .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

// @ts-ignore
const start = files.length > 0 ? Number(files[0].file.slice(0, -4)) + 1 : 0;
const end = 1111;

// app
const app = new App();

() => {
  app
    .createSequencer({ username: 'roboghost', basePath: process.cwd() })
    .createCollection({ start, end })
    .then((collection: Collection) => {
      if (collection.toLocal()) {
        console.log('collection saved');
      }
      console.log('failed to save');
    });
};
