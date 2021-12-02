import { Image, loadImage } from "canvas";
import { Layer } from "./layer";

export type GeneSequence = {
    layerIndex: number;
    elementIndex: number;
    element: any;
};

export type CanvasRenderObject = {
    image: Image,
}

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
