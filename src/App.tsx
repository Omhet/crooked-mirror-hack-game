import React, { useCallback, useState, useEffect } from "react";
import s from "./App.module.css";
import img1 from "./img.png";
import img2 from "./img2.png";
import { Canvas } from "./components/Canvas/Canvas";
import { DrawImageStep } from "./components/Canvas/types";
import { UpdateButton } from "./components/UpdateButton/UpdateButton";
import { shuffle } from "./utils";

const images = [img1, img2];

const gridSize = 2;

const initialSteps: DrawImageStep[] = [
  { imgOptions: { flipX: true } },
  // { posOptions: { col: 2, gridSize }, imgOptions: { flipY: true } },
  // {
  //   posOptions: { col: 2, row: 2, gridSize },
  //   imgOptions: { flipY: true },
  // },
  // { posOptions: { row: 1, col: 2, gridSize }, imgOptions: { flipX: true } },
  // { posOptions: { row: 1, gridSize }, imgOptions: { flipX: true } },
];

const buttonSteps: DrawImageStep[] = [
  ...shuffle([...initialSteps]),
  { posOptions: { row: 2, gridSize: 2 }, imgOptions: { flipX: true } },
  { posOptions: { row: 1, col: 1, gridSize: 2 }, imgOptions: { flipX: true } },
];

type GameState = "start" | "win" | "lose";

function App() {
  const [updateSteps, setUpdateSteps] = useState<DrawImageStep[]>([]);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [isImageEqual, setIsImageEqual] = useState(false);
  const [isLevelLoading, setIsLevelLoading] = useState(false);
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentImage, setCurrentImage] = useState(0);

  const originalImageSrc = images[currentImage];

  const addStep = useCallback((step: DrawImageStep, index: string) => {
    if (isImageEqual) return;

    if (clickedSet.has(index)) {
      clickedSet.delete(index);
    } else {
      clickedSet.add(index);
    }
    setClickedSet(new Set(clickedSet));
    setUpdateSteps([...updateSteps, step]);
  }, []);

  useEffect(() => {
    if (isImageEqual) {
      setTimeout(() => {
        if (currentImage === images.length - 1) {
          setGameState("win");
          return;
        }

        setIsLevelLoading(true);
        setCurrentImage((prev) => prev + 1);

        setTimeout(() => {
          setClickedSet(new Set());
          setUpdateSteps([]);
          setIsImageEqual(false);
          setIsLevelLoading(false);
        }, 1000);
      }, 1000);
    }
  }, [isImageEqual]);

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
      <div className={s.images}>
        <div className={s.canvasWrapper}>
          <Canvas
            originalImageSrc={originalImageSrc}
            onUpdate={setIsImageEqual}
            initialSteps={initialSteps}
            updateSteps={updateSteps}
          />
        </div>

        <img className={s.originalImg} src={originalImageSrc} alt="" />
      </div>

      {isImageEqual && <div>Congratulations!</div>}
      <div className={s.btnGrid}>
        {buttonSteps.map((step, index) => (
          <UpdateButton
            key={index}
            isClicked={clickedSet.has(String(index))}
            step={step}
            onClick={(step) => addStep(step, String(index))}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
