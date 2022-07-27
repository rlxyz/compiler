import fs from 'fs';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig, Token } from '../utils/types';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import { Sequencer } from './Sequencer';
import { Element } from './Element';
import { utils } from 'ethers';
import Collection from './Collection';

// 0v1.0.0
// Every ArtElement is an array of ImageElement
// - each item in the array is indexed to a certain position on the image called PriorityIndex
// Every ".png" file is considered an ImageElement
// - every ImageElement has a FolderSource - pointer to an image url file or folder
// - the FolderSource has a PriorityIndex - the position on the image
// - only a single filder can be chosen in a single FolderSource
// --///--
// Generator -- Aggregator Level. Technically, not important.
//
// Sequencer -- Sequencing Level -- includes Randomizer
//
// Layer -- Element -- Building Block Level -- handles storage (both local & cloud-storage, cid-based structure & folder), handles images (both local & cloud, cid-based structure)
// --///---
//
// Can we standarise metadata querying?
class Connection {}

export class App {
  sequencer: Sequencer;
  db: Connection;

  constructor({
    configs,
    imageFormat,
    basePath,
  }: {
    configs: LayerConfig[];
    imageFormat: ImageFormatConfig;
    basePath: string;
  }) {
    this.sequencer = new Sequencer(configs, basePath, imageFormat.width, imageFormat.height);

    if (imageFormat.height === 0 || imageFormat.width === 0) {
      throw new Error('dimensions invalid');
    }
  }

  createRandomCollection = async ({
    username,
    savePath = '',
  }: {
    username: string;
    savePath?: string;
  }): Promise<{ data: any; tokens: any; totalSupply: number }> => {
    if (savePath !== '' && !fs.existsSync(savePath)) {
      throw new Error('savePath invalid');
    }

    const allHash = new Set();
    const tokens = [];
    const data = [];

    // should pull from db
    const totalSupply = 1111;

    const files =
      savePath !== '' &&
      fs
        .readdirSync(`${savePath}`)
        .filter((file) => fs.lstatSync(path.join(`${savePath}`, file)).isFile())
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(`${savePath}`, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // for mac: sometimes ds_store can cause issues with Number(files[0].file.slice(0, -4))
    let startPoint = files.length > 0 ? Number(files[0].file.slice(0, -4)) + 1 : 0;
    for (var i = startPoint; i < totalSupply + startPoint; ) {
      console.log(i);
      const element: Element = this.createElementFromRandomness();
      savePath !== '' && (await element.toFile(`${savePath}/${i}.png`));
      const hash: string = element.toHex();
      const attributes: any[] = element.toAttributes();
      if (!allHash.has(hash)) {
        i++;
        allHash.add(hash);
        tokens.push({ attributes: attributes, token_hash: hash });
        data.push(attributes);
      }
    }
    return new Collection({ tokens, data, totalSupply });
  };

  createElementFromHash = (tokenHash: string): Element => {
    return this.sequencer.createElement(tokenHash);
  };

  createElementFromRandomness(): Element {
    const hash = utils.keccak256(utils.toUtf8Bytes(String(Math.random())));
    console.log(hash);
    return this.sequencer.createElement(hash);
  }
}
