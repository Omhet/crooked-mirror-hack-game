import React, { FC } from "react";
import s from "./index.module.css";

type Props = {};

export const GameWin: FC<Props> = ({}) => {
  return (
    <div className={s.main}>
      <div className={s.loader}>Congratulations. You win!</div>
    </div>
  );
};
