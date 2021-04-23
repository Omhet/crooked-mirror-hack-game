import { createStore, createEvent } from "effector";
import { levels } from "../levels";
import { Chat, ChatMessage, ChatMessageFrom } from "../types";
import { startLevelAction } from "./level";

type ChatStore = {
  messages: ChatMessage[];
  isBusy: boolean;
};

export const addMessageAction = createEvent<ChatMessage>();
export const setBusyAction = createEvent<boolean>();
export const clearChatAction = createEvent();

const initialState: ChatStore = {
  messages: [],
  isBusy: true,
};
export const chatStore = createStore<ChatStore>(initialState)
  .on(setBusyAction, (state, isBusy) => ({
    ...state,
    isBusy,
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
  setBusyAction(false);
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
