import { GeneSequence } from '../types';
import Layer from './layer';
import { ImageCompiler } from './compiler';

export class GeneticSequenceRandomizer {
  public static Run = (layers: Layer[]): GeneSequence[] => {
    let sequences: GeneSequence[] = [];
    layers.forEach((layer: Layer, index: number) => {
      const { weight, iterations, occuranceRate, elements, link } = layer;
      for (var k = 0; k < iterations; k++) {
        if (Math.random() > occuranceRate) {
          continue;
        }

        let random = Math.floor(Math.random() * weight);

        for (var i = 0; i < elements.length; i++) {
          if (ImageCompiler.layerElementHasCombination(layers, layer, i, sequences) ||
            ImageCompiler.layerElementHasExclusion(layers, layer, i, sequences)) {
            continue;
          }

          random -= elements[i].weight;
          if (random < 0) {
            let element = layers[index].elements.find((e) => e.id == elements[i].id);

            if (element?.link !== undefined) {
              let randomLink = Math.floor(Math.random() * ImageCompiler.elementLinkWeight(element));

              for (var z = 0; z < element.link.length; z++) {
                randomLink -= element.link[z].weight;
                if (randomLink < 0) {
                  // @ts-ignore
                  element.linkExtension = `${element.link[z].name}`;
                  break;
                }
              }
            } else if (link !== undefined) {
              if (link !== undefined) {
                let randomLink = Math.floor(Math.random() * ImageCompiler.layerLinkWeight(layer));

                for (var z = 0; z < link.length; z++) {
                  randomLink -= link[z].weight;
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
              elementIndex: elements[i].id,
              element: element,
            });

            break;
          }
        }
      }
    });
    return sequences;
  };
}
