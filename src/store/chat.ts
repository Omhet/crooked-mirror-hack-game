import { createEvent, createStore } from "effector";
import { levels } from "../levels";
import { ChatMessage, ChatMessageFrom } from "../types";
import { startGameAction } from "./gameState";
import { endLevelAction, levelStore, startLevelAction } from "./level";

type ChatStore = {
  messages: ChatMessage[];
  isBusy: boolean;
  showReadyToPlay: boolean;
  showReadyForNextLevel: boolean;
  showReadyForFinalChoice: boolean;
};

export const addMessageAction = createEvent<ChatMessage>();
export const setBusyAction = createEvent<boolean>();
export const setShowReadyToPlayAction = createEvent<boolean>();
export const setShowReadyForNextLevelAction = createEvent<boolean>();
export const setShowReadyForFinalChoiceAction = createEvent<boolean>();
export const clearChatAction = createEvent();

const initialState: ChatStore = {
  messages: [],
  isBusy: true,
  showReadyToPlay: false,
  showReadyForNextLevel: false,
  showReadyForFinalChoice: false,
};
export const chatStore = createStore<ChatStore>(initialState)
  .on(setBusyAction, (state, isBusy) => ({
    ...state,
    isBusy,
  }))
  .on(setShowReadyToPlayAction, (state, showReadyToPlay) => ({
    ...state,
    showReadyToPlay,
  }))
  .on(setShowReadyForNextLevelAction, (state, showReadyForNextLevel) => ({
    ...state,
    showReadyForNextLevel,
  }))
  .on(setShowReadyForFinalChoiceAction, (state, showReadyForFinalChoice) => ({
    ...state,
    showReadyForFinalChoice,
  }))
  .on(addMessageAction, (state, message) => ({
    ...state,
    messages: [message, ...state.messages],
  }))
  .on(clearChatAction, (state) => ({
    ...state,
    messages: [],
  }));

chatStore.reset(startGameAction);

startLevelAction.watch(async (levelNumber) => {
  const { startMessages } = levels[levelNumber].chat;
  setBusyAction(true);
  clearChatAction();
  for (const message of startMessages) {
    await addMessageToChat(message);
  }
  setTimeout(() => setShowReadyToPlayAction(true), 1000);
});

endLevelAction.watch(async () => {
  const { levelNumber } = levelStore.getState();
  const { endMessages } = levels[levelNumber].chat;
  setBusyAction(true);
  clearChatAction();
  for (const message of endMessages) {
    await addMessageToChat(message);
  }
  setTimeout(() => {
    if (levelNumber === levels.length - 1) {
      setShowReadyForFinalChoiceAction(true);
    } else {
      setShowReadyForNextLevelAction(true);
    }
  }, 1000);
});

addMessageAction.watch((message) => {
  const { isBusy } = chatStore.getState();
  if (!isBusy && message.from === ChatMessageFrom.User) {
    addMessageToChat(
      { from: ChatMessageFrom.Friend, text: getRandomFriendResponse() },
      350
    );
  }
});

export const addMessageToChat = async (
  message: ChatMessage,
  messageTimeout?: number
) => {
  let timeout = Math.random() * message.text.length * 30 + 1000;

  if (messageTimeout !== undefined) {
    timeout = messageTimeout;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      addMessageAction(message);
      resolve(null);
    }, timeout);
  });
};

const friendResponses: string[] = [
  "I hear you",
  "Here is the link with the answers: http://tiny.cc/4nhwtz",
  "Man, keep up",
];
export const getRandomFriendResponse = () => {
  const randIndex = Math.floor(Math.random() * friendResponses.length);
  return friendResponses[randIndex];
};
