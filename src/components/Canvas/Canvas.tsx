import React, { FC, useEffect, useRef, useState } from "react";
import { DrawImageStep } from "../../types";
import { drawSteps, drawUpdatedStep } from "./image";
import s from "./Canvas.module.css";

export type CanvasProps = {
  originalImageSrc: string;
  initialSteps: DrawImageStep[];
  updateStep?: DrawImageStep;
  onUpdate(isEqual: boolean): void;
};

export const Canvas: FC<CanvasProps> = ({
  originalImageSrc,
  initialSteps,
  updateStep,
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
    if (!ctx || !canvas || !updateStep) return;
    drawUpdatedStep(ctx, canvas, originalImageSrc, updateStep)
      .then(onUpdate)
      .catch((err) => console.error(err));
  }, [updateStep, ctx, canvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setCanvas(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCtx(ctx);
  }, []);

  return <canvas className={s.main} ref={canvasRef} />;
};
