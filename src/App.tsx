import React, { useCallback, useState } from "react";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";
import { DrawImageStep } from "./components/Canvas/types";
import { UpdateButton } from "./components/UpdateButton/UpdateButton";

const initialSteps: DrawImageStep[] = [
  { id: "1", imgOptions: { flipX: true } },
  { id: "2", posOptions: { col: 2, gridSize: 2 }, imgOptions: { flipY: true } },
];

function App() {
  const [updateSteps, setUpdateSteps] = useState<DrawImageStep[]>([]);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());

  const addStep = useCallback((step: DrawImageStep) => {
    if (clickedSet.has(step.id)) {
      clickedSet.delete(step.id);
    } else {
      clickedSet.add(step.id);
    }

    setClickedSet(new Set(clickedSet));
    setUpdateSteps([...updateSteps, step]);
  }, []);

  return (
    <div className="app">
      <Canvas initialSteps={initialSteps} updateSteps={updateSteps} />
      {initialSteps.map((step) => (
        <UpdateButton
          key={step.id}
          isClicked={clickedSet.has(step.id)}
          step={step}
          onClick={addStep}
        />
      ))}
    </div>
  );
}

export default App;
