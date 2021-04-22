import { useStore } from "effector-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { levelStore } from "../../store/level";
import { updateStepStore } from "../../store/updateStep";
import s from "./Canvas.module.css";
import { drawSteps, drawUpdatedStepFx } from "./image";

export type CanvasProps = {};

export const Canvas: FC<CanvasProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const {
    level: { img, initialSteps },
  } = useStore(levelStore);
  const { updateStep } = useStore(updateStepStore);

  useEffect(() => {
    if (!ctx || !canvas) return;
    drawSteps(ctx, canvas, img, initialSteps);
  }, [initialSteps, ctx, canvas]);

  useEffect(() => {
    if (!ctx || !canvas || !updateStep) return;
    drawUpdatedStepFx({
      ctx,
      canvas,
      baseImageUrl: img,
      updateStep,
    });
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
