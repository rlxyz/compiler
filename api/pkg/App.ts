import fs from 'fs';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig, Token } from './types';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import { Sequencer } from './Sequencer';
import { Element } from './Element';
import { utils } from 'ethers';
import Collection from './Collection';
import { imageFormatConfig, layerConfig } from '../config';

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
class Connection {
  isUser = async (name: string) => {
    return true;
  };
}

export class App {
  db: Connection;

  constructor() {}

  createSequencer = (opts: { username: any; basePath: string }): Sequencer => {
    return new Sequencer(layerConfig, opts.basePath, imageFormatConfig.width, imageFormatConfig.height);
  };

  createRepository = (from: string, name: string): Promise<boolean> => {
    throw new Error('Method not implemented.');
  };

  hasUser = async (name: string): Promise<boolean | Error> => {
    try {
      if (await this.db.isUser(name)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}
