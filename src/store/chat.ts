import { createStore, createEvent } from "effector";
import { levels } from "../levels";
import { Chat, ChatMessage, ChatMessageFrom } from "../types";
import { startLevelAction, readyToPlayLevelAction } from "./level";

type ChatStore = {
  messages: ChatMessage[];
  isBusy: boolean;
  showReadyToPlay: boolean;
};

export const addMessageAction = createEvent<ChatMessage>();
export const setBusyAction = createEvent<boolean>();
export const setShowReadyToPlayAction = createEvent<boolean>();
export const clearChatAction = createEvent();

const initialState: ChatStore = {
  messages: [],
  isBusy: true,
  showReadyToPlay: false,
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
  .on(addMessageAction, (state, message) => ({
    ...state,
    messages: [...state.messages, message],
  }))
  .on(clearChatAction, (state) => ({
    ...state,
    messages: [],
  }));

startLevelAction.watch(async (levelNumber) => {
  const { startMessages } = levels[levelNumber].chat;
  setBusyAction(true);
  clearChatAction();
  for (const message of startMessages) {
    await addMessageToChat(message);
  }
  setShowReadyToPlayAction(true);
});

export const addMessageToChat = async (message: ChatMessage) => {
  const timeout =
    message.from === ChatMessageFrom.User ? 1000 : Math.random() * 500 + 1500;
  return new Promise((resolve) => {
    setTimeout(() => {
      addMessageAction(message);
      resolve(null);
    }, timeout);
  });
};

// setShowReadyToPlayAction.watch((ready) => {
//   if (ready) {
//     setBusyAction(false);
//     // readyToPlayLevelAction()
//   }
// });
