import { Image, loadImage } from 'canvas';
import { GeneSequence, CanvasRenderObject } from './types';

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
        const image: Image = await loadImage(`${sequence.element.path}`);
        resolve({ image: image });
      });
    });
    return loadedElements;
  };
}
