import img0 from "./images/memes/0.jpg";
import img1 from "./images/memes/1.jpg";
import { ChatMessageFrom, Level, Chat } from "./types";

const chats: Chat[] = [
  {
    startMessages: [
      // {
      //   from: ChatMessageFrom.Friend,
      //   text: "Hey! How are you doing, bro?",
      // },
      // {
      //   from: ChatMessageFrom.User,
      //   text: "Alright. What's on your mind?",
      // },
      // {
      //   from: ChatMessageFrom.Friend,
      //   text: "You need to restore those memes",
      // },
      // {
      //   from: ChatMessageFrom.User,
      //   text: "Ok",
      // },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "Wow, you did it!",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "You are so cool",
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
    img: img0,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipX: true } },
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
      {
        imgOptions: { flipY: true },
        posOptions: { gridSize: 2, row: 2, col: 2 },
      },
    ],
    chat: chats[0],
  },
  {
    img: img0,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [{ imgOptions: { flipX: true } }],
    tries: 2,
    // time: 5,
    chat: chats[1],
  },
  {
    img: img1,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [
      { imgOptions: { flipY: true }, posOptions: { gridSize: 2, row: 2 } },
    ],
    tries: 20,
    time: 50,
    chat: chats[2],
    isCheckpoint: true,
  },
].slice(0, 3);
