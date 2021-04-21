import React, { FC } from "react";
import { Button } from "../Button";
import GameOverIcon from "../../images/burn.svg";
import s from "./index.module.css";

type Props = {
  onReset(): void;
  reason: string;
};

export const GameOver: FC<Props> = ({ onReset, reason }) => {
  return (
    <div className={s.main}>
      <GameOverIcon />
      <h2>{reason}</h2>
      <Button onClick={onReset}>RESET</Button>
    </div>
  );
};
