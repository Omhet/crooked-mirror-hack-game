import { createEvent, createStore } from "effector";
import {
  drawFailFx,
  drawSuccessFx,
  drawUpdatedStepFx,
} from "../components/Canvas/image";
import { DrawImageStep } from "../types";
import { loseAction } from "./gameState";
import { showSuccessAction } from "./image";
import { endLevelAction, startLevelAction, timer } from "./level";

type UpdateStepStore = {
  updateStep?: DrawImageStep;
  isStepUpdating: boolean;
  isImageEqual: boolean;
};
export const updateStepAction = createEvent<DrawImageStep | undefined>();
export const updateStepStore = createStore<UpdateStepStore>({
  isStepUpdating: false,
  isImageEqual: false,
  updateStep: undefined,
})
  .on(updateStepAction, (state, updateStep) => ({
    ...state,
    updateStep,
    isImageEqual: false,
  }))
  .on(drawUpdatedStepFx.doneData, (state, isImageEqual) => ({
    ...state,
    isImageEqual,
  }))
  .on(drawUpdatedStepFx.pending, (state, isStepUpdating) => ({
    ...state,
    isStepUpdating,
  }));

updateStepStore.reset(startLevelAction);

drawUpdatedStepFx.doneData.watch((isEqual) => {
  if (isEqual) {
    clearInterval(timer);
    setTimeout(() => {
      showSuccessAction();
    }, 700);
  }
});

drawSuccessFx.done.watch(() => {
  endLevelAction();
});

drawFailFx.done.watch(() => {
  loseAction();
});
