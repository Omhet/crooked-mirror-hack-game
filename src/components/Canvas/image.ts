import { canvasCompare } from "../../canvasCompare";
import { DrawImageStep, PosOptions, ImageOptions } from "../../types";

export const drawUpdatedSteps = async (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  baseImageUrl: string,
  updateSteps: DrawImageStep[]
) => {
  await drawSteps(ctx, canvas, canvas.toDataURL(), updateSteps);

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
  const img = new Image();
  img.src = imgSrc;

  return new Promise((resolve) => {
    let step = 0;

    img.onload = () => {
      if (step === steps.length) {
        resolve(null);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawEntireImage(ctx, img);
      const { imgOptions = {}, posOptions = {} } = steps[step];
      drawImage(ctx, img, posOptions, imgOptions);
      img.src = canvas.toDataURL();

      step++;
    };
  });
}

export function drawEntireImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  gridSize: number = 1
) {
  for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
      drawImage(ctx, img, { gridSize, row, col });
    }
  }
}

export function drawImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  posOptions: PosOptions,
  imageOptions: ImageOptions = {}
) {
  const { gridSize = 1, row, col, dRow = row, dCol = col } = posOptions;
  const { flipX = false, flipY = false } = imageOptions;

  const imgSize = img.width / gridSize;
  const sx = getCoord(imgSize, col);
  const sy = getCoord(imgSize, row);
  const dx = getCoord(imgSize, dCol);
  const dy = getCoord(imgSize, dRow);

  const tx = getTranslateCoord(flipX, imgSize * (dCol ?? 1) + dx);
  const ty = getTranslateCoord(flipY, imgSize * (dRow ?? 1) + dy);

  const rowM = !col ? gridSize : 1;
  const colM = !row ? gridSize : 1;

  ctx.translate(tx * rowM, ty * colM);
  const fx = getFlipCoord(flipX);
  const fy = getFlipCoord(flipY);
  ctx.scale(fx, fy);

  const w = imgSize * rowM;
  const h = imgSize * colM;

  ctx.clearRect(dx, dy, w, h);

  ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function getTranslateCoord(flip: boolean, size: number) {
  return flip ? size : 0;
}

function getFlipCoord(flip: boolean) {
  return flip ? -1 : 1;
}

function getCoord(imgSize: number, rowOrCol = 1) {
  return (rowOrCol - 1) * imgSize;
}
