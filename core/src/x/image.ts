import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from './canvas';
import { Gene } from './gene';
import { CanvasRenderObject } from '../types';

export const createImage = async (gene: Gene, width: number, height: number, savePath: string) => {
  const { canvas, context }: CanvasObject = createCanvas(width, height);
  const loadedImages: Promise<CanvasRenderObject>[] = gene.loadImages();
  await Promise.all(loadedImages).then((render: CanvasRenderObject[]) => {
    clearCanvas(context, width, height);
    render.forEach((object: CanvasRenderObject) => {
      drawImage(context, object.image, width, height);
    });
    saveImage(canvas, savePath);
  });
};
