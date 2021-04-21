import React, { FC, useCallback, useEffect, useState } from "react";
import { levels } from "../../levels";
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

export const App: FC<Props> = ({ isClicked }) => {
  const [updateStep, setUpdateStep] = useState<DrawImageStep>();
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [isImageEqual, setIsImageEqual] = useState(false);
  const [isStepUpdating, setIsStepUpdating] = useState(false);
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("You've been hacked");
  const [gameState, setGameState] = useState<GameState>("start");
  const [levelNumber, setLevelNumber] = useState(0);
  const [userTries, setUserTries] = useState(0);

  const level = levels[levelNumber];

  const resetState = () => {
    setGameState("start");
    setClickedSet(new Set());
    setUpdateStep(undefined);
    setIsImageEqual(false);
    setIsLevelLoading(false);
    setUserTries(0);
  };

  const handleAddStep = useCallback((step: DrawImageStep, index: string) => {
    if (isImageEqual || isLevelLoading) return;

    setIsStepUpdating(true);

    if (clickedSet.has(index)) {
      clickedSet.delete(index);
    } else {
      clickedSet.add(index);
    }
    setClickedSet(new Set(clickedSet));
    setUpdateStep({ ...step });
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

        setTimeout(() => {
          resetState();
        }, 1000);
      }, 1000);
    }
  }, [isImageEqual]);

  const handleLevelReset = () => {
    resetState();
  };

  const handleStepUpdate = (isImageEqual: boolean) => {
    setIsStepUpdating(false);
    setIsImageEqual(isImageEqual);
    setUserTries((prev) => prev + 1);
  };

  if (gameState === "lose") {
    return <GameOver reason={gameOverReason} onReset={handleLevelReset} />;
  }

  if (gameState === "win") {
    return <GameWin />;
  }

  return (
    <div className={s.main}>
      <StatsPanel
        memesLeft={levels.length - levelNumber}
        triesLeft={level.tries - userTries}
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
