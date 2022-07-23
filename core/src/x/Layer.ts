import { LayerConfig, LayerElement } from '../utils/types';

class Layer {
  name: string;
  elements: LayerElement[];

  layerPath: string;
  iterations: number;
  occuranceRate: number;
  weight: number;

  combination?: any;

  // exclude?: { name: string; from: string[] }[];
  exclude?: any;

  constructor(config: LayerConfig, layerPath: string) {
    if (!config.name || config.name.length == 0) {
      throw new Error("layer name doesn't exists");
    }

    this.name = config.name;
    this.layerPath = layerPath;
    this.elements = config.traits.map(({ name, weight }, index) => {
      return {
        id: index,
        name: name.replace(/.(jpg|jpeg|png|gif)$/i, ''),
        path: `${this.layerPath}/${name
          .toLowerCase()
          .replace(/(\s+)/g, '-')
          .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
          .replace(new RegExp(/\w/), (s) => s.toUpperCase())}${'.png'}`,
        filename: name,
        weight: weight || 1,
      };
    });

    this.iterations = config.options?.iterations || 1;
    this.occuranceRate = config.options?.occuranceRate || 1;
    this.weight = this.elements
      .map((element) => {
        return element.weight;
      })
      .reduce((a, b) => a + b, 0);
    config.options?.combination != undefined && (this.combination = config.options.combination);
    config.options?.exclude != undefined && (this.exclude = config.options.exclude);
    // this.exclude =
    //   config.options?.exclude != undefined &&
    //   this.exclude.map((item, index) => {
    //     return {
    //       name: item.to,
    //       from: item.from,
    //     };
    //   });
  }
}

export default Layer;
