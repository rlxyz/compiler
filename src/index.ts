// const basePath = process.cwd();
// const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
import { Generator } from "./generator/index"
import { generatorConfig, layerConfig } from "./config";

(() => {
  new Generator(
    generatorConfig,
    layerConfig,
  )

  // buildSetup();
  // startCreating();
})();
