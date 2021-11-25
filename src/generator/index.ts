import { Layers } from "./layer";
import {
    ImageFormatConfig,
    LayerConfig,
    BuildConfig
} from "./types"

export type GeneratorConfig = {
    format: ImageFormatConfig;
    build: BuildConfig;
}

class Generator {
    config: GeneratorConfig
    layers: Layers;

    constructor(
        config: GeneratorConfig,
        layers: LayerConfig[],
    ) {
        this.config = config
        this.layers = new Layers(layers, this.config.build.basePath, this.config.build.rarityDelimiter)
    }

    // setup() {
    //     fs.existsSync(this.build.basePath) ? fs.rmdirSync(this.build.basePath, { recursive: true }) : null;
    //     fs.mkdirSync(this.build.basePath);
    //     fs.mkdirSync(`${this.build.basePath}/json`);
    //     fs.mkdirSync(`${this.build.basePath}/images`);
    // }

    prebuild() {
        // do checks!
    }

    builder() {
        this.prebuild()
        this.create()
    }

    create() {
        // this.layers.forEach(((layer: Layer) => {

        // }))
    }
}

export { Generator }