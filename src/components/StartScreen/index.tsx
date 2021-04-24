import React, { FC, useState } from "react";
import HackerIcon from "../../images/hacker.svg";
import { startGameAction } from "../../store/gameState";
import { Button } from "../Button";
import s from "./index.module.css";
import { setUserNameAction, userStore } from "../../store/user";
import { useStore } from "effector-react";

const getStoryText = (name: string) => `
Ok, yes.
But firstly, here is a bit of history...

In the year 2048 the government banned all internet memes
People are struggling
The Inthernet needs its new hero who will hack the system and restore all the memes

It might be even you ${name}
`;

export const StartScreen: FC = () => {
  const [showStory, setShowStory] = useState(false);

  const { name } = useStore(userStore);
  const story = (
    <>
      <p className={s.storyText}>{getStoryText(name)}</p>
      <Button onClick={() => startGameAction(0)}>Ok. I'm ready</Button>
    </>
  );

  const menu = (
    <>
      <h1>Crooked Mirror Hacker</h1>
      <HackerIcon />
      <input
        autoFocus
        className={s.input}
        type="text"
        onChange={(e) => setUserNameAction(e.target.value)}
        placeholder="Enter your hacker name here"
      />
      <Button onClick={() => setShowStory(true)}>LET'S HACK</Button>
    </>
  );

  return <div className={s.main}>{showStory ? story : menu}</div>;
};
