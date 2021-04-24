import { createEvent, createStore } from "effector";
import { setGameOverReasonAction } from "./gameState";
import { failLevelAction, startLevelAction } from "./level";

type Store = {
  showOriginal: boolean;
  showSuccess: boolean;
  showFail: boolean;
};

export const toggleShowOriginalAction = createEvent();
export const showSuccessAction = createEvent();
export const showFailAction = createEvent();

export const imageStore = createStore<Store>({
  showOriginal: false,
  showSuccess: false,
  showFail: false,
})
  .on(toggleShowOriginalAction, (state) => ({
    ...state,
    showOriginal: !state.showOriginal,
  }))
  .on(showSuccessAction, (state) => ({
    ...state,
    showSuccess: true,
  }))
  .on(showFailAction, (state) => ({
    ...state,
    showFail: true,
  }));

imageStore.reset(startLevelAction);

failLevelAction.watch((reason) => {
  setTimeout(() => {
    showFailAction();
    setGameOverReasonAction(reason);
  }, 1500);
});
