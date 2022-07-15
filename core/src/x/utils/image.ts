import { CanvasObject, clearCanvas, createCanvas, drawImage, saveImage } from './canvas';
import { Element } from './gene';
import { CanvasRenderObject } from '../types';

export const createImage = async (
  gene: Element,
  width: number,
  height: number,
  savePath: string = '',
): Promise<Buffer> => {
  const { canvas, context }: CanvasObject = createCanvas(width, height);
  const loadedImages: Promise<CanvasRenderObject>[] = gene.loadImages();
  await Promise.all(loadedImages).then((render: CanvasRenderObject[]) => {
    clearCanvas(context, width, height);
    render.forEach((object: CanvasRenderObject) => {
      drawImage(context, object.image, width, height);
    });
    savePath !== '' && saveImage(canvas, savePath);
  });
  return canvas.toBuffer();
};
