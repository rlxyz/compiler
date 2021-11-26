// const basePath = process.cwd();
// const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
import { Generator } from "./generator/index"
import { generatorConfig, layerConfig } from "./config";

(() => {
  const g = new Generator(
    generatorConfig,
    layerConfig,
  )
  g.build()

  // buildSetup();
  // startCreating();
})();
