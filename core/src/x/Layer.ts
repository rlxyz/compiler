import { LayerConfig, LayerElement } from '../utils/types';

export const LAYER_TYPES = {
  NORMAL: 'NORMAL',
  EXCLUSION: 'EXCLUSION',
  COMBINATION: 'COMBINATION',
};

class Layer {
  name: string;
  elements: LayerElement[];

  layerPath: string;
  iterations: number;
  occuranceRate: number;
  weight: number;

  combination?: any;
  exclude?: any;

  // todo: fix rarityDelimter being passed multiple times
  // todo: fix type name checking conmbination and exclude properties
  constructor(config: LayerConfig, layerPath: string) {
    if (!config.name || config.name.length == 0) {
      throw new Error("layer name doesn't exists");
    }

    this.name = config.name;
    this.layerPath = layerPath;
    this.elements = Layer._getLayerElements(config, this.layerPath);
    this.iterations = config.options?.iterations || 1;
    this.occuranceRate = config.options?.occuranceRate || 1;
    this.weight = Layer._getElementWeightage(this);
    config.options?.combination != undefined && (this.combination = config.options.combination);
    config.options?.exclude != undefined && (this.exclude = config.options.exclude);
  }

  private static _getElementWeightage(layer: Layer): number {
    if (layer.elements === undefined) return 0;
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    return totalWeight;
  }

  private static _getLayerElements = (config: LayerConfig, path: string): LayerElement[] => {
    return config.traits.map(({ name, weight }, index) => {
      return {
        id: index,
        name: name.replace(/.(jpg|jpeg|png|gif)$/i, ''),
        path: `${path}/${name
          .toLowerCase()
          .replace(/(\s+)/g, '-')
          .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
          .replace(new RegExp(/\w/), (s) => s.toUpperCase())}${'.png'}`,
        filename: name,
        weight: weight || 1,
      };
    });
  };
}

export default Layer;
