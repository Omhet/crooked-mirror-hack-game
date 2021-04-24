import { createEvent, createStore } from "effector";
import { endLevelAction, levelStore } from "./level";

type Store = {
  levelRating: number;
  globalRating: number;
  globalTries: number;
};

export const setLevelRatingAction = createEvent<number>();
export const setGlobalRatingAction = createEvent<number>();
export const increaseGlobalTriesAction = createEvent();

export const statsStore = createStore<Store>({
  levelRating: 0,
  globalRating: 0,
  globalTries: 0,
})
  .on(setLevelRatingAction, (state, levelRating) => ({
    ...state,
    levelRating,
  }))
  .on(setGlobalRatingAction, (state, globalRating) => ({
    ...state,
    globalRating,
  }))
  .on(increaseGlobalTriesAction, (state) => ({
    ...state,
    globalTries: state.globalTries + 1,
  }));

endLevelAction.watch(() => {
  const { userTries, level } = levelStore.getState();
  setLevelRatingAction(getLevelRating(userTries, level.initialSteps.length));
});

export const getLevelRating = (tries: number, limit: number) => {
  const diff = tries - limit;
  if (diff <= 0) {
    return 3;
  } else if (diff <= 2) {
    return 2;
  } else if (diff <= 4) {
    return 1;
  }

  return 0;
};
