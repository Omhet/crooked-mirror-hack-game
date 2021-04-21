import img0 from "./images/memes/0.jpg";
import img1 from "./images/memes/1.jpg";
import { Level } from "./types";

export const levels: Level[] = [
  {
    img: img0,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [{ imgOptions: { flipX: true } }],
    tries: 3,
    time: 5,
  },
  {
    img: img1,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 5,
  },
];
