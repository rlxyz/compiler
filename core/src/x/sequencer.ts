import fs from 'fs';
import { LayerConfig, ElementSource, LayerElement } from '../utils/types';
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
  };

  constructor(configs: LayerConfig[], basePath: string, width: number, height: number) {
    if (configs.length === 0) {
      throw new Error('configs failed with length 0');
    }

    const layersPath = `${basePath}/layers`;
    if (!fs.existsSync(layersPath)) {
      throw new Error('layerPath invalid');
    }
    this.body = {
      layers: configs.map((config: LayerConfig) => new Layer(config, `${layersPath}/${config.name}`)),
      layersPath: layersPath,
    };
    this.header = {
      width: width,
      height: height,
    };
  }

  createElement = (seed: string): Element => {
    return ImageElementRandomizer.Run(seed, this.body.layers, this.header.width, this.header.height);
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
}

const rng = (seed: number) => {
  (seed ^= seed << 13), (seed ^= seed >> 17);
  const e = (((seed ^= seed << 5) < 0 ? 1 + ~seed : seed) % 1e5) / 1e5;
  return 0 === e || 1 === e ? 0.5 : e;
};

const createSeed = (tokenHash: string) => {
  return parseInt(tokenHash.slice(0, 16), 16);
};

const chunkSubstr = (str: string, size: number) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
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
