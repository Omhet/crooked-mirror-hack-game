import { createStore, createEvent } from "effector";
import { levels } from "../levels";
import { Chat, ChatMessage, ChatMessageFrom } from "../types";
import {
  startLevelAction,
  readyToPlayLevelAction,
  endLevelAction,
  levelStore,
} from "./level";

type ChatStore = {
  messages: ChatMessage[];
  isBusy: boolean;
  showReadyToPlay: boolean;
  showReadyForNextLevel: boolean;
};

export const addMessageAction = createEvent<ChatMessage>();
export const setBusyAction = createEvent<boolean>();
export const setShowReadyToPlayAction = createEvent<boolean>();
export const setShowReadyForNextLevelAction = createEvent<boolean>();
export const clearChatAction = createEvent();

const initialState: ChatStore = {
  messages: [],
  isBusy: true,
  showReadyToPlay: false,
  showReadyForNextLevel: false,
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
  .on(addMessageAction, (state, message) => ({
    ...state,
    messages: [message, ...state.messages],
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
  setTimeout(() => setShowReadyForNextLevelAction(true), 1000);
});

export const addMessageToChat = async (
  message: ChatMessage,
  messageTimeout?: number
) => {
  let timeout =
    message.from === ChatMessageFrom.User ? 1000 : Math.random() * 500 + 1500;

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
