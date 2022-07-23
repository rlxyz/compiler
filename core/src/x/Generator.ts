import fs from 'fs';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig, Token } from '../utils/types';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import { Sequencer } from './Sequencer';
import { Element } from './Element';
import { utils } from 'ethers';

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
export class Generator {
  sequencer: Sequencer;

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
    totalSupply,
    savePath = '',
  }: {
    totalSupply: number;
    savePath?: string;
  }): Promise<{ data: any; tokens: any }> => {
    if (savePath !== '' && !fs.existsSync(savePath)) {
      throw new Error('savePath invalid');
    }

    const allHash = new Set();
    const tokens = [];
    const data = [];

    const files =
      savePath !== '' &&
      fs
        .readdirSync(`${savePath}`)
        .filter((file) => fs.lstatSync(path.join(`${savePath}`, file)).isFile())
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(`${savePath}`, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    let startPoint = files.length > 0 ? Number(files[0].file.slice(0, -4)) + 1 : 0;
    for (var i = startPoint; i < totalSupply + startPoint; ) {
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
    return { tokens, data };
  };

  createElementFromHash = (tokenHash: string): Element => {
    return this.sequencer.createElement(tokenHash);
  };

  createElementFromRandomness(): Element {
    return this.sequencer.createElement(utils.keccak256(utils.toUtf8Bytes(String(Math.random()))));
  }

  public static calculateRarityAttributes = (
    tokens: any[],
    data: any[],
    type: CollectionAnalyticsType,
    totalSupply: number,
  ) => {
    let traits: any = {};
    for (var item of data) {
      for (var attributes of item) {
        const { trait_type: type, value } = attributes;
        !traits[type] && (traits[type] = {});
        !traits[type][value] ? (traits[type][value] = 1) : traits[type][value]++;
      }
    }

    let upperBound = 0;
    let total = 0;
    for (const [_, value] of Object.entries(traits)) {
      for (const [_, entry] of Object.entries(value)) {
        entry > upperBound && (upperBound = entry); // todo: move to own function
        total += entry;
      }
    }

    for (const [type, value] of Object.entries(traits)) {
      traits[type] = Object.entries(value)
        // @ts-ignore
        .sort(([, v1], [, v2]) => v1 - v2)
        .reduce(
          (obj, [k, v]) => ({
            ...obj,
            [k]: v,
          }),
          {},
        );
    }

    // todo: modularise this
    switch (type) {
      case 'light':
        return traits;
      case 'full':
        // Get Rarity Rating for each type-attribute
        for (const [type, value] of Object.entries(traits)) {
          for (const [attribute, attribute_value] of Object.entries(value)) {
            traits[type][attribute] = {
              value: attribute_value,
              rating: upperBound / attribute_value,
            };
          }
        }

        return traits;

      case 'rankings-trait':
        let allTraitsWithRarity = [];
        for (const [type, value] of Object.entries(traits)) {
          for (const [attribute, attribute_value] of Object.entries(value)) {
            traits[type][attribute] = {
              value: attribute_value,
              rating: upperBound / attribute_value,
            };
            allTraitsWithRarity.push({
              trait_type: type,
              value: value,
              count: attribute,
              ...traits[type][attribute],
            });
          }
        }

        allTraitsWithRarity.sort(function (a, b) {
          return b.rating - a.rating;
        });

        return allTraitsWithRarity;

      case 'rankings-token':
        // Get Rarity Rating for each type-attribute
        for (const [type, value] of Object.entries(traits)) {
          for (const [attribute, attribute_value] of Object.entries(value)) {
            traits[type][attribute] = {
              value: attribute_value,
              rating: upperBound / attribute_value,
            };
          }
        }

        let rank = [];
        for (var j = 0; j < totalSupply; j++) {
          let rarityValue = 0;
          for (const item of tokens[j]['attributes']) {
            const { trait_type, value } = item;
            rarityValue += traits[trait_type][value]['rating'];
          }
          rank.push(rarityValue);
        }

        var mapped = rank
          .map(function (el, i) {
            return { token_id: i, rarity: el };
          })
          .sort(function (a, b) {
            return b.rarity - a.rarity;
          });

        return {
          rankings: mapped.slice(0, 20).map((token: { token_id: number; rarity: number }, index) => {
            const { token_id } = token;
            return {
              rank: index + 1,
              header: {
                token_id: token_id,
                token_hash: tokens[token_id]['token_hash'],
                image_url: `${process.env.IMAGE_GENERATE_URL}/${tokens[token_id]['token_hash']}`,
                total_rating: token.rarity,
              },
              traits: tokens[token_id]['attributes'].map((attribute: any) => {
                const { trait_type, value } = attribute;
                return {
                  trait_type: trait_type,
                  value: value,
                  rating: traits[trait_type][value]['rating'],
                };
              }),
            };
          }),
        };
      default:
        return traits;
    }
  };
}
