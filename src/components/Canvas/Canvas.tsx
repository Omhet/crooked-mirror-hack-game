import React, { FC, useEffect, useRef, useState } from "react";
import imgSrc from "../../img.png";
import { drawSteps } from "./image";
import { DrawImageStep } from "./types";

export type CanvasProps = {
  initialSteps: DrawImageStep[];
  updateSteps: DrawImageStep[];
};

export const Canvas: FC<CanvasProps> = ({ initialSteps, updateSteps }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!ctx || !canvas) return;
    console.log("init");

    drawSteps(ctx, canvas, imgSrc, initialSteps);
  }, [initialSteps, ctx, canvas]);

  useEffect(() => {
    if (!ctx || !canvas || updateSteps.length === 0) return;
    console.log("update");

    const src = canvas.toDataURL();
    drawSteps(ctx, canvas, src, updateSteps);
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
