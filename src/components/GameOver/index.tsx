import React, { FC } from "react";
import s from "./index.module.css";

type Props = {
  onReset(): void;
};

export const GameOver: FC<Props> = ({ onReset }) => {
  return (
    <div className={s.main}>
      <div className={s.loader}>
        <h2>Sorry. You lose :(</h2>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};
