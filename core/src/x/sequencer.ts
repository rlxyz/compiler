import fs from 'fs';
import { CollectionAnalyticsType, ImageFormatConfig, LayerConfig, Token } from '../types';
import { Gene } from './gene';
import { GeneSequence, LayerElement } from '../types';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import { createImage } from './image';
import Layer from './layer';
import { GeneticSequenceRandomizer } from './GeneticSequenceRandomizer';

class Application {
  sequencer: Sequencer;
}

class Sequencer {
  layers: Layer[];
  width: number;
  height: number;
  layersPath: string;
  rarityDelimiter: string;
  geneDelimiter: string;
  savePath: string;
  showRarity: any;
  saveImage: boolean;
  append: boolean;
  metadataPath: string;
  saveMetadata: boolean;

  constructor(
    configs: LayerConfig[],
    imageFormat: ImageFormatConfig,
    basePath: string,
    saveImage?: boolean,
    saveMetadata?: boolean,
    rarityDelimiter?: string,
    geneDelimiter?: string,
    append?: boolean,
  ) {
    if (configs.length === 0) {
      throw new Error('configs failed with length 0');
    }

    this.layersPath = basePath + '/layers';

    if (!fs.existsSync(this.layersPath)) {
      throw new Error('layerPath invalid');
    }

    this.savePath = basePath + '/images';
    this.metadataPath = basePath + '/metadata';

    if (imageFormat.height === 0 || imageFormat.width === 0) {
      throw new Error('dimensions invalid');
    }

    this.width = imageFormat.width;
    this.height = imageFormat.height;
    this.saveImage = saveImage || false;
    this.saveMetadata = saveMetadata || false;
    this.rarityDelimiter = rarityDelimiter || '#';
    this.geneDelimiter = geneDelimiter || '-';
    this.append = append || false;
    this.layers = configs.map((config: LayerConfig) => new Layer(config, `${this.layersPath}/${config.name}`));
  }

  get(index: number) {
    return this.layers[index];
  }

  isEmpty() {
    return this.layers.length === 0;
  }

  getAppendFileStart = (): number => {
    const files = fs
      .readdirSync(`${this.savePath}`)
      .filter((file) => fs.lstatSync(path.join(`${this.savePath}`, file)).isFile())
      .map((file) => ({ file, mtime: fs.lstatSync(path.join(`${this.savePath}`, file)).mtime }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    return files.length > 0 ? Number(files[0].file.slice(0, -4)) : 0;
  };

  createImageFromHash = async (tokenId: number, tokenHash: string) => {
    // todo: use tokenHash instead of mock gene
    const gene: Gene = this.createRandomGene();
    if (this.saveImage) {
      await createImage(gene, this.width, this.height, `${this.savePath}/${tokenId}.png`);
    }
    const metadata: { name: string; attributes: any[] } = this.createImageMetadata(gene, tokenId);
    return metadata;
  };

  createRandomImages = async (invocations: number) => {
    const allHash = new Set();
    const tokens = [];
    const data = [];

    let startPoint = this.getAppendFileStart() + 1;
    for (var i = startPoint; i < invocations + startPoint; ) {
      const gene: Gene = this.createRandomGene();
      this.saveImage && (await createImage(gene, this.width, this.height, `${this.savePath}/${i}.png`));
      const metadata: { name: string; attributes: any[] } = this.createImageMetadata(gene, i);
      const { attributes } = metadata;

      const hash: string = sha256(
        attributes
          .map((attr) => {
            return attr['value'];
          })
          .join('-'),
      ).toString();

      if (!allHash.has(hash)) {
        i++;
        allHash.add(hash);
        tokens.push({ attributes: attributes, token_hash: hash });
        data.push(attributes);
      }
    }

    return { tokens, data };
  };

  createRandomImageBuffer = async (): Promise<Buffer> => {
    const gene: Gene = this.createRandomGene();
    return await createImage(gene, this.width, this.height, `${this.savePath}/${-1}.png`);
  };

  calculateRarityAttributes = (tokens: any[], data: any[], type: CollectionAnalyticsType) => {
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
        for (var j = 0; j < 5555; j++) {
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
                // image_url: `${process.env.IMAGE_GENERATE_URL}/${tokens[token_id]['token_hash']}`,
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

  createImageMetadata = (gene: Gene, edition: number): { name: string; attributes: any[] } => {
    let attributes: any[] = [];

    this.layers.forEach((layer: Layer, i) => {
      if (layer.metadata && gene.sequences[i]) {
        const name = this.layers[gene.sequences[i].layerIndex].name;
        const trait = {
          trait_type: name,
          value: name == 'Skin' ? gene.sequences[i].element.name.split('. ')[1] : gene.sequences[i].element.name,
        };
        let extra = {};
        if (layer.link) {
          extra = {
            trait_type: this.layers[gene.sequences[i].layerIndex].linkName,
            value: gene.sequences[i].element.linkExtension.split('.').slice(0, -1).join('.'),
          };
          attributes.push(extra);
        }
        attributes.push(trait);
      }
    });

    const metadata = {
      name: `${process.env.COLLECTION_NAME} #${edition}`,
      attributes: attributes,
    };

    if (this.saveMetadata) {
      fs.writeFileSync(`${this.metadataPath}/${edition}.json`, JSON.stringify(metadata, null, 2));
    }

    return metadata;
  };

  createRandomGene(): Gene {
    return new Gene(GeneticSequenceRandomizer.Run(this.layers));
  }

  public static elementLinkWeight(element: LayerElement): number {
    if (element.link === undefined) return 0;
    var totalWeight = 0;
    element.link.forEach((link) => {
      totalWeight += link.weight;
    });
    return totalWeight;
  }

  public static layerLinkWeight(layer: Layer): number {
    var totalWeight = 0;
    layer.link.forEach((element: any) => {
      totalWeight += element.weight;
    });
    return totalWeight;
  }

  public static layerElementWeight(layer: Layer): number {
    if (layer.elements === undefined) return 0;
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    return totalWeight;
  }

  public static layerElementHasCombination(
    layers: Layer[],
    layer: Layer,
    index: number,
    sequences: GeneSequence[],
  ): boolean {
    if (!layer.combination) {
      return false;
    }

    let count = 0;
    sequences.forEach((sequence) => {
      if (
        layer.combination[layer.elements[index].name].includes(
          layers[sequence.layerIndex].elements[sequence.elementIndex].name,
        )
      ) {
        count++;
      }
    });

    if (count != 4) {
      return true;
    }

    return false;
  }

  public static layerElementHasExclusion(
    layers: Layer[],
    layer: Layer,
    index: number,
    sequences: GeneSequence[],
  ): boolean {
    if (!layer.exclude) {
      return false;
    }
    sequences.forEach((sequence) => {
      if (
        layer.exclude[layer.elements[index].name].includes(
          layers[sequence.layerIndex].elements[sequence.elementIndex].name,
        )
      ) {
        return true;
      }
    });
    return false;
  }
}

export { Sequencer as ImageCompiler };
