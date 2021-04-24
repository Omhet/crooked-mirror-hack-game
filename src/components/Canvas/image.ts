import { createEffect } from "effector";
// @ts-ignore
import { canvasCompare } from "../../canvasCompare";
import {
  DrawImageStep,
  PosOptions,
  ImageOptions,
  DrawStepOptions,
} from "../../types";
import { loadImage } from "../../utils";

const Pink = "#e200e1";
const Black = "#0d0b16";

type DrawUpdatedStepFx = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  baseImageUrl: string;
  updateStep: DrawImageStep;
};
export const drawUpdatedStepFx = createEffect(
  async ({ ctx, canvas, updateStep, baseImageUrl }: DrawUpdatedStepFx) => {
    await drawStep(ctx, canvas.toDataURL(), updateStep, { isAnimated: true });

    const { getPercentage } = await canvasCompare({
      baseImageUrl,
      targetImageUrl: canvas.toDataURL(),
      threshold: 50,
    });

    return getPercentage() === 0;
  }
);
export async function drawSteps(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  imgSrc: string,
  steps: DrawImageStep[]
) {
  const img = await loadImage(imgSrc);
  canvas.width = img.width;
  canvas.height = img.height;

  clearCanvas(ctx, canvas);
  drawEntireImage(ctx, img);
  for (const step of steps) {
    await drawStep(ctx, canvas.toDataURL(), step);
  }
}

export async function drawStep(
  ctx: CanvasRenderingContext2D,
  imgSrc: string,
  step: DrawImageStep,
  drawStepOptions: DrawStepOptions = {}
) {
  const img = await loadImage(imgSrc);
  const { imgOptions = {}, posOptions = {} } = step;
  const { isAnimated } = drawStepOptions;

  if (!isAnimated) {
    drawImage(ctx, img, posOptions, imgOptions);
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let d = 0;
    function animate() {
      drawEffect(ctx, img, posOptions, imgOptions);
      if (d > 80) {
        drawImage(ctx, img, posOptions, imgOptions);
        resolve(null);
        return;
      }
      d += 5;
      requestAnimationFrame(animate);
    }
    animate();
  });
}

export function drawEntireImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
) {
  ctx.drawImage(img, 0, 0);
}

export function drawImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  posOptions: PosOptions = {},
  imageOptions: ImageOptions = {}
) {
  const { sx, sy, dx, dy, tx, ty, w, h, scaleX, scaleY } = getCoords(
    posOptions,
    imageOptions,
    img
  );

  ctx.clearRect(sx, sy, w, h);

  ctx.translate(tx, ty);
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function drawEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  posOptions: PosOptions = {},
  imageOptions: ImageOptions = {}
) {
  const { sx: x, sy: y, w, h } = getCoords(posOptions, imageOptions, img);

  ctx.clearRect(x, y, w, h);

  ctx.fillStyle = Black;
  const size = 10;
  const realW = w + x;
  const realH = h + y;
  const wLimit = w % size === 0 ? realW : realW - size;
  const hLimit = h % size === 0 ? realH : realH - size;

  for (let i = x; i < wLimit; i += size) {
    for (let j = y; j < hLimit; j += size) {
      ctx.fillStyle = Math.random() * 2 > 1 ? Black : Pink;
      ctx.fillRect(i, j, size, size);
    }
  }
}

function getCoords(
  posOptions: PosOptions,
  imageOptions: ImageOptions,
  img: HTMLImageElement
) {
  const { gridSize = 1, row, col } = posOptions;
  const { flipX = false, flipY = false } = imageOptions;
  const rowM = !col ? gridSize : 1;
  const colM = !row ? gridSize : 1;
  const sectorW = img.width / gridSize;
  const sectorH = img.height / gridSize;

  const w = sectorW * rowM;
  const h = sectorH * colM;
  const sx = getCoord(sectorW, col);
  const sy = getCoord(sectorH, row);
  const dx = -w / 2;
  const dy = -h / 2;
  const tx = w / 2 + sx;
  const ty = h / 2 + sy;

  const fx = getFlipCoord(flipX);
  const fy = getFlipCoord(flipY);
  const scaleX = fx;
  const scaleY = fy;

  return {
    sx,
    sy,
    dx,
    dy,
    tx,
    ty,
    w,
    h,
    scaleX,
    scaleY,
  };
}

function getFlipCoord(flip: boolean) {
  return flip ? -1 : 1;
}

function getCoord(imgSize: number, rowOrCol = 1) {
  return (rowOrCol - 1) * imgSize;
}

function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
