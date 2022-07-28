import { S3StorageService } from 'libs/storage';
import { CollectionAnalyticsType } from './types';
import { Element } from './Element';
class Collection {
  elements: Element[];
  username: string;
  tokens: any;
  data: any;
  totalSupply: number;

  constructor({
    elements,
    tokens,
    data,
    totalSupply,
  }: {
    elements: Element[];
    tokens: any;
    data: any;
    totalSupply: number;
  }) {
    this.elements = elements;
    this.tokens = tokens;
    this.data = data;
    this.totalSupply = totalSupply;
  }

  getTotalSupply = (): number => {
    return Number(process.env.COLLECTION_TOTAL_SUPPLY);
  };

  calculateRarityAttributes = (type: CollectionAnalyticsType) => {
    let traits: any = {};
    for (var item of this.data) {
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
        for (var j = 0; j < this.totalSupply; j++) {
          let rarityValue = 0;
          for (const item of this.tokens[j]['attributes']) {
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
                token_hash: this.tokens[token_id]['token_hash'],
                image_url: `${process.env.IMAGE_GENERATE_URL}/${this.tokens[token_id]['token_hash']}`,
                total_rating: token.rarity,
              },
              traits: this.tokens[token_id]['attributes'].map((attribute: any) => {
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

  toLocal = async (start: number = 0, end: number = this.totalSupply): Promise<boolean> => {
    for (let i = start; i < end; i++) {
      await this.elements[i].toFile(`${process.cwd()}/images/${i}.png`);
    }
    return true;
  };

  toCloud = async (start: number = 0, end: number = this.totalSupply): Promise<boolean> => {
    const storage = new S3StorageService({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_API_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });
    for (let i = start; i < end; i++) {
      storage.Put({
        tokenId: i,
        tokenHash: this.elements[i].toHex(),
        imageBuffer: await this.elements[i].toBuffer(),
        attributes: this.elements[i].toAttributes(),
        fileName: `${i}`,
      });
    }
    return true;
  };
}

export default Collection;
function save() {
  throw new Error('Function not implemented.');
}
