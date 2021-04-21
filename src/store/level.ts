import { createEvent, createStore } from "effector";
import { Level } from "../types";
import { levels } from "../levels";

type LevelStore = {
  clickedSet: Set<string>;
  isLevelLoading: boolean;
  levelNumber: number;
  userTries: number;
  time: number;
  timer: number;
  level: Level;
};

export const nextLevelAction = createEvent();
export const startAction = createEvent();
const initialState: LevelStore = {
  clickedSet: new Set(),
  isLevelLoading: false,
  levelNumber: 0,
  userTries: 0,
  time: 0,
  timer: 0,
  level: levels[0],
};
export const levelStore = createStore<LevelStore>(initialState)
  .on(startAction, (state) => {
    clearInterval(state.timer);
    return { ...initialState };
  })
  .on(nextLevelAction, (state) => {
    clearInterval(state.timer);
    const levelNumber = state.levelNumber + 1;
    return { ...initialState, levelNumber, level: levels[levelNumber] };
  });
