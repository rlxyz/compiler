import { LayerConfig } from "./types";
import fs from "fs";

type LayerElement = {
    id: number,
    name: string,
    filename: string,
    path: string,
    weight: number
}

class Layers {
    layers: Layer[]
    layerPath: string

    constructor(configs: LayerConfig[], basePath: string, rarityDelimiter: string) {
        this.layerPath = `${basePath}/layers`
        this.layers = configs.map((config: LayerConfig) => new Layer(config, this.layerPath, rarityDelimiter))
    }

    get(index: number) {
        return this.layers[index]
    }
}

class Layer {
    name: string;
    elements: LayerElement[];
    type?: string;
    combination?: any;
    exclude?: any;
    iterations?: number;
    occuranceRate?: number;

    // todo: fix rarityDelimter being passed multiple times
    constructor(config: LayerConfig, layerPath: string, rarityDelimiter: string) {
        if (!config.name || config.name.length == 0) {
            throw new Error("layer name doesn't exists")
        }

        this.name = config.name
        this.elements = this.getLayerElements(`${layerPath}/${this.name}/`, rarityDelimiter)

        if (config.options?.type != undefined) {
            this.type = config.options.type
        }

        if (config.options?.combination != undefined) {
            this.combination = config.options.combination
        }

        if (config.options?.exclude != undefined) {
            this.combination = config.options.exclude
        }

        if (config.options?.iterations != undefined) {
            this.iterations = config.options.iterations
        }

        if (config.options?.occuranceRate != undefined) {
            this.occuranceRate = config.options.occuranceRate
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