import { useStore } from "effector-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { levels } from "../../levels";
import {
  gameStateStore,
  loseAction,
  startAction,
  winAction,
} from "../../store/gameState";
import { updateStepAction, updateStepStore } from "../../store/updateStep";
import { DrawImageStep } from "../../types";
import { ChatPanel } from "../ChatPanel";
import { GameOver } from "../GameOver";
import { GamePanel } from "../GamePanel/index";
import { GameWin } from "../GameWin";
import { PlayerPanel } from "../PlayerPanel";
import { StatsPanel } from "../StatsPanel";
import s from "./index.module.css";
import { levelStore } from "../../store/level";

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

  // useEffect(() => {
  //   let timer: number | undefined;
  //   if (level.time && gameState === "start") {
  //     timer = setInterval(() => {
  //       setTime((prev) => prev + 1);
  //     }, 1000);
  //     setTimer(timer);
  //   }
  //   return () => clearInterval(timer);
  // }, [level.time, gameState, levelNumber]);
  // useEffect(() => {
  //   if (time === level.time) {
  //     clearInterval(timer);
  //     loseAction("You've been catched by the cops");
  //   }
  // }, [time]);

  // const handleAddStep = useCallback((step: DrawImageStep, index: string) => {
  //   if (isImageEqual || isLevelLoading) return;

  //   if (clickedSet.has(index)) {
  //     clickedSet.delete(index);
  //   } else {
  //     clickedSet.add(index);
  //   }
  //   setClickedSet(new Set(clickedSet));
  //   updateStepAction({ ...step });
  // }, []);

  // useEffect(() => {
  //   if (!isImageEqual && !isStepUpdating && userTries >= level.tries) {
  //     loseAction("You've been hacked");
  //   }
  // }, [isStepUpdating, isImageEqual, userTries]);

  // useEffect(() => {
  //   if (isImageEqual) {
  //     setTimeout(() => {
  //       if (levelNumber === levels.length - 1) {
  //         winAction();
  //         return;
  //       }

  //       setIsLevelLoading(true);
  //       setLevelNumber((prev) => prev + 1);
  //       clearInterval(timer);

  //       setTimeout(() => {
  //         resetState();
  //       }, 1000);
  //     }, 1000);
  //   }
  // }, [isImageEqual]);

  // useEffect(() => {
  //   startAction();
  // }, [levelNumber]);

  // const handleStepUpdate = () => {
  //   setUserTries((prev) => prev + 1);
  // };

  if (gameState === "lose") {
    return <GameOver />;
  }

  if (gameState === "win") {
    return <GameWin />;
  }

  const timeLeft = level.time
    ? ((level.time - time) / level.time) * 100
    : undefined;

  return (
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
};
