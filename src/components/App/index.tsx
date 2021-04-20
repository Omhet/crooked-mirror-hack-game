import React, { FC } from "react";
import s from "./index.module.css";
import { GamePanel } from "../GamePanel/index";

type Props = {
  isClicked?: boolean;
};

export const App: FC<Props> = ({ isClicked }) => {
  return (
    <div className={s.main}>
      <GamePanel />
    </div>
  );
};
