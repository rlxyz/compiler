import { createCanvas } from "canvas";
import { Layers } from "./layer";
import {
    ImageFormatConfig,
    LayerConfig,
    BuildConfig
} from "./utils/types"
import fs from "fs"

export type GeneratorConfig = {
    format: ImageFormatConfig;
    build: BuildConfig;
}

class Generator {
    config: GeneratorConfig
    layers: Layers;
    buildPath: string;

    constructor(
        config: GeneratorConfig,
        layers: LayerConfig[],
    ) {
        this.config = config
        this.buildPath = `${config.build.basePath}/build/data`
        this.layers = new Layers(
            layers,
            config.format.width,
            config.format.height,
            config.build.basePath + "/layers",
            config.build.rarityDelimiter,
            config.build.geneDelimiter
        )
        this.setup()
    }

    setup() {
        fs.existsSync(this.buildPath) ? fs.rmdirSync(this.buildPath, { recursive: true }) : null;
        fs.mkdirSync(this.buildPath);
        fs.mkdirSync(`${this.buildPath}/json`);
        fs.mkdirSync(`${this.buildPath}/images`);
    }

    build() {
        if (this.layers.isEmpty()) {
            throw new Error("there aren't any layers specified")
        }

        this.layers.createRandomImages(
            this.buildPath,
            this.config.build.invocations
        )
    }
}

export { Generator }