const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
const random = require('canvas-sketch-util/random');
const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// todo: remove and replace
const layerType = {
  NORMAL: "NORMAL",
  EXCLUSION: "EXCLUSION",
  COMBINATION: "COMBINATION"
}

random.setSeed(1)

const layerCount = 15;
// const rarity = (new Set((Array.from(Array(layerCount), (_, i) => Array.from(Array(10), () => random.range(-1, 1))))))

// const rarityCoefficient = {
//   0: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   1: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   2: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   3: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   4: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   5: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   6: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   7: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   8: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   9: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   10: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   11: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   12: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   13: Array.from(Array(layerCount), () => random.range(-1, 1)),
//   14: Array.from(Array(layerCount), () => random.range(-1, 1)),
// }

const layerConfigurations = [
  {
    growEditionSizeTo: 1000,
    layersOrder: [
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
          type: layerType.EXCLUSION,
          exclude: {
            "lights": ["iceland.png", "snowy town.png", "winter.png"]
          },
          occuranceRate: 1 / 2,
        }
      },
      {
        name: "special_bottom_exclude",
        options: {
          type: layerType.EXCLUSION,
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
          type: layerType.COMBINATION,
          combination: {
            "frozen": ["snowy town.png", "winter.png"]
          },
        }
      },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 5681,
  height: 3788,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  layerType,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  // rarityCoefficient,
};
