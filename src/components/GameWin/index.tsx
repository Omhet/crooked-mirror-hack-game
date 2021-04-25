import React, { FC, useState } from "react";
import { stopGameAction } from "../../store/gameState";
import { ChatMessageFrom, GameFinalChoice } from "../../types";
import { MessageAuthorNameMap } from "../../utils";
import { Button } from "../Button";
import s from "./index.module.css";
import { useStore } from "effector-react";
import { userStore } from "../../store/user";

type Props = {};

const getPrefinalText = (friend: string) => `
While you were on your way to the meeting, the phone rang. You didn't pick up the phone, but you listened to the voice message: 

"We know where you are. If you refuse to cooperate and do not turn ${friend} in, you are finished."

Doubts crept into your head. What if ${friend} gets the same message and turns me in? What if he's actually one of them? Can I really trust him? What if we can't escape?

Halfway through, you stop and decide that it's time to choose for yourself.
`;

const getFinalText = (
  choice: GameFinalChoice,
  friend: string,
  user: string
) => `
${
  choice === GameFinalChoice.Friend
    ? getFriendChoiceText(friend, user)
    : getPoliceChoiceText(friend, user)
}
`;

const getPoliceChoiceText = (friend: string, user: string) => `
You send a message to the cops with the coordinates of the meeting.
"He's a nice guy, but I don't feel like I can trust him." - you thought.

Agents were already at the meeting place. 
They put ${friend} in a black car and drove away.

Agent Smith came out of nowhere and told you:
- Hi, ${user} It's been a pleasure doing business with you. Now, get in the car, we have another offer for you.

You were "offered" to work for the government and you couldn't help but agree.

Later, you learned from the news that ${friend} was murdered in prison.
This story was made public and there was a lot of hype. People began to take to the streets to protest, and ${friend} was recognized as a national hero.

You have been declared a vile traitor by the public, and you are not welcome even on Twitter, let alone on Reddit. Everyone believes that you wanted to prevent ${friend} and "Looking Glass" from saving memes.

This story has inspired millions of people to take action. "Looking Glass" has not ceased to exist. Their software appeared on the darknet and free hackers joined together to continue the ${user}'s glorious cause of ${friend}. They feel they are strong enough now to finally free the Internet.
`;

const getFriendChoiceText = (friend: string, user: string) => `
You've arrived at the meeting place, but didn't see ${friend} anywhere.
- "It's not like him. He's very punctual"

Suddenly, you felt a sharp pain. 
Your hands were twisted.
AGENTS! Fuck.

They put you in a black car and drove away.

The next day, in the jail you learned that ${friend} turned you in. He was "offered" to work for the government and he couldn't help but agree.

A few days later you were murdered by the government stooges...

This story was made public and there was a lot of hype. People began to take to the streets to protest, and you were recognized as a national hero.

${friend} has been declared a vile traitor by the public, and he is not welcome even on Twitter, let alone on Reddit. Everyone believes that he wanted to prevent you and "Looking Glass" from saving memes.

This story has inspired millions of people to take action. "Looking Glass" has not ceased to exist. Their software appeared on the darknet and free hackers joined together to continue the ${user}'s glorious cause. They feel they are strong enough now to finally free the Internet.
`;

export const GameWin: FC<Props> = ({}) => {
  const [choice, setChoice] = useState<GameFinalChoice | undefined>();
  const { name: user } = useStore(userStore);
  const friend = MessageAuthorNameMap[ChatMessageFrom.Friend];

  return (
    <div className={s.main}>
      {choice === undefined ? (
        <>
          <p className={s.storyText}>{getPrefinalText(friend)}</p>

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
          <h2>Consequences</h2>
          <p className={s.storyText}>{getFinalText(choice, friend, user)}</p>
          <Button className={s.backButton} onClick={stopGameAction}>
            back to the menu
          </Button>
        </>
      )}
    </div>
  );
};
