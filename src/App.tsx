import React from "react";
import "./App.css";
import { Canvas } from "./components/Canvas/Canvas";
import { DrawImageStep } from "./components/Canvas/types";

const steps: DrawImageStep[] = [
  { imgOptions: { flipX: true } },
  { posOptions: { col: 2, gridSize: 2 }, imgOptions: { flipY: true } },
];

function App() {
  return (
    <div className="app">
      <Canvas initialSteps={steps} updateSteps={[]} />
    </div>
  );
}

export default App;
