import React, { FC } from "react";
import { stopGameAction } from "../../store/gameState";
import { GameFinalChoice } from "../../types";
import { Button } from "../Button";
import s from "./index.module.css";

type Props = {};

const getStoryText = (choice: GameFinalChoice) => `
It's the end text.

The text here will depend on the final user's choice

User choosed ${choice === GameFinalChoice.Friend ? "friend" : "police"}
`;

export const GameWin: FC<Props> = ({}) => {
  return (
    <div className={s.main}>
      <h2>The End</h2>
      <p className={s.storyText}>{getStoryText(GameFinalChoice.Friend)}</p>
      <Button onClick={stopGameAction}>back to the menu</Button>
    </div>
  );
};
