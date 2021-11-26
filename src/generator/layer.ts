import { LayerConfig } from "./types";
import fs from "fs";
import { createCanvas, Image, loadImage as li } from "canvas";

type LayerElement = {
    id: number,
    name: string,
    filename: string,
    path: string,
    weight: number
}

type GeneSequence = {
    layerIndex: number,
    elementIndex: number
    element: any,
}

class Gene {
    sequences: GeneSequence[]

    constructor(sequences: GeneSequence[]) {
        this.sequences = sequences
    }

    string = () => {
        return this.sequences
    }

    loadImages = (layers: Layer[]): Promise<{ layer: Layer, image: Image }>[] => {
        const loadedElements: Promise<{ layer: Layer, image: Image }>[] = this.sequences.map((sequence) => {
            return new Promise(async (resolve) => {
                const image: Image = await li(`${sequence.element.path}`);
                resolve({ layer: layers[sequence.layerIndex], image: image });
            });
        })
        return loadedElements
    }
}

class Layers {
    layers: Layer[]
    layerPath: string
    rarityDelimiter: string
    geneDelimiter: string

    constructor(
        configs: LayerConfig[],
        basePath: string,
        rarityDelimiter: string,
        geneDelimiter: string
    ) {
        this.layerPath = `${basePath}/layers`
        this.rarityDelimiter = rarityDelimiter
        this.geneDelimiter = geneDelimiter
        this.layers = configs.map((config: LayerConfig) => new Layer(config, this.layerPath, rarityDelimiter))
    }

    get(index: number) {
        return this.layers[index]
    }

    isEmpty() {
        return this.layers.length == 0
    }

    // todo: add opacity + blend
    drawImage = (
        ctx: any,
        width: number,
        height: number,
        renderObject: any,
    ) => {
        // ctx.globalAlpha = renderObject.layer.opacity || 1;
        // ctx.globalCompositeOperation = renderObject.layer.blend;
        ctx.drawImage(
            renderObject.image,
            0,
            0,
            width,
            height
        );
    };

    saveImage = (canvas: any, basePath: string, index: number) => {
        fs.writeFileSync(
            `${basePath}/images/${index}.png`,
            canvas.toBuffer("image/png")
        );
    };

    // todo: gene already exists
    // todo: add attributes/metadata
    // todo: restrucutre canvas object
    createRandomImages = async (
        canvas: any,
        basePath: string,
        width: number,
        height: number,
        invocations: number
    ) => {
        const ctx = canvas.getContext("2d");
        for (let i = 0; i < invocations; i++) {
            const gene: Gene = this.createGene()
            const loadedImages = gene.loadImages(this.layers)
            await Promise.all(loadedImages).then((render) => {
                ctx.clearRect(0, 0, width, height)
                render.forEach((object) => {
                    this.drawImage(ctx, width, height, object)
                })
                this.saveImage(canvas, basePath, i)
            })
            // let results: Gene = this.createDnaFromGene(raw)
        }
    }

    // createDnaFromGene(raw: string[] = []): Gene {
    //     let gene: Gene = {
    //         raw: raw,
    //         sequence: []
    //     }
    //     raw.forEach((layer) => {
    //         const [layerType, layerItem] = layer.split("-")
    //         const layerIndex = Number(layerType.replace("L", ""))
    //         gene.sequence.push({
    //             name: this.layers[layerIndex].name,
    //             element: this.layers[layerIndex].elements.find(
    //                 (e) => e.id == cleanDna(layerItem)
    //             )
    //         })
    //     });
    //     return gene;
    // }

    createGene(): Gene {
        let sequences: GeneSequence[] = [];

        this.layers.forEach((layer, index) => {
            const totalWeight = this.layerElementWeight(layer)

            for (var k = 0; k < layer.iterations; k++) {
                if (Math.random() > layer.occuranceRate) {
                    continue
                }

                let random = Math.floor(Math.random() * totalWeight);

                for (var i = 0; i < layer.elements.length; i++) {
                    if (this.layerElementHasCombination(layer, i, sequences) || this.layerElementHasExclusion(layer, i, sequences)) {
                        continue;
                    }

                    random -= layer.elements[i].weight;
                    if (random < 0) {
                        sequences.push({
                            layerIndex: index,
                            elementIndex: layer.elements[i].id,
                            element: this.layers[index].elements.find(
                                (e) => e.id == layer.elements[i].id
                            )
                        });
                        break;
                    }
                }
            }
        });

        return new Gene(sequences);
    }

    layerElementWeight(layer: Layer): number {
        var totalWeight = 0;
        layer.elements.forEach((element) => {
            totalWeight += element.weight;
        });
        return totalWeight
    }

    layerElementHasCombination(layer: Layer, index: number, sequences: GeneSequence[]) {
        if (!layer.combination) {
            return false;
        }


        let count = 0;
        sequences.forEach((sequence) => {
            if (layer.combination[layer.elements[index].name].includes(this.layers[sequence.layerIndex].elements[sequence.elementIndex].name)) {
                count++;
            }
        });

        if (count != 4) {
            return true;
        }

        return false;
    }

    layerElementHasExclusion(layer: Layer, index: number, sequences: GeneSequence[]) {
        if (!layer.exclude) {
            return false
        }
        sequences.forEach((sequence) => {
            if (layer.exclude[layer.elements[index].name].includes(this.layers[sequence.layerIndex].elements[sequence.elementIndex].name)) {
                return true;
            }
        });
        return false;
    }
}

class Layer {
    name: string;
    elements: LayerElement[];
    iterations: number;
    occuranceRate: number;
    type?: string;
    combination?: any;
    exclude?: any;

    // todo: fix rarityDelimter being passed multiple times
    constructor(config: LayerConfig, layerPath: string, rarityDelimiter: string) {
        if (!config.name || config.name.length == 0) {
            throw new Error("layer name doesn't exists")
        }

        this.name = config.name
        this.elements = this.getLayerElements(`${layerPath}/${this.name}/`, rarityDelimiter)
        this.iterations = config.options?.iterations || 1
        this.occuranceRate = config.options?.occuranceRate || 1

        if (config.options?.type != undefined) {
            this.type = config.options.type
        }

        if (config.options?.combination != undefined) {
            this.combination = config.options.combination
        }

        if (config.options?.exclude != undefined) {
            this.exclude = config.options.exclude
        }
    }

    getLayerElements = (
        path: string,
        rarityDelimiter: string
    ): LayerElement[] => {
        return fs
            .readdirSync(path)
            .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
            .map((i, index) => {
                return {
                    id: index,
                    name: this.getLayerName(i, rarityDelimiter),
                    filename: i,
                    path: `${path}${i}`,
                    weight: this.getLayerElementRarity(i, rarityDelimiter),
                };
            });
    };

    getLayerName = (_name: string, rarityDelimiter: string): string => {
        return (_name.slice(0, -4)).split(rarityDelimiter).shift() || ""
    }

    getLayerElementRarity = (_name: string, rarityDelimiter: string): number => {
        const weight = Number(_name.slice(0, -4).split(rarityDelimiter).pop())
        return isNaN(weight) ? 1 : weight
    }
}

export { Layers }