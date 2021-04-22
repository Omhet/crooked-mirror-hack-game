import React, { FC } from "react";
import { Button } from "../Button";
import BurnIcon from "../../images/burn.svg";
import PoliceIcon from "../../images/police.svg";
import s from "./index.module.css";
import { useStore } from "effector-react";
import { gameStateStore, startGameAction } from "../../store/gameState";
import { GameOverReason } from "../../types";

const GameOverReasonTextMap = {
  [GameOverReason.Tries]: "Your computer burned out",
  [GameOverReason.Time]: "Cops catched you",
};

const GameOverReasonImageMap = {
  [GameOverReason.Tries]: <BurnIcon />,
  [GameOverReason.Time]: <PoliceIcon />,
};

export const GameOver: FC = () => {
  const { gameOverReason } = useStore(gameStateStore);
  const reasonText = GameOverReasonTextMap[gameOverReason];
  const icon = GameOverReasonImageMap[gameOverReason];

  return (
    <div className={s.main}>
      {icon}
      <h2>{reasonText}</h2>
      <Button onClick={startGameAction}>RESET</Button>
    </div>
  );
};
