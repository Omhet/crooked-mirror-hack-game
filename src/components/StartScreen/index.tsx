import React, { FC, useState } from "react";
import HackerIcon from "../../images/hacker.svg";
import { startGameAction } from "../../store/gameState";
import { Button } from "../Button";
import s from "./index.module.css";
import { setUserNameAction, userStore } from "../../store/user";
import { useStore } from "effector-react";

const getStoryText = (name: string) => `
The year is 2077. People are completely lazy and instead of working, they hang out all day long on the Internet and watch memes. The governments of all countries have joined together to put an end to this. To make people work, they decided to ban all online entertainment, including memes.

Governments have hired the best people to create a global firewall that encrypts all memes on the web. And it worked. They created a powerful software called "Crooked Mirror". Now all memes are crooked and people are forced to work, because there is nothing else to do.

But even in such a dark hour, there were people who were ready to stand up for freedom. The hacker group "Looking Glass" is our last chance for salvation.

They managed to recreate the algorithm of the "Crooked Mirror" and create software that allows you to pick up the decryption. 

You, ${name}, are one of them. You shall help them to decrypt those memes and save the Internet.

V1v4 L4 V1D4
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
