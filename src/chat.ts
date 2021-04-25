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
      {
        from: ChatMessageFrom.Friend,
        text: "ok, this one is a bit tougher, but i'm sure you will decrypt it",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "btw, you already played that new hot game?",
      },
      { from: ChatMessageFrom.User, text: "which one?" },
      { from: ChatMessageFrom.Friend, text: "Cyberphunk 2707" },
      { from: ChatMessageFrom.User, text: "oh no, not yet. It's still buggy" },
      { from: ChatMessageFrom.Friend, text: "true" },
      { from: ChatMessageFrom.Friend, text: "ok, i fetched the data. ready?" },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "man, you rock",
      },
      {
        from: ChatMessageFrom.User,
        text: "it's all for the people",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "of course",
      },
    ],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.User, text: "are we ok?" },
      { from: ChatMessageFrom.User, text: "nobody noticed nothing?" },
      { from: ChatMessageFrom.User, text: "hello???" },
      {
        from: ChatMessageFrom.Friend,
        text: "sorry, yeah. just stepped out to make coffee",
      },
      { from: ChatMessageFrom.Friend, text: "we are totally fine" },
      {
        from: ChatMessageFrom.User,
        text: "man, how dare you making coffee now",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "no panic, it's alright. I checked the logs, no requests were intercepted",
      },
      {
        from: ChatMessageFrom.User,
        text: "I trust you, but the deal is dangerous. We have to be careful",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "yes, you're right, sorry",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "btw you will have a limit of allowed flips on this new one ",
      },
      {
        from: ChatMessageFrom.User,
        text: "how come",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "it seems they suddenly upgraded the security policies and your machine will just burn out due to complex encrypting calculations",
      },
      {
        from: ChatMessageFrom.User,
        text: "really? you said it's all fine and we are safe",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "yes, we are safe. i think it's just a coincidence",
      },
      {
        from: ChatMessageFrom.User,
        text: "plz, tell me about such things in advance",
      },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text: "this one was so freaking relatable",
      },
      { from: ChatMessageFrom.User, text: "ahah yeah" },
      { from: ChatMessageFrom.User, text: "people will like it" },
      {
        from: ChatMessageFrom.Friend,
        text: "man I've missed the memes so much",
      },
      { from: ChatMessageFrom.User, text: "me too. proud of what we do" },
    ],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "are we good?" },
      { from: ChatMessageFrom.User, text: "yes" },
      { from: ChatMessageFrom.Friend, text: "alright" },
      {
        from: ChatMessageFrom.Friend,
        text: "I would have send you a hilarious meme, but",
      },
      {
        from: ChatMessageFrom.User,
        text:
          "oh man, cmon. we are nearly half way through. we can bring those memes back",
      },
      { from: ChatMessageFrom.Friend, text: "you're right. Let's hack!" },
    ],
    endMessages: [
      { from: ChatMessageFrom.Friend, text: "man did have you seen that?" },
      { from: ChatMessageFrom.User, text: "what?" },
      {
        from: ChatMessageFrom.Friend,
        text: 'somebody wrote about "Looking Glass" in the darknet',
      },
      {
        from: ChatMessageFrom.User,
        text:
          "really? but we only started and didn't tell anyone. how could they know?",
      },
      { from: ChatMessageFrom.Friend, text: "idk but it is all suspicious" },
      {
        from: ChatMessageFrom.User,
        text: "do you want to tell that I did this?",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "what?? No. I trust you. I'm just worried the agents could have plant the bug into our system",
      },
      { from: ChatMessageFrom.User, text: "no way" },
      { from: ChatMessageFrom.Friend, text: "I will check" },
    ],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.User, text: "hey, man. whare are you?" },
      { from: ChatMessageFrom.User, text: "are you here?" },
      {
        from: ChatMessageFrom.User,
        text: "ima starting to worry. you didnt answer my call",
      },
      {
        from: ChatMessageFrom.User,
        text: "and it's time to start the work already",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "very busy. don't have time to explain",
      },
      { from: ChatMessageFrom.Friend, text: "fetched the data, you can start" },
      { from: ChatMessageFrom.User, text: "busy doing what???" },
    ],
    endMessages: [
      { from: ChatMessageFrom.Friend, text: "That was easy." },
      { from: ChatMessageFrom.Friend, text: "are you still busy?" },
      {
        from: ChatMessageFrom.Friend,
        text: "i'm startig to worry. wtf happened?",
      },
    ],
  },
  {
    startMessages: [
      { from: ChatMessageFrom.Friend, text: "ok. sorry. i'm finally back" },
      { from: ChatMessageFrom.User, text: "where the hell have you been?" },
      {
        from: ChatMessageFrom.Friend,
        text: "actually, they nearly catched us",
      },
      { from: ChatMessageFrom.User, text: "fuck" },
      { from: ChatMessageFrom.User, text: "cannot be" },
      { from: ChatMessageFrom.User, text: "you kidding me" },
      { from: ChatMessageFrom.Police, text: "Hello, bustards" },
      { from: ChatMessageFrom.Police, text: "How is your day, mom's hackers?" },
      {
        from: ChatMessageFrom.User,
        text: "Who the hell are you? And how you entered this chat?",
      },
      {
        from: ChatMessageFrom.Police,
        text: "Your game is over, kids. Agents found you",
      },
      {
        from: ChatMessageFrom.Police,
        text:
          "You have around 1 minute till we find out your exact location and then you are finished",
      },
    ],
    endMessages: [
      {
        from: ChatMessageFrom.Friend,
        text:
          "Man, that was something. we managed to escape. all thanks to you",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "And I managed to kick this agent out of our chat. Also improved the security",
      },
      {
        from: ChatMessageFrom.User,
        text: "You will have to explain",
      },
      {
        from: ChatMessageFrom.Friend,
        text: "Yes, but later",
      },
      {
        from: ChatMessageFrom.Friend,
        text:
          "Now, we have to pack our stuff and move quickly. Changing the location",
      },
    ],
  },
  {
    startMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
    endMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
  },
  {
    startMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
    endMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
  },
  {
    startMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
    endMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
  },
  {
    startMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
    endMessages: [{ from: ChatMessageFrom.Friend, text: "" }],
  },
];
