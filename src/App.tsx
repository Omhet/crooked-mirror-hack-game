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

  const addStep = useCallback((step: DrawImageStep) => {
    setUpdateSteps([...updateSteps, step]);
  }, []);

  return (
    <div className="app">
      <Canvas initialSteps={initialSteps} updateSteps={updateSteps} />

      <UpdateButton step={initialSteps[0]} onClick={addStep} />
      <UpdateButton step={initialSteps[1]} onClick={addStep} />
    </div>
  );
}

export default App;
