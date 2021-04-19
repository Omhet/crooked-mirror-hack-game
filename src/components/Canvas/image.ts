// @ts-ignore
import { canvasCompare } from "../../canvasCompare";
import { DrawImageStep, PosOptions, ImageOptions } from "../../types";
import { loadImage } from "../../utils";

export const drawUpdatedStep = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  baseImageUrl: string,
  updateStep: DrawImageStep
) => {
  await drawStep(ctx, canvas.toDataURL(), updateStep);

  const { getPercentage } = await canvasCompare({
    baseImageUrl,
    targetImageUrl: canvas.toDataURL(),
  });

  return getPercentage() === 0;
};

export async function drawSteps(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  imgSrc: string,
  steps: DrawImageStep[]
) {
  const img = await loadImage(imgSrc);
  clearCanvas(ctx, canvas);
  drawEntireImage(ctx, img);
  for (const step of steps) {
    await drawStep(ctx, canvas.toDataURL(), step);
  }
}

export async function drawStep(
  ctx: CanvasRenderingContext2D,
  imgSrc: string,
  step: DrawImageStep
) {
  const img = await loadImage(imgSrc);
  const { imgOptions = {}, posOptions = {} } = step;

  return new Promise((resolve) => {
    let d = -100;
    function animate() {
      drawImage(ctx, img, posOptions, imgOptions, d / 100);
      d += 5;
      if (d > 100) {
        resolve(null);
        return;
      }
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
  imageOptions: ImageOptions = {},
  scaleAmount = 1
) {
  const { sx, sy, w, h, scaleX, scaleY } = getCoords(
    posOptions,
    imageOptions,
    img,
    scaleAmount
  );

  const x = sx;
  const y = sy;
  const dx = -w / 2;
  const dy = -h / 2;
  const tx = w / 2 + x;
  const ty = h / 2 + y;

  ctx.clearRect(x, y, w, h);
  ctx.translate(tx, ty);
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, x, y, w, h, dx, dy, w, h);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function getCoords(
  posOptions: PosOptions,
  imageOptions: ImageOptions,
  img: HTMLImageElement,
  scaleAmount: number
) {
  const { gridSize = 1, row, col } = posOptions;
  const { flipX = false, flipY = false } = imageOptions;
  const rowM = !col ? gridSize : 1;
  const colM = !row ? gridSize : 1;
  const imgSize = img.width / gridSize;
  const w = imgSize * rowM;
  const h = imgSize * colM;
  const sx = getCoord(imgSize, col);
  const sy = getCoord(imgSize, row);
  const fx = getFlipCoord(flipX);
  const fy = getFlipCoord(flipY);
  const scaleX = flipX ? scaleAmount * fx : fx;
  const scaleY = flipY ? scaleAmount * fy : fy;

  return {
    sx,
    sy,
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
