import img0 from "./images/img-0.jpg";
import img1 from "./images/img-1.png";
import { Level } from "./types";

export const levels: Level[] = [
  {
    img: img0,
    initialSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [{ imgOptions: { flipX: true } }],
    tries: 10,
  },
  {
    img: img1,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 10,
  },
];
