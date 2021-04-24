import { createEvent, createStore } from "effector";
import { drawUpdatedStepFx, drawSuccessFx } from "../components/Canvas/image";
import { DrawImageStep } from "../types";
import { startGameAction } from "./gameState";
import { toggleShowSuccessAction } from "./image";
import { nextLevelAction, endLevelAction, startLevelAction } from "./level";

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
    setTimeout(() => {
      toggleShowSuccessAction();
    }, 700);
  }
});

drawSuccessFx.done.watch(() => {
  endLevelAction();
});
