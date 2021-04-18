import img1 from "./img.png";
import img2 from "./img2.png";
import { Level } from "./types";

export const levels: Level[] = [
  {
    img: img1,
    initialSteps: [{ imgOptions: { flipX: true } }],
    redundantSteps: [{ imgOptions: { flipY: true } }],
  },
  {
    img: img2,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
  },
];
