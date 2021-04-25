import img1 from "./images/memes/1.jpg";
import img2 from "./images/memes/2.jpg";
import img3 from "./images/memes/3.jpg";
import img4 from "./images/memes/4.jpg";
import img5 from "./images/memes/5.jpg";
import img6 from "./images/memes/6.jpg";
import img7 from "./images/memes/7.jpg";
import img8 from "./images/memes/8.jpg";
import img9 from "./images/memes/9.jpg";
import img10 from "./images/memes/10.jpg";
import { ChatMessageFrom, Level, Chat } from "./types";

const chats: Chat[] = [
  {
    startMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "Hey!",
      },
      {
        from: ChatMessageFrom.User,
        text: "Hey!",
      },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "Nice",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "Thanks",
      },
    ],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "Hey! Can you hear me?" },
      { from: ChatMessageFrom.Friend, text: "Hellooo???" },
    ],
    endMessages: [],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "Level 3" },
      { from: ChatMessageFrom.User, text: "Oh yes" },
    ],
    endMessages: [],
  },
];

export const levels: Level[] = [
  {
    img: img1,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [{ imgOptions: { flipX: true } }],
    chat: chats[0],
  },
  {
    img: img2,
    initialSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
      { imgOptions: { flipX: true }, posOptions: {} },
    ],
    redundantSteps: [{ imgOptions: { flipY: true } }],
    chat: chats[0],
  },
  {
    img: img3,
    initialSteps: [
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 1, col: 1 },
      },
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 2 } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, col: 2 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: {} },
      {
        imgOptions: { flipX: true },
        posOptions: { gridSize: 2, row: 2, col: 2 },
      },
    ],
    tries: 15,
    chat: chats[0],
    isCheckpoint: true,
  },
  {
    img: img4,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img5,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img6,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img7,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img8,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img9,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
  {
    img: img10,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 2,
    time: 50,
    chat: chats[0],
  },
];
