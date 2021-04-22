import React, { FC } from "react";
import { Button } from "../Button";
import GameOverIcon from "../../images/burn.svg";
import s from "./index.module.css";
import { useStore } from "effector-react";
import { gameStateStore, startGameAction } from "../../store/gameState";
import { GameOverReasonMap } from "../../constants";

export const GameOver: FC = () => {
  const { gameOverReason } = useStore(gameStateStore);
  const reasonText = GameOverReasonMap[gameOverReason];

  return (
    <div className={s.main}>
      <GameOverIcon />
      <h2>{reasonText}</h2>
      <Button onClick={startGameAction}>RESET</Button>
    </div>
  );
};
