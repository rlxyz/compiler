import { Image, loadImage } from 'canvas';
import sha256 from 'crypto-js/sha256';
import { CanvasRenderObject, ElementSource } from './types';
import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from '../utils/canvas';
import Layer from './Layer';

export abstract class Element {
  sources: ElementSource[];
  layers: Layer[];
  source: string;

  constructor(sources: ElementSource[], layers: Layer[]) {
    this.sources = sources;
    this.layers = layers;
  }

  public abstract toHex(): string;

  public abstract toAttributes(): any[];

  public abstract toBuffer(): Promise<Buffer>;

  public abstract toFile(output: string): Promise<void>;

  public abstract loadSources(): Promise<CanvasRenderObject>[];
}

// can i infer the layer index if I always keep it in priority -- what are these issues with this approach?
abstract class ImageElement extends Element {
  width: number; // can be inferred from the collection
  height: number; // can be inferred from the collection

  constructor(sources: ElementSource[], width: number, height: number, layers: Layer[]) {
    super(sources, layers);
    this.width = width;
    this.height = height;
  }

  toAttributes(): any[] {
    let attributes: any[] = [];
    this.layers.forEach((layer: Layer, i) => {
      if (this.sources[i]) {
        attributes.push({
          trait_type: this.layers[this.sources[i].layerIndex].name,
          value: this.sources[i].element.name,
        });
      }
    });
    return attributes;
  }

  toHex = (): string => {
    return `0x${sha256(
      this.toAttributes()
        .map((attr) => {
          return `${attr['trait_type']}-${attr['value']}`;
        })
        .join('-'),
    ).toString()}`;
  };

  toFile = async (output: string): Promise<void> => {
    const buffer: Buffer = await this.toBuffer();
    saveImage(buffer, output);
  };
}

export class ArtImageElement extends ImageElement {
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

  loadSources = (): Promise<CanvasRenderObject>[] => {
    const loadedElements: Promise<CanvasRenderObject>[] = this.sources.map((source: ElementSource) => {
      const {
        element: { path },
      } = source;
      return new Promise(async (resolve) => {
        const image: Image = await loadImage(path);
        resolve({ image: image });
      });
    });
    return loadedElements;
  };
}
