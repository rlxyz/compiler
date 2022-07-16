import fs from 'fs';
import { LayerConfig, ElementSource, LayerElement } from '../utils/types';
import { Element, ImageElement } from './Element';
import Layer from './Layer';

// Only handles the sequencing of Layers with a GeneSequence
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
    return ImageElementRandomizer.Run(this.body.layers, this.header.width, this.header.height);
  };

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
    sequences: ElementSource[],
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
    sequences: ElementSource[],
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

export class ImageElementRandomizer {
  public static Run = (layers: Layer[], width: number, height: number): ImageElement => {
    let sequences: ElementSource[] = [];
    layers.forEach((layer: Layer, index: number) => {
      const { weight, iterations, occuranceRate, elements } = layer;
      for (var k = 0; k < iterations; k++) {
        if (Math.random() > occuranceRate) {
          continue;
        }

        let random = Math.floor(Math.random() * weight);

        for (var i = 0; i < elements.length; i++) {
          if (
            Sequencer.layerElementHasCombination(layers, layer, i, sequences) ||
            Sequencer.layerElementHasExclusion(layers, layer, i, sequences)
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
    return new ImageElement(sequences, width, height, layers);
  };
}
