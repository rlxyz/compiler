import { GeneratorConfig } from "./generator";
import { BuildConfig, ImageFormatConfig, LayerConfig } from "./generator/types";

const basePath = process.cwd();

const imageFormatConfig: ImageFormatConfig = {
    width: 5681,
    height: 3788,
    smoothing: false,
}

const layerConfig: LayerConfig[] = [
    { name: "sky" },
    { name: "bottom_left" },
    { name: "bottom_right" },
    { name: "top_left" },
    { name: "top_right" },
    {
        name: "person",
        options: {
            iterations: 3,
            occuranceRate: 1 / 2,
        }
    },
    {
        name: "special_top",
        options: {
            type: "EXCLUSION",
            exclude: {
                "lights": ["iceland.png", "snowy town.png", "winter.png"]
            },
            occuranceRate: 1 / 2,
        }
    },
    {
        name: "special_bottom_exclude",
        options: {
            type: "EXCLUSION",
            exclude: {
                "lights": ["iceland.png", "snowy town.png", "winter.png"],
                "dry lakebed": ["snowy town.png", "winter.png"],
                "waterfall": ["snowy town.png", "winter.png"],
            },
            occuranceRate: 1 / 2,
        }
    },
    {
        name: "special_bottom_combination",
        options: {
            type: "COMBINATION",
            combination: {
                "frozen": ["snowy town.png", "winter.png"]
            },
        }
    },
]

const buildConfig: BuildConfig = {
    basePath: basePath,
    invocations: 1,
    rarityDelimiter: "#",
    geneDelimiter: "-"
}

const generatorConfig: GeneratorConfig = {
    format: imageFormatConfig,
    build: buildConfig
}

export { generatorConfig, layerConfig }