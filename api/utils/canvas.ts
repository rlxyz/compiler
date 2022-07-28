import { Image, Canvas, createCanvas as createCanvasImplementation, CanvasRenderingContext2D } from 'canvas';
import fs from 'fs';

export type CanvasObject = {
  canvas: Canvas;
  context: CanvasRenderingContext2D;
};

export const createCanvas = (width: number, height: number): CanvasObject => {
  const canvas: Canvas = createCanvasImplementation(width, height);
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  return {
    canvas: canvas,
    context: ctx,
  };
};

export const saveImage = (buffer: Buffer, path: string) => {
  fs.writeFileSync(path, buffer);
};

export const clearCanvas = (context: CanvasRenderingContext2D, width: number, height: number) => {
  context.clearRect(0, 0, width, height);
};

export const drawImage = (
  context: CanvasRenderingContext2D,
  image: Image,
  width: number,
  height: number,
  opacity?: number,
) => {
  opacity && ((context.globalAlpha = 1), (context.globalCompositeOperation = 'multiply'));
  context.drawImage(image, 0, 0, width, height);
};
