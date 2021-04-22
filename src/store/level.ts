import { loseAction, startGameAction, winAction } from "./gameState";
import { createEvent, createStore } from "effector";
import { GameOverReason, Level } from "../types";
import { levels } from "../levels";

type LevelStore = {
  clickedSet: Set<string>;
  isLevelLoading: boolean;
  levelNumber: number;
  userTries: number;
  time: number;
  level: Level;
};

export const nextLevelAction = createEvent();
export const userTryAction = createEvent();
export const startTimerAction = createEvent<number>();
export const increaseTimeAction = createEvent();

const initialState: LevelStore = {
  clickedSet: new Set(),
  isLevelLoading: false,
  levelNumber: 0,
  userTries: 0,
  time: 0,
  level: levels[0],
};

let timer = 0;

export const levelStore = createStore<LevelStore>(initialState)
  .on(increaseTimeAction, (state) => {
    return { ...state, time: state.time + 1 };
  })
  .on(userTryAction, (state) => {
    return { ...state, userTries: state.userTries + 1 };
  })
  .on(nextLevelAction, (state) => {
    const levelNumber = state.levelNumber + 1;
    startTimerAction(levelNumber);
    if (levelNumber >= levels.length) {
      winAction();
      return;
    }
    return {
      ...initialState,
      levelNumber,
      level: levels[levelNumber],
    };
  });

levelStore.watch(({ userTries, level, time }) => {
  if (level.tries !== undefined && level.tries - userTries <= 0) {
    loseAction(GameOverReason.Tries);
  }
  if (level.time !== undefined && level.time - time <= 0) {
    loseAction(GameOverReason.Time);
  }
});

levelStore.reset(startGameAction);

startTimerAction.watch((levelNumber) => {
  clearInterval(timer);
  timer = levels[levelNumber].time
    ? setInterval(() => increaseTimeAction(), 1000)
    : timer;
});

loseAction.watch(() => {
  clearInterval(timer);
});
