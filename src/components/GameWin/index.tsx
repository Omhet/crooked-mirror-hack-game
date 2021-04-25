import React, { FC, useState } from "react";
import { stopGameAction, gameStateStore } from "../../store/gameState";
import { ChatMessageFrom, GameFinalChoice } from "../../types";
import { Button } from "../Button";
import s from "./index.module.css";
import { useStore } from "effector-react";
import { MessageAuthorNameMap } from "../../utils";

type Props = {};

const getPrefinalText = (friend: string) => `
While you were on your way to the meeting, the phone rang. You didn't pick up the phone, but you listened to the voice message: 

"We know where you are. If you refuse to cooperate and do not turn ${friend} in, you are finished."

Doubts crept into your head. What if ${friend} gets the same message and turns me in? What if he's actually one of them? Can I really trust him? What if we can't escape?

Halfway through, you stop and decide that it's time to choose for yourself.
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
          <p className={s.storyText}>
            {getPrefinalText(MessageAuthorNameMap[ChatMessageFrom.Friend])}
          </p>

          <div className={s.finalChoice}>
            <Button
              onClick={() => {
                setChoice(GameFinalChoice.Police);
              }}
            >
              Turn him in
            </Button>
            <Button
              onClick={() => {
                setChoice(GameFinalChoice.Friend);
              }}
            >
              I'm not a betrayer
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
