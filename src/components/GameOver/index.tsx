import React, { FC } from "react";
import { Button } from "../Button";
import GameOverIcon from "../../images/burn.svg";
import s from "./index.module.css";
import { useStore } from "effector-react";
import { gameStateStore } from "../../store/gameState";
import { startAction } from "../../store/level";

export const GameOver: FC = () => {
  const { gameOverReason } = useStore(gameStateStore);

  return (
    <div className={s.main}>
      <GameOverIcon />
      <h2>{gameOverReason}</h2>
      <Button onClick={startAction}>RESET</Button>
    </div>
  );
};
