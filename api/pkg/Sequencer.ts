import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { LayerConfig, ElementSource, LayerElement } from './types';
import Collection from './Collection';
import { Element, ArtImageElement } from './Element';
import Layer from './Layer';
const random = require('canvas-sketch-util/random');

// Only handles the sequencing of Layers to create Elements
// Doesn't handle metadata or other things
export class Sequencer {
  // rarely changes
  header: {
    width: number;
    height: number;
  };

  // regularly changes
  body: {
    layers: Layer[];
    layersPath: string;
    savePath: string;
  };

  constructor(configs: LayerConfig[], basePath: string, width: number, height: number) {
    if (configs.length === 0) {
      throw new Error('configs failed with length 0');
    }

    const layersPath = `${basePath}/layers`;
    if (!fs.existsSync(layersPath)) {
      throw new Error('layerPath invalid');
    }

    const savePath = `${basePath}/images`;
    if (!fs.existsSync(layersPath)) {
      throw new Error('layerPath invalid');
    }

    this.body = {
      layers: configs.map((config: LayerConfig) => new Layer(config, `${layersPath}/${config.name}`)),
      layersPath: layersPath,
      savePath: savePath,
    };

    this.header = {
      width: width,
      height: height,
    };
  }

  createElement = async (seed: string = ''): Promise<Element> => {
    return ImageElementRandomizer.Run(
      seed || ethers.utils.keccak256(ethers.utils.toUtf8Bytes(String(Math.random()))),
      this.body.layers,
      this.header.width,
      this.header.height,
    );
  };

  // should move to Layer.ts
  public static layerElementHasCombination(
    layers: Layer[],
    layer: Layer,
    elementName: string,
    sequences: ElementSource[],
  ): boolean {
    if (!layer.combination) {
      return false;
    }

    let count = 0;
    sequences.forEach((sequence) => {
      const name = Sequencer.getElementName(layers, sequence.layerIndex, sequence.elementIndex);
      if (layer.combination[elementName]?.includes(name)) {
        count++;
      }
    });

    if (count != 4) {
      return true;
    }

    return false;
  }

  private static getElementName = (layers: Layer[], layerIndex: number, elementIndex: number) => {
    return layers[layerIndex].elements[elementIndex].name;
  };

  public static layerElementHasExclusion(
    layers: Layer[],
    layer: Layer,
    elementName: string,
    sequences: ElementSource[],
  ): boolean {
    if (!layer.exclude) {
      return false;
    }
    let skip = false;
    sequences.forEach((sequence: ElementSource) => {
      const name = Sequencer.getElementName(layers, sequence.layerIndex, sequence.elementIndex);
      if (layer.exclude[elementName]?.includes(name)) {
        skip = true;
      }
    });
    return skip;
  }

  // optimize for speed & space. need to be fast af.
  createCollection = async (opts: { start: number; end: number }): Promise<Collection> => {
    const { start, end } = opts;
    const allHash = new Set();
    const tokens: { attributes: any; token_hash: string }[] = [];
    const elements: Element[] = [];
    const data: any[] = [];
    for (var i = start; i < end; ) {
      const element: Element = await this.createElement();
      const hash: string = element.toHex();
      const attributes: any[] = element.toAttributes();
      !allHash.has(hash) && i++,
        allHash.add(hash),
        elements.push(element), // always sequential in token id
        tokens.push({ attributes: attributes, token_hash: hash }),
        data.push(attributes);
    }
    return new Collection({ elements, tokens, data, totalSupply: end - start });
  };
}

const calculateArtImageElementsStored = (collection: Collection) => {
  const elementsStored = [];
  for (let i = 0; i < 20; i++) {
    elementsStored.push(Math.pow(2, i));
  }
  return elementsStored;
};

export class ImageElementRandomizer {
  public static Run = (seed: string, layers: Layer[], width: number, height: number): ArtImageElement => {
    let sequences: ElementSource[] = [];
    random.setSeed(Number(seed));
    layers.forEach((layer: Layer, index: number) => {
      const { weight, iterations, occuranceRate, elements } = layer;
      for (var k = 0; k < iterations; k++) {
        // @ts-ignore
        if (random.value() > occuranceRate) {
          continue;
        }
        // @ts-ignore
        let random = Math.floor(random.value() * weight);

        for (var i = 0; i < elements.length; i++) {
          if (
            Sequencer.layerElementHasExclusion(layers, layer, elements[i].name, sequences) ||
            Sequencer.layerElementHasCombination(layers, layer, elements[i].name, sequences)
          ) {
            continue;
          }

          random -= elements[i].weight;
          if (random < 0) {
            sequences.push({
              layerIndex: index,
              elementIndex: elements[i].id,
              // @ts-ignore
              element: layers[index].elements.find((e) => e.id == elements[i].id),
            });
            break;
          }
        }
      }
    });
    return new ArtImageElement(sequences, width, height, layers);
  };
}
