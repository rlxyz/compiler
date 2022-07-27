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
      const finalName: string = Layer._toElementName(name);
      return {
        id: index,
        name: finalName,
        path: `${this.layerPath}/${finalName}${'.png'}`,
        filename: `${finalName}${'.png'}`,
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

    if (config.options?.exclude) {
      this.exclude = {};
      Object.entries(config.options.exclude).forEach((item: [string, string[]]) => {
        this.exclude[Layer._toElementName(item[0])] = item[1].map((elementName) => {
          return Layer._toElementName(elementName);
        });
      });
    }

    config.options?.combination != undefined && (this.combination = config.options.combination);
  }

  private static _toElementName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/(\s+)/g, '-')
      .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
      .replace(new RegExp(/\w/), (s) => s.toUpperCase());
  };
}

export default Layer;
