## Installation 🛠️

```sh
yarn add @rhapsodylabs/rhapsodys
```

## Usage

Step 1: Create folder in root of project called `layers` and dump all layers there.

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

Step 2: Set these variables (note, rarityDelimiter + geneDelimiter doesn't work just yet)
```sh

const basePath = process.cwd();

const buildConfig: BuildConfig = {
    basePath: basePath,
    invocations: 1000,
    rarityDelimiter: "#",
    saveImage: false,
    geneDelimiter: "-"
}

const imageFormatConfig: ImageFormatConfig = {
    width: 500,
    height: 500,
    smoothing: false,
}
```

Step 3: Layer Config based on `layers` folder
```sh
const layerConfig: LayerConfig[] = [
      {
        name: "layer_1",
        traits: [
            { name: "layer_1_1.png", weight: 50 },
            { name: "layer_1_2.png", weight: 100 },
        ]
      },
      {
        name: "layer_2",
        traits: [
            { name: "layer_2_1.png", weight: 70 },
            { name: "layer_2_2.png", weight: 30 },
        ]
      },
   ]
```

Step 4: Generate a bunch of images
```
 const g = new Generator({
    format: imageFormatConfig,
    build: buildConfig
  }, layerConfig)
 g.build()
```

Hopefully, this works for now. Will be updated will full guide soon. DM @jeevanpillay on Twitter if there are issues.
