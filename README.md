[![NPM Package](https://img.shields.io/npm/v/@rlxyz/compiler.svg)](https://www.npmjs.org/package/@rlxyz/compiler)

**A library based on Boolean Logic for Generative Art compilation**

- Allows creation of generative art images based on layers
- Handles various boolean logic creation
- Outputs metadata files
- Calculates rarity of each layer & trait

## Overview

### Installation 🛠️

```console
yarn add @rlxyz/compiler
```

Once installed, you can use the generative compiler in the library by following these steps.

## Usage

### Step 1: Create folder in root of project called `layers` and add layers.

```sh
root
  - src
  - layers
    - layer_1
      - layer_1_1.png
      - layer_1_2.png
    - layer_2
      - layer_2_1.png
      - layer_2_2.png
  - package.json
  - ...
```

### Step 2: Set these variables.

```sh
const imageFormatConfig: ImageFormatConfig = {
    width: 500,
    height: 500,
    smoothing: false,
}
```

### Step 3: Create these folders at root

```sh
root
  - layers
  - images
  - metadata
  - package.json
  - ...
```

As of `v1.0.1`, user must create `layers`, `images` and `metadata` folder.

### Step 4: Layer Config based on `layers` folder

```javascript
const layerConfig: LayerConfig[] = [
  {
    name: 'layer_1',
    traits: [
      { name: 'layer_1_1.png', weight: 50 },
      { name: 'layer_1_2.png', weight: 100 },
    ],
  },
  {
    name: 'layer_2',
    traits: [
      { name: 'layer_2_1.png', weight: 70 },
      { name: 'layer_2_2.png', weight: 30 },
    ],
  },
];
```

### Step 5: To generate images, use this block of code.

```javascript
import { Layers } from '@rlxyz/compiler';
import { imageFormatConfig, layerConfig } from './config';

const basePath = process.cwd();

const createImage = () => {
  const layers = new Layers(layerConfig, imageFormatConfig, basePath, true);
  layers.createRandomImages();
};

(() => {
  createImage();
})();
```

## Security

This project is maintained by [RLXYZ](https://twitter.com/rlxyz_eth).

Critical bug fixes will be backported to past major releases.

## Contribute

RLXYZ Compiler exists thanks to its contributors. There are many ways you can participate and help build high quality software. Check out the [contribution guide](CONTRIBUTING.md)!

## License

RLXYZ Compiler is released under the [MIT License](LICENSE).
