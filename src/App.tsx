import React, { useCallback, useState } from "react";
import s from "./App.module.css";
import originalImgSrc from "./img.png";
import { Canvas } from "./components/Canvas/Canvas";
import { DrawImageStep } from "./components/Canvas/types";
import { UpdateButton } from "./components/UpdateButton/UpdateButton";
import { shuffle } from "./utils";

const gridSize = 2;

const initialSteps: DrawImageStep[] = [
  { imgOptions: { flipX: true } },
  { posOptions: { col: 2, gridSize }, imgOptions: { flipY: true } },
  {
    posOptions: { col: 2, row: 2, gridSize },
    imgOptions: { flipY: true },
  },
  // { posOptions: { col: 1, gridSize }, imgOptions: { flipX: true } },
  // { posOptions: { row: 1, gridSize }, imgOptions: { flipX: true } },
];

const buttonSteps: DrawImageStep[] = [
  ...shuffle([...initialSteps]),
  // { posOptions: { row: 2, gridSize: 2 }, imgOptions: { flipX: true } },
  // { posOptions: { row: 1, col: 1, gridSize: 2 }, imgOptions: { flipX: true } },
];

function App() {
  const [updateSteps, setUpdateSteps] = useState<DrawImageStep[]>([]);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());

  const addStep = useCallback((step: DrawImageStep, index: string) => {
    if (clickedSet.has(index)) {
      clickedSet.delete(index);
    } else {
      clickedSet.add(index);
    }
    setClickedSet(new Set(clickedSet));
    setUpdateSteps([...updateSteps, step]);
  }, []);

  return (
    <div className={s.main}>
      <div className={s.images}>
        <Canvas initialSteps={initialSteps} updateSteps={updateSteps} />
        <img className={s.originalImg} src={originalImgSrc} alt="" />
      </div>
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
