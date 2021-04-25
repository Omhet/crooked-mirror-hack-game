import { createEvent, createStore } from "effector";
import { setGameOverReasonAction } from "./gameState";
import { failLevelAction, startLevelAction } from "./level";

type Store = {
  showOriginal: boolean;
  showSuccess: boolean;
  showFail: boolean;
  buttonsDisabeld: boolean;
};

export const toggleShowOriginalAction = createEvent();
export const showSuccessAction = createEvent();
export const showFailAction = createEvent();
export const setButtonsDisabeldAction = createEvent();

export const imageStore = createStore<Store>({
  showOriginal: false,
  showSuccess: false,
  showFail: false,
  buttonsDisabeld: false,
})
  .on(toggleShowOriginalAction, (state) => ({
    ...state,
    showOriginal: !state.showOriginal,
  }))
  .on(setButtonsDisabeldAction, (state) => ({
    ...state,
    buttonsDisabeld: true,
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
  setButtonsDisabeldAction();
  setTimeout(() => {
    showFailAction();
    setGameOverReasonAction(reason);
  }, 1500);
});
