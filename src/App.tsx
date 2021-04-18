import React, { useCallback, useState, useEffect, useMemo } from "react";
import s from "./App.module.css";
import { Canvas } from "./components/Canvas/Canvas";
import { UpdateButton } from "./components/UpdateButton/UpdateButton";
import { DrawImageStep } from "./types";
import { getButtonSteps } from "./utils";
import { levels } from "./levels";

type GameState = "start" | "win" | "lose";

function App() {
  const [updateSteps, setUpdateSteps] = useState<DrawImageStep[]>([]);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [isImageEqual, setIsImageEqual] = useState(false);
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [gameState, setGameState] = useState<GameState>("start");
  const [levelNumber, setLevelNumber] = useState(0);
  const [userTries, setUserTries] = useState(0);

  const level = levels[levelNumber];
  const { img: levelImg, initialSteps } = level;

  const buttonSteps = useMemo(() => getButtonSteps(level), [level]);

  const addStep = useCallback(
    (step: DrawImageStep, index: string) => {
      if (isImageEqual || isLevelLoading) return;

      if (userTries >= level.tries) {
        setGameState("lose");
        return;
      }

      if (clickedSet.has(index)) {
        clickedSet.delete(index);
      } else {
        clickedSet.add(index);
      }
      setClickedSet(new Set(clickedSet));
      setUpdateSteps([step]);
      setUserTries((prev) => prev + 1);
    },
    [userTries]
  );

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
          setClickedSet(new Set());
          setUpdateSteps([]);
          setIsImageEqual(false);
          setIsLevelLoading(false);
          setUserTries(0);
        }, 1000);
      }, 1000);
    }
  }, [isImageEqual]);

  if (gameState === "lose") {
    return (
      <div className={s.main}>
        <div className={s.loader}>Sorry. You lose :(</div>
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
      <div>
        Tries: {userTries} / {level.tries}
      </div>
      {isImageEqual && <div>Congratulations!</div>}

      <div className={s.images}>
        <div className={s.canvasWrapper}>
          <Canvas
            originalImageSrc={levelImg}
            onUpdate={setIsImageEqual}
            initialSteps={initialSteps}
            updateSteps={updateSteps}
          />
        </div>

        <img className={s.originalImg} src={levelImg} alt="" />
      </div>

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
