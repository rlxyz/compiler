import fs from 'fs';
import { ImageFormatConfig, LayerConfig, Token } from '../types';
import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from './canvas';
import { LAYER_TYPES } from '../constants/layer';
import { Gene } from './gene';
import { CanvasRenderObject, GeneSequence, LayerElement } from '../types';
import path from 'path';
import sha256 from 'crypto-js/sha256';

const getLayerName = (_name: string, rarityDelimiter: string): string => {
  const isImage = _name.match(/.(jpg|jpeg|png|gif)$/i) !== null;
  return isImage ? _name.slice(0, -4).split(rarityDelimiter).shift() || '' : _name;
};

const createImage = async (gene: Gene, width: number, height: number, savePath: string) => {
  const { canvas, context }: CanvasObject = createCanvas(width, height); // todo: not optimzed for speed
  const loadedImages: Promise<CanvasRenderObject>[] = gene.loadImages();
  await Promise.all(loadedImages).then((render: CanvasRenderObject[]) => {
    clearCanvas(context, width, height);
    var i = 0;
    render.forEach((object: CanvasRenderObject) => {
      drawImage(context, object.image, width, height, i == 6 ? 0.2 : undefined); // todo: fix
      i++;
    });
    saveImage(canvas, savePath);
  });
};

class Layers {
  layers: Layer[];
  width: number;
  height: number;
  layerPath: string;
  rarityDelimiter: string;
  geneDelimiter: string;
  savePath: string;
  showRarity: any;
  saveImage: boolean;
  append: boolean;
  metadataPath: string;

  constructor(
    configs: LayerConfig[],
    imageFormat: ImageFormatConfig,
    basePath: string,
    saveImage?: boolean,
    rarityDelimiter?: string,
    geneDelimiter?: string,
    append?: boolean,
  ) {
    if (configs.length === 0) {
      throw new Error('configs failed with length 0');
    }

    this.layerPath = basePath + '/layers';

    if (!fs.existsSync(this.layerPath)) {
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
    this.rarityDelimiter = rarityDelimiter || '#';
    this.geneDelimiter = geneDelimiter || '-';
    this.append = true;
    this.layers = configs.map((config: LayerConfig) => new Layer(config, this.layerPath, this.rarityDelimiter));
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

  // todo: add opacity + blend
  // todo: gene already exists
  // todo: add attributes/metadata
  createRandomImages = async (basePath: string, invocations: number) => {
    const allGene: Gene[] = [];
    const allHash = new Set();
    const allAttributes = [];

    let startPoint = this.getAppendFileStart() + 1;
    console.log(startPoint);
    for (var i = startPoint; i < invocations + startPoint; ) {
      console.log(i);
      const gene: Gene = this.createRandomGene();
      this.saveImage ? await createImage(gene, this.width, this.height, `${this.savePath}/${i}.png`) : null;
      const attributes: any[] = this.createImageMetadata(gene, i);
      const hash: string = sha256(
        attributes
          .map((attr) => {
            return attr['value'];
          })
          .join('-'),
      ).toString();

      allAttributes.push(attributes);
      allGene.push(gene);

      if (!allHash.has(hash)) {
        i++;
        allHash.add(hash);
      }
    }
    // this.calculateRarity(allGene, invocations);
    this.calculateRarityAttributes(allAttributes);
  };

  calculateRarityAttributes = (data: any[]) => {
    const totalInvocations = data.length;
    let traits: any = {};
    for (var d of data) {
      for (var attr of d) {
        const type = attr['trait_type'];
        const value = attr['value'];

        if (!traits[type]) {
          traits[type] = {};
        }

        if (!traits[type][value]) {
          traits[type][value] = 1;
        } else {
          traits[type][value] += 1;
        }
      }
    }

    const distributon = {};

    for (const trait of Object.entries(traits)) {
      const attributes = trait[1];
      console.log(trait[0]);
      // @ts-ignore
      for (const [trait, value] of Object.entries(attributes)) {
        console.log(trait, ((Number(value) / totalInvocations) * 100).toFixed(4) + '% out of 100%');
      }
      console.log('==========================================');
    }

    // let upperBound = 0;
    // let total = 0;
    // for (const trait of Object.entries(traits)) {
    //   const attributes = trait[1];
    //   // @ts-ignore
    //   for (const attr of Object.entries(attributes)) {
    //     const entry = attr[1];

    //     // @ts-ignore
    //     if (entry > upperBound) {
    //       // @ts-ignore
    //       upperBound = entry;
    //     }
    //     // @ts-ignore
    //     total += entry;
    //   }
    // }

    // console.log(upperBound, total);

    // for (const trait of Object.entries(traits)) {
    //   const type = trait[0];
    //   const attributes = trait[1];
    //   // @ts-ignore
    //   for (const attr of Object.entries(attributes)) {
    //     traits[type][attr[0]] = {
    //       value: attr[1],
    //       // @ts-ignore
    //       rating: upperBound / attr[1],
    //     };
    //   }
    // }

    // // ((layerRarity[layer][attribute].occurance / totalInvocations) * 100).toFixed(10) + '% out of 100%',

    // console.log(traits);

    // let rank = [];
    // for (var j = 0; j < data.length; j++) {
    //   let rarityValue = 0;
    //   try {
    //     for (var attr of data[j]) {
    //       let type, value;
    //       type = attr['trait_type'];
    //       value = attr['value'];
    //       const { rating } = traits[type][value];
    //       rarityValue += rating / upperBound;
    //     }
    //   } catch (e) {}
    //   rank[j] = {
    //     tokenId: j,
    //     rarity: rarityValue,
    //   };
    // }

    // console.log(rank);
  };

  calculateRarity = (genes: Gene[], totalInvocations: number) => {
    // const layerRarity: any = {};
    // this.layers.forEach((layer: Layer, i) => {
    //   if (layer.metadata) {
    //     layerRarity[i] = {};
    //     layer.elements.forEach((element, j) => {
    //       layerRarity[i][j] = {
    //         trait: element.name,
    //         weight: element.weight,
    //         occurance: 0,
    //       };
    //     });
    //     if (layer.link && layer.linkName) {
    //       const linkName = layer.linkName;
    //       layerRarity[linkName] = {};
    //       layer.link.forEach((l: any) => {
    //         layerRarity[linkName][l.name] = {
    //           trait: l.name,
    //           weight: l.weight,
    //           occurance: 0,
    //         };
    //       });
    //     }
    //   }
    // });
    // console.log(layerRarity);
    // genes.forEach((gene: Gene) => {
    //   gene.sequences.forEach((sequence: GeneSequence) => {
    //     if (layerRarity[sequence.layerIndex]) {
    //       layerRarity[sequence.layerIndex][sequence.elementIndex].occurance++;
    //     }
    //     if (sequence.element.linkExtension) {
    //       layerRarity['Pose'][sequence.element.linkExtension].occurance++;
    //     }
    //   });
    // });
    // for (let layer in layerRarity) {
    //   if (layerRarity[layer]) {
    //     if (layer === 'Pose') {
    //       break;
    //     }
    //     const currentLayer = this.layers[Number(layer)];
    //     console.log(`Trait Type ${currentLayer.name}`);
    //     for (let attribute in layerRarity[layer]) {
    //       console.log(
    //         `${currentLayer.elements[Number(attribute)].name} -- `,
    //         ((layerRarity[layer][attribute].occurance / totalInvocations) * 100).toFixed(10) + '% out of 100%',
    //       );
    //     }
    //   }
    // }
  };

  createImageMetadata = (gene: Gene, edition: number) => {
    let attributes: any[] = [];

    this.layers.forEach((layer: Layer, i) => {
      if (layer.metadata) {
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

    fs.writeFileSync(
      `${this.metadataPath}/${edition}.json`,
      JSON.stringify(
        {
          name: `Lucky Tiger #${edition}`,
          description:
            'The Tiger Archives is Tiger Beer and PMC’s first ever NFT collection. The NFTs serve as a lucky charm – giving you blessings and abundance throughout the Tiger year. Owning one unlocks perks throughout the year, from exclusive merch to curated experiences.',
          image: `https://rhapsodylabsxyz.sgp1.cdn.digitaloceanspaces.com/tiger/${edition}.png`,
          attributes: attributes,
          external_url: 'https://thetigerarchives.xyz',
        },
        null,
        2,
      ),
    );

    return attributes;
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

  generate = (token: Token, invocations: number = 1) => {
    this.createRandomImages(this.savePath, invocations);
  };
}

export class Layer {
  name: string;
  elements: LayerElement[];
  iterations: number;
  occuranceRate: number;
  type?: string;
  combination?: any;
  exclude?: any;
  link?: any;
  metadata: boolean;
  linkName?: string;

  // todo: fix rarityDelimter being passed multiple times
  // todo: fix type name checking conmbination and exclude properties
  constructor(config: LayerConfig, layerPath: string, rarityDelimiter: string) {
    if (!config.name || config.name.length == 0) {
      throw new Error("layer name doesn't exists");
    }

    this.name = config.name;
    this.elements = this.getLayerElements(`${layerPath}/${this.name}/`, rarityDelimiter, config);
    this.iterations = config.options?.iterations || 1;
    this.occuranceRate = config.options?.occuranceRate || 1;
    this.type = config.options?.type || LAYER_TYPES.NORMAL;
    this.link = config?.link || undefined;
    this.linkName = config?.linkName || undefined;
    this.metadata = config?.metadata || false;

    if (config.options?.combination != undefined) {
      this.combination = config.options.combination;
    }

    if (config.options?.exclude != undefined) {
      this.exclude = config.options.exclude;
    }
  }

  getLayerElements = (path: string, rarityDelimiter: string, config: LayerConfig): LayerElement[] => {
    return config.traits.map(({ name, weight, link }, index) => {
      return {
        id: index,
        name: getLayerName(name, rarityDelimiter),
        filename: name,
        path: `${path}${name}`.replace(/(\s+)/g, '$1'),
        weight: weight || 1,
        link: link,
      };
    });
  };
}

export { Layers };
