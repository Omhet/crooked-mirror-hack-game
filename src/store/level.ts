import { createEvent, createStore } from "effector";
import { levels } from "../levels";
import { GameOverReason, Level } from "../types";
import {
  setBusyAction,
  setShowReadyForNextLevelAction,
  setShowReadyToPlayAction,
} from "./chat";
import {
  gameStateStore,
  loseAction,
  setCheckpointAction,
  startGameAction,
  winAction,
} from "./gameState";

type LevelStore = {
  levelNumber: number;
  userTries: number;
  time: number;
  level: Level;
  isLevelEnd: boolean;
};

export const nextLevelAction = createEvent();
export const startLevelAction = createEvent<number>();
export const readyToPlayLevelAction = createEvent();
export const endLevelAction = createEvent();
export const readyToStartNextLevelAction = createEvent();
export const failLevelAction = createEvent<GameOverReason>();
export const userTryAction = createEvent();
export const startTimerAction = createEvent();
export const increaseTimeAction = createEvent();

const initialState: LevelStore = {
  levelNumber: 0,
  userTries: 0,
  time: 0,
  isLevelEnd: false,
  level: levels[0],
};

let timer = 0;

export const levelStore = createStore<LevelStore>(initialState)
  .on(startLevelAction, (_state, levelNumber) => {
    return {
      ...initialState,
      level: levels[levelNumber],
      levelNumber,
      isLevelEnd: false,
    };
  })
  .on(endLevelAction, (state) => {
    return { ...state, isLevelEnd: true };
  })
  .on(increaseTimeAction, (state) => {
    return { ...state, time: state.time + 1 };
  })
  .on(userTryAction, (state) => {
    return { ...state, userTries: state.userTries + 1 };
  })
  .on(nextLevelAction, (state) => {
    const levelNumber = state.levelNumber + 1;
    if (levelNumber >= levels.length) {
      winAction();
      return;
    }

    startLevelAction(levelNumber);

    return {
      ...initialState,
      levelNumber,
      level: levels[levelNumber],
    };
  });

levelStore.watch(({ userTries, level, time }) => {
  if (level.tries !== undefined && level.tries - userTries <= 0) {
    failLevelAction(GameOverReason.Tries);
  }
  if (level.time !== undefined && level.time - time <= 0) {
    failLevelAction(GameOverReason.Time);
  }
});

levelStore.reset(startGameAction);

startTimerAction.watch(() => {
  const { levelNumber } = levelStore.getState();
  clearInterval(timer);
  timer = levels[levelNumber].time
    ? setInterval(() => increaseTimeAction(), 1000)
    : timer;
});

loseAction.watch(() => {
  clearInterval(timer);
});

startGameAction.watch((forceStartLevel?: number) => {
  const { checkpoint } = gameStateStore.getState();
  const startLevel =
    forceStartLevel !== undefined ? forceStartLevel : checkpoint;
  startLevelAction(startLevel);
});

startLevelAction.watch((levelNumber) => {
  if (levels[levelNumber].isCheckpoint) {
    setCheckpointAction(levelNumber);
  }
});

readyToPlayLevelAction.watch(() => {
  setBusyAction(false);
  setShowReadyToPlayAction(false);
  startTimerAction();
});

readyToStartNextLevelAction.watch(() => {
  clearInterval(timer);
  setShowReadyForNextLevelAction(false);
  nextLevelAction();
});
