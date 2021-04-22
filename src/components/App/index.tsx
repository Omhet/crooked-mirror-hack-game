import { useStore } from "effector-react";
import React, { FC } from "react";
import { gameStateStore } from "../../store/gameState";
import { GameState } from "../../types";
import { ChatPanel } from "../ChatPanel";
import { GameOver } from "../GameOver";
import { GamePanel } from "../GamePanel/index";
import { GameWin } from "../GameWin";
import { PlayerPanel } from "../PlayerPanel";
import { StartScreen } from "../StartScreen";
import { StatsPanel } from "../StatsPanel";
import s from "./index.module.css";

export const App: FC = () => {
  const { gameState } = useStore(gameStateStore);

  const game = (
    <div className={s.main}>
      <StatsPanel />
      <GamePanel />
      <ChatPanel />
      <PlayerPanel />
    </div>
  );

  switch (gameState) {
    case GameState.Start:
      return <StartScreen />;
    case GameState.Play:
      return game;
    case GameState.Win:
      return <GameWin />;
    case GameState.Lose:
      return <GameOver />;
    default:
      return null;
  }
};
