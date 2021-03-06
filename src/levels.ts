import { chats } from "./chat";
import img1 from "./images/memes/1.jpg";
import img10 from "./images/memes/10.jpg";
import img2 from "./images/memes/2.jpg";
import img3 from "./images/memes/3.jpg";
import img4 from "./images/memes/4.jpg";
import img5 from "./images/memes/5.jpg";
import img6 from "./images/memes/6.jpg";
import img7 from "./images/memes/7.jpg";
import img8 from "./images/memes/8.jpg";
import img9 from "./images/memes/9.jpg";
import { Level } from "./types";

export const levels: Level[] = [
  {
    img: img1, // Ok
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true } },
      { imgOptions: { flipY: true } },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 1 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
    ],
    chat: chats[0],
  },
  {
    img: img2, // Ok
    initialSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
      { imgOptions: { flipX: true }, posOptions: {} },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 1 } },
      { imgOptions: { flipY: true }, posOptions: {} },
    ],
    chat: chats[1],
  },
  {
    img: img3, // Ok
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1, col: 2 },
      },
    ],
    redundantSteps: [
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2, col: 2 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1, col: 2 },
      },
    ],
    tries: 15,
    chat: chats[2],
  },
  {
    img: img4, // Ok
    initialSteps: [
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true }, posOptions: {} },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 2, col: 2 },
      },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 10,
    chat: chats[3],
    isCheckpoint: true,
  },
  {
    img: img5, // Ok, easy to pass, but hard to get high score
    // Dasha - hard
    initialSteps: [
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      { imgOptions: { flipY: true }, posOptions: {} },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 1 } },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1, col: 2 },
      },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true }, posOptions: {} },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 3 },
      },
    ],
    tries: 10,
    chat: chats[4],
  },
  {
    img: img6, // Ok
    initialSteps: [
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2, col: 2 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 1, col: 2 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 3, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 3, col: 3 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 1, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 1, col: 3 },
      },
    ],
    redundantSteps: [],
    time: 100,
    chat: chats[5],
    isCheckpoint: true,
  },
  {
    img: img7, // Nice
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, row: 1 } },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, row: 3 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 3, col: 1 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 3, col: 3 } },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
    ],
    redundantSteps: [
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 3, col: 2 } },
    ],
    tries: 10,
    time: 80,
    chat: chats[6],
  },
  {
    img: img8, // Ok
    initialSteps: [
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 3 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2 },
      },
      { imgOptions: { flipX: true }, posOptions: {} },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: {} },
    ],
    tries: 8,
    time: 60,
    chat: chats[7],
    isCheckpoint: true,
  },
  {
    img: img9, // Ok
    initialSteps: [
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 1, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 1, col: 2 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 1, col: 3 },
      },

      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 1 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 3 },
      },

      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 3, col: 1 },
      },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 3, col: 2 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 3, col: 3 },
      },
    ],
    redundantSteps: [],
    tries: 11,
    time: 30,
    chat: chats[8],
  },
  {
    img: img10, // Ok
    initialSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 4, col: 1 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 4, col: 4 } },
      { imgOptions: { flipX: true }, posOptions: {} },
      { imgOptions: { flipY: true }, posOptions: {} },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, col: 2 } },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 3, row: 2, col: 2 },
      },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, col: 1 } },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 3, col: 3 } },
    ],
    tries: 9,
    time: 60,
    chat: chats[9],
    isCheckpoint: true,
  },
];
