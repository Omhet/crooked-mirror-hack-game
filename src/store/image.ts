import { createEvent, createStore } from "effector";
import { startGameAction } from "./gameState";

type Store = {
  showOriginal: boolean;
};

export const toggleShowOriginalAction = createEvent();

export const imageStore = createStore<Store>({
  showOriginal: false,
}).on(toggleShowOriginalAction, (state) => ({
  ...state,
  showOriginal: !state.showOriginal,
}));

imageStore.reset(startGameAction);
