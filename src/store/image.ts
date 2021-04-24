import { createEvent, createStore } from "effector";
import { startLevelAction } from "./level";

type Store = {
  showOriginal: boolean;
  showSuccess: boolean;
};

export const toggleShowOriginalAction = createEvent();
export const toggleShowSuccessAction = createEvent();

export const imageStore = createStore<Store>({
  showOriginal: false,
  showSuccess: false,
})
  .on(toggleShowOriginalAction, (state) => ({
    ...state,
    showOriginal: !state.showOriginal,
  }))
  .on(toggleShowSuccessAction, (state) => ({
    ...state,
    showSuccess: !state.showSuccess,
  }));

imageStore.reset(startLevelAction);
