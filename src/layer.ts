import { LayerConfig } from "./utils/types";
import fs from "fs";
import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from "./utils/canvas"
import { LAYER_TYPES } from "./constants/layer";
import { CanvasRenderObject, Gene, GeneSequence } from "./gene";

type LayerElement = {
    id: number,
    name: string,
    filename: string,
    path: string,
    weight: number
}

const createImage = async (
    gene: Gene,
    width: number,
    height: number,
    savePath: string
) => {
    const { canvas, context }: CanvasObject = createCanvas(width, height); // todo: not optimzed for speed
    const loadedImages: Promise<CanvasRenderObject>[] = gene.loadImages()
    await Promise.all(loadedImages).then((render: CanvasRenderObject[]) => {
        clearCanvas(context, width, height)
        render.forEach((object: CanvasRenderObject) => {
            drawImage(context, object.image, width, height)
        })
        saveImage(canvas, savePath)
    });
}

class Layers {
    layers: Layer[]
    width: number
    height: number
    layerPath: string
    rarityDelimiter: string
    geneDelimiter: string

    constructor(
        configs: LayerConfig[],
        width: number,
        height: number,
        layerPath: string,
        rarityDelimiter?: string,
        geneDelimiter?: string,
    ) {
        if (configs.length == 0) {
            throw new Error("configs failed with length 0")
        }

        if (!fs.existsSync(layerPath)) {
            throw new Error("layerPath invalid")
        }

        if (height == 0 || width == 0) {
            throw new Error('dimensions iinvalid')
        }

        this.layerPath = layerPath
        this.width = width;
        this.height = height;
        this.rarityDelimiter = rarityDelimiter || "#"
        this.geneDelimiter = geneDelimiter || "-"
        this.layers = configs.map((config: LayerConfig) => new Layer(config, this.layerPath, this.rarityDelimiter))
    }

    get(index: number) {
        return this.layers[index]
    }

    isEmpty() {
        return this.layers.length == 0
    }

    // todo: add opacity + blend
    // todo: gene already exists
    // todo: add attributes/metadata
    createRandomImages = async (
        basePath: string,
        invocations: number
    ) => {
        let allMetadata: any[] = []
        let allGene: Gene[] = []

        for (let i = 0; i < invocations; i++) {
            const gene: Gene = this.createRandomGene()
            // createImage(gene, this.width, this.height, `${basePath}/images/${i}.png`)
            const metadata = this.createImageMetadata(gene, i)

            allMetadata.push(metadata)
            allGene.push(gene)
        }

        this.calculateRarity(allGene, invocations)
    }

    calculateRarity = (genes: Gene[], totalInvocations: number) => {
        let layerRarity: any = {}
        this.layers.forEach((layer, i) => {
            layerRarity[i] = {}
            layer.elements.forEach((element, j) => {
                layerRarity[i][j] = {
                    trait: element.name,
                    weight: element.weight,
                    occurance: 0
                }
            })
        })

        genes.forEach((gene: Gene) => {
            gene.sequences.forEach((sequence: GeneSequence) => {
                layerRarity[sequence.layerIndex][sequence.elementIndex].occurance++;
            })
        })

        for (let layer in layerRarity) {
            let currentLayer = this.layers[Number(layer)]
            console.log(`Trait Type ${currentLayer.name}`)
            for (let attribute in layerRarity[layer]) {
                console.log(
                    `${currentLayer.elements[Number(attribute)].name} -- `,
                    (layerRarity[layer][attribute].occurance / totalInvocations * 100).toFixed(10) + "% out of 100%"
                )
            }
        }
    }

    createImageMetadata = (gene: Gene, edition: number) => {
        const collectionNamePrefix = "DreamLab"
        const collectionBaseUri = "ipfs://some_base_uri"
        const collectionArtistName = "Jacob Riglin"
        const collectionDescription = "Some description about the project"
        const collectionCompiler = "Rhapsody Labs Compiler"

        return {
            "description": collectionDescription,
            "image": `${collectionBaseUri}/${edition}.png`,
            "name": `${collectionNamePrefix} #${edition}`,
            "attributes": [gene.sequences.map((sequence: GeneSequence) => {
                return {
                    "trait_type": this.layers[sequence.layerIndex].name,
                    "value": sequence.element.name,
                }
            })],
            "artist": collectionArtistName,
            "tokenHash": "some_token_hash",
            "compiler": collectionCompiler
        }
    };

    createRandomGene(): Gene {
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

export class Layer {
    name: string;
    elements: LayerElement[];
    iterations: number;
    occuranceRate: number;
    type?: string;
    combination?: any;
    exclude?: any;

    // todo: fix rarityDelimter being passed multiple times
    // todo: fix type name checking conmbination and exclude properties
    constructor(config: LayerConfig, layerPath: string, rarityDelimiter: string) {
        if (!config.name || config.name.length == 0) {
            throw new Error("layer name doesn't exists")
        }

        this.name = config.name
        this.elements = this.getLayerElements(`${layerPath}/${this.name}/`, rarityDelimiter, config)
        this.iterations = config.options?.iterations || 1
        this.occuranceRate = config.options?.occuranceRate || 1
        this.type = config.options?.type || LAYER_TYPES.NORMAL

        if (config.options?.combination != undefined) {
            this.combination = config.options.combination
        }

        if (config.options?.exclude != undefined) {
            this.exclude = config.options.exclude
        }
    }

    getLayerElements = (
        path: string,
        rarityDelimiter: string,
        config: LayerConfig
    ): LayerElement[] => {
        return config.traits.map(({ name, weight }, index) => {
            return {
                id: index,
                name: this.getLayerName(name, rarityDelimiter),
                filename: name,
                path: `${path}${name}`,
                weight: weight || 1
            }
        })
    };

    getLayerName = (_name: string, rarityDelimiter: string): string => {
        return (_name.slice(0, -4)).split(rarityDelimiter).shift() || ""
    }
}

export { Layers }