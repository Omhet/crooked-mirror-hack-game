import React, { FC, useEffect, useRef, useState } from "react";
//@ts-ignore
import { canvasCompare } from "../../canvasCompare";
import imgSrc from "../../img.png";
import { drawSteps } from "./image";
import { DrawImageStep } from "./types";

export type CanvasProps = {
  initialSteps: DrawImageStep[];
  updateSteps: DrawImageStep[];
  onUpdate(isEqual: boolean): void;
};

const drawUpdatedSteps = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  updateSteps: DrawImageStep[]
) => {
  await drawSteps(ctx, canvas, canvas.toDataURL(), updateSteps);

  //@ts-ignore
  const { getPercentage } = await canvasCompare({
    baseImageUrl: imgSrc,
    targetImageUrl: canvas.toDataURL(),
  });

  return getPercentage() === 0;
};

export const Canvas: FC<CanvasProps> = ({
  initialSteps,
  updateSteps,
  onUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ctx || !canvas) return;
    drawSteps(ctx, canvas, imgSrc, initialSteps);
  }, [initialSteps, ctx, canvas]);

  useEffect(() => {
    if (!ctx || !canvas || updateSteps.length === 0) return;
    drawUpdatedSteps(canvas, ctx, updateSteps)
      .then(onUpdate)
      .catch((err) => console.error(err));
  }, [updateSteps, ctx, canvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvas(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCtx(ctx);
  }, []);

  return <canvas width={500} height={500} ref={canvasRef} />;
};
