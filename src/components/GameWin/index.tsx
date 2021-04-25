import React, { FC, useState } from "react";
import { stopGameAction, gameStateStore } from "../../store/gameState";
import { GameFinalChoice } from "../../types";
import { Button } from "../Button";
import s from "./index.module.css";
import { useStore } from "effector-react";

type Props = {};

const storyText = `
Main hero is in doubt
`;

const getFinalText = (choice: GameFinalChoice) => `
It's the end text.

The text here will depend on the final user's choice

User choosed ${choice === GameFinalChoice.Friend ? "friend" : "police"}
`;

export const GameWin: FC<Props> = ({}) => {
  const [choice, setChoice] = useState<GameFinalChoice | undefined>();

  return (
    <div className={s.main}>
      {choice === undefined ? (
        <>
          <p className={s.storyText}>{storyText}</p>

          <div className={s.finalChoice}>
            <Button
              onClick={() => {
                setChoice(GameFinalChoice.Friend);
              }}
            >
              Friend
            </Button>
            <Button
              onClick={() => {
                setChoice(GameFinalChoice.Police);
              }}
            >
              Police
            </Button>
          </div>
        </>
      ) : (
        <>
          <h2>The End</h2>
          <p className={s.storyText}>{getFinalText(choice)}</p>
          <Button onClick={stopGameAction}>back to the menu</Button>
        </>
      )}
    </div>
  );
};
