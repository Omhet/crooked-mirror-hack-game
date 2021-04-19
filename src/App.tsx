import React, { useCallback, useState, useEffect, useMemo } from "react";
import s from "./App.module.css";
import { Canvas } from "./components/Canvas/Canvas";
import { UpdateButton } from "./components/UpdateButton/UpdateButton";
import { DrawImageStep } from "./types";
import { getButtonSteps } from "./utils";
import { levels } from "./levels";

type GameState = "start" | "win" | "lose";

function App() {
  const [updateStep, setUpdateStep] = useState<DrawImageStep>();
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [isImageEqual, setIsImageEqual] = useState(false);
  const [isStepUpdating, setIsStepUpdating] = useState(false);
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [gameState, setGameState] = useState<GameState>("start");
  const [levelNumber, setLevelNumber] = useState(0);
  const [userTries, setUserTries] = useState(0);

  const level = levels[levelNumber];
  const { img: levelImg, initialSteps } = level;

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  const resetState = () => {
    setGameState("start");
    setClickedSet(new Set());
    setUpdateStep(undefined);
    setIsImageEqual(false);
    setIsLevelLoading(false);
    setUserTries(0);
  };

  const addStep = useCallback((step: DrawImageStep, index: string) => {
    if (isImageEqual || isLevelLoading) return;

    if (clickedSet.has(index)) {
      clickedSet.delete(index);
    } else {
      clickedSet.add(index);
    }
    setClickedSet(new Set(clickedSet));
    setUpdateStep({ ...step });
  }, []);

  useEffect(() => {
    console.log(isStepUpdating);

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
    return (
      <div className={s.main}>
        <div className={s.loader}>
          <h2>Sorry. You lose :(</h2>
          <button onClick={handleLevelReset}>Reset</button>
        </div>
      </div>
    );
  }

  if (gameState === "win") {
    return (
      <div className={s.main}>
        <div className={s.loader}>Congratulations. You win!</div>
      </div>
    );
  }

  if (isLevelLoading) {
    return (
      <div className={s.main}>
        <div className={s.loader}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={s.main}>
      <div>You have {level.tries - userTries} tries left</div>
      {isImageEqual && <div>Congratulations!</div>}

      <Canvas
        originalImageSrc={levelImg}
        onUpdate={handleStepUpdate}
        initialSteps={initialSteps}
        updateStep={updateStep}
      />

      <div className={s.btnGrid}>
        {buttonSteps.map((step, index) => {
          const id = `${levelNumber}-${index}`;
          return (
            <UpdateButton
              key={id}
              isClicked={clickedSet.has(id)}
              step={step}
              onClick={(step) => addStep(step, id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
