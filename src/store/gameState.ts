import { createEvent, createStore } from "effector";
import { GameState } from "../types";

type GameStateStore = {
  gameState: GameState;
  gameOverReason: string;
};
export const loseAction = createEvent<string>();
export const winAction = createEvent();
export const startGameAction = createEvent();
export const playAction = createEvent();
export const gameStateStore = createStore<GameStateStore>({
  gameState: GameState.Start,
  gameOverReason: "Wasted",
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
    gameState: GameState.Start,
  }))
  .on(playAction, (state) => ({
    ...state,
    gameState: GameState.Play,
  }));

// gameStateStore.watch(({ gameState }) => {
//   if (gameState === GameState.Play || gameState === GameState.Start) {
//     nextLevelAction();
//   }
// });
