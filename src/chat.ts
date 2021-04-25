import { Chat, ChatMessageFrom } from "./types";

export const chats: Chat[] = [
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "pss, are you there?" },
      { from: ChatMessageFrom.User, text: "yes" },
      {
        from: ChatMessageFrom.Friend,
        text: "so, we are finally ready to start",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "I breached into their network. we have all the accesses",
      },
      { from: ChatMessageFrom.User, text: "nice" },
      {
        from: ChatMessageFrom.Friend,
        text:
          "I hope you remember your part. Flipping parts of the image till the image is restored",
      },
      { from: ChatMessageFrom.User, text: "hell yeah, decrypting, baby" },
      { from: ChatMessageFrom.Friend, text: "so are you ready?" },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "oh wow, you did it",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "i didn't doubt, just so excited it actually worked and there were no alarms",
      },
      { from: ChatMessageFrom.User, text: "cause i'm a pro, man" },
      {
        from: ChatMessageFrom.Friend,
        text: "arrogant son of a gun",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "not all the memes will be so easy to decrypt",
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
