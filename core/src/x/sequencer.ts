import fs from 'fs';
import { LayerConfig, ElementSource, LayerElement } from '../utils/types';
import { Element } from './Element';
import Layer from './Layer';

// Only handles the sequencing of Layers with a GeneSequence
// Doesn't handle metadata or other things
export class Sequencer {
  layers: Layer[];
  layersPath: string;

  constructor(configs: LayerConfig[], basePath: string) {
    if (configs.length === 0) {
      throw new Error('configs failed with length 0');
    }

    this.layersPath = basePath + '/layers';

    if (!fs.existsSync(this.layersPath)) {
      throw new Error('layerPath invalid');
    }

    this.layers = configs.map((config: LayerConfig) => new Layer(config, `${this.layersPath}/${config.name}`));
  }

  createImageMetadata = (gene: Element): any[] => {
    let attributes: any[] = [];

    this.layers.forEach((layer: Layer, i) => {
      if (layer.metadata && gene.sources[i]) {
        const name = this.layers[gene.sources[i].layerIndex].name;
        const trait = {
          trait_type: name,
          value: name == 'Skin' ? gene.sources[i].element.name.split('. ')[1] : gene.sources[i].element.name,
        };
        let extra = {};
        if (layer.link) {
          extra = {
            trait_type: this.layers[gene.sources[i].layerIndex].linkName,
            value: gene.sources[i].element.linkExtension.split('.').slice(0, -1).join('.'),
          };
          attributes.push(extra);
        }
        attributes.push(trait);
      }
    });

    // if (this.body.saveMetadata) {
    //   fs.writeFileSync(`${this.body.metadataPath}/${edition}.json`, JSON.stringify(metadata, null, 2));
    // }
    return attributes;
  };

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
