import { useStore } from "effector-react";
import React, { FC } from "react";
import { levels } from "../../levels";
import { gameStateStore } from "../../store/gameState";
import { levelStore } from "../../store/level";
import { updateStepStore } from "../../store/updateStep";
import { GameState } from "../../types";
import { ChatPanel } from "../ChatPanel";
import { GameOver } from "../GameOver";
import { GamePanel } from "../GamePanel/index";
import { GameWin } from "../GameWin";
import { PlayerPanel } from "../PlayerPanel";
import { StatsPanel } from "../StatsPanel";
import s from "./index.module.css";

type Props = {
  isClicked?: boolean;
};

export const App: FC<Props> = () => {
  const { isImageEqual, isStepUpdating, updateStep } = useStore(
    updateStepStore
  );
  const { gameState } = useStore(gameStateStore);
  const {
    levelNumber,
    clickedSet,
    time,
    timer,
    userTries,
    isLevelLoading,
    level,
  } = useStore(levelStore);

  const timeLeft = level.time
    ? ((level.time - time) / level.time) * 100
    : undefined;

  const game = (
    <div className={s.main}>
      <StatsPanel
        memesLeft={levels.length - levelNumber}
        triesLeft={level.tries - userTries}
        timeLeft={timeLeft}
      />
      <GamePanel isLoading={isLevelLoading} />
      <ChatPanel />
      <PlayerPanel />
    </div>
  );

  switch (gameState) {
    case GameState.Start:
      return game;
    case GameState.Win:
      return <GameWin />;
    case GameState.Lose:
      return <GameOver />;
    default:
      return null;
  }
};
