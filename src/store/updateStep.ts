import { createEvent, createStore } from "effector";
import { drawUpdatedStepFx } from "../components/Canvas/image";
import { DrawImageStep } from "../types";
import { startGameAction } from "./gameState";
import { nextLevelAction, endLevelAction } from "./level";

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

drawUpdatedStepFx.doneData.watch((isEqual) => {
  if (isEqual) {
    endLevelAction();
  }
});

updateStepStore.reset(startGameAction);
