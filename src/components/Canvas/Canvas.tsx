import React, { FC, useEffect, useRef, useState } from "react";
import { DrawImageStep } from "../../types";
import { drawSteps, drawUpdatedSteps } from "./image";

export type CanvasProps = {
  originalImageSrc: string;
  initialSteps: DrawImageStep[];
  updateSteps: DrawImageStep[];
  onUpdate(isEqual: boolean): void;
};

export const Canvas: FC<CanvasProps> = ({
  originalImageSrc,
  initialSteps,
  updateSteps,
  onUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ctx || !canvas) return;
    drawSteps(ctx, canvas, originalImageSrc, initialSteps);
  }, [initialSteps, ctx, canvas]);

  useEffect(() => {
    if (!ctx || !canvas || updateSteps.length === 0) return;
    drawUpdatedSteps(ctx, canvas, originalImageSrc, updateSteps)
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
