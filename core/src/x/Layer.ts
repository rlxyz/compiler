import { LayerConfig, LayerElement } from '../types';

export const LAYER_TYPES = {
  NORMAL: 'NORMAL',
  EXCLUSION: 'EXCLUSION',
  COMBINATION: 'COMBINATION',
};

class Layer {
  name: string;
  elements: LayerElement[];
  iterations: number;
  occuranceRate: number;
  type?: string;
  combination?: any;
  exclude?: any;
  link?: any;
  metadata: boolean;
  linkName?: string;
  layerPath: string;
  weight: number;

  // todo: fix rarityDelimter being passed multiple times
  // todo: fix type name checking conmbination and exclude properties
  constructor(config: LayerConfig, layerPath: string) {
    if (!config.name || config.name.length == 0) {
      throw new Error("layer name doesn't exists");
    }

    // Header
    this.name = config.name;
    this.layerPath = layerPath;

    // Body
    this.elements = Layer._getLayerElements(config, this.layerPath);
    this.iterations = config.options?.iterations || 1;
    this.occuranceRate = config.options?.occuranceRate || 1;
    this.type = config.options?.type || LAYER_TYPES.NORMAL;
    this.link = config?.link || undefined;
    this.linkName = config?.linkName || undefined;
    this.metadata = config?.metadata || false;
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
    return config.traits.map(({ name, weight, link }, index) => {
      return {
        id: index,
        name: Layer._getLayerElementName(name),
        path: Layer._getLayerElementPath(path, name),
        filename: name,
        weight: weight || 1,
        link: link,
      };
    });
  };

  private static _getLayerElementPath = (_path: string, _name: string): string => {
    return `${_path}/${_name
      .toLowerCase()
      .replace(/(\s+)/g, '-')
      .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
      .replace(new RegExp(/\w/), (s) => s.toUpperCase())}${'.png'}`;
  };

  private static _getLayerElementName = (_name: string): string => {
    return _name.replace(/.(jpg|jpeg|png|gif)$/i, '');
  };
}

export default Layer;
