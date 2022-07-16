import { Image, loadImage } from 'canvas';
import sha256 from 'crypto-js/sha256';
import { CanvasRenderObject, ElementSource } from '../utils/types';
import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from '../utils/canvas';
import Layer from './Layer';

export abstract class Element {
  sources: ElementSource[];
  width: number;
  height: number;
  layers: Layer[];

  constructor(sources: ElementSource[], width: number, height: number, layers: Layer[]) {
    this.sources = sources;
    this.width = width;
    this.height = height;
    this.layers = layers;
  }

  public abstract toHex(): string;

  public abstract toAttributes(): any[];

  public abstract toBuffer(): Promise<Buffer>;

  public abstract toFile(output: string): Promise<void>;

  public abstract loadSources(): Promise<CanvasRenderObject>[];
}

export class ImageElement extends Element {
  constructor(sources: ElementSource[], width: number, height: number, layers: Layer[]) {
    super(sources, width, height, layers);
  }

  toAttributes(): any[] {
    let attributes: any[] = [];
    this.layers.forEach((layer: Layer, i) => {
      if (layer.metadata && this.sources[i]) {
        attributes.push({
          trait_type: this.layers[this.sources[i].layerIndex].name,
          value: this.sources[i].element.name,
        });
      }
    });
    return attributes;
  }

  toHex = (): string => {
    return sha256(
      this.toAttributes()
        .map((attr) => {
          return attr['value'];
        })
        .join('-'),
    ).toString();
  };

  toBuffer = async (): Promise<Buffer> => {
    const { canvas, context }: CanvasObject = createCanvas(this.width, this.height);
    const loadedImages: Promise<CanvasRenderObject>[] = this.loadSources();
    await Promise.all(loadedImages).then((render: CanvasRenderObject[]) => {
      clearCanvas(context, this.width, this.height);
      render.forEach((object: CanvasRenderObject) => {
        drawImage(context, object.image, this.width, this.height);
      });
    });
    return canvas.toBuffer('image/png');
  };

  toFile = async (output: string): Promise<void> => {
    const buffer: Buffer = await this.toBuffer();
    saveImage(buffer, output);
  };

  loadSources = (): Promise<CanvasRenderObject>[] => {
    const loadedElements: Promise<CanvasRenderObject>[] = this.sources.map((source: ElementSource) => {
      const {
        element: { path, linkExtension },
      } = source;
      return new Promise(async (resolve) => {
        const image: Image = await loadImage(path + (linkExtension && `_${linkExtension}`));
        resolve({ image: image });
      });
    });
    return loadedElements;
  };
}
