"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const basePath = process.cwd();
// const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
var generator_1 = require("./src/generator");
var config_1 = require("./src/config");
(function () {
    var g = new generator_1.Generator(config_1.generatorConfig, config_1.layerConfig);
    g.build();
    // buildSetup();
    // startCreating();
})();
