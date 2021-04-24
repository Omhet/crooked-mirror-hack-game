import { createEvent, createStore } from "effector";
import { GameOverReason, GameState } from "../types";
import { startGameAction } from "./gameState";

type Store = {
  name: string;
};
export const setUserNameAction = createEvent<string>();
export const userStore = createStore<Store>({
  name: "Anonymus",
}).on(setUserNameAction, (state, name) => {
  return { ...state, name };
});

userStore.reset(startGameAction);
