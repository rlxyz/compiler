import { GeneratorConfig } from "./generator";
import { BuildConfig, ImageFormatConfig, LayerConfig } from "./utils/types";

const basePath = process.cwd();

const buildConfig: BuildConfig = {
    basePath: basePath,
    invocations: 1000,
    rarityDelimiter: "#",
    geneDelimiter: "-"
}

const imageFormatConfig: ImageFormatConfig = {
    width: 5681,
    height: 3788,
    smoothing: false,
}

const layerConfig: LayerConfig[] = [
    {
        name: "sky",
        traits: [
            { name: "BIG BLUE.png", weight: 50 },
            { name: "BIG SKY.png", weight: 50 },
            { name: "BLOWOUT.png", weight: 70 },
            { name: "EVENING GLOW.png", weight: 30 },
            { name: "FINAL GLOW.png", weight: 65 },
            { name: "FIRE.png", weight: 30 },
            { name: "GOLDEN SUNSET.png", weight: 45 },
            { name: "HIGH CLOUDS.png", weight: 45 },
            { name: "LIGHTNING.png", weight: 15 },
            { name: "LONELY CLOUD.png", weight: 30 },
            { name: "MIDNIGHT GLOW.png", weight: 50 },
            { name: "MILKY WAY.png", weight: 15 },
            { name: "MOODY MORNING.png", weight: 45 },
            { name: "MORNING BLUE.png", weight: 70 },
            { name: "MORNING CLOUDS.png", weight: 45 },
            { name: "MORNING RAYS.png", weight: 50 },
            { name: "MOVING STARS.png", weight: 20 },
            { name: "NORTHERN LIGHTS.png", weight: 20 },
            { name: "PASTEL.png", weight: 45 },
            { name: "RAINBOW.png", weight: 20 },
            { name: "RICH PINK.png", weight: 45 },
            { name: "SOFT PINK.png", weight: 60 },
            { name: "STAR GLOW.png", weight: 50 },
            { name: "STORM.png", weight: 30 },
            { name: "NEBULA.png", weight: 5 },
            { name: "FIRST-LIGHT.png", weight: 5 },
            { name: "COLLOSAL-CLOUD.png", weight: 5 },
            { name: "CRESENT-MOON.png", weight: 5 },
        ]
    },
    {
        name: "bottom_left",
        traits: [
            { name: "autumn.png", weight: 50 },
            { name: "blue.png", weight: 75 },
            { name: "cyan.png", weight: 75 },
            { name: "dead trees.png", weight: 50 },
            { name: "green.png", weight: 75 },
            { name: "iceland.png", weight: 50 },
            { name: "orange.png", weight: 75 },
            { name: "palm.png", weight: 50 },
            { name: "pink.png", weight: 75 },
            { name: "purple.png", weight: 75 },
            { name: "red.png", weight: 75 },
            { name: "snowy town.png", weight: 50 },
            { name: "spring.png", weight: 50 },
            { name: "summer.png", weight: 50 },
            { name: "winter.png", weight: 50 },
            { name: "yellow.png", weight: 75 },
        ]
    },
    {
        name: "bottom_right",
        traits: [
            { name: "autumn.png", weight: 50 },
            { name: "blue.png", weight: 75 },
            { name: "cyan.png", weight: 75 },
            { name: "dead trees.png", weight: 50 },
            { name: "green.png", weight: 75 },
            { name: "iceland.png", weight: 50 },
            { name: "orange.png", weight: 75 },
            { name: "palm.png", weight: 50 },
            { name: "pink.png", weight: 75 },
            { name: "purple.png", weight: 75 },
            { name: "red.png", weight: 75 },
            { name: "snowy town.png", weight: 50 },
            { name: "spring.png", weight: 50 },
            { name: "summer.png", weight: 50 },
            { name: "winter.png", weight: 50 },
            { name: "yellow.png", weight: 75 },
        ]
    },
    {
        name: "top_left",
        traits: [
            { name: "autumn.png", weight: 50 },
            { name: "blue.png", weight: 75 },
            { name: "cyan.png", weight: 75 },
            { name: "dead trees.png", weight: 50 },
            { name: "green.png", weight: 75 },
            { name: "iceland.png", weight: 50 },
            { name: "orange.png", weight: 75 },
            { name: "palm.png", weight: 50 },
            { name: "pink.png", weight: 75 },
            { name: "purple.png", weight: 75 },
            { name: "red.png", weight: 75 },
            { name: "snowy town.png", weight: 50 },
            { name: "spring.png", weight: 50 },
            { name: "summer.png", weight: 50 },
            { name: "winter.png", weight: 50 },
            { name: "yellow.png", weight: 75 },
        ]
    },
    {
        name: "top_right",
        traits: [
            { name: "autumn.png", weight: 50 },
            { name: "blue.png", weight: 75 },
            { name: "cyan.png", weight: 75 },
            { name: "dead trees.png", weight: 50 },
            { name: "green.png", weight: 75 },
            { name: "iceland.png", weight: 50 },
            { name: "orange.png", weight: 75 },
            { name: "palm.png", weight: 50 },
            { name: "pink.png", weight: 75 },
            { name: "purple.png", weight: 75 },
            { name: "red.png", weight: 75 },
            { name: "snowy town.png", weight: 50 },
            { name: "spring.png", weight: 50 },
            { name: "summer.png", weight: 50 },
            { name: "winter.png", weight: 50 },
            { name: "yellow.png", weight: 75 },
        ]
    },
    {
        name: "person",
        traits: [
            { name: "JUMP.png", weight: 30 },
            { name: "STAND.png", weight: 20 },
            { name: "WALK.png", weight: 60 },
        ],
        options: {
            iterations: 3,
            occuranceRate: 1 / 2,
        }
    },
    {
        name: "special_top",
        traits: [
            { name: "lights.png", weight: 1 }
        ],
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
        traits: [
            { name: "lights.png", weight: 100 },
            { name: "dry lakebed.png", weight: 25 },
            { name: "waterfall.png", weight: 50 },
        ],
        options: {
            type: "EXCLUSION",
            exclude: {
                "lights": ["iceland", "snowy town", "winter"],
                "dry lakebed": ["snowy town", "winter"],
                "waterfall": ["snowy town", "winter"],
            },
            occuranceRate: 1 / 5,
        }
    },
    {
        name: "special_bottom_combination",
        traits: [
            { name: "frozen.png", weight: 50 },
        ],
        options: {
            type: "COMBINATION",
            combination: {
                "frozen": ["snowy town", "winter"]
            },
            occuranceRate: 1,
        }
    },
]

const generatorConfig: GeneratorConfig = {
    format: imageFormatConfig,
    build: buildConfig
}

export { generatorConfig, layerConfig }