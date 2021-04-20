import React, { FC } from "react";
import { Panel } from "../Panel/Panel";
import s from "./index.module.css";

type Props = {
  triesLeft: number;
  memesLeft: number;
};

export const StatsPanel: FC<Props> = ({ triesLeft, memesLeft }) => {
  return (
    <div className={s.main}>
      <Panel contentClassName={s.content} title="STATS">
        <div>
          <div>{triesLeft} tries left</div>
          <div>till the computer burned out</div>
        </div>
        <div>
          <div>{memesLeft} memes left</div>
          <div>till the Internet is free</div>
        </div>
      </Panel>
    </div>
  );
};
