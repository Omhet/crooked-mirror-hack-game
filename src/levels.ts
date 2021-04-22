import img0 from "./images/memes/0.jpg";
import img1 from "./images/memes/1.jpg";
import { ChatMessageFrom, Level, Chat } from "./types";

const chats: Chat[] = [
  {
    startMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "Hey! How are you doing, bro?",
      },
      {
        from: ChatMessageFrom.User,
        text: "Alright. What's on your mind?",
      },
      {
        from: ChatMessageFrom.Police,
        text: "Hey y'all hackers!!!",
      },
    ],
    endMessages: [],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "Hey! Can you hear me?" },
    ],
    endMessages: [],
  },
  {
    startMessages: [],
    endMessages: [],
  },
];

export const levels: Level[] = [
  {
    img: img0,
    initialSteps: [
      { imgOptions: { flipX: true }, posOptions: { gridSize: 2, row: 1 } },
    ],
    redundantSteps: [{ imgOptions: { flipX: true } }],
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
  },
];
