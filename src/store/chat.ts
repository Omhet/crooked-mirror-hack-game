import { createStore } from "effector";
import { levels } from "../levels";
import { Chat, ChatMessage } from "../types";
import { startLevelAction } from "./level";

type ChatStore = {
  messages: ChatMessage[];
};

const initialState: ChatStore = {
  messages: [],
};
export const chatStore = createStore<ChatStore>(initialState).on(
  startLevelAction,
  (state, levelNumber) => ({
    ...state,
    messages: levels[levelNumber].chat.startMessages,
  })
);
