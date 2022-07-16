import { ImageElement } from './Element';
import { ElementSource } from '../utils/types';
import Layer from './Layer';
import { Sequencer } from './Sequencer';

export class ImageElementRandomizer {
  public static Run = (layers: Layer[], width: number, height: number): ImageElement => {
    let sequences: ElementSource[] = [];
    layers.forEach((layer: Layer, index: number) => {
      const { weight, iterations, occuranceRate, elements, link } = layer;
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
            let element = layers[index].elements.find((e) => e.id == elements[i].id);

            if (element?.link !== undefined) {
              let randomLink = Math.floor(Math.random() * Sequencer.elementLinkWeight(element));

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
                let randomLink = Math.floor(Math.random() * Sequencer.layerLinkWeight(layer));

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
    return new ImageElement(sequences, width, height, layers);
  };
}
