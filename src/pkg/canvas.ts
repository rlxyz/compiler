import { Image, Canvas, createCanvas as createCanvasImplementation, NodeCanvasRenderingContext2D } from 'canvas';
import fs from 'fs';

export type CanvasObject = {
  canvas: Canvas;
  context: NodeCanvasRenderingContext2D;
};

export const createCanvas = (width: number, height: number): CanvasObject => {
  const canvas: Canvas = createCanvasImplementation(width, height);
  const ctx: NodeCanvasRenderingContext2D = canvas.getContext('2d');
  return {
    canvas: canvas,
    context: ctx,
  };
};

export const saveImage = (canvas: Canvas, path: string) => {
  fs.writeFileSync(path, canvas.toBuffer('image/png'));
};

export const clearCanvas = (context: NodeCanvasRenderingContext2D, width: number, height: number) => {
  context.clearRect(0, 0, width, height);
};

export const drawImage = (
  context: NodeCanvasRenderingContext2D,
  image: Image,
  width: number,
  height: number,
  opacity?: number,
) => {
  // console.log(opacity);
  if (opacity) {
    context.globalAlpha = 1;
    context.globalCompositeOperation = 'multiply';
  }
  context.drawImage(image, 0, 0, width, height);
};
