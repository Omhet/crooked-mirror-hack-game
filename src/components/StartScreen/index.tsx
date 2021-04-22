import React, { FC } from "react";
import HackerIcon from "../../images/hacker.svg";
import { startGameAction } from "../../store/gameState";
import { Button } from "../Button";
import s from "./index.module.css";

export const StartScreen: FC = () => {
  return (
    <div className={s.main}>
      <HackerIcon />
      <h2>Crooked Mirror Hacker</h2>
      <Button onClick={startGameAction}>START GAME</Button>
    </div>
  );
};
