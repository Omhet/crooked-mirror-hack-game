import { useStore } from "effector-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { levels } from "../../levels";
import { updateStepAction, updateStepStore } from "../../store/updateStep";
import { DrawImageStep, GameState } from "../../types";
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
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("You've been hacked");
  const [gameState, setGameState] = useState<GameState>("start");
  const [levelNumber, setLevelNumber] = useState(0);
  const [userTries, setUserTries] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0);

  const { isImageEqual, isStepUpdating, updateStep } = useStore(
    updateStepStore
  );

  const level = levels[levelNumber];

  useEffect(() => {
    let timer: number | undefined;
    if (level.time && gameState === "start") {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setTimer(timer);
    }
    return () => clearInterval(timer);
  }, [level.time, gameState, levelNumber]);
  useEffect(() => {
    if (time === level.time) {
      clearInterval(timer);
      setGameState("lose");
      setGameOverReason("You've been catched by the cops");
    }
  }, [time]);

  const resetState = () => {
    setGameState("start");
    setClickedSet(new Set());
    updateStepAction(undefined);
    setIsLevelLoading(false);
    setUserTries(0);
    setTime(0);
    clearInterval(timer);
  };

  const handleAddStep = useCallback((step: DrawImageStep, index: string) => {
    if (isImageEqual || isLevelLoading) return;

    if (clickedSet.has(index)) {
      clickedSet.delete(index);
    } else {
      clickedSet.add(index);
    }
    setClickedSet(new Set(clickedSet));
    updateStepAction({ ...step });
  }, []);

  useEffect(() => {
    if (!isImageEqual && !isStepUpdating && userTries >= level.tries) {
      setGameState("lose");
    }
  }, [isStepUpdating, isStepUpdating, userTries]);

  useEffect(() => {
    if (isImageEqual) {
      setTimeout(() => {
        if (levelNumber === levels.length - 1) {
          setGameState("win");
          return;
        }

        setIsLevelLoading(true);
        setLevelNumber((prev) => prev + 1);
        clearInterval(timer);

        setTimeout(() => {
          resetState();
        }, 1000);
      }, 1000);
    }
  }, [isImageEqual]);

  const handleLevelReset = () => {
    resetState();
  };

  const handleStepUpdate = () => {
    setUserTries((prev) => prev + 1);
  };

  if (gameState === "lose") {
    return <GameOver reason={gameOverReason} onReset={handleLevelReset} />;
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
      <GamePanel
        isLoading={isLevelLoading}
        level={level}
        isButtonClicked={(id: string) => clickedSet.has(id)}
        areButtonsDisabled={isStepUpdating}
        updateStep={updateStep}
        onAddStep={handleAddStep}
        onStepUpdate={handleStepUpdate}
      />
      <ChatPanel />
      <PlayerPanel />
    </div>
  );
};
