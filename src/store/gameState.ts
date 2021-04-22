import { createEvent, createStore } from "effector";
import { GameOverReason, GameState } from "../types";

type GameStateStore = {
  gameState: GameState;
  gameOverReason: GameOverReason;
};
export const loseAction = createEvent<GameOverReason>();
export const winAction = createEvent();
export const startGameAction = createEvent();
export const stopGameAction = createEvent();
export const gameStateStore = createStore<GameStateStore>({
  gameState: GameState.Start,
  gameOverReason: GameOverReason.Time,
})
  .on(loseAction, (state, gameOverReason) => ({
    ...state,
    gameState: GameState.Lose,
    gameOverReason,
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
  }));
