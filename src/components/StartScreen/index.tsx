import React, { FC } from "react";
import HackerIcon from "../../images/hacker.svg";
import { startGameAction } from "../../store/gameState";
import { Button } from "../Button";
import s from "./index.module.css";
import { setUserNameAction } from "../../store/user";

export const StartScreen: FC = () => {
  return (
    <div className={s.main}>
      <h1>Crooked Mirror Hacker</h1>
      <HackerIcon />
      <input
        autoFocus
        className={s.input}
        type="text"
        onChange={(e) => setUserNameAction(e.target.value)}
        placeholder="Enter your hacker name here"
      />
      <Button onClick={startGameAction}>START</Button>
    </div>
  );
};
