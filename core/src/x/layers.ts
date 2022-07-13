import fs from 'fs';
import { ImageFormatConfig, LayerConfig, Token } from '../types';
import { Gene } from './gene';
import { GeneSequence, LayerElement } from '../types';
import path from 'path';
import sha256 from 'crypto-js/sha256';
import { createImage } from './image';
import Layer from './layer';

class Layers {
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
    this.append = true;
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
    const allAttributes = [];

    let startPoint = this.getAppendFileStart() + 1;
    for (var i = startPoint; i < invocations + startPoint; ) {
      const gene: Gene = this.createRandomGene();

      if (this.saveImage) {
        await createImage(gene, this.width, this.height, `${this.savePath}/${i}.png`);
      }
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
        allAttributes.push(attributes);
      }
    }

    this.calculateRarityAttributes(allAttributes);
  };

  calculateRarityAttributes = (data: any[]) => {
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

    const type: any = 'rankings-trait';
    switch (type) {
      case 'light':
        return console.log({ traits });
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

        return console.log({
          traits,
        });
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

        return console.log(allTraitsWithRarity);
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
      name: `Reflection #${edition}`,
      attributes: attributes,
    };

    if (this.saveMetadata) {
      fs.writeFileSync(`${this.metadataPath}/${edition}.json`, JSON.stringify(metadata, null, 2));
    }

    return metadata;
  };

  createRandomGene(): Gene {
    let sequences: GeneSequence[] = [];

    this.layers.forEach((layer, index) => {
      const totalWeight = this.layerElementWeight(layer);

      for (var k = 0; k < layer.iterations; k++) {
        if (Math.random() > layer.occuranceRate) {
          continue;
        }

        let random = Math.floor(Math.random() * totalWeight);

        for (var i = 0; i < layer.elements.length; i++) {
          if (
            this.layerElementHasCombination(layer, i, sequences) ||
            this.layerElementHasExclusion(layer, i, sequences)
          ) {
            continue;
          }

          random -= layer.elements[i].weight;
          if (random < 0) {
            let element = this.layers[index].elements.find((e) => e.id == layer.elements[i].id);

            if (element?.link !== undefined) {
              let randomLink = Math.floor(Math.random() * this.elementLinkWeight(element));

              for (var z = 0; z < element.link.length; z++) {
                randomLink -= element.link[z].weight;
                if (randomLink < 0) {
                  // @ts-ignore
                  element.linkExtension = `${element.link[z].name}`;
                  break;
                }
              }
            } else if (layer.link !== undefined) {
              if (layer.link !== undefined) {
                let randomLink = Math.floor(Math.random() * this.layerLinkWeight(layer));

                for (var z = 0; z < layer.link.length; z++) {
                  randomLink -= layer.link[z].weight;
                  if (randomLink < 0) {
                    // @ts-ignore
                    element.linkExtension = `${layer.link[z].name}`;
                    break;
                  }
                }
              }
            }

            sequences.push({
              layerIndex: index,
              elementIndex: layer.elements[i].id,
              element: element,
            });

            break;
          }
        }
      }
    });

    return new Gene(sequences);
  }

  elementLinkWeight(element: LayerElement): number {
    if (element.link === undefined) return 0;
    var totalWeight = 0;
    element.link.forEach((link) => {
      totalWeight += link.weight;
    });
    return totalWeight;
  }

  layerLinkWeight(layer: Layer): number {
    var totalWeight = 0;
    layer.link.forEach((element: any) => {
      totalWeight += element.weight;
    });
    return totalWeight;
  }

  layerElementWeight(layer: Layer): number {
    if (layer.elements === undefined) return 0;
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    return totalWeight;
  }

  layerElementHasCombination(layer: Layer, index: number, sequences: GeneSequence[]) {
    if (!layer.combination) {
      return false;
    }

    let count = 0;
    sequences.forEach((sequence) => {
      if (
        layer.combination[layer.elements[index].name].includes(
          this.layers[sequence.layerIndex].elements[sequence.elementIndex].name,
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

  layerElementHasExclusion(layer: Layer, index: number, sequences: GeneSequence[]) {
    if (!layer.exclude) {
      return false;
    }
    sequences.forEach((sequence) => {
      if (
        layer.exclude[layer.elements[index].name].includes(
          this.layers[sequence.layerIndex].elements[sequence.elementIndex].name,
        )
      ) {
        return true;
      }
    });
    return false;
  }
}

export { Layers };
