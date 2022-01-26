import { Image, loadImage } from 'canvas';
import fs from 'fs';
import { GeneSequence, CanvasRenderObject } from '../types';

export class Gene {
  sequences: GeneSequence[];

  constructor(sequences: GeneSequence[]) {
    this.sequences = sequences;
  }

  string = () => {
    return this.sequences;
  };

  loadImages = (): Promise<CanvasRenderObject>[] => {
    const loadedElements: Promise<CanvasRenderObject>[] = this.sequences.map((sequence) => {
      return new Promise(async (resolve) => {
        const path =
          `${sequence.element.path}` + (sequence.element.linkExtension ? `_${sequence.element.linkExtension}` : '');
        const image: Image = await loadImage(path);
        resolve({ image: image });
      });
    });
    return loadedElements;
  };
}
