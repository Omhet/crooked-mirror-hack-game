import { createEvent, createStore } from "effector";
import { drawUpdatedStepFx } from "../components/Canvas/image";
import { DrawImageStep } from "../types";

type UpdateStepStore = {
  updateStep?: DrawImageStep;
  isStepUpdating: boolean;
  isImageEqual: boolean;
};
export const updateStepAction = createEvent<DrawImageStep | undefined>();
export const updateStepStore = createStore<UpdateStepStore>({
  isStepUpdating: false,
  isImageEqual: false,
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
