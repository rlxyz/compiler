import { Image, loadImage as li } from "canvas";
import { Layer } from "./layer";

export type GeneSequence = {
    layerIndex: number;
    elementIndex: number;
    element: any;
};
export class Gene {
    sequences: GeneSequence[];

    constructor(sequences: GeneSequence[]) {
        this.sequences = sequences;
    }

    string = () => {
        return this.sequences;
    };

    loadImages = (layers: Layer[]): Promise<{ layer: Layer; image: Image; }>[] => {
        const loadedElements: Promise<{ layer: Layer; image: Image; }>[] = this.sequences.map((sequence) => {
            return new Promise(async (resolve) => {
                const image: Image = await li(`${sequence.element.path}`);
                resolve({ layer: layers[sequence.layerIndex], image: image });
            });
        });
        return loadedElements;
    };
}
