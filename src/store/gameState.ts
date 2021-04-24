import { createEvent, createStore } from "effector";
import { GameFinalChoice, GameOverReason, GameState } from "../types";

type GameStateStore = {
  gameState: GameState;
  gameOverReason: GameOverReason;
  finalChoice: GameFinalChoice;
  checkpoint: number;
};
export const setCheckpointAction = createEvent<number>();
export const loseAction = createEvent();
export const setGameOverReasonAction = createEvent<GameOverReason>();
export const setFinalChoiceAction = createEvent<GameFinalChoice>();
export const winAction = createEvent();
export const startGameAction = createEvent<number | undefined>();
export const stopGameAction = createEvent();

export const gameStateStore = createStore<GameStateStore>({
  gameState: GameState.Start,
  gameOverReason: GameOverReason.Time,
  finalChoice: GameFinalChoice.Friend,
  checkpoint: 0,
})
  .on(setCheckpointAction, (state, checkpoint) => ({
    ...state,
    checkpoint,
  }))
  .on(setGameOverReasonAction, (state, gameOverReason) => ({
    ...state,
    gameOverReason,
  }))
  .on(loseAction, (state) => ({
    ...state,
    gameState: GameState.Lose,
  }))
  .on(winAction, (state) => ({
    ...state,
    gameState: GameState.Win,
  }))
  .on(startGameAction, (state) => ({
    ...state,
    gameState: GameState.Play,
  }))
  .on(stopGameAction, (state) => ({
    ...state,
    gameState: GameState.Start,
  }))
  .on(setFinalChoiceAction, (state, finalChoice) => ({
    ...state,
    finalChoice,
  }));
